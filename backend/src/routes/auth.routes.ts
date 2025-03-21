import { FastifyInstance, FastifyReply } from "fastify";

export default async function AuthRoutes(fastify: FastifyInstance) {

    fastify.get('/validate-token', { onRequest: [fastify.authenticate] }, async (_, reply: FastifyReply) => {
        return reply.status(200).send({ valid: true});
    });

}