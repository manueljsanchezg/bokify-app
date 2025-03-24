import axios from "axios";
import { jwtStorage } from "../storage/storage";
import type { createBookBody, updateBookBody } from "../utils/interfaces";

const API_URL = "http://localhost:3000/api/books";

export const getAllBooks = async () => {
    try {
        const response = await axios.get(API_URL, { headers: {
                    'Authorization': `Bearer ${jwtStorage.value}`
        }});
        return { succes: true, books: response.data };
    } catch (error) {
        console.error(error);
        return { succes: false };
    }
}

export const getBookById = async (bookId: string) => {
    try {
        const response = await axios.get(`${API_URL}/${bookId}`, { headers: {
                    'Authorization': `Bearer ${jwtStorage.value}`
        }});
        return { succes: true, book: response.data };
    } catch (error) {
        console.error(error);
    }
}

export const getCopiesByBookId = async (bookId: string) => {
    try {
        const response = await axios.get(`${API_URL}/${bookId}/copies`, { headers: {
                    'Authorization': `Bearer ${jwtStorage.value}`
        }});
        return { succes: true, ...response.data };
    } catch (error) {
        console.error(error);
    }
}

export const getAvailabilityByBookId = async (bookId: string) => {
    try {
        const response = await axios.get(`${API_URL}/${bookId}/availability`, { headers: {
                    'Authorization': `Bearer ${jwtStorage.value}`
        }});
        return { ...response.data };
    } catch (error) {
        console.error(error);
    }
}

export const createBook = async (bookData: createBookBody) => {
    try {
        const response = await axios.post(API_URL, bookData, { headers: {
                    'Authorization': `Bearer ${jwtStorage.value}`
        }});
        return { success: true, ...response.data };
    } catch (error) {
        console.error(error);
    }
}

export const updateBook = async (bookData: updateBookBody) => {
    try {
        const response = await axios.put(API_URL, bookData, { headers: {
                    'Authorization': `Bearer ${jwtStorage.value}`
        }});
        return { success: true, ...response.data };
    } catch (error) {
        console.error(error);
    }
}

export const deleteBookById = async (bookId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${bookId}`, { headers: {
                    'Authorization': `Bearer ${jwtStorage.value}`
        }});
        return { succes: true, ...response.data };
    } catch (error) {
        console.error(error);
    }
}