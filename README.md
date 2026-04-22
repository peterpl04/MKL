# Vitrine Digital - Deploy no Railway

Este projeto esta separado em dois apps:

- backend: API Node.js + Express + Prisma
- frontend: React + Vite

## 1. Publicar backend no Railway

1. Suba este projeto para o GitHub.
2. No Railway, clique em New Project > Deploy from GitHub Repo.
3. Selecione o repositorio.
4. Crie um service para o backend com Root Directory = backend.
5. Configure as variaveis de ambiente no service backend:
   - NODE_ENV=production
   - PORT=${{PORT}}
   - DATABASE_URL=<URL do Postgres>
   - JWT_SECRET=<segredo forte>
   - JWT_EXPIRES_IN=7d
   - API_BASE_URL=<URL publica do backend no Railway>
6. Em Settings > Build Command: npm run build
7. Em Settings > Start Command: npm run start
8. Rode migracoes no Railway shell (ou job): npm run prisma:migrate:deploy
9. Teste: GET <URL_BACKEND>/api/health deve retornar {"status":"ok"}.

## 2. Banco PostgreSQL

Opcao A (mais rapido): adicionar plugin Postgres no proprio Railway.

Opcao B: usar banco externo (Neon/Supabase) e colar DATABASE_URL no backend.

## 3. Publicar frontend no Railway

1. No mesmo projeto Railway, crie outro service para frontend.
2. Root Directory = frontend.
3. Variaveis de ambiente do frontend:
   - VITE_API_URL=<URL_BACKEND>/api
   - VITE_PUBLIC_APP_URL=<URL_FRONTEND>
4. Build Command: npm run build
5. Start Command: npm run start

## 4. Compartilhar com seu amigo

- Envie apenas a URL do frontend.
- O frontend fara chamadas para a API publica do backend.

## 5. Observacoes importantes

- Upload local em Railway e efemero. Se o service reiniciar, arquivos podem sumir.
- Para producao real, use armazenamento externo (S3/Cloudinary).
- Sempre que mudar schema Prisma, execute npm run prisma:migrate:deploy no backend.
