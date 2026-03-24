type CategoryName = "Coffee" | "Tea" | "Pastries";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  note?: string;
};

type MenuCategory = {
  category: {
    name: CategoryName;
    description: string;
  };
  items: MenuItem[];
};

export const categorizedItems: MenuCategory[] = [
  {
    category: {
      name: "Coffee",
      description: "Espresso drinks, brewed coffee, and house favorites.",
    },
    items: [
      {
        name: "House Coffee",
        description: "Medium roast drip coffee, served hot or iced.",
        price: "$4",
        note: "Most ordered",
      },
      {
        name: "Vanilla Latte",
        description: "Espresso with steamed milk and vanilla syrup.",
        price: "$6",
      },
      {
        name: "Cold Brew",
        description: "Slow-steeped coffee with a smooth finish.",
        price: "$5",
        note: "Seasonal special",
      },
    ],
  },
  {
    category: {
      name: "Tea",
      description: "Classic teas and simple blends for any time of day.",
    },
    items: [
      {
        name: "Earl Grey",
        description: "Black tea with bright bergamot.",
        price: "$4",
      },
      {
        name: "Chamomile",
        description: "Gentle herbal tea with floral notes.",
        price: "$4",
      },
      {
        name: "Matcha Latte",
        description: "Ceremonial matcha whisked with milk.",
        price: "$6",
        note: "Available iced",
      },
    ],
  },
  {
    category: {
      name: "Pastries",
      description: "Fresh baked items made for quick stops and slow mornings.",
    },
    items: [
      {
        name: "Butter Croissant",
        description: "Flaky layers with a crisp golden finish.",
        price: "$5",
      },
      {
        name: "Blueberry Muffin",
        description: "Baked fresh daily with a lemon sugar top.",
        price: "$5",
      },
      {
        name: "Banana Bread",
        description: "Moist loaf slice with brown sugar and cinnamon.",
        price: "$4",
        note: "Limited daily",
      },
    ],
  },
];
