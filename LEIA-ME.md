# Libras com Cristo — página com checkouts e pixel configurados

Abra `dist/index.html` ou sirva a pasta `dist` com um servidor HTTP. Site estático, sem instalação ou build.

## Conectar compra e rastreamento

Os dados enviados pelo proprietário estão em `dist/config.js`:

- Pixel Meta: `1959553121381250`.
- Básico R$10: https://pay.wiapy.com/6ac5af3a3f18161e1e5be93a
- Completo R$27,90: https://pay.wiapy.com/6ac5b008c7ae865f6ec55c37

O código envia `PageView` e `ViewContent` na abertura, e `InitiateCheckout` no clique de um botão de compra, com o valor correspondente ao plano. UTMs e fbclid são preservados no encaminhamento. O evento `Purchase` depende da integração da plataforma de checkout; não é enviado apenas por abrir a página. Há também `noscript` para PageView. Ao trocar o pixel posteriormente, atualize `config.js` e a imagem `noscript` em `index.html`.

## O que foi preparado

Estrutura baseada na referência https://librascomcristo.espacocentral.com/: hero, vitrine, problemas, benefícios, conteúdo, faixa escura, exemplos, extras, comparação, planos, apresentação, FAQ e garantia. Paleta branca, dourada e azul-marinho; layout responsivo. Textos próprios. Valores de modelo: R$10 e R$27,90; garantia de 7 dias.

As imagens de produtos foram exportadas da página pública e servem como referência nesta prévia. Antes de publicar a oferta, substitua por imagens do material que você entrega ou use somente aquelas que pode utilizar. Arquivos de origem estão registrados em `referencias-imagens.json`.

As duas miniaturas dos planos são mockups ilustrativos originais, gerados com a ferramenta integrada de imagens: plano básico de 100 cards e kit completo de mais de 300 cards com bônus. Elas não são fotografias do conteúdo entregue nem material didático para aprender sinais em Libras.

Não foram copiados os depoimentos, a identidade da educadora, números de compradores, notificações de vendas, alegação de alinhamento à BNCC ou cronômetro de urgência do concorrente. Não há prova fornecida para atribuir esses elementos a esta nova oferta.

Pixel e checkouts já estão configurados. O conteúdo digital de entrega e sua liberação após a compra dependem da configuração na plataforma de pagamento. A página ainda não está publicada em produção.

## Vercel

Use a pasta `dist` como raiz da publicação estática, sem comando de build. Para subir no Git, você pode enviar o conteúdo de `dist` à raiz do repositório.
