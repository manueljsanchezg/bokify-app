import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import process from "node:process";
import app from "./app";
import dotenv from "dotenv";
import prisma from "./database/db";

dotenv.config();

const PORT = Number(process.env.PORT ?? 4000);
const numWorkers = Math.min(4, availableParallelism());

if (cluster.isPrimary) {
  console.log(`Primary process running on ${process.pid}`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const start = async () => {
    try {
      await prisma.$connect();
      console.log(`Prisma running in worker ${process.pid}`);
      app.listen({ port: PORT});
      console.log(`Server running on PORT ${PORT} and process ${process.pid}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

  process.on("SIGTERM", async () => {
    console.log("Closing Prisma connection...");
    await prisma.$disconnect();
    process.exit(0);
  });

  start();
}