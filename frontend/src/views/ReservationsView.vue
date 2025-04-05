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
                    <td><v-btn>return</v-btn></td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAllReservations, returnReservation } from '../service/reservation.service';
import type { Reservation } from '../utils/interfaces';
import { format } from "date-fns";

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

/*
const handleReturn = async () => {
    console.log("click")
    try {
        const response = await returnReservation({ reservationId: props.reservationId, copyId: props.copyId });
        if (response.success) {
            router.push("/reservations");
        }
    } catch (error) {
        console.error(error);
    }
}
*/
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