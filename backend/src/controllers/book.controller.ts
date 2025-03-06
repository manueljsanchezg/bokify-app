import { FastifyReply, FastifyRequest } from "fastify"
import { CreateBookDTO } from "../types/interfaces";
import prisma from "../database/db";
import { Book } from "@prisma/client";

const bookRepository = prisma.book;
const copyRepository = prisma.copy;

export const getAllBooks = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const books =  await bookRepository.findMany({
            include: {
                copies: true
            }
        });

        return reply.send(books);
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}

export const getBookById = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string };

        const existingBook =  await bookRepository.findFirst({ where: { id: parseInt(id) } });

        if(!existingBook) {
            return reply.status(404).send({ message: "Book not found" })
        }

        return reply.send(existingBook);
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}

export const getCopiesByBookId = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string };

        const existingBook =  await bookRepository.findFirst({ where: { id: parseInt(id) } });

        if(!existingBook) {
            return reply.status(404).send({ message: "Book not found" })
        }

        const copies = await copyRepository.findMany({ where: { id: parseInt(id) }})

        return reply.send(copies);
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}


export const createBook = async (request: FastifyRequest, reply: FastifyReply) => {
    try {

        const { title, author, genre, copies } = request.body as CreateBookDTO;

        const newBook = {
            title: title,
            author: author,
            genre: genre,
            copies: {
                create: Array.from({ length: copies }, () => ({}))
            }
        }

        const createBook = await bookRepository.create({ data: newBook });
        
        return reply.status(201).send(createBook);
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}

export const updateBookById = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string };

        const { title, author, genre } = request.body as Partial<Book>;

        const existingBook =  await bookRepository.findUnique({ where: { id: parseInt(id) }});

        if(!existingBook) {
            return reply.status(404).send({ message: "Book not found" })
        }

        const updatedBook: Partial<Book> = {}

        if(title) updatedBook.title = title;
        if(author) updatedBook.author = author;
        if(genre) updatedBook.genre = genre
        
        const updateBook = await bookRepository.update({ where: { id: parseInt(id) }, data: updatedBook });

        return reply.send(updateBook);
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}

export const deleteBookById = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string };

        const existingBook =  await bookRepository.findUnique({ where: { id: parseInt(id) }});

        if(!existingBook) {
            return reply.status(404).send({ message: "Book not found" })
        }

        await bookRepository.delete({ where: { id: parseInt(id) } });

        return reply.send(existingBook);
    } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}