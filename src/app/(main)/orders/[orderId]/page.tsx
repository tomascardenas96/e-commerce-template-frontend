"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useOrdersStore } from "@/features/orders/store/ordersStore";
import { ordersService } from "@/features/orders/services/ordersService";
import { useAuthStore } from "@/features/auth/store/authStore";
import { OrderStatus } from "@/features/orders/types/state.types";
import { ArrowLeft, Loader2 } from "lucide-react";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendiente",
  paid: "Pagado",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "text-yellow-400 border-yellow-400/30",
  paid: "text-green-400 border-green-400/30",
  shipped: "text-blue-400 border-blue-400/30",
  delivered: "text-white border-white/30",
  cancelled: "text-red-400 border-red-400/30",
};

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = useOrdersStore((s) => s.selectedOrder);
  const isLoading = useOrdersStore((s) => s.isLoading);
  const error = useOrdersStore((s) => s.error);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && orderId) {
      ordersService.getOrder(orderId);
    }
  }, [isAuthenticated, orderId]);

  const total =
    order?.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) ?? 0;

  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      {/* Header */}
      <section className="px-6 md:px-20 lg:px-32 mb-12">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors text-[0.65rem] tracking-[0.15em] uppercase mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Mis pedidos
        </Link>
        <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl text-white mb-3">
          DETALLE DEL <br /> PEDIDO
        </h1>
      </section>

      <section className="px-6 md:px-20 lg:px-32">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-muted animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 text-sm tracking-[0.1em] uppercase">
              {error}
            </p>
          </div>
        ) : !order ? (
          <div className="text-center py-20">
            <p className="text-muted text-sm tracking-[0.1em] uppercase">
              Orden no encontrada
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Order Items */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-8">
                <span
                  className={`text-[0.65rem] tracking-[0.15em] uppercase font-medium border px-4 py-1.5 ${STATUS_COLORS[order.status]}`}
                >
                  {STATUS_LABELS[order.status]}
                </span>
                <span className="text-xs text-muted">
                  {new Date(order.createdAt).toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {order.items.map((item, index) => (
                <div key={item.id}>
                  {index > 0 && <div className="border-t border-white/10" />}
                  <div className="py-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold tracking-[0.1em] text-white uppercase">
                        {item.variant.sku}
                      </h3>
                      <p className="text-xs tracking-[0.1em] text-muted uppercase mt-1">
                        {Object.values(item.variant.attributes).join(" / ")}
                      </p>
                      <p className="text-xs text-muted mt-1">
                        {item.quantity} x $
                        {item.unitPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    <p className="text-base text-white font-light">
                      $
                      {(item.unitPrice * item.quantity).toLocaleString(
                        "en-US",
                        { minimumFractionDigits: 2 },
                      )}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-white/10" />
            </div>

            {/* Order Info Sidebar */}
            <div className="w-full lg:w-80 shrink-0 space-y-6">
              {/* Total */}
              <div className="bg-card p-8">
                <h2 className="text-[0.7rem] tracking-[0.25em] text-white uppercase font-semibold mb-6">
                  Total
                </h2>
                <span className="text-2xl md:text-3xl text-white font-light">
                  $
                  {total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* Shipping Info */}
              <div className="bg-card p-8">
                <h2 className="text-[0.7rem] tracking-[0.25em] text-white uppercase font-semibold mb-6">
                  Envio
                </h2>
                <div className="space-y-2">
                  <p className="text-sm text-white">{order.receiverName}</p>
                  <p className="text-xs text-muted">{order.phone}</p>
                  {order.shippingAddress && (
                    <>
                      <p className="text-xs text-muted mt-3">
                        {order.shippingAddress.street}
                      </p>
                      <p className="text-xs text-muted">
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.zipCode}
                      </p>
                    </>
                  )}
                  {order.additionalInfo && (
                    <p className="text-xs text-muted/70 mt-2 italic">
                      {order.additionalInfo}
                    </p>
                  )}
                </div>
              </div>

              {/* Pay button for pending orders */}
              {order.status === "pending" && (
                <Link
                  href={`/orders/${order.id}/pay`}
                  className="block w-full bg-white text-black py-4 text-[0.65rem] tracking-[0.2em] uppercase font-semibold hover:bg-foreground transition-colors text-center"
                >
                  Pagar ahora
                </Link>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
