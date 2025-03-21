import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt";
import UserRoutes from "./routes/user.routes";
import BookRoutes from "./routes/book.routes";
import CopyRoutes from "./routes/copy.routes";
import ReservationRoutes from "./routes/reservation.routes";
import AuthRoutes from "./routes/auth.routes";

const app = fastify({ logger: true });

app.register(fastifyJwt, { secret: process.env.SECRET ?? 'secret' });

app.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['POST', 'PUT', 'GET', 'DELETE']
});

app.decorate('authenticate', async function(request: FastifyRequest, reply: FastifyReply) {
    try {
        const decoded = await request.jwtVerify();
        request.user = decoded;
      } catch (error) {
        return reply.status(401).send({ message: "Unauthorized", error });
      }
});

app.get('/ping', async (request, reply) => {
    return reply.send('pong');
});

app.register(AuthRoutes, { prefix: "/api/auth" })
app.register(UserRoutes, { prefix: "/api/users" });
app.register(BookRoutes, { prefix: "/api/books" });
app.register(CopyRoutes, { prefix: "/api/copies" });
app.register(ReservationRoutes, { prefix: "/api/reservations" })

export default app