import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../database/db";
import { Reservation } from "@prisma/client";



const reservationRepository = prisma.reservation
const userRepository = prisma.user
const copyRepository = prisma.copy


export const getReservations = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        
        const reservations = await reservationRepository.findMany({
            select: {
                id: true,
                status: true,
                startDate: true,
                returnDate: true,
                user: {
                    select: {
                        email: true
                    }
                },
                copy: {
                    select: {
                        id: true,
                        book: {
                            select: {
                                id: true,
                                title: true
                            }
                        }
                    }
                }
            }
        })

        return reply.send(reservations);
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}

export const doReservation = async (request: FastifyRequest, reply: FastifyReply) => {
    try {

        const { userId } = request.user as { userId: string };

        const { returnDate, copyId } = request.body as { returnDate: Date, copyId: number };

        const copy = await copyRepository.findFirst({ where: { id: copyId } });
        const user = await userRepository.findFirst({ where: { id: parseInt(userId) } });

        if(!user || !copy) return reply.status(404).send({ message: "User or copy not found" })

        const newReservation = {
            startDate: new Date(),
            returnDate: returnDate,
            userId: parseInt(userId),
            copyId: copyId
        }

        const createReservation = await reservationRepository.create({ data: newReservation })

        const updateCopyStatus = await copyRepository.update({ where: { id: copy.id }, data: { isAvailable: false }});
        return reply.send(createReservation);
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}