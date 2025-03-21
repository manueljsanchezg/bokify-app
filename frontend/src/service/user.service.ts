import axios from "axios";
import type { registerRequest } from "../utils/interfaces";

const API_URL = "http://localhost:3000/api/users";

//axios.defaults.headers.common['Content-Type'] = 'application/json';

export const registerUser = async (userData: registerRequest) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return { success: true, ...response.data}
    } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
            const statusCode = error.response.status;
            switch (statusCode) {
                case 405:
                  return { success: false, message: "Email in use" };
                default:
                    return { success: false, message: "Server error" };
              }
        } else {
              return { success: false, message: "Conexion error" };
        }
    }
}

export const loginUser = async (userData: registerRequest) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        console.log(response)
        console.log(response.data)
        return { success: true, ...response.data}
    } catch (error) {
        if(axios.isAxiosError(error) && error.response) {
            const statusCode = error.response.status;
            switch (statusCode) {
                case 400:
                  return { success: false, message: "Invalid request" };
                case 401:
                  return { success: false, message: "Invalid credentials" };
              }
            } else {
              return { success: false, message: "Conexion error" };
            }
        }
        
}