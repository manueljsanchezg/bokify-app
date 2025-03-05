import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { generateJwt } from "../utils/jwtUtils";
import prisma from "../database/db";

const userRepository = prisma.user

const SECRET = process.env.SECRET ?? 'secret';

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const users = await userRepository.findMany({
            select: {
                email: true,
                reservations: true
            }
        });

        return reply.send(users);
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { email, password } = request.body as { email: string, password: string };

        const existingUser = await userRepository.findFirst({ where: { email }});

        if (existingUser) return reply.status(400).send({ message: "Email in user" });

        const hashedPassword = await bcrypt.hash(password!, 10);

        const newUser = {
            email: email!,
            password: hashedPassword,
            role: "user"
        }

        const createUser = await userRepository.create({ data: newUser });

        return reply.status(201).send({ message: "User registered", createUser })
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error", error })
    }
}

export const loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {

        console.log(request.body);
        
        const { email, password } = request.body as { email: string, password: string };

        const existingUser = await userRepository.findFirst({ where: { email } });

        const validPassword = await bcrypt.compare(password!, existingUser!.password);

        if (!existingUser || !validPassword) return reply.status(401).send({ message: "Email or Password invalid" });

        const payload: JwtPayload = { userId: existingUser.id, email: existingUser.email, role: existingUser.role };
        const secret: Secret = SECRET;
        const options: SignOptions = { expiresIn: "1h" };

        const token = generateJwt(payload, secret, options);

        return reply.status(201).send({ message: "User logged", token })
    } catch (error) {
        return reply.status(500).send({ message: "Internal Server Error" })
    }
}

export const deleteUserById = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string };

        const user = await userRepository.findFirst({ where: { id: parseInt(id) }});

        if(!user) {
            return reply.status(404).send({ message: "User not found" })
        }

        await userRepository.delete({ where: { id: parseInt(id) } });

        return reply.send({ message: "Successfully deleted"});
    } catch (error) {
        console.log(error)
        return reply.status(500).send({ message: "Internal Server Error", error: error })
    }
}