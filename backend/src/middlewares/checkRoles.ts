import { FastifyReply, FastifyRequest } from "fastify";
import { UserPayload } from "../types/interfaces";

export const checkIsAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { role } = request.user as Partial<UserPayload>;
        if(role !== "admin") return reply.status(401).send({ message: "Not enough privileges" });
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}

export const checkIsUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { role } = request.user as Partial<UserPayload>;
        if(role !== "user") return reply.status(401).send({ message: "Not enough privileges" });
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}