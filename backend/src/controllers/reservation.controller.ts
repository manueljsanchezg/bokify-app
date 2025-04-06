import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../database/db";
import { Reservation } from "@prisma/client";

const reservationRepository = prisma.reservation
const userRepository = prisma.user
const copyRepository = prisma.copy


export const getReservations = async (request: FastifyRequest, reply: FastifyReply) => {
    try {

        const { userId } = request.user as { userId: string };
        
        const reservations = await reservationRepository.findMany({
            where: { userId: parseInt(userId) },
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

        const parsedUserId = parseInt(userId);

        const { returnDate, bookId } = request.body as { returnDate: string, bookId: number };

        const parsedReturnDate = new Date(returnDate);

        const copy = await copyRepository.findFirst({ where: { bookId, isAvailable: true }  });

        if(!copy) return reply.send(405).send({ message: "This book doesn't have any available copies"})

        const user = await userRepository.findFirst({ where: { id: parsedUserId } });

        if(!user) return reply.status(404).send({ message: "User not found" })

        const newReservation = {
            startDate: new Date(),
            returnDate: parsedReturnDate,
            userId: parsedUserId,
            copyId: copy.id
        }

        const createReservation = await reservationRepository.create({ data: newReservation })

        await copyRepository.update({ where: { id: copy.id }, data: { isAvailable: false }});
        return reply.send(createReservation);
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}

export const returnReservation = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { reservationId, copyId } = request.body as { reservationId: number, copyId: number };

        const reservation = await reservationRepository.findUnique({ where: { id: reservationId }  });

        if(!reservation) return reply.send(404).send({ message: "Reservation not found"})

        const copy = await copyRepository.findUnique({ where: { id: copyId }  });

        if(!copy) return reply.send(404).send({ message: "Copy not found"})


        if(reservation.status === 'returned') {
            await reservationRepository.update({ where: { id: reservationId }, data: { status: "active"}})
        } else {
            await reservationRepository.update({ where: { id: reservationId }, data: { status: "returned"}})
        }

        await copyRepository.update({ where: { id: copy.id }, data: { isAvailable: true }});

        return reply.send({ message: 'Reservation returned'});
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}