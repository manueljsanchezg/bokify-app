<template>
    <div class="books-wrapper">
        <p v-if="isLoading">Loading...</p>
        <div class="books-container" v-if="!isLoading">
            <ul class="books-list">
                <li v-for="reservation in reservations" :key="reservation.id">
                    <ReservationCard :reservation="reservation" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAllReservations } from '../service/reservation.service';
import type { Reservation } from '../utils/interfaces';
import ReservationCard from '../components/ReservationCard.vue';

const reservations = ref<Reservation[]>([]);
const isLoading = ref(true);

onMounted(async () => {
    try {
        const data = await getAllReservations();
        console.log(data)
        reservations.value = data?.reservations
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false
    }
})

</script>

<style>
.books-wrapper {
    margin-top: 64px;
    min-height: 100vh;
}

.books-container {
    margin: 4em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.books-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    list-style-type: none;
}

</style>