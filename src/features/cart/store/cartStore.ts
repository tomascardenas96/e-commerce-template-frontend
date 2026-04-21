import { create } from "zustand";
import { CartState } from "../types/state.types";

export const useCartStore = create<CartState>()((set) => ({
  cart: null,
  isLoading: false,
  error: null,

  setCart: (cart) => set({ cart, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearCart: () => set({ cart: null }),
}));
