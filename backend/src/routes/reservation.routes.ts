import { FastifyInstance } from "fastify";
import { doReservation, getReservations } from "../controllers/reservation.controller";


export default async function ReservationRoutes(fastify: FastifyInstance) {
    
    fastify.get('/', { onRequest: [fastify.authenticate] }, getReservations);
    fastify.post('/', { onRequest: [fastify.authenticate] }, doReservation);
    
}