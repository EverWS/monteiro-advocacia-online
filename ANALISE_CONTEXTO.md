# Análise Contextual do Código — `EverWS/monteiro-advocacia-online`

> **Data da análise:** 2026-08-04  
> **Branch analisada:** `main`  
> **Commit de referência observado nos arquivos:** `ee9e0874760a34bc65bca9a3accaf86c65240180`

## 1) Escopo e método (Engenharia de Contexto)

Esta análise foi construída **com base no código real** do repositório, usando os eixos de Engenharia de Contexto:
- contexto de produto e domínio;
- contexto técnico/arquitetural;
- fluxo de dados e execução;
- riscos concretos (com evidência por arquivo);
- recomendações priorizadas (executivo + técnico).

---

## 2) Estrutura de pastas e organização real

```text
.
├── .lovable/                         # metadados da ferramenta de geração/edição
├── public/
│   └── favicon.png                   # ícone do site
├── src/
│   ├── assets/                       # imagens de marca e conteúdo visual
│   ├── components/
│   │   └── ui/                       # biblioteca de componentes UI (shadcn/radix wrappers)
│   ├── hooks/
│   │   └── use-mobile.tsx            # hook utilitário de viewport mobile
│   ├── lib/
│   │   ├── error-capture.ts          # captura de erro global para SSR
│   │   ├── error-page.ts             # HTML fallback para erro 500
│   │   └── utils.ts                  # helper de classes (cn)
│   ├── routes/
│   │   ├── __root.tsx                # shell raiz, metadados globais, tratamento UI de erro
│   │   └── index.tsx                 # landing page principal (quase toda regra de interface)
│   ├── routeTree.gen.ts              # árvore de rotas gerada
│   ├── router.tsx                    # criação do router + QueryClient
│   ├── server.ts                     # entrypoint SSR/runtime com normalização de erros
│   ├── start.ts                      # middleware server-side de fallback
│   └── styles.css                    # tema/tokens/utilitários Tailwind 4
├── bun.lock
├── components.json
├── eslint.config.js
├── package.json
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc                    # config Cloudflare Workers
```

### Leitura contextual da organização
- Projeto **frontend-first** (landing institucional), com SSR/edge habilitado.
- Arquitetura de rota simples: hoje há rota raiz e `/`.
- `src/components/ui` é uma biblioteca **genérica** de UI, parcialmente não utilizada no fluxo principal atual.
- Não há módulos de domínio separados (`features`, `services`, `api`) para negócio jurídico — o domínio está majoritariamente embutido na página `index.tsx`.

---

## 3) Principais arquivos e papel no sistema

## 3.1 `package.json`
**Evidências-chave**
- runtime: `@tanstack/react-start`, `@tanstack/react-router`, React 19.
- build/dev: `vite` (`dev`, `build`, `preview` scripts).
- implantação edge/cloud: `@cloudflare/vite-plugin` + `wrangler.jsonc`.
- UI stack: Radix + utilitários shadcn + Tailwind 4.

**Implicação de contexto**
- Aplicação preparada para SSR/edge em Cloudflare Worker.
- Base moderna e tipada, com potencial de escalar para mais rotas/features.

## 3.2 `src/routes/index.tsx`
**Evidências-chave**
- concentra quase toda experiência do site (Header, Hero, About, Areas, FAQ, Contact, CTA, Footer).
- constantes externas:
  - `WHATSAPP = "https://wa.me/5517996490035"`
  - `INSTAGRAM = "https://www.instagram.com/adv.mariamonteiro/"`
- formulário de contato gera texto e abre `window.open` para WhatsApp com query string.

**Implicação de contexto**
- O funil principal é **conversão para WhatsApp**, sem backend próprio de lead.
- Grande arquivo monolítico para a home: baixa separação por responsabilidade.

## 3.3 `src/routes/__root.tsx`
**Evidências-chave**
- define metadados globais e links (fontes, favicon, stylesheet).
- `QueryClientProvider` no root context.
- componentes de erro e 404 já implementados para UX base.

**Implicação de contexto**
- Há preocupação com experiência de falha e fallback visual.
- idioma da tag HTML está `lang="en"`, enquanto conteúdo é português.

## 3.4 `src/server.ts` e `src/start.ts`
**Evidências-chave**
- `server.ts` intercepta SSR errors e converte respostas catastróficas para página 500 customizada.
- mecanismo específico para casos onde h3 “engole” throw e retorna JSON genérico de erro.
- `start.ts` adiciona middleware com fallback de erro também em nível de request.

