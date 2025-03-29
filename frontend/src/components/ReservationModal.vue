<template>
  <div v-if="isOpen" class="reservation-modal-wrapper" @click.self="close">
    <v-form class="reservation-modal-container">
      <div class="date-container">
        <v-text-field v-model="endDate" type="date" variant="solo" label="Return date" :min="formattedMinDate"></v-text-field>
        <p class="error">{{ errors }}</p>
      </div>
      <div class="reservation-modal-operations">
        <v-btn @click="close" width="50%">Cancelar</v-btn>
        <v-btn @click="handleReservation" width="50%">Reservar</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { doReservation } from '../service/reservation.service';
import { router } from '../router/router';

const isOpen = ref(false);
const endDate = ref<Date | null>(null);
const errors = ref<string | null>(null);

const props = defineProps({
  bookId: Number
})

watch(errors, (newError) => {
  if(newError) {
    setTimeout(() => {
    errors.value = "";
  }, 2000);
  }
})

const minDate = new Date();
minDate.setDate(minDate.getDate() + 1);
const formattedMinDate = minDate.toISOString().split("T")[0];


const open = () => {
  isOpen.value = true;
}

const close = () => {
  isOpen.value = false;
}

defineExpose({
  open
})

const handleReservation = async () => {
  console.log("click")
  try {
    if (!endDate.value) {
      errors.value = "Please select a valid date";
    return;
    }
    errors.value = null;
    const response = await doReservation({returnDate: endDate.value, bookId: props?.bookId});
    if(response.success) {
      router.push("/reservations");
    } else {
      errors.value = response.message;
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
  height: 100vh;
  width: 100vw;
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

.date-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 5em;
  margin: 1em;
}

.error {
  color: red;
}

</style>