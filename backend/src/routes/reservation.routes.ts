import { FastifyInstance } from "fastify";
import { doReservation, getReservations } from "../controllers/reservation.controller";
import { checkIsAdmin, checkIsUser } from "../middlewares/checkRoles";
import { checkNoActiveReservations } from "../middlewares/checkNoActiveReservations";


export default async function ReservationRoutes(fastify: FastifyInstance) {
    
    fastify.get('/', { onRequest: [fastify.authenticate] }, getReservations);
    fastify.post('/', { onRequest: [fastify.authenticate, checkIsUser, checkNoActiveReservations] }, doReservation);
    
}