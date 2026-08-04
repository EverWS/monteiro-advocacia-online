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

## Deploy (Cloudflare)

O projeto está preparado para deploy com Cloudflare, com configuração em `wrangler.jsonc` e plugin `@cloudflare/vite-plugin`.

Fluxo recomendado:
1. gerar build (`npm run build`);
2. publicar com o fluxo de deploy adotado pelo time/conta Cloudflare.

> Se necessário, adicione neste README os comandos exatos de deploy usados na sua conta (ex.: `wrangler deploy`), incluindo nome do worker/projeto e variáveis de ambiente.

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

## Fluxo de contato (estado atual)

Atualmente, o formulário da seção de contato:
1. coleta `nome`, `telefone` e `mensagem`;
2. compõe um texto;
3. redireciona o usuário para o WhatsApp via `wa.me` em nova aba.

Não há persistência de lead no backend nesta versão.

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

Sem licença explícita no repositório até o momento.

Se desejar, adicione um arquivo `LICENSE` para definir o modelo de uso/distribuição.
