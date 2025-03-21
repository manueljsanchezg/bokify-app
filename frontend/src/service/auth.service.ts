import axios from "axios";
import { jwtStorage } from "../storage/storage";

const API_URL = "http://localhost:3000/api/auth";

export const validateToken = async () => {
    try {
        const response = await axios.get(`${API_URL}/validate-token`, { headers: {
            'Authorization': `Bearer ${jwtStorage.value}`
        }});
        console.log(response)
        return response.status === 200;
    } catch (error) {
        console.error(error);
        return false;
    }
}