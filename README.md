# shooper-api-test

A aplicação consiste em uma REST API integrada com API Gemini para realizar leituras do conteúdo de imagens.

## Tecnologias usadas

- Nodejs
- TypeScript
- API Gemini 
- Express
- Joi
- Jest
- MongoDB
- Mongoose
- Docker

## Features

POST /api/upload - Responsável por receber uma imagem em base 64, consultar o Gemini e retornar a
medida lida pela API.

**Exemplo de request**
```bash
{
 "image": "MWVhYWEyMjlhNmE0ZTAxNzdlMDlkOWI0ZjdlMDJlNmNkN2MwNTM0ZjExZmI4MzE5YWZhZTFlMmFiYTdjN2YxZA==",
 "customer_code": "5455",
 "measure_datetime": "2024-10-30T02:40:30.750+00:00",
 "measure_type": "water"
}
```
PATCH /api/confirm - Responsável por confirmar ou corrigir o valor lido pelo LLM.

**Exemplo de request**
```bash
{
 "measure_uuid": "d4w3lgzvf6fk",
 "confirmed_value": 2288882
}
```

GET /api/**customer-code**/list - Responsável por listar as medidas realizadas por um determinado cliente.

**Exemplo de request**
```bash
{
 "measure_value": 62237
}
```

GET /api/test-all - Resposável por listar todas medidas cadastradas no banco.

 - Criado para um melhor aproveitamento de testes das outras rotas.

## Getting Started

- É necessário ter em sua máquina instalado a ferramenta **Docker**

### Instalação

1. Clonar o repositório:

```bash
git clone https://github.com/Ryanluc7reis/shooper-api-test.git
cd shooper-api-test
```

2. Instalar depêndencias

```bash
npm install or similar
```

3. Iniciar aplicação

```bash
docker-compose up or docker-compose up -d
```

---

**Autor:** [Ryan Lucas Ferreira Reis] 

**Linkedin:** [https://www.linkedin.com/in/ryanluc7reis/]

**Email:** [ryanluc.dev18@gmail.com]  

