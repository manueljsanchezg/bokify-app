<template>
    <v-app-bar>
        <v-container>
            <v-btn to="/" v-if="isAuthenticated">Home</v-btn>
            <v-btn to="/login" v-if="!isAuthenticated">Login</v-btn>
            <v-btn @click="handleLogout" v-if="isAuthenticated">Logout</v-btn>

            <v-btn @click="validateToken">Prueba token</v-btn>
        </v-container>
    </v-app-bar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { jwtStorage } from '../storage/storage';
import { router } from '../router/router';
import { validateToken } from '../service/auth.service';


const isAuthenticated = ref(!!jwtStorage.value);

watch(jwtStorage, (newValue) => {
    isAuthenticated.value = !!newValue;
})

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