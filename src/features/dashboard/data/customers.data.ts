import type { Customer } from "../types/dashboard.types";

export const customers: Customer[] = [
  {
    id: "1",
    name: "Isabella Moreau",
    email: "isabella.moreau@email.com",
    totalOrders: 23,
    totalSpent: 8420,
    joinedAt: "2024-03-15",
    status: "active",
  },
  {
    id: "2",
    name: "Victoria Chen",
    email: "victoria.chen@email.com",
    totalOrders: 17,
    totalSpent: 6230,
    joinedAt: "2024-05-22",
    status: "active",
  },
  {
    id: "3",
    name: "Sophia Andersson",
    email: "sophia.andersson@email.com",
    totalOrders: 31,
    totalSpent: 12800,
    joinedAt: "2023-11-08",
    status: "active",
  },
  {
    id: "4",
    name: "Elena Volkov",
    email: "elena.volkov@email.com",
    totalOrders: 8,
    totalSpent: 2940,
    joinedAt: "2025-01-10",
    status: "active",
  },
  {
    id: "5",
    name: "Camille Dubois",
    email: "camille.dubois@email.com",
    totalOrders: 5,
    totalSpent: 1870,
    joinedAt: "2025-02-28",
    status: "inactive",
  },
  {
    id: "6",
    name: "Amara Okafor",
    email: "amara.okafor@email.com",
    totalOrders: 14,
    totalSpent: 5100,
    joinedAt: "2024-07-19",
    status: "active",
  },
  {
    id: "7",
    name: "Lena Fischer",
    email: "lena.fischer@email.com",
    totalOrders: 2,
    totalSpent: 780,
    joinedAt: "2025-12-01",
    status: "inactive",
  },
  {
    id: "8",
    name: "Aria Tanaka",
    email: "aria.tanaka@email.com",
    totalOrders: 19,
    totalSpent: 7650,
    joinedAt: "2024-01-25",
    status: "active",
  },
];

export async function fetchCustomers(): Promise<Customer[]> {
  // return (await apiClient.get("/admin/customers")).data;
  return customers;
}
