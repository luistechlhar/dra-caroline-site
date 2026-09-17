/* ============================================================
   AGENDAMENTO INTERATIVO — lógica do formulário
   Cole antes de </body>, depois de script.js:
   <script src="lead-capture.js" defer></script>

   IMPORTANTE: troque ENDPOINT pela URL do seu Google Apps Script
   (veja CONFIGURACAO-LEADS.md) antes de publicar o site.
============================================================ */
(function () {
  "use strict";

  // URL do Web App do Google Apps Script (passo a passo em CONFIGURACAO-LEADS.md)
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbxGyifXUQx-ZdFIw8S_x9OtKbW1qyxuW8OWwxDj_GvhLdHzMCGgycGHzS8gv75Pne8N/exec";

  // Números do WhatsApp por unidade (mesmos já usados na seção de contato)
  const WHATSAPP_POR_UNIDADE = {
    "Curitiba/PR — Clínica de Olhos Gubert Deud": "5541988884453",
    "Joinville/SC — Ophtalmus": "554734223623",
  };

  const form = document.getElementById("lead-wizard");
  if (!form) return;

  const state = { motivo: "", unidade: "" };
  let currentStep = 1;

  function goToStep(step) {
    form.querySelectorAll(".lead-step").forEach((el) => {
      el.classList.toggle("is-active", Number(el.dataset.step) === step);
    });
    form.querySelectorAll(".lead-progress-item").forEach((el) => {
      const dot = Number(el.dataset.stepDot);
      el.classList.toggle("is-active", dot === step);
      el.classList.toggle("is-done", dot < step);
    });
    currentStep = step;
  }

  // Navegação (voltar)
  form.querySelectorAll(".lead-back").forEach((btn) => {
    btn.addEventListener("click", () => goToStep(Number(btn.dataset.goto)));
  });

  // Passo 1 — seleção do motivo
  const chips = form.querySelectorAll(".lead-chip");
  const step1Next = form.querySelector('[data-step="1"] .lead-next');
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-selected"));
      chip.classList.add("is-selected");
      state.motivo = chip.dataset.value;
      step1Next.disabled = false;
    });
  });
  step1Next.addEventListener("click", () => goToStep(2));

  // Passo 2 — seleção da unidade
  const units = form.querySelectorAll(".lead-unit");
  const step2Next = form.querySelector('[data-step="2"] .lead-next');
  units.forEach((unit) => {
    unit.addEventListener("click", () => {
      units.forEach((u) => u.classList.remove("is-selected"));
      unit.classList.add("is-selected");
      state.unidade = unit.dataset.value;
      step2Next.disabled = false;
    });
  });
  step2Next.addEventListener("click", () => goToStep(3));

  // Passo 3 — envio
  const nomeInput = document.getElementById("lead-nome");
  const telInput = document.getElementById("lead-telefone");
  const emailInput = document.getElementById("lead-email");
  const consentInput = document.getElementById("lead-consentimento");
  const errorEl = document.getElementById("lead-error");
  const submitBtn = document.getElementById("lead-submit");

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }
  function clearError() {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  function soDigitos(v) {
    return (v || "").replace(/\D/g, "");
  }

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    clearError();

    const nome = nomeInput.value.trim();
    const telefone = telInput.value.trim();
    const email = emailInput.value.trim();

    if (!nome) return showError("Informe seu nome completo.");
    if (soDigitos(telefone).length < 10) return showError("Informe um WhatsApp válido, com DDD.");
    if (!consentInput.checked) return showError("Precisamos da sua autorização para entrar em contato.");

    const payload = {
      nome,
      telefone,
      email,
      motivo: state.motivo,
      unidade: state.unidade,
      consentimento: true,
      origem: document.referrer || "direto",
      paginaOrigem: window.location.href,
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    try {
      if (ENDPOINT && ENDPOINT !== "COLE_AQUI_A_URL_DO_APPS_SCRIPT") {
        // text/plain evita o preflight de CORS no Apps Script
        await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
      }
    } catch (err) {
      // Mesmo se o registro falhar, o WhatsApp continua funcionando como
      // canal de confirmação — não bloqueia o agendamento por causa disso.
      console.warn("Não foi possível registrar o lead:", err);
    }

    // Monta o link do WhatsApp com os dados já preenchidos
    const numero = WHATSAPP_POR_UNIDADE[state.unidade] || "5541988884453";
    const texto =
      `Olá! Gostaria de agendar uma avaliação com a Dra. Caroline Ringvelski.\n` +
      `Nome: ${nome}\n` +
      `Motivo: ${state.motivo}\n` +
      `Unidade: ${state.unidade}`;
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    document.getElementById("lead-whatsapp-link").href = link;
    document.getElementById("lead-done-nome").textContent = nome.split(" ")[0];

    submitBtn.disabled = false;
    submitBtn.textContent = "Confirmar e ir para o WhatsApp";
    goToStep(4);
  });
})();
