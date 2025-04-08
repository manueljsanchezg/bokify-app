<template>
    <div class="reservations-wrapper">
        <p v-if="isLoading">Loading...</p>
        <v-table fixed-header class="reservations-table">
            <thead>
                <tr>
                    <th>Identifier</th>
                    <th>Title</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="reservation in reservations" :key="reservation.id">
                    <td>{{ reservation.id }}</td>
                    <td>{{ reservation.copy.book.title }}</td>
                    <td>{{ format(reservation.startDate.split("T")[0], "dd MMMM yyyy") }}</td>
                    <td>{{ format(reservation.returnDate.split("T")[0], "dd MMMM yyyy") }}</td>
                    <td>{{ reservation.status.toUpperCase() }}</td>
                    <td><v-btn @click="openReturnModal(reservation)" :disabled="reservation.status === 'RETURNED'">return</v-btn></td>
                    <td><v-btn @click="openModal()" >return2</v-btn></td>
                </tr>
            </tbody>
        </v-table>
        <Modal v-model="showModal" :handle-click="handleReturn">
        </Modal>
        <Modal2 :open="isOpen" :handle-click="handleReturn" @close="isOpen = !isOpen">

        </Modal2>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAllReservations, returnReservation } from '../service/reservation.service';
import type { Reservation } from '../utils/interfaces';
import { format } from "date-fns";
import Modal from '../components/Modal.vue';
import Modal2 from '../components/Modal2.vue';

const reservations = ref<Reservation[]>([]);
const isLoading = ref(true);
const reservationData = ref<Reservation | null>(null);
const showModal = ref(false)
const isOpen = ref(false);

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

const openModal = () => {
    isOpen.value = true;
}

const openReturnModal = (reservation: Reservation) => {
    reservationData.value = reservation;
    showModal.value = true
}

const handleReturn = async () => {
    console.log("click")
    try {
        console.log(reservationData.value)
        const response = await returnReservation({ reservationId: reservationData.value?.id , copyId: reservationData.value?.copy.id });
        if (response.success) {
            const index = reservations.value.findIndex(r => r.id === reservationData.value?.id);
            reservations.value[index].status = reservationData.value?.status === 'ACTIVE' ? 'RETURNED': 'ACTIVE';
        }
    } catch (error) {
        console.error(error);
    }
}

</script>

<style>



.reservations-wrapper {
    margin-top: 64px;
    min-height: calc(100vh-64px);
    display: flex;
    justify-content: center;
}

.reservations-table {
    margin-top: 3em;
    width: 90%;
    table-layout: fixed;
    border-collapse: collapse;
}

.reservations-table th, .reservations-table td {
    text-align: center !important ;
    width: 16.5%;
    border: 1px solid #ddd;
    font-size: 1.5em;
}

.reservations-table th {
    background-color: #ebebeb !important;
    font-weight: bold !important;
}

.reservations-table tr:hover {
    background-color: #fafafa !important;
    
}

.reservations-table th:first-child {
    border-top-left-radius: 12px;
}

.reservations-table th:last-child {
    border-top-right-radius: 12px;
}

.reservations-table td:first-child {
    border-bottom-left-radius: 12px;
}

.reservations-table td:last-child {
    border-bottom-right-radius: 12px;
}

</style>