<template>
    <div class="reservation-card">
        
        <div>
            <p>Start date</p>
            <p class="reservation-startDate">{{ props.reservation.startDate.split("T")[0] }}</p>
        </div>
        <div>
            <p>End date</p>
            <p class="reservation-returnDate">{{ props.reservation.returnDate.split("T")[0] }}</p>
        </div>
        <div>
            <p>Status</p>
            <p class="reservation-status">{{ props.reservation.status }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Reservation } from '../utils/interfaces';

const props = defineProps({
    reservation: {
        type: Object as PropType<Reservation>,
        required: true,
    }
})

</script>

<style scoped>
.reservation-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid rgb(217, 215, 215);
    border-radius: 12px;
    width: 24em;
    height: 6em;
    color: rgb(43, 40, 40);
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}

.reservation-card:hover {
    transform: scale(1.03);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
}

</style>