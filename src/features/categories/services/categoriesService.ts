import { apiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { Category } from "../types/state.types";

interface CategoriesResponse {
  categories?: Category[];
  total?: number;
}

export const categoriesService = {
  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[] | CategoriesResponse>(
      "/categories",
    );
    const list = Array.isArray(data) ? data : data.categories ?? [];
    logger.info("CATEGORIES_SERVICE", `${list.length} categorías cargadas`);
    return list;
  },
};
