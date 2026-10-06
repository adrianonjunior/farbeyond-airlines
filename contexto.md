# Contexto de continuidade — FarBeyond Airlines

Atualizado em: 2026-10-06

## Objetivo confirmado

Implementar a primeira versão navegável do site fictício FarBeyond Airlines em `C:\Users\adria\Documents\site_aeroporto`, criar repositório GitHub `adrianonjunior/farbeyond-airlines`, manter commits Conventional Commits e documentar execução e limites.

## Escopo fechado pelo usuário

- Landing, exploração em globo, resultados/detalhes e checkout completo simulado.
- 7 filiais (uma por continente) e exatamente 12 rotas fictícias.
- Busca por origem, destino, data e passageiros; PT/EN e BRL/USD.
- Clima sintético resumido; 3 gráficos de preço, distribuição de gastos e comparação entre aeroportos.
- Sem login, conta, painel administrativo, cobrança real ou histórico persistente.
- Branco, azul-marinho, azul claro e dourado moderado; logo vetorial planeta + avião branco.
- Monorepo npm workspaces: React/Vite/TypeScript, Express e pacote compartilhado.
- Checks lint, format:check, typecheck e build; CI; README com prints reais desktop/mobile.

## Estado atual

- Repositório público: `https://github.com/adrianonjunior/farbeyond-airlines`; branch padrão `main`.
- Histórico inicial organizado em Conventional Commits (`d92cb40`, `52870e3`, `3326d84`, `a40e5f1`).
- Monorepo, API, dados seed, frontend responsivo, globo interativo, checkout, gráficos, documentação, CI e templates implementados.
- Prints reais da landing, exploração, resultados, detalhes e checkout, inclusive mobile, em `apps/web/public/screenshots/`. Hero gerado com `imagegen`; logo e favicon são SVG.
- Checks locais `lint`, `format:check`, `typecheck`, `build` e `test:smoke` passaram. O smoke test percorre API, busca, compra simulada, globo, PT/EN, BRL/USD e 390 px.
- CI remoto `Quality` passou no commit `a40e5f1`, incluindo `npm ci`, lint, formato, tipos e build.
- Proteção de `main` aplicada e confirmada pela API: PR, status `checks`, histórico linear, sem force push nem exclusão. A política reproduzível está em `docs/branch-protection.json`.
- A revisão visual de desktop e mobile não encontrou bloqueios. O detector da skill `impeccable` retornou `[]` para App e CSS.

## Decisões de implementação

- Os preços, horários, métricas e clima precisam estar explicitamente marcados como demonstração.
- Checkout pode recolher dados no estado local do navegador, mas não enviar dados de cartão à API nem persistir dados pessoais.
- Alterações futuras em `main` devem passar por pull request e pelo CI obrigatório.

## Comandos de validação

`npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run build`, `npm run test:smoke` (com `npm run dev` e Chrome).
