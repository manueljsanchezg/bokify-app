import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../database/db";


const copyRepository = prisma.copy;

export const getAllCopies = async (request: FastifyRequest, reply: FastifyReply) => {
    try {

        const { available } = request.query as { available?: string };

        console.log(available);

        const isAvailable = available === "true";

        const copies =  await copyRepository.findMany({where: { isAvailable: isAvailable }, include: { book: true }})

        return reply.send(copies);
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}
