"use client";

import Image from "next/image";
import { useCartStore } from "@/features/cart/store/cartStore";
import { ShieldCheck, Truck, X } from "lucide-react";

const TAX_RATE = 0.08;

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const taxEstimate = subtotal * TAX_RATE;
  const total = subtotal + taxEstimate;

  return (
      <main className="min-h-screen bg-background pt-28 pb-20">
        {/* Header */}
        <section className="px-6 md:px-20 lg:px-32 mb-12">
          <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl text-white mb-3">
            CARRITO DE <br /> COMPRAS
          </h1>
          <p className="text-[0.7rem] tracking-[0.25em] text-muted uppercase">
            {itemCount} productos en tu carrito
          </p>
        </section>

        {/* Content */}
        <section className="px-6 md:px-20 lg:px-32">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-sm tracking-[0.1em] uppercase">
                Tu carrito esta vacio
              </p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Cart Items */}
              <div className="flex-1">
                {items.map((item, index) => (
                  <div key={item.id}>
                    {index > 0 && <div className="border-t border-white/10" />}
                    <div className="py-8 flex gap-6">
                      {/* Product Image */}
                      <div className="relative w-36 h-44 shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm md:text-base font-semibold tracking-[0.1em] text-white uppercase">
                              {item.name}
                            </h3>
                            <p className="text-xs tracking-[0.1em] text-muted uppercase mt-1">
                              {item.description}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted hover:text-white transition-colors cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="text-[0.65rem] tracking-[0.15em] text-muted hover:text-white transition-colors cursor-pointer uppercase"
                            >
                              Minus
                            </button>
                            <span className="text-sm text-white font-medium w-6 text-center">
                              {String(item.quantity).padStart(2, "0")}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="text-[0.65rem] tracking-[0.15em] text-muted hover:text-white transition-colors cursor-pointer uppercase"
                            >
                              Plus
                            </button>
                          </div>

                          {/* Price */}
                          <p className="text-base md:text-lg text-white font-light">
                            $
                            {(item.price * item.quantity).toLocaleString(
                              "en-US",
                              { minimumFractionDigits: 2 },
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-t border-white/10" />
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-80 shrink-0">
                <div className="bg-card p-8">
                  <h2 className="text-[0.7rem] tracking-[0.25em] text-white uppercase font-semibold mb-8">
                    Order Summary
                  </h2>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[0.7rem] tracking-[0.15em] text-muted uppercase">
                        Subtotal
                      </span>
                      <span className="text-white">
                        $
                        {subtotal.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[0.7rem] tracking-[0.15em] text-muted uppercase">
                        Shipping
                      </span>
                      <span className="text-[0.7rem] tracking-[0.1em] text-white uppercase font-medium">
                        Complimentary
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[0.7rem] tracking-[0.15em] text-muted uppercase">
                        Tax Estimate
                      </span>
                      <span className="text-white">
                        $
                        {taxEstimate.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 my-6" />

                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[0.7rem] tracking-[0.25em] text-muted uppercase">
                      Total
                    </span>
                    <span className="text-2xl md:text-3xl text-white font-light">
                      $
                      {total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <button className="w-full bg-white text-black py-4 text-[0.65rem] tracking-[0.2em] uppercase font-semibold hover:bg-foreground transition-colors cursor-pointer">
                    Proceed to Checkout
                  </button>

                  {/* Promo Code */}
                  <div className="mt-6 flex items-center border-b border-white/10 pb-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE"
                      className="flex-1 bg-transparent text-[0.65rem] tracking-[0.15em] text-muted uppercase placeholder:text-muted/50 outline-none"
                    />
                    <button className="text-[0.65rem] tracking-[0.15em] text-white uppercase font-medium hover:text-muted transition-colors cursor-pointer">
                      Apply
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-muted" />
                      <span className="text-[0.6rem] tracking-[0.1em] text-muted uppercase">
                        Secure Encrypted Checkout
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4 text-muted" />
                      <span className="text-[0.6rem] tracking-[0.1em] text-muted uppercase">
                        Insured Global Delivery
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
  );
}
