<template>
  <div class="pizza-details-container">
    <div class="pizzaDetails" v-if="pizzaDetails">
      <h1>{{ pizzaDetails.name }}</h1>
      <img :src="getImageUrl(pizzaDetails.image)" alt="" />
      <p>Price: ${{ pizzaDetails.price.toFixed(2) }}</p>
      <div>Quantity: {{ pizzaDetails.quantity }}</div>
      <p>Description: {{ pizzaDetails.description }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>

    <button class="home-button" @click="goToHome">Home</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePizzaStore } from './../../store/index';
import { useRoute, useRouter } from 'vue-router';

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
const router = useRouter();

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

const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
.pizza-details-container {
  text-align: center;
  margin-top: 20px;
}

.pizzaDetails {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
}

p {
  margin: 10px 0;
}

.home-button {
  background-color: green;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.home-button:hover {
  background-color: #2980b9;
}
</style>
