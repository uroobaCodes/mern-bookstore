import { create } from "zustand";

// we will make the base url
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/orders`;

const orderStore = (set) => ({
  orders: [],
  ordersByEmail: [],
  loading: false,
  error: null,

  postOrder: async (payload) => {
    set({ loading: true });
    try {
      const response = await fetch(`${BASE_URL}/create-order`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      set((state) => ({
        orders: [...state.orders, data.data],
        loading: false,
      }));
      return { success: true, message: "Order created successfully" };
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  getOrdersByEmail: async (email) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${BASE_URL}/email/${email}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        set({ loading: false, error: null, ordersByEmail: data.data });
      } else {
        set({ loading: false, error: "Failed to fetch orders" });
      }
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
});

export const useOrderStore = create(orderStore);
