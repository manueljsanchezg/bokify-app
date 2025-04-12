<template>
    <dialog ref="modal" @click.self="close">
        <div class="modal-container">
            <slot></slot>
            <div class="modal-actions">
                <v-btn @click="close">Close</v-btn>
                <v-btn @click="acceptAndClose">Accept</v-btn>
            </div>
        </div>
    </dialog>
</template>

<script setup lang="ts">
import { ref, defineModel, watchEffect } from 'vue';

interface Props {
    handleClick: () => void
}

// Comment

const openModal = defineModel();
const modal = ref<HTMLDialogElement | null>(null);

const props = defineProps<Props>();

watchEffect(() => {
    openModal.value === true ? modal.value?.showModal() : modal.value?.close();
})

function close() {
    openModal.value = false;
}

function acceptAndClose() {
    props.handleClick()
    close()
}

</script>

<style scoped>

dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;
    border-radius: 2em;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.modal-container {
    height: 18em;
    width: 20em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
}

.modal-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
}

</style>