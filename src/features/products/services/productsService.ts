import { apiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { AxiosError } from "axios";
import { useProductsStore } from "../store/productsStore";
import {
  CreateProductDto,
  CreateProductResponse,
  GetProductsParams,
  ProductImage,
  ProductsResponse,
} from "../types/state.types";

export const productsService = {
  getProducts: async (params: GetProductsParams = {}): Promise<void> => {
    const { setProducts, setLoading, setError } = useProductsStore.getState();
    try {
      setLoading(true);
      const { data } = await apiClient.get<ProductsResponse>("/products", {
        params,
      });
      const products = data.products ?? [];
      setProducts(products, data.total ?? products.length);
      logger.info(
        "PRODUCTS_SERVICE",
        `${products.length} productos cargados (total: ${data.total ?? products.length})`,
      );
    } catch (error: unknown) {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.message || "Error al obtener los productos"
          : "Error al obtener los productos";
      setError(msg);
      logger.error("PRODUCTS_SERVICE", msg, error);
    } finally {
      setLoading(false);
    }
  },

  createProduct: async (
    payload: CreateProductDto,
  ): Promise<CreateProductResponse> => {
    const { data } = await apiClient.post<CreateProductResponse>(
      "/products",
      payload,
    );
    logger.info("PRODUCTS_SERVICE", `Producto creado: ${data.id}`);
    return data;
  },

  uploadProductImages: async (
    productId: string,
    files: File[],
    onProgress?: (percent: number) => void,
  ): Promise<ProductImage[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const { data } = await apiClient.post<ProductImage[]>(
      `/products/${productId}/images/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (!onProgress || !evt.total) return;
          onProgress(Math.round((evt.loaded / evt.total) * 100));
        },
      },
    );
    logger.info(
      "PRODUCTS_SERVICE",
      `${data.length} imágenes subidas para producto ${productId}`,
    );
    return data;
  },
};
