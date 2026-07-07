# API de Usuários

Esta API permite criar usuários, listar usuários, buscar por ID, adicionar crédito ao saldo e gastar saldo com passagem.

## Rodar a API

```bash
npm start
```

A API ficará disponível em:

```text
http://localhost:3001
```

## Rotas

### 1) Criar usuário
- Método: POST
- URL: http://localhost:3001/usuarios

Body (JSON):
```json
{
  "nome": "Ana",
  "email": "ana@email.com",
  "senha": "123456",
  "idade": 20
}
```

Resposta esperada: status 201 com os dados do usuário criado.

### 2) Listar usuários
- Método: GET
- URL: http://localhost:3001/usuarios

Resposta esperada: status 200 com a lista de usuários.

### 3) Buscar usuário por ID
- Método: GET
- URL: http://localhost:3001/usuarios/1

Resposta esperada: status 200 com os dados do usuário com id 1.

### 4) Adicionar crédito ao saldo
- Método: POST
- URL: http://localhost:3001/usuarios/1/creditar

Body (JSON):
```json
{
  "valor": 10
}
```

Resposta esperada: status 200 com o saldo atualizado.

### 5) Gastar saldo com passagem
- Método: POST
- URL: http://localhost:3001/usuarios/1/gastar-passagem

Body (JSON):
```json
{
  "valor": 3.5
}
```

Resposta esperada: status 200 com o saldo atualizado após o gasto.

## Observações
- Use o header `Content-Type: application/json` nas rotas POST.
- Se o saldo for menor que o valor da passagem, a API retorna erro 400.
- Se o usuário não existir, a API retorna erro 404.
