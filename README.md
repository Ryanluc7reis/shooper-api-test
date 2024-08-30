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

POST /upload - Responsável por receber uma imagem em base 64, consultar o Gemini e retornar a
medida lida pela API.

PATCH /confirm - Responsável por confirmar ou corrigir o valor lido pelo LLM.

GET /**customer-code**/list - Responsável por listar as medidas realizadas por um determinado cliente.

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
**Email:** [ryanluc.dev18@gmail.com]  
**Data:** [30/08/2024]
