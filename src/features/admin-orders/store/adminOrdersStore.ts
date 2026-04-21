import { create } from "zustand";
import type { AdminOrdersState } from "../types/state.types";

export const useAdminOrdersStore = create<AdminOrdersState>()((set, get) => ({
  orders: [],
  total: 0,
  selectedOrder: null,
  isLoading: false,
  isUpdating: false,
  error: null,

  setOrders: (orders, total) => set({ orders, total, error: null }),
  setSelectedOrder: (selectedOrder) => set({ selectedOrder, error: null }),
  updateOrderStatus: (orderId, status) => {
    const orders = get().orders.map((o) =>
      o.id === orderId ? { ...o, status } : o,
    );
    const selectedOrder = get().selectedOrder;
    set({
      orders,
      selectedOrder:
        selectedOrder?.id === orderId
          ? { ...selectedOrder, status }
          : selectedOrder,
    });
  },
  setLoading: (isLoading) => set({ isLoading }),
  setUpdating: (isUpdating) => set({ isUpdating }),
  setError: (error) => set({ error }),
}));
