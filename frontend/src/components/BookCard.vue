<template>
    <button @click="gotToBook">
        <div class="book-card">
            <p>{{  props.book.title }}</p>
            <p>{{  props.book.author }}</p>
            <p>{{  props.book.genre }}</p>
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
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 12px;
    width: 8em;
    height: 8em;
    color: rgb(43, 40, 40);
    background-color: rgb(244, 243, 241);
}

</style>