import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { deleteUserById, getUsers, loginUser, registerUser } from "../controllers/user.controller";
import { checkIsAdmin } from "../middlewares/checkRoles";
import { authorizedSchema, loginSchema } from "../schemas/schemas";


export default async function UserRoutes(fastify: FastifyInstance) {
    fastify.get('/check', async (request: FastifyRequest, reply: FastifyReply) => {
        return reply.send("Hola")
    })

    fastify.get('/', getUsers);
    
    fastify.post('/register', { schema: loginSchema},  registerUser);

    fastify.post('/login', { schema: loginSchema }, loginUser);

    fastify.delete('/:id', { onRequest: [fastify.authenticate, checkIsAdmin] }, deleteUserById);

    fastify.get('/prueba', async (request, reply) => {
        while (true) {
            console.log("Hola")
        }
    });

    fastify.get('/prueba2', async (request, reply) => {
        reply.send("Adios")
    });
}