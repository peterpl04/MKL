import { app } from "app.js";
import { env } from "config/env.js";
import { prisma } from "config/prisma.js";

const RETRY_DELAY_MS = 5000;

async function connectWithRetry() {
  while (true) {
    try {
      await prisma.$connect();
      return;
    } catch (error) {
      console.error("Falha ao conectar no banco. Tentando novamente em 5 segundos...", error);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}

async function bootstrap() {
  try {
    await connectWithRetry();
    app.listen(env.PORT, () => {
      console.log(`Servidor backend rodando na porta ${env.PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor", error);
    process.exit(1);
  }
}

process.on("uncaughtException", (error) => {
  console.error("Erro não tratado. Reiniciando aplicação...", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Promise rejeitada sem tratamento. Reiniciando aplicação...", reason);
  process.exit(1);
});

bootstrap();
