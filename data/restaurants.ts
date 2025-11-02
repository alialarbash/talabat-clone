export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number; // 0-5
  deliveryTime: string; // e.g., "30-40 min"
};

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Shawarma King",
    cuisine: "Middle Eastern",
    rating: 4.6,
    deliveryTime: "25-35 min",
  },
  {
    id: "r2",
    name: "Sushi Garden",
    cuisine: "Japanese",
    rating: 4.4,
    deliveryTime: "35-45 min",
  },
  {
    id: "r3",
    name: "Mama Pasta",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "30-40 min",
  },
  {
    id: "r4",
    name: "Green Bowl",
    cuisine: "Healthy",
    rating: 4.3,
    deliveryTime: "20-30 min",
  },
];
