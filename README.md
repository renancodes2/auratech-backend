# AuraTech - Backend

⚠️ **Projeto em desenvolvimento inicial** [inicio do frontend](https://auratech-frontend.vercel.app)

![Aura Prism Tower](https://res.cloudinary.com/di1of4dwo/image/upload/v1766442074/jc8b3qxrc1tte5vzb7rd.jpg)

## Sobre

Backend da aplicação AuraTech desenvolvido com **NestJS** e **Prisma ORM**.

## O que já temos

### Autenticação
- Serviço de autenticação com hash de senha
- Guarda de rotas protegidas
- DTO para login e registro

### Gerenciamento de Usuários
- Controller e serviço para usuários
- DTOs para criação e atualização

### Produtos
- Controller, serviço e DTO para produtos
- Suporte a múltiplas imagens por produto
- Integração com Cloudinary para upload de imagens

### Categorias
- Controller, serviço e DTO para categorias de produtos

### Banco de Dados
- PostgreSQL com Prisma ORM
- Migrations configuradas
- Schema com tabelas de usuários, produtos, categorias e imagens

### Infraestrutura
- Docker e docker-compose para containerização
- CI/CD no **Render** com testes e build automatizados
- ESLint configurado
- TypeScript stricto

## Deployment

🚀 Hospedado em **Render** com CI/CD automático
