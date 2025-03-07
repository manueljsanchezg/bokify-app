import { FastifyReply, FastifyRequest } from "fastify"
import prisma from "../database/db"
import { UserPayload } from "../types/interfaces"


export const checkNoActiveReservations = async (request: FastifyRequest, reply: FastifyReply) => {
    try {

        const { userId } = request.user as Partial<UserPayload>;

        const activeReservation = await prisma.reservation.findFirst({ where: { userId: userId, status: "active" }});

        if(activeReservation) return reply.status(400).send({ message: "You already have an active reservation"});
        
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}