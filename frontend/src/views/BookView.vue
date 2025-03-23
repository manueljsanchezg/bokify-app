<template>
    <div class="book-view">
        <h1 class="book-title">{{ book?.title }}</h1>
        <div class="container">
            <div class="book-image">
                <img src="https://st5.depositphotos.com/23188010/77231/i/450/depositphotos_772310024-stock-photo-blank-book-cover-rendering.jpg" alt="imagen generica de libro" height="500" width="400">
            </div>
            <div class="book-info">
                <p class="info-title">Author</p>
                <p class="info">{{ book?.author }}</p>
                <p class="info-title">Genre</p>
                <p class="info">{{ book?.genre }}</p>
                <p class="info-title">Availability</p>
                <p class="info">Available</p>
            </div>
        </div>
        <div class="reserve-button-container">
            <v-btn class="reserv-button" width="800px">Reservar</v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import type { Book } from '../utils/interfaces';
import { getBookById } from '../service/book.service';

const route = useRoute();
const book = ref<Book>();
const isLoading = ref(true);


onMounted(async () => {
    try {
        const response = await getBookById(route.params.id as string);
        console.log(response)
        book.value = response?.book;
    } catch (error) {
        console.log(error)
    } finally {
        isLoading.value = false
    }
});
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

.info-title {
    color: rgb(121, 119, 119);
    font-size: 30px;
}

.reserve-button-container {
    text-align: center;
    margin-top: 1em;
    margin-bottom: 1em;
}

</style>