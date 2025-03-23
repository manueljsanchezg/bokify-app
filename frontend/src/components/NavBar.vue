<template>
    <v-app-bar>
        <v-container>
            <v-btn to="/" v-if="isAuthenticated">Home</v-btn>
            <v-btn to="/books" v-if="isAuthenticated">Books</v-btn>
            <v-btn to="/reservations" v-if="isAuthenticated">Reservations</v-btn>
            <v-btn to="/login" v-if="!isAuthenticated">Login</v-btn>
            <v-btn @click="handleLogout" v-if="isAuthenticated">Logout</v-btn>

            <v-btn @click="validateToken">Prueba token</v-btn>
        </v-container>
    </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { jwtStorage } from '../storage/storage';
import { router } from '../router/router';
import { validateToken } from '../service/auth.service';

const isAuthenticated = computed(() => !!jwtStorage.value);

const handleLogout = () => {
  jwtStorage.value = "";
  router.push("/login")
}

</script>

<style>
.v-container {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 1em
}

</style>