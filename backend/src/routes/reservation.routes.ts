import { FastifyInstance } from "fastify";
import { doReservation, getReservations } from "../controllers/reservation.controller";
import { adminCheck } from "../middlewares/adminCheck";
import { checkNoActiveReservations } from "../middlewares/checkNoActiveReservations";


export default async function ReservationRoutes(fastify: FastifyInstance) {
    
    fastify.get('/', { onRequest: [fastify.authenticate, adminCheck] }, getReservations);
    fastify.post('/', { onRequest: [fastify.authenticate, checkNoActiveReservations] }, doReservation);
    
}