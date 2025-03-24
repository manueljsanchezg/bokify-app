import { FastifyInstance } from "fastify";
import { createBook, deleteBookById, getAllBooks, getAvailabilityByBookId, getBookById, getCopiesByBookId, updateBookById } from "../controllers/book.controller";
import { checkIsAdmin } from "../middlewares/checkRoles";

export default async function BookRoutes(fastify: FastifyInstance) {
    
    fastify.get('/', { onRequest: [fastify.authenticate] }, getAllBooks);
    fastify.get('/:id', { onRequest: [fastify.authenticate] }, getBookById);
    fastify.get('/:id/copies', { onRequest: [fastify.authenticate] }, getCopiesByBookId);
    fastify.get('/:id/availability', { onRequest: [fastify.authenticate] }, getAvailabilityByBookId);
    fastify.post('/', { onRequest: [fastify.authenticate, checkIsAdmin] }, createBook);
    fastify.put('/:id', { onRequest: [fastify.authenticate, checkIsAdmin] }, updateBookById);
    fastify.delete('/:id', { onRequest: [fastify.authenticate, checkIsAdmin] }, deleteBookById);
    
}