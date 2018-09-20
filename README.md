# poc-typescript-express-api
POC using typescrip and express.

# Módulos 

## API
* Controle de vendas    | porta: 3000
* Fornecedor            | porta: 4000
* RelatórioS            | porta: 4001
* SAC                   | porta: 4002
## WEB
* Controle de vendas    | porta: 4200
* Fornecedor            | porta: 4300

# Serviços API

## Controle de vendas:
* GET  http://localhost:3000/api/
* POST http://localhost:3000/api/cliente/cadastro
* POST http://localhost:3000/api/cliente/login
* GET  http://localhost:3000/api/produtos/listar
* POST http://localhost:3000/api/pedido/incluir
* POST http://localhost:3000/api/pedido/remover
* POST http://localhost:3000/api/pedido/cancelar
* POST http://localhost:3000/api/pedido/finalizar

## Fornecedor
* GET  http://localhost:4000/api/
* GET  http://localhost:4000/api/produtos/listar
* POST http://localhost:4000/api/pedido/venda-externa
* POST http://localhost:4000/api/pedido/atualizar-status
* POST http://localhost:4000/api/pedido/consultar

## Relatório
* GET  http://localhost:4001/api/
* POST http://localhost:4001/api/relatorio/vendas
* POST http://localhost:4001/api/relatorio/maisvendidos
* POST http://localhost:4001/api/relatorio/custos

## SAC
* GET  http://localhost:4002/api/
* POST http://localhost:4002/api/chamado/registrar
* GET  http://localhost:4002/api/chamado/listar
* POST http://localhost:4002/api/chamado/andamento
* POST http://localhost:4002/api/chamado/atualizar
