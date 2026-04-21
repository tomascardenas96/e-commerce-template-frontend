import { create } from "zustand";
import { ProductsState } from "../types/state.types";

export const useProductsStore = create<ProductsState>()((set) => ({
  products: [],
  total: 0,
  isLoading: false,
  error: null,

  setProducts: (products, total) => set({ products, total, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
