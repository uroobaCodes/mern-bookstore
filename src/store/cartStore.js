import { create } from "zustand";
import { persist } from "zustand/middleware";

const cartStore = (set) => ({
  //  define initial state and store cart items:
  cartItems: [],

  // second property of the store object will be to add cart items
  addItem: (item) => {
    set((state) => ({
      cartItems: [...state.cartItems, item],
    }));
  },

  //   here we will remove the item:
  removeItem: (itemId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== itemId),
    }));
  },

  clearCart: () => {
    set({ cartItems: [] });
  },
});

const useCartStore = create(
  persist(cartStore, {
    name: "cart-storage",
    getStorage: () => localStorage,
  })
);

export default useCartStore;
