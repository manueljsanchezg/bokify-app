<template>
    <div>
      <p>Hola mundo</p>
      <button @click="showModal = true">Abrir Modal</button>
      <Child v-model="showModal" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Child from '../components/Modal.vue';
  
  const showModal = ref(false);
  </script>