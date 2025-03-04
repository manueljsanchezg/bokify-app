export interface UserPayload {
    userId: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

export interface CreateBookDTO {
    title: string,
    description: string,
    author: string, 
    genre: string, 
    copies: number
}