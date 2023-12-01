<template>
  <div class="col-3 cart p-4">
    <h3 class="title">Your Cart</h3>

    <div class="order-items" v-if="cart.length > 0">
      <div class="order-item mb-4" v-for="(item, index) in cart" :key="index">
        <img
          class="order-item-image"
          :src="getImageUrl(item.image)"
          :alt="item.name"
        />
        <div class="order-item-content">
          <h5>{{ item.name }} - ${{ item.price.toFixed(2) }}</h5>
          <p>
            <button type="button" class="add" @click="addItem(item.id)">
              +
            </button>
            {{ item.quantity }}
            <button type="button" class="remove" @click="reduceItem(item.id)">
              -
            </button>
          </p>

          <div class="order-item-details">
            <span> <strong>Calories:</strong> {{ item.calories }}kcal </span>
            <span> <strong>Fats:</strong> {{ item.fats }}g </span>
          </div>
        </div>
        <button class="remove-icon" type="button" @click="removeItem(item.id)">
          x
        </button>
      </div>
    </div>
    <div class="cart-empty" v-else>
      <p class="text-center">Your basket is empty</p>
    </div>

    <div class="total-section">
      <h6 class="total-title">Total payment:</h6>
      <span class="amount"> ${{ getTotalPrice() }} </span>
    </div>
    <div>
      <button class="btn check btn-primary" @click="hasItems(cart.length)">
        Checkout
      </button>

      <PizzaForm />
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePizzaStore } from '../../store/index';
import { storeToRefs } from 'pinia';
import PizzaForm from './PizzaForm.vue';

const { cart } = storeToRefs(usePizzaStore());

interface Cart {
  addItem: (id: number) => void;
  reduceItem: (id: number) => void;
  removeItem: (id: number) => void;
  getTotalPrice: () => void;
}
defineProps<Cart>();

const store = usePizzaStore();

const getImageUrl = (imageName: string | undefined) => {
  return require(`@/assets/images/${imageName}`);
};

const hasItems = (cart: number) => {
  if (cart === 0) {
    alert('You have to add items in cart');
  } else {
    store.openModal();
  }
};
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
