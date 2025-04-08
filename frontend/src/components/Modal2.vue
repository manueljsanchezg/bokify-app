<template>
    <div class="modal-wrapper" v-if="open" @click.self="close">
        <div class="modal-container">
            <slot></slot>
            <div class="modal-actions">
                <v-btn @click="$emit('close', false)">Close</v-btn>
                <v-btn @click="acceptAndClose">Accept</v-btn>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
    open: Boolean,
    handleClick: () => void
}

interface Emits {
    (event: 'close', value: boolean): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const close = () => {
    emit('close', false);
}

const acceptAndClose = () => {
    props.handleClick();
    close();
}

</script>

<style scoped>

.modal-wrapper {
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