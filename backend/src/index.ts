import app from "./app";
import dotenv from "dotenv"
import prisma from "./database/db";

dotenv.config()

const PORT = Number(process.env.PORT ?? 4000)

const start = async () => {
    try {
        await prisma.$connect();
        console.log("Prisma running")
        app.listen({ port: PORT })
        console.log(`Server running on PORT ${PORT}`)
    } catch (error) {
       console.error(error) 
       process.exit(1)
    } finally {
        await prisma.$disconnect();
    }
}

start()