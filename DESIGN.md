---
name: FarBeyond Airlines
description: Atlas de rotas para uma experiência de viagem demonstrativa.
colors:
  navy-structure: '#071e39'
  navy-ink: '#102c49'
  blue-action: '#1467a4'
  sky-information: '#e7f3fb'
  white: '#ffffff'
  soft-surface: '#f5f8fb'
  gold-emphasis: '#c89943'
  line: '#dbe5ec'
typography:
  display:
    fontFamily: 'Manrope, sans-serif'
    fontSize: 'clamp(42px, 5.2vw, 70px)'
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: '-0.036em'
  body:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.7
rounded:
  square: '0px'
spacing:
  tight: '8px'
  control: '16px'
  section: '24px'
components:
  button-primary:
    backgroundColor: '{colors.gold-emphasis}'
    textColor: '{colors.navy-structure}'
    rounded: '{rounded.square}'
    padding: '12px 19px'
  button-secondary:
    backgroundColor: '{colors.navy-structure}'
    textColor: '{colors.white}'
    rounded: '{rounded.square}'
    padding: '12px 19px'
---

# Design System: FarBeyond Airlines

## Overview

**Creative North Star: "Atlas de rotas"**

A clareza de um itinerário encontra a amplitude de uma vista aérea. A landing usa fotografia exposta com nitidez e espaço para a mensagem; busca, exploração e checkout usam superfícies brancas, percursos desenhados e números legíveis. Dados sintéticos são assinalados em cada contexto.

**Key Characteristics:** fotografia editorial luminosa, navegação navy, rotas em azul, dourado limitado a ações e trajetos destacados, cantos retos e hierarquia direta.

## Colors

O navy dá estrutura, o azul conduz rotas e estados informativos, e o dourado marca pontos de decisão.

### Primary

- **Navy estrutural:** navegação invertida, rodapé, globo e botões secundários.
- **Azul de ação:** links, seleção e linhas de gráficos.

### Secondary

- **Azul céu informativo:** avisos e superfícies de informação.
- **Dourado de ênfase:** busca, confirmação simulada, rota ativa e métricas pontuais.

### Neutral

- **Branco:** base das páginas e campos.
- **Superfície suave:** filtros e separação de etapas.
- **Navy de texto:** títulos e valores.
- **Linha:** contornos discretos de formulários e itinerários.

**The Gold Decision Rule.** Use dourado onde a pessoa escolhe ou acompanha a rota selecionada; nunca como fundo geral.

## Typography

**Display Font:** Manrope (fallback sans-serif). **Body Font:** DM Sans (fallback sans-serif).

Manrope concentra a personalidade em títulos e preços; DM Sans mantém controles, detalhes e explicações legíveis. Horários, códigos de aeroporto e tarifas têm destaque consistente.

## Layout

O conteúdo principal ocupa no máximo 1200 px com margem lateral de 24 px no desktop. Busca e itinerários crescem na horizontal; abaixo de 760 px, painéis se empilham; abaixo de 520 px, a busca vira duas colunas e os destinos ficam em uma coluna. O checkout move o resumo acima do formulário em mobile. Em 390 px não há rolagem horizontal.

## Elevation & Depth

Superfícies de tarefa são planas e diferenciadas por tom ou borda. A busca sobre a fotografia usa sombra suave com deslocamento vertical (`0 17px 45px rgba(7,30,57,.14)`). Linhas de voo recebem elevação sutil em hover.

## Shapes

Controles e painéis usam cantos retos. O globo e a marca concentram a geometria circular. O trajeto usa linha pontilhada dourada e marcadores redondos.

## Components

### Buttons

Botão primário dourado com texto navy; secundário navy com texto branco. Ambos têm ação verbal explícita, altura mínima de 48 px, foco azul e elevação de 2 px em hover.

### Inputs / Fields

Campos brancos com borda fina, rótulo visível e foco azul. Campos de cartão são somente leitura e têm fundo frio para comunicar o estado demonstrativo.

### Navigation

Barra branca, logo navy e guia ativa com sublinhado dourado. Em mobile, os três destinos de navegação passam a uma segunda linha sem esconder páginas.

### Globe

O globo ortográfico navy apresenta países em azul claro, rota ativa dourada e filiais brancas. A lista textual oferece acesso completo por teclado.

## Do's and Don'ts

### Do:

- **Do** marcar preços, clima e gráficos como demonstração.
- **Do** usar dourado nas ações prioritárias e no caminho selecionado.
- **Do** preservar leitura e controles em 390 px.

### Don't:

- **Don't** misturar conteúdo comercial real com dados fictícios.
- **Don't** usar texto em gradiente ou brilho excessivo.
- **Don't** depender do gesto de arrastar para acessar filiais.
