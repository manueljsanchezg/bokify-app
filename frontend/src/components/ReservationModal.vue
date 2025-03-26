<template>
    <div v-if="isOpen" class="reservation-modal-wrapper">
      <div class="reservation-modal-container">
        <p>Hola mundo</p>
        <v-btn @click="close">Cerrar</v-btn>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const open = () => {
    isOpen.value = true;
}

const close = () => {
    isOpen.value = false;
}

defineExpose({
    open
})

</script>
  
<style scoped>
  .reservation-modal-wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(0, 0, 0, 0.7);
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
    width: 50%;
    height: 50%;
    max-width: 1000px;
    max-height: 800px;
    overflow-y: auto;
    clip-path: inset(0 round 12px);
    padding: 20px;
    margin-top: 0;
  }
</style>
  