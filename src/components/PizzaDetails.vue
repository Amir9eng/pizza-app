<template>
  <div class="pizzaDetails" v-if="pizzaDetails">
    <h1>{{ pizzaDetails.name }}</h1>
    <img :src="getImageUrl(pizzaDetails.image)" alt="" />
    <p>Price: ${{ pizzaDetails.price.toFixed(2) }}</p>
    <p>Quantity: {{ pizzaDetails.quantity }}</p>
    <p>Description: {{ pizzaDetails.description }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePizzaStore } from './../../store/index';
import { useRoute } from 'vue-router';

type Pizza = {
  id: number;
  image: string;
  name: string;
  price: number;
  description?: string;
  calories: number;
  fats: number;
};

const store = usePizzaStore();
const pizzaId = ref<number | null>(null);

onMounted(() => {
  const route = useRoute();
  pizzaId.value = parseInt(route.params.id as string, 10);
});

const pizzaDetails = computed<Pizza | undefined>(() => {
  return store.menu.find((pizza) => pizza.id === pizzaId.value);
});

const getImageUrl = (imageName: string | undefined) => {
  return require(`@/assets/images/${imageName}`);
};
console.log(pizzaDetails);
</script>

<style scoped></style>
