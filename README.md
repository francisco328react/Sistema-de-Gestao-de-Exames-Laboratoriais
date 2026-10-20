# Sistema de Gestão de Exames Laboratoriais

Sistema que simula o funcionamento interno de um laboratório médico, com foco em **cadastro**, **consulta**, **laudos** e **agendamento de exames**.

O projeto é dividido em duas aplicações independentes: um **backend** (API) e um **frontend** (interface web).

## Sumário

- [Visão geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Autor](#autor)

## Visão geral

O sistema reproduz o fluxo de trabalho de um laboratório de análises clínicas: o registro de pacientes, a solicitação e o agendamento de exames, a consulta de resultados e a emissão de laudos.

> Este é um projeto de simulação e estudo. Não deve ser usado com dados reais de pacientes sem as devidas adequações de segurança e de conformidade com a LGPD.

## Funcionalidades

<!-- TODO: confirme e ajuste a lista conforme o que está implementado. Sugestão com base na descrição do projeto:
- Cadastro de pacientes
- Cadastro de tipos de exames
- Agendamento de exames
- Consulta de exames e pacientes
- Registro e consulta de laudos
- Autenticação e perfis de acesso (ex.: atendente, profissional do laboratório) -->

## Tecnologias

<!-- TODO: preencha com as tecnologias reais de cada parte. Modelo:

| Camada   | Tecnologia                                    |
| -------- | --------------------------------------------- |
| Frontend | React, TypeScript, Vite, Tailwind CSS         |
| Backend  | Node.js, Express, Prisma                      |
| Banco    | PostgreSQL                                    |
-->

## Estrutura do projeto

```
Sistema-de-Gestao-de-Exames-Laboratoriais/
├── backend/        # API e regras de negócio
└── frontend/       # Interface web
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- npm
- <!-- TODO: banco de dados necessário (ex.: PostgreSQL, MySQL) ou Docker -->

## Instalação e execução

Clone o repositório:

```bash
git clone https://github.com/francisco328react/Sistema-de-Gestao-de-Exames-Laboratoriais.git
cd Sistema-de-Gestao-de-Exames-Laboratoriais
```

### Backend

```bash
cd backend
npm install
# TODO: comando para iniciar a API (ex.: npm run dev)
```

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
# TODO: comando para iniciar a interface (ex.: npm run dev)
```

<!-- TODO: informe as portas usadas pelo backend e pelo frontend (ex.: http://localhost:3333 e http://localhost:5173). -->

## Variáveis de ambiente

<!-- TODO: documente as variáveis de cada aplicação e adicione arquivos .env.example. Exemplo:

backend/.env
```env
DATABASE_URL="..."
JWT_SECRET="..."
PORT=3333
```

frontend/.env
```env
VITE_API_URL=http://localhost:3333
```
-->

> Nunca faça commit de arquivos `.env` com dados reais.

## Roadmap

- [x] Separação em backend e frontend
- [ ] <!-- TODO: próxima funcionalidade (ex.: emissão de laudos em PDF) -->
- [ ] <!-- TODO: documentação da API -->
- [ ] <!-- TODO: testes automatizados -->
- [ ] <!-- TODO: deploy -->

## Contribuindo

Contribuições são bem-vindas.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Faça commit das alterações (`git commit -m "feat: minha feature"`)
4. Envie para o seu fork (`git push origin feature/minha-feature`)
5. Abra um Pull Request

## Licença

<!-- TODO: defina a licença (ex.: MIT) e adicione um arquivo LICENSE. -->

## Autor

**Francisco**, [@francisco328react](https://github.com/francisco328react)
