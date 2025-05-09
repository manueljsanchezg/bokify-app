<template>
    <div class="book-view">
        <h1 class="book-title">{{ book?.title }}</h1>
        <div class="container">
            <div class="book-image">
                <img src="https://st5.depositphotos.com/23188010/77231/i/450/depositphotos_772310024-stock-photo-blank-book-cover-rendering.jpg"
                    alt="imagen generica de libro" height="500" width="500">
            </div>
            <div class="book-info">
                <div class="author-container">
                    <AkPerson />
                    <p> Author</p>
                </div>
                <p class="info">{{ book?.author }}</p>
                <div class="genre-container">
                    <QuLabel />
                    <p>Genre</p>
                </div>
                <p class="info">{{ book?.genre }}</p>
                <div class="availability-container">
                    <AkCalendar />
                    <p>Availability</p>
                </div>
                <p :class="isAvailable ? 'available' : 'no-available'">{{ isAvailable ? "Available" : "Not available" }}
                </p>
            </div>
        </div>
        <div class="reserve-button-container">
            <v-btn class="reserv-button" width="800px" @click="showModal = true" :disabled="!isAvailable">Reservar</v-btn>
        </div>
        <Modal v-model="showModal" :handle-click="handleReservation">
            <div class="date-container">
                <v-text-field v-model="endDate" type="date" variant="solo" label="Return date" :min="formattedMinDate"></v-text-field>
            </div>
            <p class="error">{{ errors }}</p>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import type { Book } from '../utils/interfaces';
import { getAvailabilityByBookId, getBookById } from '../service/book.service';
import { QuLabel } from '@kalimahapps/vue-icons';
import { AkCalendar } from '@kalimahapps/vue-icons';
import { AkPerson } from '@kalimahapps/vue-icons';
import Modal from '../components/Modal.vue';
import { router } from '../router/router';
import { doReservation } from '../service/reservation.service';

const route = useRoute();
const book = ref<Book>();
const isAvailable = ref(false);
const isLoading = ref(true);
const showModal = ref(false)
const endDate = ref<Date | null>(null);
const errors = ref<string | null>(null);

watch(errors, (newError) => {
  if(newError) {
    setTimeout(() => {
    errors.value = "";
  }, 2200);
  }
})

const minDate = new Date();
minDate.setDate(minDate.getDate() + 1);
const formattedMinDate = minDate.toISOString().split("T")[0];

onMounted(async () => {
    try {
        const bookData = await getBookById(route.params.id as string);
        book.value = bookData?.book;
        const isAvailableData = await getAvailabilityByBookId(route.params.id as string);
        isAvailable.value = isAvailableData.isAvailable;
    } catch (error) {
        console.log(error)
    } finally {
        isLoading.value = false
    }
});

const handleReservation = async () => {
    console.log("click")
    try {
        if (!endDate.value) {
            errors.value = "Please select a valid date";
            return;
        }
        errors.value = null;
        const response = await doReservation({ returnDate: endDate.value, bookId: book.value?.id });
        if (response.success) {
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
.book-view {
    margin-top: 5em;
    margin-right: 2em;
    margin-left: 2em;
    border: 1px solid rgb(214, 206, 190);
    border-radius: 12px;
}

.book-title {
    margin-left: 1em;
}

.container {
    display: flex;
    flex-direction: row;
    margin: 1em;
}

.book-info {
    display: flex;
    flex-direction: column;
    margin-left: 4em;
    min-height: 500px;
    min-width: 500px;
    gap: 1em;
    font-size: 24px;
}

.reserve-button-container {
    text-align: center;
    margin-top: 1em;
    margin-bottom: 1em;
}

.availability-container,
.author-container,
.genre-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    color: rgb(121, 119, 119);
    font-size: 30px;
}

.info,
.no-available,
.available {
    margin-left: 2em;
    font-size: 30px;
}

.available {
    color: green;
}

.no-available {
    color: red;
}

</style>