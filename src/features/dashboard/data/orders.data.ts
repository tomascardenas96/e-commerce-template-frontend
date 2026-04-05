import type { Order } from "../types/dashboard.types";

export const orders: Order[] = [
  {
    id: "#88219",
    customer: "Isabella Moreau",
    items: 3,
    total: 2140,
    status: "delivered",
    date: "2026-03-28",
  },
  {
    id: "#88220",
    customer: "Victoria Chen",
    items: 1,
    total: 890,
    status: "shipped",
    date: "2026-03-29",
  },
  {
    id: "#88221",
    customer: "Sophia Andersson",
    items: 5,
    total: 3420,
    status: "processing",
    date: "2026-03-30",
  },
  {
    id: "#88222",
    customer: "Elena Volkov",
    items: 2,
    total: 770,
    status: "pending",
    date: "2026-03-31",
  },
  {
    id: "#88223",
    customer: "Camille Dubois",
    items: 1,
    total: 450,
    status: "cancelled",
    date: "2026-03-31",
  },
  {
    id: "#88224",
    customer: "Amara Okafor",
    items: 4,
    total: 1980,
    status: "delivered",
    date: "2026-03-27",
  },
  {
    id: "#88225",
    customer: "Lena Fischer",
    items: 2,
    total: 640,
    status: "shipped",
    date: "2026-03-30",
  },
  {
    id: "#88226",
    customer: "Aria Tanaka",
    items: 3,
    total: 1560,
    status: "processing",
    date: "2026-04-01",
  },
  {
    id: "#88227",
    customer: "Isabella Moreau",
    items: 1,
    total: 1250,
    status: "pending",
    date: "2026-04-01",
  },
  {
    id: "#88228",
    customer: "Sophia Andersson",
    items: 2,
    total: 950,
    status: "delivered",
    date: "2026-03-26",
  },
  {
    id: "#88229",
    customer: "Victoria Chen",
    items: 6,
    total: 4200,
    status: "shipped",
    date: "2026-04-02",
  },
  {
    id: "#88230",
    customer: "Elena Volkov",
    items: 1,
    total: 320,
    status: "pending",
    date: "2026-04-02",
  },
];

export async function fetchOrders(): Promise<Order[]> {
  // return (await apiClient.get("/admin/orders")).data;
  return orders;
}
