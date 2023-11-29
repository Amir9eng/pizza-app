<template>
  <Teleport to="body">
    <div v-if="showModal" class="portal-overlay">
      <div class="portal">
        <span class="classic" @click="store.closeModal">x</span>
        <template v-if="!orderPlaced">
          <h2>Delivery Information</h2>
          <form @submit.prevent="store.placeOrder">
            <label for="name">Name:</label>
            <input v-model="name" type="text" id="name" required />

            <label for="address">Address:</label>
            <textarea v-model="address" id="address" required></textarea>

            <button type="submit">Place Order</button>
          </form>
        </template>

        <div v-else class="success-message">
          <p>Order placed successfully!</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { usePizzaStore } from '../../store/index';
import { storeToRefs } from 'pinia';

const store = usePizzaStore();
const { address, name, orderPlaced, showModal } = storeToRefs(usePizzaStore());
</script>

<style scoped>
.portal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.portal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.classic {
  font-size: 2rem;
  display: flex;
  justify-content: end;
  cursor: pointer;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
}

input,
textarea {
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.success-message {
  margin-top: 20px;
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}
</style>
