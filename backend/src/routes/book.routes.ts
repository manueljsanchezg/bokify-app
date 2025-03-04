import { FastifyInstance } from "fastify";
import { createBook, deleteBookById, getAllBooks, getBookById, updateBookById } from "../controllers/book.controller";
import { adminCheck } from "../middlewares/adminCheck";

export default async function BookRoutes(fastify: FastifyInstance) {
    
    fastify.get('/', { onRequest: [fastify.authenticate, adminCheck] }, getAllBooks);
    fastify.get('/:id', { onRequest: [fastify.authenticate, adminCheck] }, getBookById);
    fastify.post('/', { onRequest: [fastify.authenticate, adminCheck] }, createBook);
    fastify.put('/:id', { onRequest: [fastify.authenticate, adminCheck] }, updateBookById);
    fastify.delete('/:id', { onRequest: [fastify.authenticate, adminCheck] }, deleteBookById);
}