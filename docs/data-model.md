# Modelo de dados inicial

## Branch

`code`, cidade, país, continente, região climática, latitude, longitude, fuso e indicador de operação sazonal. Uma filial por continente, total de sete.

## Route

`id`, origem e destino como códigos de filial, duração em minutos, escalas, horários locais ilustrativos, preço base em BRL e aeronave ilustrativa. São doze rotas direcionais. Pesquisa no sentido inverso só retorna resultado quando existir uma rota seed nessa direção.

## Weather

Região, temperatura, condição, vento, visibilidade, alerta opcional, `updatedAt` e `synthetic: true`. `MockWeatherProvider` cria o horário da atualização em cada resposta. `404` indica região sem dados; erro de provedor produz `503`.

## Quote

Rota, passageiros (1–8), assento padrão/extra, bagagem, moeda, tarifa, taxas (12%), opcionais e total. Câmbio demonstrativo: R$ 5,20 por US$ 1. Arredondamento é feito por componente, então o total é a soma dos componentes já convertidos.
