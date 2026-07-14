# Dra. Caroline Ringelski · Oftalmologia — site institucional

Site de página única, estático (HTML5 + CSS3 + JavaScript puro), construído sobre o
Manual de Identidade Visual v1.0 (julho de 2026). Sem frameworks, sem backend, sem build.

## Estrutura

```
.
├── index.html          # toda a página (semântica, SEO, dados estruturados)
├── styles.css          # tokens da marca + estilos (mobile-first)
├── script.js           # menu mobile, revelação ao rolar, ano do rodapé
├── .nojekyll           # evita o processamento Jekyll no GitHub Pages
└── assets/
    ├── favicon.svg                   # símbolo sobre Areia, cantos 14px
    ├── logo-principal.svg            # assinatura completa (vertical) — uso preferencial
    ├── logo-fundo-escuro.svg         # nome em Areia, símbolo mantém o rosé
    ├── logo-mono-grafite.svg         # uma cor: impressão, documentos, receituário
    ├── logo-mono-areia.svg           # uma cor: fotos escuras e vídeos
    ├── logo-horizontal.svg           # assinatura horizontal (cabeçalho do site)
    ├── logo-horizontal-escuro.svg    # assinatura horizontal para fundo Grafite (rodapé)
    ├── logo-simbolo.svg              # símbolo isolado — avatar, selo, marca d'água
    ├── logo-simbolo-areia.svg
    ├── logo-simbolo-grafite.svg
    ├── icons/                        # ícones lineares adicionais
    └── img/                          # fotos e og-image (opcional)
```

Todos os SVGs foram gerados a partir do vetor original da marca: os traçados são os
mesmos, sem redesenho, distorção ou rotação — muda apenas a cor de preenchimento,
dentro das versões previstas no manual.

**Sobre a versão horizontal:** o manual só documenta a assinatura vertical. Para o
cabeçalho de um site, a versão empilhada deixaria o nome ilegível, então derivei uma
composição horizontal usando exatamente os mesmos vetores (símbolo à esquerda, nome e
especialidade à direita, proporções intactas). Vale registrar essa variação no manual,
como versão aprovada para web.

## Antes de publicar — substitua os placeholders

No `index.html`, procure e troque:

| Placeholder | Onde aparece |
|---|---|
| `5500000000000` | links do WhatsApp (formato internacional, só dígitos: 55 + DDD + número) |
| `(00) 0000-0000` / `+550000000000` | telefone (exibição e link `tel:`) |
| `contato@exemplo.com.br` | e-mail (exibição e link `mailto:`) |
| `Rua Exemplo, 000 — Sala 00` | endereço, no bloco de contato e no schema.org |
| `CRM-PR 00000 · RQE 0000` | registro profissional (hero, rodapé) — obrigatório em publicidade médica |
| `https://SEU-USUARIO.github.io/...` | URL canônica, Open Graph e schema.org |
| horário de atendimento | seção de contato e `openingHours` no schema.org |

**Imagem de compartilhamento (opcional):** exporte um card 1200×630 na identidade da
marca, salve em `assets/img/og-image.jpg` e descomente a linha `og:image` no `<head>`.

**Fotografias (opcional):** o layout usa apenas elementos gráficos lineares da marca.
Se quiser incluir fotos, siga o capítulo 06 do manual — luz natural difusa, tons
quentes, muito espaço negativo — e evite banco de imagens genérico.

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (ex.: `site-dra-caroline`), público.
2. Envie os arquivos com o `index.html` na **raiz** do repositório:

   ```bash
   git init
   git add .
   git commit -m "Site institucional Dra. Caroline Ringelski"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/site-dra-caroline.git
   git push -u origin main
   ```

3. No repositório: **Settings → Pages**.
4. Em *Build and deployment*, escolha **Deploy from a branch**, selecione a branch
   `main` e a pasta `/ (root)`. Clique em **Save**.
5. Aguarde 1–2 minutos. O site fica em
   `https://SEU-USUARIO.github.io/site-dra-caroline/`.

### Domínio próprio (ex.: `drcarolineringelski.com.br`)

1. **Settings → Pages → Custom domain**: informe o domínio e salve
   (o GitHub cria um arquivo `CNAME` no repositório).
2. No painel do provedor do domínio, aponte o DNS:
   - subdomínio `www` → registro **CNAME** para `SEU-USUARIO.github.io`
   - domínio raiz → registros **A** para `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
3. Volte em **Settings → Pages** e marque **Enforce HTTPS** assim que o certificado
   for emitido (pode levar algumas horas).

## Conformidade

O conteúdo segue as normas do CFM sobre publicidade médica: sem depoimentos, sem
promessa de resultado, sem antes e depois, sem preço, sem urgência artificial.
Toda orientação clínica termina convidando à consulta, sem substituí-la.
