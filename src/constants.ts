type CategoryName = keyof typeof categoryArt;

export const categoryArt = {
  "Small Plates": {
    heroClass: "bg-[#d8ccbe]",
    washClass: "bg-[#f4ede4]",
    inkClass: "text-[#4f4338]",
    lineClass: "bg-[#8d7661]/30",
  },
  Entrees: {
    heroClass: "bg-[#b48f76]",
    washClass: "bg-[#ead6c3]",
    inkClass: "text-[#34241b]",
    lineClass: "bg-[#5e4434]/25",
  },
  Desserts: {
    heroClass: "bg-[#d8c0c7]",
    washClass: "bg-[#f2e6ea]",
    inkClass: "text-[#4e3f45]",
    lineClass: "bg-[#876770]/25",
  },
} as const;

type MenuItem = {
  name: string;
  description: string;
  price: string;
  calories: number;
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  worksFor: string[];
  allergens: string[];
  pairsWith: string[];
  signal?: string;
};

export type ActiveMenuItem = MenuItem & {
  categoryName: CategoryName;
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
      name: "Small Plates",
      description:
        "A collection of seasonal compositions designed to open the meal with balance, texture, and brightness.",
    },
    items: [
      {
        name: "Heirloom Tomato Tartare",
        description:
          "Vine-ripened tomatoes, basil oil, shaved fennel, and sea salt on toasted sourdough.",
        price: "$14",
        calories: 260,
        spiceLevel: 1,
        worksFor: ["Vegetarian", "Low Carb", "Light Start"],
        allergens: ["Gluten"],
        pairsWith: ["Sparkling Water", "House Salad", "Citrus Spritz"],
        signal: "Guest favorite",
      },
      {
        name: "Seared Scallops",
        description:
          "Golden caramelized scallops, citrus emulsion, and tender young herbs.",
        price: "$18",
        calories: 310,
        spiceLevel: 1,
        worksFor: ["Gluten Aware", "High Protein", "Low Carb"],
        allergens: ["Shellfish", "Dairy"],
        pairsWith: ["White Wine", "Charred Greens", "Lemon Potatoes"],
        signal: "Most ordered",
      },
      {
        name: "Truffle Mushroom Croquettes",
        description:
          "Crisp exterior, creamy woodland mushroom center, finished with aged pecorino.",
        price: "$16",
        calories: 390,
        spiceLevel: 2,
        worksFor: ["Vegetarian", "Comfort Food"],
        allergens: ["Gluten", "Dairy"],
        pairsWith: ["Tomato Jam", "Dry Cider", "Little Gem Salad"],
      },
    ],
  },
  {
    category: {
      name: "Entrees",
      description:
        "Thoughtfully sourced ingredients prepared with restraint and precision.",
    },
    items: [
      {
        name: "Roasted Duck Breast",
        description:
          "Slow-roasted duck, cherry gastrique, and charred broccolini.",
        price: "$32",
        calories: 640,
        spiceLevel: 2,
        worksFor: ["High Protein", "Date Night"],
        allergens: [],
        pairsWith: ["Red Wine", "Fingerling Potatoes", "Roasted Carrots"],
        signal: "Chef's pick",
      },
      {
        name: "Wild Mushroom Risotto",
        description:
          "Arborio rice, forest mushrooms, white wine, and aged parmesan.",
        price: "$28",
        calories: 580,
        spiceLevel: 1,
        worksFor: ["Vegetarian", "Comfort Food"],
        allergens: ["Dairy"],
        pairsWith: ["Pinot Noir", "Caesar Salad", "Garlic Bread"],
      },
      {
        name: "Charred Wagyu Short Rib",
        description: "Tender wagyu, smoked jus, and creamy pomme puree.",
        price: "$38",
        calories: 720,
        spiceLevel: 3,
        worksFor: ["High Protein", "Indulgent Pick"],
        allergens: ["Dairy"],
        pairsWith: ["Cabernet", "Crispy Potatoes", "Broccolini"],
        signal: "Most indulgent",
      },
    ],
  },
  {
    category: {
      name: "Desserts",
      description: "Elegant finishes crafted to linger.",
    },
    items: [
      {
        name: "Valrhona Chocolate Souffle",
        description: "Dark chocolate souffle with creme anglaise.",
        price: "$12",
        calories: 430,
        spiceLevel: 1,
        worksFor: ["Vegetarian", "Sweet Finish"],
        allergens: ["Dairy", "Eggs", "Gluten"],
        pairsWith: ["Espresso", "Dessert Wine", "Fresh Berries"],
        signal: "Worth the wait",
      },
      {
        name: "Lavender Panna Cotta",
        description:
          "Silken cream infused with lavender, served with macerated berries.",
        price: "$10",
        calories: 280,
        spiceLevel: 1,
        worksFor: ["Gluten Aware", "Vegetarian", "Light Finish"],
        allergens: ["Dairy"],
        pairsWith: ["Chamomile Tea", "Berries", "Limoncello"],
      },
    ],
  },
];
