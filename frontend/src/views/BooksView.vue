<template>
    <div class="books-wrapper">
        <p v-if="isLoading">Loading...</p>
        <div class="books-container" v-if="!isLoading">
            <ul class="books-list">
                <li v-for="book in books" :key="book.id">
                    <BookCard :book="book" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAllBooks } from '../service/book.service';
import type { Book } from '../utils/interfaces';
import BookCard from '../components/BookCard.vue';

const books = ref<Book[]>([]);
const isLoading = ref(true);

onMounted(async () => {
    try {
        const data = await getAllBooks();
        console.log(data);
        books.value = data?.books
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
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    list-style-type: none;
}

</style>