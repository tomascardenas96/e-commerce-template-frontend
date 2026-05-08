"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { cartService } from "@/features/cart/services/cartService";
import { productsService } from "@/features/products/services/productsService";
import { useProductsStore } from "@/features/products/store/productsStore";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useToast } from "@/components/ui/Toast";

const ALL_ITEMS = "ALL ITEMS" as const;
const FALLBACK_IMAGE = "/pexels-krivitskiy-6206795.jpg";

const formatPrice = (price: string | number) => {
  const n = typeof price === "string" ? Number(price) : price;
  return Number.isFinite(n) ? n.toLocaleString("es-AR") : "0";
};

export default function CataloguePage() {
  const { products, isLoading, error } = useProductsStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [activeFilter, setActiveFilter] = useState<string>(ALL_ITEMS);
  const { showToast } = useToast();
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    productsService.getProducts();
  }, []);

  const categories = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    const unique = Array.from(
      new Set(list.map((p) => p.category?.name?.toUpperCase()).filter(Boolean)),
    ) as string[];
    return [ALL_ITEMS, ...unique];
  }, [products]);

  const filtered = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    return activeFilter === ALL_ITEMS
      ? list
      : list.filter((p) => p.category?.name?.toUpperCase() === activeFilter);
  }, [products, activeFilter]);

  console.log(filtered);

  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      {/* Header */}
      <section className="px-6 md:px-20 lg:px-22 mb-16">
        <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl text-white mb-6">
          LINEA DE <br /> PRODUCTOS
        </h1>
        <p className="text-sm md:text-base text-muted max-w-lg leading-relaxed">
          Descubre nuestra exclusiva selección de productos, diseñados para
          complementar tu rutina de belleza y cuidado personal. Cada artículo ha
          sido cuidadosamente seleccionado para ofrecerte la máxima calidad y
          resultados excepcionales.
        </p>
      </section>

      {/* Filter Bar */}
      <section className="px-6 md:px-20 lg:px-22 mb-12">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[0.65rem] tracking-[0.25em] text-muted uppercase font-medium">
            FILTER BY
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 text-[0.65rem] tracking-[0.15em] uppercase font-medium border transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-muted border-white/20 hover:border-white/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-20 lg:px-22">
        {isLoading && products.length === 0 ? (
          <p className="text-muted text-sm tracking-widest uppercase">
            Cargando productos...
          </p>
        ) : error ? (
          <p className="text-red-400 text-sm tracking-widest uppercase">
            {error}
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-muted text-sm tracking-widest uppercase">
            No hay productos disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((product) => {
              const variant = product.variants?.[0];
              const mainImage = product.images?.find((img) => img.isMain);
              const image = mainImage?.url ?? FALLBACK_IMAGE;
              const isAdding = addingId === product.id;
              const canAdd = !!variant && variant.stock > 0;

              return (
                <article
                  key={product.id}
                  className="group relative overflow-hidden"
                >
                  <div className="relative aspect-3/4 w-full overflow-hidden">
                    <Image
                      src={image}
                      alt={product.name}
                      fill
                      className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:bg-black/10" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[0.6rem] tracking-[0.2em] text-muted uppercase mb-1">
                      {product.category?.name}
                    </p>
                    <h3 className="text-sm tracking-widest text-white uppercase font-medium">
                      {product.name}
                    </h3>
                    <p className="text-sm text-white/70 mt-1">
                      ${variant ? formatPrice(variant.price) : "0"}
                    </p>
                    <button
                      disabled={isAdding || !canAdd}
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (!variant) return;
                        if (!isAuthenticated) {
                          showToast(
                            "Debes iniciar sesión para agregar productos al carrito",
                          );
                          return;
                        }
                        setAddingId(product.id);
                        try {
                          await cartService.addItem(variant.id, 1);
                          showToast(`${product.name} agregado al carrito`);
                        } catch {
                          showToast("Error al agregar al carrito");
                        } finally {
                          setAddingId(null);
                        }
                      }}
                      className="mt-3 w-full border border-white/40 py-2.5 text-[0.6rem] tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer disabled:opacity-50"
                    >
                      {isAdding
                        ? "Agregando..."
                        : canAdd
                          ? "Agregar al carrito"
                          : "Sin stock"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
