export type MenuItem = {
  id: string;
  name: string;
  price: number; // KD
  description: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "m1",
    name: "Chicken Shawarma",
    price: 1.75,
    description: "Juicy chicken wrap with garlic sauce.",
  },
  {
    id: "m2",
    name: "Beef Shawarma",
    price: 1.95,
    description: "Tender beef wrap with tahini.",
  },
  {
    id: "m3",
    name: "California Roll",
    price: 2.5,
    description: "Crab, avocado, and cucumber roll.",
  },
  {
    id: "m4",
    name: "Margherita Pasta",
    price: 2.9,
    description: "Tomato, basil, and mozzarella pasta.",
  },
  {
    id: "m5",
    name: "Green Power Bowl",
    price: 3.25,
    description: "Quinoa, kale, avocado, and chickpeas.",
  },
];
