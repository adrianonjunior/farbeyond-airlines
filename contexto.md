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

- Repositório Git local na branch `main`. Primeiro commit: `d92cb40 chore: establish workspace and demo data contracts`.
- `gh auth status` confirmou conta ativa `adrianonjunior` com escopos `repo` e `workflow`.
- Node v24.19.0, npm 11.17.0, gh 2.97.0.
- Skills `impeccable`, `imagegen` e `find-docs` aplicadas. Context7 consultado para a orientação atual do React sobre Effects.
- Monorepo, API, dados seed, frontend responsivo, globo interativo, checkout, gráficos, documentação, CI e templates estão implementados.
- Print real da landing, exploração, resultados, detalhes e checkout, inclusive mobile, salvo em `apps/web/public/screenshots/`.
- Smoke test de fluxo completo, API, PT/EN, BRL/USD e largura de 390 px passou. Lint, typecheck e build passaram antes dos últimos ajustes; precisam de execução final.
- Checks `lint`, `format:check`, `typecheck`, `build` e `test:smoke` passaram. CI `Quality` no GitHub concluiu com sucesso no commit `3326d84`.
- Repositório público criado e enviado: `https://github.com/adrianonjunior/farbeyond-airlines`.
- Prints principais foram recapturados após os ajustes visuais e estão no commit `52870e3`.
- Política de proteção desejada para `main` está em `docs/branch-protection.json`; confirmar seu estado remoto com `gh api repos/adrianonjunior/farbeyond-airlines/branches/main/protection`.
- Próximo passo: publicar esta documentação, aplicar a política de proteção e verificar o estado remoto final.

## Decisões de implementação

- Os preços, horários, métricas e clima precisam estar explicitamente marcados como demonstração.
- Checkout pode recolher dados no estado local do navegador, mas não enviar dados de cartão à API nem persistir dados pessoais.
- Branch protection depende da disponibilidade do GitHub para a conta/repositório e deve ser verificada após publicação.

## Comandos de validação previstos

`npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run build`.
