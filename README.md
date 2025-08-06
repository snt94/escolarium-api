# Escolarium-Api

> Backend robusto e escalável construído com NestJS, Prisma ORM e focado em segurança, qualidade e produtividade.

---

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construir aplicações escaláveis e manuteníveis.
- **Prisma**: ORM para Node.js e TypeScript, com foco em produtividade e segurança de tipos.
- **PostgreSQL**: Banco de dados relacional, rodando via container Docker para desenvolvimento.
- **Docker & Docker Compose**: Para ambiente isolado e consistente.
- **Jest**: Framework de testes para JavaScript/TypeScript.
- **Swagger**: Documentação interativa da API.

---

## Pré-requisitos

- Node.js v18 ou superior
- Docker e Docker Compose instalados
- npm (ou yarn) instalado

---

## Instalação e Configuração

```bash
# Clone o repositório
git clone <> backend
cd backend

# Instale as dependências
npm install

# Suba o banco de dados PostgreSQL via Docker Compose
npm run db:dev:up

# Execute as migrações do Prisma
npm run prisma:dev:deploy
```

---

## Scripts disponíveis

| Comando                     | Descrição                                                 |
| --------------------------- | --------------------------------------------------------- |
| `npm run start`             | Inicia a aplicação em modo produção                       |
| `npm run start:dev`         | Inicia a aplicação em modo desenvolvimento com hot-reload |
| `npm run start:debug`       | Inicia em modo debug com hot-reload                       |
| `npm run build`             | Compila o código TypeScript                               |
| `npm run lint`              | Verifica e corrige problemas de lint                      |
| `npm run format`            | Formata o código com Prettier                             |
| `npm run test`              | Executa os testes unitários                               |
| `npm run test:watch`        | Executa os testes em modo watch                           |
| `npm run test:cov`          | Executa os testes e gera relatório de cobertura           |
| `npm run test:e2e`          | Executa os testes end-to-end                              |
| `npm run db:dev:up`         | Sobe o container Docker com o banco PostgreSQL            |
| `npm run db:dev:rm`         | Remove o container Docker do banco                        |
| `npm run db:dev:restart`    | Remove e sobe o container e aplica migrações              |
| `npm run prisma:dev:deploy` | Aplica as migrações do banco via Prisma                   |

---

## Estrutura do Projeto

```bash
src/
├── main.ts                 # Ponto de entrada da aplicação
├── app.module.ts           # Módulo raiz da aplicação
├── modules/                # Módulos organizados por domínio
│   ├── auth/               # Autenticação e autorização
│   ├── users/              # Gestão de usuários
│   └── ...                 # Outros módulos específicos
├── prisma/                 # Cliente Prisma e migrações
test/                       # Testes end-to-end
```

## Testes

- Testes unitários e integração com Jest.
- Comandos:

```bash
npm run test          # roda todos os testes
npm run test:watch    # roda testes em modo watch
npm run test:cov      # gera relatório de cobertura
npm run test:e2e      # testes end-to-end
```

## Banco de dados

- Utilizamos PostgreSQL em container Docker para ambiente de desenvolvimento, gerenciado via Docker Compose.

Para subir o banco:

```bash
npm run db:dev:up
```

Para remover o container:

```bash
npm run db:dev:rm
```

Para reiniciar o banco e aplicar migrações:

```bash
npm run db:dev:restart
```

Migrações gerenciadas pelo Prisma:

```bash
npm run prisma:dev:deploy
```

---

## Documentação da API

A API está documentada via Swagger e pode ser acessada em:

```bash
http://localhost:3000/api
```
Lá você poderá:

- Visualizar os endpoints disponíveis
- Testar requisições interativamente
- Consultar modelos de dados e respostas

---

## Como contribuir

1. Faça um fork deste repositório

2. Crie uma branch com sua feature: git checkout -b feature/nome-da-feature

3. Faça commit das suas alterações: git commit -m "Descrição da feature"

4. Envie para o repositório remoto: git push origin feature/nome-da-feature

5. Abra um Pull Request

---

## Licença

- Este projeto está sob licença UNLICENSED — consulte o proprietário para permissões.

--- 

## Contato

Para dúvidas ou sugestões, entre em contato comigo.

--- 

## Obrigado por utilizar o Escolarium!