"use client";

import { useState } from "react";
import Image from "next/image";
import { Footer } from "@/components/landing/Footer";
import { useCartStore } from "@/features/cart/store/cartStore";
import { useToast } from "@/components/ui/Toast";

const categories = [
  "ALL ITEMS",
  "CAPILAR",
  "STYLING",
  "SKINCARE",
  "ACCESORIOS",
] as const;
type Category = (typeof categories)[number];

interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Shampoo Reparador Intensivo",
    price: 4500,
    category: "CAPILAR",
    image: "/pexels-krivitskiy-6206795.jpg",
  },
  {
    id: 2,
    name: "Acondicionador Hidratante",
    price: 4200,
    category: "CAPILAR",
    image: "/pexels-krivitskiy-6206795.jpg",
  },
  {
    id: 3,
    name: "Mascarilla Keratina Profesional",
    price: 6800,
    category: "CAPILAR",
    image: "/pexels-krivitskiy-6206795.jpg",
  },
  {
    id: 4,
    name: "Serum Puntas Abiertas",
    price: 3900,
    category: "CAPILAR",
    image: "/pexels-krivitskiy-6206795.jpg",
  },
  {
    id: 5,
    name: "Cera Moldeadora Mate",
    price: 3200,
    category: "STYLING",
    image: "/pexels-krivitskiy-6206795.jpg",
  },
  {
    id: 6,
    name: "Spray Fijador Extra Fuerte",
    price: 2800,
    category: "STYLING",
    image: "/pexels-krivitskiy-6206795.jpg",
  },
  {
    id: 7,
    name: "Aceite de Argán Capilar",
    price: 5500,
    category: "STYLING",
    image: "/pexels-krivitskiy-6206795.jpg",
  },
  {
    id: 8,
    name: "Crema Hidratante Facial",
    price: 7200,
    category: "SKINCARE",
    image: "/pexels-krivitskiy-6206795.jpg",
  },
  {
    id: 9,
    name: "Serum Vitamina C",
    price: 8500,
    category: "SKINCARE",
    image: "/pexels-krivitskiy-6206795.jpg",
  },
  {
    id: 10,
    name: "Cepillo Profesional Desenredante",
    price: 2400,
    category: "ACCESORIOS",
    image: "/pexels-krivitskiy-6206795.jpg",
  },
  {
    id: 11,
    name: "Pinzas de Seccionado x6",
    price: 1800,
    category: "ACCESORIOS",
    image: "/pexels-krivitskiy-6206795.jpg",
  },
  {
    id: 12,
    name: "Protector Térmico 230°",
    price: 4100,
    category: "STYLING",
    image: "/pexels-krivitskiy-6206795.jpg",
  },
];

export default function CataloguePage() {
  const [activeFilter, setActiveFilter] = useState<Category>("ALL ITEMS");
  const addItem = useCartStore((s) => s.addItem);
  const { showToast } = useToast();

  const filtered =
    activeFilter === "ALL ITEMS"
      ? products
      : products.filter((p) => p.category === activeFilter);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="group relative overflow-hidden"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:bg-black/10" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-[0.6rem] tracking-[0.2em] text-muted uppercase mb-1">
                  {product.category}
                </p>
                <h3 className="text-sm tracking-widest text-white uppercase font-medium">
                  {product.name}
                </h3>
                <p className="text-sm text-white/70 mt-1">${product.price}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem({
                      id: product.id,
                      name: product.name,
                      description: product.category,
                      price: product.price,
                      image: product.image,
                    });
                    showToast(`${product.name} agregado al carrito`);
                  }}
                  className="mt-3 w-full border border-white/40 py-2.5 text-[0.6rem] tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                >
                  Agregar al carrito
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
