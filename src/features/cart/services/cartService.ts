import { apiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { AxiosError } from "axios";
import { useCartStore } from "../store/cartStore";
import { Cart } from "../types/state.types";

export const cartService = {
  getCart: async (): Promise<void> => {
    const { setCart, setLoading, setError } = useCartStore.getState();
    try {
      setLoading(true);
      const { data } = await apiClient.get<Cart>("/cart");
      const cart: Cart = { ...data, items: data.items ?? [] };
      setCart(cart);
      logger.info("CART_SERVICE", `Carrito cargado: ${cart.items.length} items`);
    } catch (error: unknown) {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.message || "Error al obtener el carrito"
          : "Error al obtener el carrito";
      setError(msg);
      logger.error("CART_SERVICE", msg, error);
    } finally {
      setLoading(false);
    }
  },

  addItem: async (variantId: string, quantity: number = 1): Promise<void> => {
    const { setCart, setError } = useCartStore.getState();
    try {
      const { data } = await apiClient.post<Cart>("/cart/items", {
        variantId,
        quantity,
      });
      setCart(data);
      logger.info("CART_SERVICE", "Item agregado al carrito");
    } catch (error: unknown) {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.message || "Error al agregar item"
          : "Error al agregar item";
      setError(msg);
      logger.error("CART_SERVICE", msg, error);
      throw error;
    }
  },

  updateItemQuantity: async (
    itemId: string,
    quantity: number,
  ): Promise<void> => {
    const { setCart, setError } = useCartStore.getState();
    try {
      const { data } = await apiClient.patch<Cart>(`/cart/items/${itemId}`, {
        quantity,
      });
      setCart(data);
      logger.info("CART_SERVICE", `Cantidad actualizada: ${quantity}`);
    } catch (error: unknown) {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.message || "Error al actualizar cantidad"
          : "Error al actualizar cantidad";
      setError(msg);
      logger.error("CART_SERVICE", msg, error);
      throw error;
    }
  },

  removeItem: async (itemId: string): Promise<void> => {
    const { setCart, setError } = useCartStore.getState();
    try {
      const { data } = await apiClient.delete<Cart>(`/cart/items/${itemId}`);
      setCart(data);
      logger.info("CART_SERVICE", "Item eliminado del carrito");
    } catch (error: unknown) {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.message || "Error al eliminar item"
          : "Error al eliminar item";
      setError(msg);
      logger.error("CART_SERVICE", msg, error);
      throw error;
    }
  },

  clearCart: async (): Promise<void> => {
    const { clearCart, setError } = useCartStore.getState();
    try {
      await apiClient.delete("/cart");
      clearCart();
      logger.info("CART_SERVICE", "Carrito vaciado");
    } catch (error: unknown) {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.message || "Error al vaciar el carrito"
          : "Error al vaciar el carrito";
      setError(msg);
      logger.error("CART_SERVICE", msg, error);
      throw error;
    }
  },
};
