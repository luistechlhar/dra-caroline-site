/* =============================================================
   Dra. Caroline Ringvelski · Oftalmologia
   JavaScript puro — sem dependências, sem bibliotecas.
   Tudo aqui é melhoria progressiva: o site funciona sem JS.
   ============================================================= */
(function () {
  'use strict';

  /* Marca que o JS está ativo (habilita o estado inicial das animações) */
  document.documentElement.classList.add('js');

  /* -----------------------------------------------------------
     1 · MENU MOBILE
     Abre/fecha o painel e mantém o aria-expanded sincronizado.
     ----------------------------------------------------------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav-principal');

  if (toggle && nav) {
    var fecharMenu = function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu de navegação');
    };

    toggle.addEventListener('click', function () {
      var aberto = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(aberto));
      toggle.setAttribute('aria-label', aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    });

    /* Fecha ao escolher um item */
    nav.addEventListener('click', function (evento) {
      if (evento.target.closest('a')) { fecharMenu(); }
    });

    /* Fecha com a tecla Esc e devolve o foco ao botão */
    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && nav.classList.contains('is-open')) {
        fecharMenu();
        toggle.focus();
      }
    });
  }

  /* -----------------------------------------------------------
     2 · CABEÇALHO — hairline ao rolar
     ----------------------------------------------------------- */
  var header = document.querySelector('.site-header');

  if (header) {
    var atualizarHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    atualizarHeader();
    window.addEventListener('scroll', atualizarHeader, { passive: true });
  }

  /* -----------------------------------------------------------
     3 · REVELAÇÃO SUAVE AO ROLAR
     Respeita "prefers-reduced-motion" e degrada com elegância
     em navegadores sem IntersectionObserver.
     ----------------------------------------------------------- */
  var elementos = document.querySelectorAll('.reveal');
  var movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || movimentoReduzido) {
    elementos.forEach(function (elemento) { elemento.classList.add('is-visible'); });
  } else {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elementos.forEach(function (elemento) { observador.observe(elemento); });
  }

  /* -----------------------------------------------------------
     4 · ANO DO RODAPÉ
     ----------------------------------------------------------- */
  var ano = document.getElementById('ano');
  if (ano) { ano.textContent = String(new Date().getFullYear()); }
})();
