import { ref } from 'vue';
import { defineStore } from 'pinia';

type Pizza = {
  id: number;
  image: string;
  name: string;
  price: number;
  description?: string;
  calories: number;
  fats: number;
};

type MenuItems = Pizza[];

type CartItem = Pizza & {
  quantity: number;
};

type CartItems = CartItem[];

export const usePizzaStore = defineStore('PizzaStore', {
  state: () => {
    return {
      menu: [
        {
          id: 1,
          image: 'pizza-1.png',
          name: 'BISMARCK',
          price: 30,
          description:
            'A classic pizza with a generous topping of ham, mushrooms, and a perfectly cooked egg in the center. Bismarck pizza is a delightful combination of flavors and textures.',
          calories: 800,
          fats: 50,
        },
        {
          id: 2,
          image: 'pizza-2.png',
          name: 'FIORI DI ZUCCA',
          description:
            'Fiori di Zucca, or Zucchini Flowers, is a unique and flavorful pizza featuring fresh zucchini flowers as a topping. Combined with premium ingredients, it offers a taste of Italian delicacy.',
          price: 50,
          calories: 800,
          fats: 50,
        },
        {
          id: 3,
          image: 'pizza-3.png',
          name: 'VALDOSTANA',
          description:
            "Valdostana pizza originates from the Val d'Aosta region in Italy. It boasts a mouthwatering combination of Fontina cheese, ham, and mushrooms, creating a rich and savory experience.",
          price: 55,
          calories: 800,
          fats: 50,
        },
        {
          id: 4,
          image: 'pizza-4.png',
          name: 'PIZZA TARTUFATA',
          description:
            'Pizza Tartufata is a truffle-infused delight. Topped with truffle oil, mushrooms, and a blend of premium cheeses, this pizza offers a sophisticated and aromatic experience for truffle enthusiasts.',
          price: 45,
          calories: 800,
          fats: 50,
        },
        {
          id: 5,
          image: 'pizza-5.png',
          name: 'FRANCESCANA',
          description:
            "Francescana pizza is a tribute to the culinary artistry of Italy's Osteria Francescana. With a blend of unique flavors, it promises a gastronomic journey through carefully selected ingredients.",
          price: 25,
          calories: 800,
          fats: 50,
        },
        {
          id: 6,
          image: 'pizza-6.png',
          name: 'BOSCAIOLA',
          description:
            'Boscaiola pizza celebrates the rustic flavors of the Italian countryside. With a combination of sausage, mushrooms, and a tomato base, it offers a hearty and satisfying taste.',
          price: 85,
          calories: 800,
          fats: 50,
        },
        {
          id: 7,
          image: 'pizza-7.png',
          name: 'MARE E MONTI',
          description:
            "Mare e Monti, translating to 'Sea and Mountains,' features a fusion of seafood and savory ingredients. Enjoy the best of both worlds with this flavorful combination.",
          price: 65,
          calories: 800,
          fats: 50,
        },
        {
          id: 8,
          image: 'pizza-8.png',
          name: 'MARE E MONTI',
          description:
            'Experience the richness of the land and sea with Mare e Monti pizza. Indulge in a symphony of flavors as seafood meets the bounty of the mountains in this delectable creation.',
          price: 95,
          calories: 800,
          fats: 50,
        },
      ] as MenuItems,
      cart: [] as CartItems,
      orderPlaced: false,
      showModal: false,
      name: '',
      address: '',
    };
  },
  actions: {
    openModal() {
      console.log('oya naaa');
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.name = '';
      this.address = '';
      this.orderPlaced = false;
    },
    placeOrder() {
      this.orderPlaced = true;
    },
  },
});