**Implicação de contexto**
- Maturidade acima da média para robustez de erro em SSR.
- Foco explícito em resiliência operacional do render.

## 3.5 `src/lib/error-capture.ts` e `src/lib/error-page.ts`
**Evidências-chave**
- captura out-of-band de `error` e `unhandledrejection` com TTL de 5s.
- página de erro hardcoded em HTML para fallback seguro.

**Implicação de contexto**
- Estratégia deliberada para preservar rastreabilidade de erros, mesmo com abstrações de runtime.

## 3.6 `src/styles.css`
**Evidências-chave**
- Tailwind v4 (`@import "tailwindcss"` + tokens por `@theme inline`).
- design system com variáveis de cor, sombra, tipografia e utilitários de animação.

**Implicação de contexto**
- Design consistente e customizado para marca.
- CSS organizado por tokens facilita governança visual.

---

## 4) Fluxo de dados e execução (as-is)

## 4.1 Fluxo de runtime
1. Entrada de requisição via `src/server.ts`.
2. Carrega `@tanstack/react-start/server-entry` dinamicamente.
3. Executa `fetch` do handler SSR.
4. Normaliza falhas 500 catastróficas em página HTML de erro (`renderErrorPage`).
5. Em sucesso, entrega conteúdo da rota.

## 4.2 Fluxo de UI
1. Router (`src/router.tsx`) instancia `QueryClient` + `routeTree`.
2. Root route (`__root.tsx`) fornece shell HTML e providers.
3. Rota `/` (`index.tsx`) renderiza landing inteira e CTAs.

## 4.3 Fluxo de contato (conversão)
1. Usuário preenche `nome`, `telefone`, `mensagem` no formulário em `Contact`.
2. `submit` monta texto concatenado.
3. Abre URL `https://wa.me/...?...` em nova aba (`window.open`).
4. Conversão e seguimento ocorrem fora da aplicação (WhatsApp).

### Observação de contexto
Não há persistência local de leads, não há API de backend explícita e não há trilha de auditoria de contato no código visível.

---

## 5) Riscos concretos com evidência por arquivo

## R1 — **Monolito de página em `index.tsx` (manutenibilidade e teste)**
**Evidência:** `src/routes/index.tsx` (~500 linhas) concentra múltiplos componentes e regras de interação.  
**Risco:** aumento de acoplamento, revisão difícil, regressões visuais/funcionais e baixa testabilidade por seção.

## R2 — **Ausência de backend de lead/auditoria no fluxo de contato**
**Evidência:** `submit` em `src/routes/index.tsx` apenas abre WhatsApp (`window.open`), sem gravação server-side.  
**Risco:** ausência de métricas confiáveis de conversão, perda de rastreabilidade, sem trilha de consentimento estruturada.

## R3 — **Campos de contato sem validação robusta e sem normalização**
**Evidência:** inputs `nome`, `telefone`, `mensagem` usam `required`, mas sem schema (Zod/RHF) no formulário principal.  
**Risco:** qualidade de dados variável, mensagens malformadas e menor previsibilidade operacional.

## R4 — **Acessibilidade/SEO linguístico inconsistente**
**Evidência:** `src/routes/__root.tsx` usa `<html lang="en">` com conteúdo integral em português.  
**Risco:** prejuízo em SEO semântico, leitores de tela e classificação de idioma.

## R5 — **Informações sensíveis em logs de erro sem política explícita de sanitização**
**Evidência:** uso de `console.error` em `src/server.ts`, `src/start.ts`, `src/routes/__root.tsx`.  
**Risco:** em ambientes reais, logs podem capturar dados de contexto inesperados; falta estratégia de observabilidade estruturada.

## R6 — **Biblioteca UI ampla sem evidência de uso total**
**Evidência:** `src/components/ui` contém grande quantidade de componentes; a landing utiliza majoritariamente markup próprio em `index.tsx`.  
**Risco:** custo de manutenção e bundle potencialmente maior (dependendo de tree-shaking e imports futuros), além de ruído cognitivo no repositório.

## R7 — **Documentação operacional mínima ausente na raiz**
**Evidência:** `README.md` não encontrado na branch atual analisada.  
**Risco:** onboarding mais lento, risco de execução/deploy inconsistente entre colaboradores.

---

## 6) Recomendações com evidência por arquivo

## P0 (crítico/curto prazo)

1. **Corrigir idioma do documento HTML para pt-BR**  
   - **Arquivo:** `src/routes/__root.tsx`  
   - **Ação:** alterar `<html lang="en">` para `lang="pt-BR"`.

