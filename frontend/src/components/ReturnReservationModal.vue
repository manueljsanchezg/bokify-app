<template>
    <div v-if="isOpen" class="reservation-modal-wrapper" @click.self="close">
        <v-form class="reservation-modal-container">
            <div class="reservation-modal-operations">
                <v-btn @click="close" width="50%">Cancel</v-btn>
                <v-btn @click="handleReturn" width="50%">Reserve</v-btn>
            </div>
        </v-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { returnReservation } from '../service/reservation.service';
import { router } from '../router/router';

const isOpen = ref(false);

const props = defineProps({
    reservationId: Number,
    copyId: Number
})

const open = () => {
    isOpen.value = true;
}

const close = () => {
    isOpen.value = false;
}

defineExpose({
    open
})

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

</script>

<style scoped>
.reservation-modal-wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9999;
}

.reservation-modal-container {
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255);
    border-radius: 12px;
    width: 40%;
    height: 25%;
    max-width: 1000px;
    max-height: 1000px;
    overflow-y: auto;
    padding: 1em;
    margin-top: 0;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.reservation-modal-operations {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1em;
}
</style>