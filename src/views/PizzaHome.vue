<template>
  <div id="pizza-restaurant" class="container-fluid h-100">
    <div class="row h-100">
      <div class="col-9 p-4">
        <div class="text-center title-holder">
          <span class="subtitle"> CHOOSE YOUR FLAVOR </span>
          <h1 class="title">THE BEST PIZZA MENU IN TOWN</h1>
          <p class="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit
            arcu in pretium molestie. Interdum et malesuada fames ac.
          </p>
        </div>

        <div class="row row-cols-4 mt-4">
          <div
            class="col justify-content-center text-center"
            v-for="(item, index) in menu"
            :key="index"
          >
            <div class="d-flex flex-column item">
              <div @click="router.push(`/pizza/${item.id}`)">
                <img
                  class="w-100"
                  :src="getImageUrl(item.image)"
                  :alt="item.name"
                />
                <div>
                  <h5 class="item-name">{{ item.name }}</h5>
                  <h6 class="item-price">${{ item.price.toFixed(2) }}</h6>
                </div>
              </div>
              <div class="p-3">
                <button
                  type="button"
                  class="add-cart"
                  @click="addPizza(item.id)"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Cart
        v-bind:addItem="addItem"
        v-bind:reduceItem="reduceItem"
        :getTotalPrice="getTotalPrice"
        :removeItem="removeItem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePizzaStore } from './../../store/index';
import router from '../router/index';
import { computed, toRef } from 'vue';
import Cart from '../components/Cart.vue';
import { storeToRefs } from 'pinia';

type Pizza = {
  id: number;
  image: string;
  name: string;
  price: number;
  calories: number;
  fats: number;
};

type CartItem = Pizza & {
  quantity: number;
};

const store = usePizzaStore();

const menu = store.menu;
let { cart } = storeToRefs(store);

function addPizza(id: number) {
  let pizza = menu.find((pizza) => pizza.id === id);
  let index = cart.value.findIndex((pizza) => pizza.id === id);

  if (index !== -1) {
    addItem(id);
  } else {
    cart.value.push({ ...pizza, quantity: 1 } as CartItem);
  }
}

function getTotalPrice() {
  let total = 0;
  cart.value.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total.toFixed(2);
}

function reduceItem(id: number) {
  let item = cart.value.find((item) => item.id === id);

  if (item && item.quantity > 1) {
    item.quantity--;
  } else {
    removeItem(id);
  }
}

function addItem(id: number) {
  let item = cart.value.find((item) => item.id === id);
  if (item) {
    item.quantity++;
  }
}

const getImageUrl = (imageName: string | undefined) => {
  return require(`@/assets/images/${imageName}`);
};

function removeItem(id: number) {
  cart.value = cart.value.filter((item) => item.id !== id);
}
</script>

<style scoped>
button {
  background-color: transparent;
  outline: none;
  border: none;
  padding: 10px;
  margin-top: 10px;
}

p {
  text-transform: uppercase;
  font-weight: 500;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.429em;
  letter-spacing: 0.05em;
  margin: 0;
  color: #fff;
}

.item {
  padding-left: 0;
  margin-top: 10px;
  cursor: pointer;
  padding: 10px;
}
.item img {
  transition: all 0.4s linear;
}
.item:hover .add-cart {
  visibility: visible;
  transform: translateY(0px);
  opacity: 1;
}
.item:hover img {
  transform: rotate(90deg);
}
.item .add-cart {
  visibility: hidden;
  color: #fff;
  background-color: #d2401e;
  overflow: hidden;
  border: none;
  padding-left: 0;
  padding-right: 0;
  border: 2px solid transparent;
  transition: all 0.4s linear;
  transform: translateY(10px);
  opacity: 0;
  text-transform: uppercase;
  width: 100%;
}
.item .add-cart:hover {
  background-color: #fff;
  border: 2px solid #d2401e;
  color: #d2401e;
}
.item .item-price {
  position: relative;
  display: block;
  margin: 10px 0 17px;
  word-wrap: break-word;
  line-height: 1.389em;
  letter-spacing: 0.05em;
  color: #d2401e;
  font-size: 20px;
}
.item .item-name {
  margin: 25px 0 10px;
  color: #b7903c;
}

.cart {
  background-color: #000000;
}
.cart .title {
  text-transform: uppercase;
  font-weight: 500;
  word-wrap: break-word;
  line-height: 1.375em;
  letter-spacing: 0.05em;
  margin: 3px 0 15px;
  padding-bottom: 12px;
  color: #fff;
  border-bottom: 2px dotted #b7903c;
}
.cart .total-section {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 8px;
  border-top: 2px dotted #b7903c;
}
.cart .total-section .amount {
  text-transform: uppercase;
  font-weight: 500;
  word-wrap: break-word;
  line-height: 1.429em;
  letter-spacing: 0.05em;
  margin: 0;
  color: #fff;
}
.cart .total-section .total-title {
  margin: 0;
  font-size: 20px;
  color: #fff;
}
.cart .order-items {
  max-height: 75vh;
  overflow-y: scroll;
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: middle;
}
.cart .order-items .order-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 50px;
}
.cart .order-items .order-item:first-child {
  margin-top: 0;
}
.cart .order-items .order-item .order-item-image {
  display: block;
  flex-shrink: 0;
  width: 90px;
  margin-right: 20px;
}
.cart .order-items .order-item .order-item-details {
  margin-top: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 15px;
}
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
.cart .order-items .order-item .remove-icon {
  position: absolute;
  top: -2px;
  right: 0;
  font-size: 20px;
  line-height: 1;
  color: #fff;
}
.cart .cart-empty {
  margin: 40px 0;
}

.check {
  background-color: green;
  width: 20rem;
  cursor: pointer;
}

.title-holder .subtitle {
  font-size: 12px;
  line-height: 1.375em;
  letter-spacing: 0.2em;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0 0 14px;
  color: #d2401e;
  display: block;
}
.title-holder .title {
  text-transform: uppercase;
  font-weight: 500;
  margin: 25px 0;
  -ms-word-wrap: break-word;
  word-wrap: break-word;
}
.title-holder .text {
  font-size: 18px;
  line-height: 1.556em;
  color: #989898;
  display: block;
  margin: 21px 0 0;
}
</style>
