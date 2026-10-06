# Contribuindo com FarBeyond Airlines

Este projeto é uma experiência fictícia. Mantenha dados, textos e confirmações claramente identificados como demonstração. Não adicione pagamento real, dados pessoais persistidos ou integração externa sem uma decisão explícita de produto.

## Fluxo local

1. Instale Node.js 24 e execute `npm ci`.
2. Inicie frontend e API com `npm run dev`.
3. Antes de enviar uma alteração, execute `npm run lint`, `npm run format:check`, `npm run typecheck` e `npm run build`.
4. Para mudanças visuais, confira desktop e 390 px; atualize prints no README quando a aparência das páginas documentadas mudar.

Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:` e `refactor:`. Abra um pull request contra `main` com objetivo, impacto e verificação. Prefira alterações pequenas e relacionadas.

Os dados seed e os contratos ficam em `packages/shared`. A interface `WeatherProvider` está em `apps/api/src/weather.ts`. Novas integrações devem preservar um modo local sem credenciais na primeira versão.
