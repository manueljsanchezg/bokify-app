<template>
    <button @click="gotToBook">
        <div class="book-card">
            <img class="book-image" src="https://st5.depositphotos.com/23188010/77231/i/450/depositphotos_772310024-stock-photo-blank-book-cover-rendering.jpg" alt="" width="255px" height="280">
            <strong class="book-title" >{{  props.book.title }}</strong>
            <p class="book-author" >{{  props.book.author }}</p>
            <p class="book-genre" >{{  props.book.genre }}</p>
        </div>
    </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Book } from '../utils/interfaces';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    book: {
        type: Object as PropType<Book>,
        required: true,
    }
})

const gotToBook = async () => {
    router.push(`/books/${props.book.id}`);
}

</script>

<style scoped>

.book-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: 1em;
    border: 1px solid rgb(217, 215, 215);
    border-radius: 12px;
    width: 16em;
    height: 24em;
    color: rgb(43, 40, 40);
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.5s ease-out, box-shadow 0.5s ease-out;
}

.book-card:hover {
    transform: scale(1.03);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
}

.book-title {
    font-size: 20px;
}

.book-title, .book-author, .book-genre {
    margin-left: 0.6em;
    margin-top: 0.3em;
}

.book-author, .book-genre {
    color: rgb(60, 58, 58);
}

.book-image {
    border-radius: 12px 12px 0 0;
}

</style>