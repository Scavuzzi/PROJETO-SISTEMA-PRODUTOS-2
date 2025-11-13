# Sistema Produtos

**Atividade Full Stack da faculdade**  
API para gerenciar produtos, categorias e usuários, usando **Node.js, TypeScript, Express, Prisma, PostgreSQL e Zod**.  
Inclui validações de dados e documentação via **Swagger**.

---

## Como rodar

1. Clone o projeto:
```bash
git clone https://github.com/Mariocbneto/sistema-produtos.git
cd sistema-produtos
npm install
````

## Configure o banco PostgreSQL no arquivo .env:
```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/clinica_db"
````
## Crie e sincronize o banco com Prisma:
```bash
npx prisma migrate dev --name init
````
## Inicie o servidor:
```bash
npm run dev

http://localhost:3000
http://localhost:3000/api-docs
````

## Deletar Todos os Arquivos
```bash
npx prisma migrate reset --force
````