2. **Adicionar validação de formulário com schema (`zod`)**  
   - **Arquivo:** `src/routes/index.tsx`  
   - **Ação:** validar telefone (formato), tamanho mínimo de mensagem, limpeza de espaços e caracteres inválidos.

3. **Criar README operacional mínimo**  
   - **Arquivo novo:** `README.md`  
   - **Ação:** instruções de run/build/deploy (Vite + Cloudflare), requisitos de ambiente e fluxo de contato.

## P1 (importante/médio prazo)

4. **Quebrar `index.tsx` em componentes de seção**  
   - **Arquivos alvo:** `src/routes/index.tsx` + novos em `src/components/sections/*`  
   - **Ação:** extrair `Header`, `Hero`, `About`, `Areas`, `FAQ`, `Contact` etc. com props explícitas.

5. **Introduzir camada de configuração de canais externos**  
   - **Arquivos alvo:** `src/routes/index.tsx` + novo `src/config/contact.ts`  
   - **Ação:** remover hardcode de WhatsApp/Instagram para módulo central e variáveis de ambiente quando apropriado.

6. **Instrumentar analytics de conversão (sem PII)**  
   - **Arquivos alvo:** `src/routes/index.tsx`, `src/server.ts` (se necessário)  
   - **Ação:** eventos para clique CTA, submit, abertura de WhatsApp, sem incluir conteúdo da mensagem.

## P2 (evolução/escala)

7. **Estruturar “domínio de atendimento” separado da camada de apresentação**  
   - **Arquivos alvo:** criar `src/features/contact/*`  
   - **Ação:** separar modelagem, validação, serialização da mensagem e tracking de conversão.

8. **Melhorar observabilidade de erro**  
   - **Arquivos:** `src/server.ts`, `src/start.ts`, `src/lib/error-capture.ts`  
   - **Ação:** padronizar logger estruturado (níveis/correlation id), política de redaction, integração com monitoramento.

9. **Revisar e podar componentes UI não utilizados**  
   - **Pasta:** `src/components/ui`  
   - **Ação:** mapear uso real e remover excesso para reduzir superfície de manutenção.

---

## 7) Versão executiva (resumo para decisão)

O repositório entrega uma landing page de advocacia online com stack moderna (TypeScript + TanStack Start + Tailwind), foco claro em conversão para WhatsApp e boa robustez de fallback de erro SSR. O código está funcional e visualmente estruturado, mas possui concentração excessiva de responsabilidades em um único arquivo de rota e ausência de trilha operacional de contato no próprio sistema.

### Prioridades executivas
- **P0:** acessibilidade/SEO básico (`lang`), validação de formulário, README operacional.
- **P1:** modularização da home, centralização de configurações, instrumentação de conversão.
- **P2:** evolução para arquitetura por feature e observabilidade madura.

**Impacto esperado (30 dias):** ganho de manutenção, redução de risco operacional, melhoria de mensuração comercial e base preparada para escalar serviços digitais jurídicos.

---

## 8) Versão técnica (plano objetivo por sprint)

## Sprint 1 (P0)
- Ajustar `lang` em `__root.tsx`.
- Adicionar validação com `zod` no formulário de contato.
- Criar `README.md` com setup e deploy.

## Sprint 2 (P1)
- Refatorar `index.tsx` em componentes por seção.
- Criar `src/config/contact.ts` (números/links externos).
- Inserir eventos de analytics (CTA, submit, redirect WhatsApp).

## Sprint 3 (P2)
- Extrair módulo `features/contact`.
- Implementar logging estruturado com redaction.
- Revisar pasta `src/components/ui` para manter apenas o necessário.

---

## 9) Evidências consultadas (arquivos)

- `package.json`
- `src/routes/index.tsx`
- `src/routes/__root.tsx`
- `src/router.tsx`
- `src/server.ts`
- `src/start.ts`
- `src/lib/error-capture.ts`
- `src/lib/error-page.ts`
- `src/lib/utils.ts`
- `src/styles.css`
- árvore de diretórios de `src/`, `src/components/ui/`, `public/` e raiz

---

## 10) Conclusão

A base técnica é atual e sólida para experiência web institucional com edge runtime, porém o contexto de negócio (captação, qualificação e rastreabilidade) ainda está acoplado à UI e ao WhatsApp sem camada de governança de dados. Com as ações P0/P1/P2 propostas, o repositório evolui de landing funcional para plataforma mais operacional, mensurável e sustentável.
