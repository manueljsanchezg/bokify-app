<template>
    <div class="login-wrapper">
        <v-form class="login-container" @submit.prevent="handleLogin">
            <h2 class="title">Login</h2>
            
            <v-text-field class="input-text" v-model="userData.email" variant="solo" label="email"></v-text-field>
            
            <p class="error" v-if="loginErrors.emailError">{{ loginErrors.emailError }}</p>
            
            <v-text-field class="input-password" v-model="userData.password" type="password" variant="solo" label="password"></v-text-field>
            
            <p class="error" v-if="loginErrors.passwordError">{{ loginErrors.passwordError }}</p>

            <p class="error" v-if="loginErrors.loginError">{{ loginErrors.loginError }}</p>
            
            <v-btn variant="plain" to="/register">Si aun no estas registrado pulse aquí</v-btn>
            
            <v-btn class="login-button" type="submit">Login</v-btn>
        </v-form type="submit">
    </div>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import { loginUser } from '../service/user.service';
import { jwtStorage } from '../storage/storage';
import { router } from '../router/router';

const userData = ref({ email: "", password: "" });

const loginErrors = ref({ emailError: "", passwordError: "", loginError: "" });

const userDataSchema = z.object({
    email: z.string().email({ message: "Invalid email"}).min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" })
});

const handleLogin = async () => {
    try {
        userDataSchema.parse(userData.value);
        const response = await loginUser(userData.value);
        if(response.success) {
            alert("Bienvenido: "+response.email)
            jwtStorage.value = response.token;
            router.push("/")
        } else {
            loginErrors.value.loginError = response.message
        }
    } catch (error) {
        console.log(error)
        if(error instanceof z.ZodError) {
            const fieldErrors = error.errors.map(e => {
                return {
                    field: e.path[0],
                    message: e.message,
                }
            })
            fieldErrors.forEach(e => {
                if(e.field === "email") {
                    loginErrors.value.emailError = e.message;
                } else if(e.field === "password") {
                    loginErrors.value.passwordError = e.message;
                }
            })
        }
    }
}

</script>

<style>

.login-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #e3e1e1;
}

.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-height: 650px;
    max-width: 600px;
    width: 100%;
    background-color: #ffffff;
    padding: 1em;
    border-radius: 1em;
}

.title {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
}

.input-text,
.input-password {
    width: 80%;
}

.login-button {
    width: 20%;
    font-size: 1rem;
    margin: 1em;
}

.login-button:hover {
    background: #f0eaea;
}

.error {
    color: red;
}
</style>