# Backlog de Execução — `monteiro-advocacia-online`

> **Objetivo:** transformar a análise contextual em plano executável com entregas incrementais.  
> **Base:** `ANALISE_CONTEXTO.md` (commit `191871c76d3f35e6f25202e91ff434e04aefd909`)  
> **Data:** 2026-08-04

---

## Visão de execução

- **P0 (Crítico):** corrigir fundamentos de acessibilidade/SEO, validação e documentação operacional.
- **P1 (Importante):** modularizar a home e melhorar governança/configuração/medição.
- **P2 (Escala):** separar domínio de contato e elevar observabilidade.

---

## Sprint 1 — P0 (Fundamentos)

## Item P0.1 — Corrigir idioma base do documento para pt-BR
**Prioridade:** P0  
**Tipo:** Correção técnica + SEO/A11y  
**Arquivos:**
- `src/routes/__root.tsx`

**Contexto/evidência:** hoje o arquivo usa `<html lang="en">` enquanto o conteúdo é em português.

**Tarefas**
- [ ] Alterar `lang="en"` para `lang="pt-BR"` em `RootShell`.
- [ ] Revisar se há outro ponto global com idioma inconsistente.

**Critérios de aceite**
- [ ] HTML renderizado contém `lang="pt-BR"`.
- [ ] Nenhuma regressão visual/funcional após build local.

**Definição de pronto**
- [ ] PR aprovado.
- [ ] Mudança documentada no changelog/descrição do PR.

---

## Item P0.2 — Validação robusta do formulário de contato
**Prioridade:** P0  
**Tipo:** Qualidade de dados / UX / risco operacional  
**Arquivos:**
- `src/routes/index.tsx`
- (novo) `src/features/contact/schema.ts` *(sugestão)*
- (novo) `src/features/contact/formatters.ts` *(sugestão)*

**Contexto/evidência:** formulário usa apenas `required`; sem schema de validação e sem normalização consistente.

**Tarefas**
- [ ] Criar schema com `zod` para `nome`, `telefone`, `mensagem`.
- [ ] Definir regras mínimas:
  - nome: tamanho mínimo e trimming;
  - telefone: normalização para dígitos e validação básica BR;
  - mensagem: tamanho mínimo/máximo.
- [ ] Exibir feedback de erro amigável no formulário.
- [ ] Manter montagem do texto final do WhatsApp com dados normalizados.

**Critérios de aceite**
- [ ] Submissões inválidas não disparam `window.open`.
- [ ] Mensagens de erro aparecem por campo.
- [ ] Telefone é normalizado antes da composição do link.
- [ ] Fluxo válido continua abrindo WhatsApp corretamente.

**Definição de pronto**
- [ ] Lint sem erros.
- [ ] Casos de teste mínimos (manual documentado ou unitário para schema).

---

## Item P0.3 — README operacional mínimo
**Prioridade:** P0  
**Tipo:** DevEx / onboarding / governança  
**Arquivos:**
- (novo) `README.md`

**Contexto/evidência:** README não encontrado na branch analisada.

**Tarefas**
- [ ] Criar README com:
  - visão geral da aplicação;
  - stack principal;
  - comandos (`dev`, `build`, `preview`, `lint`, `format`);
  - instruções de deploy (Cloudflare/Vite/Wrangler);
  - observações de contato/integrações externas.
- [ ] Incluir seção de contribuição e convenções básicas.

**Critérios de aceite**
- [ ] Novo desenvolvedor consegue rodar local com README apenas.
- [ ] Comandos documentados refletem `package.json`.

**Definição de pronto**
- [ ] README validado por pelo menos 1 pessoa do time.

---

## Sprint 2 — P1 (Modularização e Governança)

## Item P1.1 — Refatorar `index.tsx` em componentes de seção
**Prioridade:** P1  
**Tipo:** Arquitetura / manutenibilidade  
**Arquivos:**
- `src/routes/index.tsx`
- (novos) `src/components/sections/*.tsx`

**Contexto/evidência:** `index.tsx` concentra ~500 linhas e múltiplas responsabilidades.

**Tarefas**
- [ ] Extrair seções para componentes dedicados (`Header`, `Hero`, `About`, `Areas`, `HowItWorks`, `FAQ`, `Contact`, etc.).
- [ ] Criar estrutura de pasta por seção.
- [ ] Manter comportamento idêntico da página.
- [ ] Preservar SEO/meta definidos na rota.

**Critérios de aceite**
- [ ] `index.tsx` reduzido para composição e orquestração.
- [ ] Zero regressão visual nas seções.
- [ ] Imports organizados e sem dependências circulares.

**Definição de pronto**
- [ ] Diff legível e revisável (PR com commits por etapa).

---

## Item P1.2 — Centralizar configuração de canais externos
**Prioridade:** P1  
**Tipo:** Governança de configuração  
**Arquivos:**
- `src/routes/index.tsx`
- (novo) `src/config/contact.ts`

**Contexto/evidência:** links de WhatsApp/Instagram hardcoded na rota.

