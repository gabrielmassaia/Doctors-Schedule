# DoctorSchedule

Sistema de agendamento médico desenvolvido com Next.js 14, TypeScript e PostgreSQL.

## Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 15 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/)

## Configuração do Ambiente

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
cd doctorschedule
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Copie o conteúdo do arquivo `.env.example` para o `.env`
   - Preencha as variáveis com suas configurações:

```env
# Database
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/doctorschedule"

# Auth
AUTH_SECRET="seu_secret_aqui"
```

4. Execute as migrações do banco de dados:

```bash
npm run db:migrate
# ou
yarn db:migrate
# ou
pnpm db:migrate
```

## Executando o Projeto

1. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

2. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

```
src/
  ├── app/                    # Rotas e páginas da aplicação
  │   ├── api/               # Endpoints da API
  │   ├── authentication/    # Componentes de autenticação
  │   └── dashboard/        # Área logada do sistema
  ├── components/           # Componentes reutilizáveis
  ├── lib/                  # Configurações e utilitários
  └── db/                   # Configurações do banco de dados
```

## Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados
- [Drizzle ORM](https://orm.drizzle.team/) - ORM para TypeScript
- [Better Auth](https://better-auth.com/) - Sistema de autenticação
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [React Hook Form](https://react-hook-form.com/) - Gerenciamento de formulários
- [Zod](https://zod.dev/) - Validação de schemas

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run db:migrate` - Executa as migrações do banco de dados
- `npm run db:studio` - Abre o Drizzle Studio para gerenciar o banco de dados

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
