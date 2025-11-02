export type PastOrder = {
  id: string;
  restaurant: string;
  total: number; // KD
  status: "Delivered" | "Preparing" | "Cancelled";
  date: string; // ISO date string
};

export const pastOrders: PastOrder[] = [
  {
    id: "o1",
    restaurant: "Shawarma King",
    total: 4.2,
    status: "Delivered",
    date: "2025-10-01T18:45:00Z",
  },
  {
    id: "o2",
    restaurant: "Sushi Garden",
    total: 6.8,
    status: "Delivered",
    date: "2025-10-12T12:20:00Z",
  },
  {
    id: "o3",
    restaurant: "Mama Pasta",
    total: 5.1,
    status: "Preparing",
    date: "2025-10-29T19:05:00Z",
  },
];
