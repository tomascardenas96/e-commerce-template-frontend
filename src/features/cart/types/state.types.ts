// --- API response types ---

export interface VariantAttributes {
  [key: string]: string;
}

export interface CartItemVariant {
  id: string;
  sku: string;
  price: number;
  stock: number;
  attributes: VariantAttributes;
}

export interface CartItem {
  id: string;
  unitPrice: number;
  quantity: number;
  variant: CartItemVariant;
}

export interface Cart {
  id: string;
  status: "open" | "ordered";
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

// --- Store state ---

export interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;

  setCart: (cart: Cart) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearCart: () => void;
}
