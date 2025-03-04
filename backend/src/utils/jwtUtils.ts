import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const SECRET = process.env.SECRET ?? 'secret';

export const generateJwt = (payload: JwtPayload, secret: Secret, options: SignOptions) => {
    return jwt.sign(payload, secret, options);
}

