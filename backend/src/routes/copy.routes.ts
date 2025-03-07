import { FastifyInstance } from "fastify";
import { checkIsAdmin } from "../middlewares/checkRoles";
import { getAllCopies } from "../controllers/copy.controller";

export default async function CopyRoutes(fastify: FastifyInstance) {
    
    fastify.get('/', { onRequest: [fastify.authenticate] }, getAllCopies);
}