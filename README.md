# Monteiro Advocacia Online

Landing page institucional da **Maria Monteiro Advocacia**, com foco em apresentação de serviços jurídicos e conversão de atendimento via WhatsApp.

## Objetivo

Este projeto entrega uma experiência web moderna para:
- apresentar áreas de atuação (Família, Sucessões e Consumidor);
- comunicar diferenciais do atendimento online;
- facilitar o primeiro contato de potenciais clientes via CTA e formulário com redirecionamento para WhatsApp.

---

## Stack

- **Linguagem:** TypeScript
- **Framework/runtime:** React 19 + TanStack Start + TanStack Router
- **Build tool:** Vite 7
- **Estilo/UI:** Tailwind CSS 4, Radix UI, utilitários shadcn
- **Deploy alvo:** Cloudflare Workers (via `@cloudflare/vite-plugin` + `wrangler.jsonc`)

---

## Pré-requisitos

- **Node.js** 20+
- **npm** (ou gerenciador compatível)

> Observação: o repositório possui `bun.lock`, mas os scripts no `package.json` funcionam normalmente com npm.

---

## Instalação

```bash
npm install
```

---

## Scripts disponíveis

Conforme `package.json`:

- `npm run dev` — inicia ambiente de desenvolvimento (Vite)
- `npm run build` — gera build de produção
- `npm run build:dev` — gera build em modo desenvolvimento
- `npm run preview` — pré-visualiza build local
- `npm run lint` — executa lint
- `npm run format` — formata código com Prettier

---

## Executando localmente

```bash
npm run dev
```

Depois, abra a URL exibida no terminal (geralmente `http://localhost:5173`).

---

## Build e preview

```bash
npm run build
npm run preview
```

---

## Arquitetura (visão v2)

A aplicação segue uma arquitetura **frontend-first com SSR em edge runtime**.

- `src/server.ts` atua como entrypoint SSR e normaliza falhas catastróficas com fallback HTML.
- `src/start.ts` adiciona middleware de erro para requests server-side.
- `src/router.tsx` cria o router e injeta `QueryClient` no contexto.
- `src/routes/__root.tsx` define shell global (`<html>`, `<head>`, scripts, meta e boundaries).
- `src/routes/index.tsx` compõe a landing principal e o fluxo de contato.

### Fluxo de execução (alto nível)

```text
Request HTTP
   ↓
server.ts (SSR handler + normalização de erro)
   ↓
start.ts (middleware server)
   ↓
router.tsx (route tree + query client)
   ↓
routes/__root.tsx (shell global)
   ↓
routes/index.tsx (UI da landing)
```

### Fluxo de conversão (contato)

```text
Usuário preenche formulário
   ↓
Validação client-side (estado atual: básica)
   ↓
Composição da mensagem
   ↓
Redirecionamento para wa.me em nova aba
```

> Estado atual: não há persistência de lead em backend neste repositório.

---

## Estrutura do projeto

```text
public/
  favicon.png

src/
  assets/                 # imagens da marca e da landing
  components/
    ui/                   # componentes utilitários de interface
  hooks/
    use-mobile.tsx
  lib/
    error-capture.ts      # captura de erro global para SSR
    error-page.ts         # página fallback de erro 500
    utils.ts              # helper cn() para classes
  routes/
    __root.tsx            # shell, meta e error boundaries
    index.tsx             # landing principal
  routeTree.gen.ts        # árvore de rotas gerada
  router.tsx              # criação de router + QueryClient
  server.ts               # entrypoint SSR/runtime
  start.ts                # middleware server-side
  styles.css              # tema e tokens visuais
```

---

## Deploy (Cloudflare)

O projeto está preparado para deploy com Cloudflare, com configuração em `wrangler.jsonc` e plugin `@cloudflare/vite-plugin`.

Fluxo recomendado:
1. gerar build (`npm run build`);
2. publicar com o fluxo de deploy adotado pelo time/conta Cloudflare.

> Se necessário, adicione neste README os comandos exatos de deploy usados na sua conta (ex.: `wrangler deploy`), incluindo nome do worker/projeto e variáveis de ambiente.

---

## Convenções de trabalho (branch/commit/PR)

## Branches
Sugestão de padrão:
- `feat/<descricao-curta>`
- `fix/<descricao-curta>`
- `docs/<descricao-curta>`
- `chore/<descricao-curta>`

Exemplos:
- `feat/form-validation-contact`
- `fix/lang-pt-br-root`
- `docs/readme-v2`

## Commits
Seguir estilo descritivo curto, preferencialmente no formato:
- `feat: ...`
- `fix: ...`
- `docs: ...`
- `chore: ...`

Exemplos:
- `fix: ajusta idioma raiz para pt-BR`
- `feat: adiciona schema de validação do formulário`

## Pull Requests
Todo PR deve incluir:
- contexto do problema;
- o que foi alterado;
- impacto esperado;
- checklist de validação local.

Checklist mínimo sugerido:

```bash
npm run lint
npm run build
```

---

## Troubleshooting (erros comuns)

## 1) Erro ao iniciar `npm run dev`
**Possíveis causas**
- dependências não instaladas corretamente;
- versão de Node incompatível.

**Ações**
```bash
node -v
npm install
npm run dev
```

## 2) Build falha em `npm run build`
**Possíveis causas**
- erro de tipagem TypeScript;
- import quebrado;
- regressão em componentes/rotas.

**Ações**
```bash
npm run lint
npm run build
```
Revisar mensagens de erro e corrigir imports/tipos indicados.

## 3) Estilo não aplicado corretamente
**Possíveis causas**
- problema em classes/utilitários Tailwind;
- alteração incorreta em `src/styles.css`.

**Ações**
- validar classes no componente alterado;
- revisar tokens e utilitários customizados em `styles.css`.

## 4) Fallback de erro 500 inesperado
**Contexto**
- `server.ts` e `start.ts` possuem normalização de erros SSR.

**Ações**
- verificar logs no ambiente de execução;
- reproduzir localmente com `npm run dev`;
- revisar mudanças recentes em rotas/renderização SSR.

---

## Qualidade e boas práticas

Checklist recomendado antes de merge:

```bash
npm run lint
npm run format
npm run build
```

---

## Próximos passos sugeridos

- modularizar `src/routes/index.tsx` em componentes por seção;
- fortalecer validação do formulário com schema (`zod`);
- centralizar configurações de contato (WhatsApp/Instagram);
- instrumentar eventos de conversão sem PII;
- evoluir observabilidade e logging estruturado.

---

## Contribuição

1. Crie uma branch para sua alteração.
2. Faça commits pequenos e descritivos.
3. Garanta lint/build passando.
4. Abra PR com contexto da mudança, motivação e impacto.

---

## Licença

**All Rights Reserved**.

Este repositório, seu código-fonte, design, textos e demais ativos não podem ser copiados, modificados, distribuídos ou reutilizados sem autorização expressa do titular dos direitos.
