
export interface registerRequest {
    email: String,
    password: String
}

export interface loginResponse {
    jwt: String,
    userId: String,
    email: String,
    role: String
}

export interface createBookBody {
    title: string,
    author: string,
    genre: string,
    copies: number
}

export interface updateBookBody {
    title?: string,
    author?: string,
    genre?: string
}

export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    copies: { id: number; isAvailable: boolean; bookId: number }[];
}

export interface ReservationModalInstance {
    open: () => void;
  }