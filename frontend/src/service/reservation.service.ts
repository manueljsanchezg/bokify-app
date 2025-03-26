import axios from "axios";
import { jwtStorage } from "../storage/storage";
import type { createReservation } from "../utils/interfaces";

const API_URL = "http://localhost:3000/api/reservations";


export const getAllReservations = async () => {
    try {
        const response = await axios.get(API_URL, { headers: {
                    'Authorization': `Bearer ${jwtStorage.value}`
        }});
        return { succes: true, reservations: response.data };
    } catch (error) {
        console.error(error);
        return { succes: false };
    }
}

export const doReservation = async (reservationData: createReservation) => {
    try {
        const response = await axios.post(API_URL, reservationData, {
            headers: {
                'Authorization': `Bearer ${jwtStorage.value}`
            }
        });
        return { success: true, ...response.data };
    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error) && error.response) {
            const statusCode = error.response.status;
            switch (statusCode) {
                case 400:
                    return { success: false, message: "Invalid request" };
                case 406:
                    return { success: false, message: "You already have an active reservation" };
            }
        } else {
            return { success: false, message: "Conexion error" };
        }
    }
}