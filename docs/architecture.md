# Arquitetura

```text
apps/web  ── usa ──> packages/shared <── usa ── apps/api
   │                                     │
   └──── HTTP /api (clima e cotação) ────┘
```

- `apps/web`: React com Vite, React Router, globo ortográfico em SVG via D3 Geo e gráficos SVG/CSS. Rotas e filiais seed são importadas do pacote compartilhado para renderização imediata; clima e confirmação de cotação consultam a API local.
- `apps/api`: Express com endpoints de filiais, rotas, estimativa, clima, métricas e cotação. A entrada de cotação recebe apenas ID de rota, número de passageiros e opcionais; o formulário não envia nome, contato ou dados de cartão.
- `packages/shared`: contratos TypeScript, sete filiais, doze rotas, câmbio fixo de demonstração e cálculo puro de cotação.
- `packages/config`: base TypeScript, ESLint e Prettier.

O frontend usa proxy Vite para `http://127.0.0.1:3001`. `npm run dev` inicia ambos. Os endpoints também podem ser consultados diretamente na porta 3001. Sem API, as páginas de catálogo abrem com os dados seed, mas clima e confirmação do checkout exibem estado de erro.

## Dados e privacidade

Preços, horários, clima, tendência e métricas são sintéticos. O câmbio BRL/USD é fixo e ilustrativo. O navegador guarda idioma, moeda e formulário apenas no estado da sessão de página; não há conta, banco de dados, cookies de autenticação ou pagamento real.

## Evolução prevista

`WeatherProvider` pode ser substituído por integração real. Antes de processamento de pagamentos ou emissão de bilhetes, será necessário redesenhar contratos, segurança, privacidade e limites legais do produto.
