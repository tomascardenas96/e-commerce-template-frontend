import { create } from "zustand";
import { OrdersState } from "../types/state.types";

export const useOrdersStore = create<OrdersState>()((set, get) => ({
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,

  setOrders: (orders) => set({ orders, error: null }),
  setSelectedOrder: (selectedOrder) => set({ selectedOrder, error: null }),
  addOrder: (order) => set({ orders: [order, ...get().orders] }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
