<template>
  <div class="order-item-content" v-for="(item, index) in cart" :key="index">
    <p>
      <button type="button" class="add" @click="addItem(item.id)">+</button>
      {{ item.quantity }}
      <button type="button" class="remove" @click="reduceItem(item.id)">
        -
      </button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { usePizzaStore } from '../../store/index';
import { storeToRefs } from 'pinia';

interface Cart {
  addItem: (id: number) => void;
  reduceItem: (id: number) => void;
}
defineProps<Cart>();

const { cart } = storeToRefs(usePizzaStore());
</script>

<style>
.cart .order-items .order-item .order-item-content {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: middle;
  padding-right: 20px;
}
.cart .order-items .order-item .order-item-content h5 {
  margin: 0;
  color: #fff;
}
.cart .order-items .order-item .order-item-content p {
  font-size: 18px;
}
.cart .order-items .order-item .order-item-content button {
  color: white;
  margin-top: 0px;
}
</style>