**Tarefas**
- [ ] Criar módulo de configuração para canais (`WHATSAPP`, `INSTAGRAM`, etc.).
- [ ] Atualizar rota para consumir configuração central.
- [ ] Definir padrão para futura externalização em env vars (quando necessário).

**Critérios de aceite**
- [ ] Nenhum link hardcoded permanece em componentes de seção.
- [ ] Alteração de canal ocorre em único ponto.

**Definição de pronto**
- [ ] Convenção documentada no README.

---

## Item P1.3 — Instrumentação de eventos de conversão (sem PII)
**Prioridade:** P1  
**Tipo:** Produto / Analytics / Compliance  
**Arquivos:**
- `src/routes/index.tsx`
- (novo) `src/lib/analytics.ts` *(ou equivalente)*

**Contexto/evidência:** conversões saem para WhatsApp sem trilha local de eventos.

**Tarefas**
- [ ] Definir eventos mínimos:
  - click CTA principal;
  - submit de formulário válido;
  - redirecionamento para WhatsApp.
- [ ] Garantir política de **não envio de PII** (não logar nome/telefone/mensagem).
- [ ] Implementar camada de tracking desacoplada da UI.

**Critérios de aceite**
- [ ] Eventos disparam nos pontos corretos.
- [ ] Payloads não contêm dados pessoais.
- [ ] Falha no analytics não quebra fluxo de contato.

**Definição de pronto**
- [ ] Eventos listados em documentação técnica.

---

## Sprint 3 — P2 (Escala e Operação)

## Item P2.1 — Estruturar feature de contato
**Prioridade:** P2  
**Tipo:** Arquitetura por domínio  
**Arquivos:**
- (novos) `src/features/contact/*`
- `src/routes/index.tsx` (consumo)

**Tarefas**
- [ ] Criar módulo com:
  - tipos de entrada;
  - schema validação;
  - normalização/serialização de mensagem;
  - funções utilitárias de montagem do link WhatsApp.
- [ ] Reduzir lógica inline de contato na camada de apresentação.

**Critérios de aceite**
- [ ] Camada de domínio isolada e reutilizável.
- [ ] UI de contato fica focada em render/interação.

---

## Item P2.2 — Logging estruturado e redaction
**Prioridade:** P2  
**Tipo:** Operação / Segurança  
**Arquivos:**
- `src/server.ts`
- `src/start.ts`
- `src/lib/error-capture.ts`
- (novo) `src/lib/logger.ts` *(sugestão)*

**Tarefas**
- [ ] Criar interface de logger estruturado (nível, mensagem, contexto).
- [ ] Definir política de redaction para evitar exposição de PII.
- [ ] Substituir `console.error` direto por logger com padrão único.

**Critérios de aceite**
- [ ] Erros mantêm rastreabilidade sem vazar dados sensíveis.
- [ ] Logs consistentes entre SSR, middleware e UI error boundary.

---

## Item P2.3 — Revisão de inventário de componentes UI
**Prioridade:** P2  
**Tipo:** Higiene de código / custo de manutenção  
**Arquivos:**
- `src/components/ui/*`

**Tarefas**
- [ ] Levantar componentes efetivamente usados.
- [ ] Identificar wrappers não utilizados.
- [ ] Remover/arquivar componentes sem uso real.

**Critérios de aceite**
- [ ] Inventário documentado.
- [ ] Sem quebrar imports existentes.

---

## Dependências entre itens

- **P0.2** (validação) pode ocorrer em paralelo com **P0.1** e **P0.3**.
- **P1.1** (refatoração) idealmente após **P0.2** para já extrair com validação correta.
- **P1.3** depende de decisão da ferramenta de analytics.
- **P2.2** pode iniciar no fim da Sprint 2 se houver janela técnica.

---

## Indicadores de sucesso (KPIs de engenharia/produto)

- **Qualidade técnica**
  - redução de tamanho/complexidade de `src/routes/index.tsx`;
  - redução de acoplamento entre UI e lógica de contato.

- **Confiabilidade operacional**
  - erros de contato detectáveis sem PII;
  - consistência de logging em fluxo SSR.

- **Produto/conversão**
  - taxa de clique em CTA;
  - taxa de submit válido;
  - taxa de abertura de WhatsApp após submit.

---

## Riscos de execução e mitigação

1. **Risco:** regressão visual na refatoração de seções.  
   **Mitigação:** PR incremental + checklist visual por seção.

2. **Risco:** validação rígida demais reduzir conversão.  
   **Mitigação:** regras mínimas e mensagens claras.

3. **Risco:** instrumentação de analytics capturar dados indevidos.  
   **Mitigação:** revisão explícita de payload com política de não-PII.

---

## Sugestão de cadência

- **Semana 1:** P0 completo.
- **Semana 2:** P1.1 + P1.2.
- **Semana 3:** P1.3 + início P2.1.
- **Semana 4:** P2.1 + P2.2 + P2.3 (parcial conforme capacidade).

---

## Resultado esperado após execução

Ao final, o repositório deve evoluir de uma landing funcional para uma base mais sustentável: com melhor validação, melhor organização de código, maior observabilidade e maior capacidade de medir e otimizar conversão com segurança.
