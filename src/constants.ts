import birthdayBoxImage from "@/assets/birthday-box.png";
import brownButterImage from "@/assets/brown-butter.png";
import chocolateSheetImage from "@/assets/chocolate-sheet.png";
import cookieSamplerImage from "@/assets/cookie-sampler.png";
import cookiesAndCreamImage from "@/assets/cookies-and-cream.png";
import lemonSugarImage from "@/assets/lemon-sugar.png";
import strawberryShortcakeImage from "@/assets/strawberry-shortcake.png";
import vanillaBeanCakeImage from "@/assets/vanilla-bean-cake.png";
import weekendTreatImage from "@/assets/weekend-treat.png";

type CategoryName = "Cookies" | "Cakes" | "Pickup Boxes";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: string;
  note?: string;
  outOfStock?: boolean;
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
      name: "Cookies",
      description: "Small-batch cookies baked fresh for weekly pickups.",
    },
    items: [
      {
        name: "Brown Butter Chocolate Chip",
        description:
          "One dozen soft-centered cookies finished with dark chocolate chunks.",
        price: "$18",
        image: brownButterImage.src,
        note: "Best seller",
      },
      {
        name: "Lemon Sugar",
        description: "One dozen bright citrus cookies rolled in coarse sugar.",
        price: "$16",
        image: lemonSugarImage.src,
      },
      {
        name: "Cookies and Cream",
        description:
          "One dozen vanilla cookies folded with crushed sandwich cookies.",
        price: "$18",
        image: cookiesAndCreamImage.src,
        note: "This weekend",
      },
    ],
  },
  {
    category: {
      name: "Cakes",
      description:
        "Celebration cakes and simple rounds for birthdays and gatherings.",
    },
    items: [
      {
        name: "Vanilla Bean Celebration Cake",
        description:
          "Three layers with whipped vanilla frosting and clean piping.",
        price: "$58",
        image: vanillaBeanCakeImage.src,
      },
      {
        name: "Chocolate Sheet Cake",
        description: "Rich cocoa sponge with fudge frosting for easy serving.",
        price: "$42",
        image: chocolateSheetImage.src,
        note: "Preorder",
      },
      {
        name: "Strawberry Shortcake",
        description: "Light sponge layered with cream and macerated berries.",
        price: "$60",
        image: strawberryShortcakeImage.src,
        note: "Limited dates",
      },
    ],
  },
  {
    category: {
      name: "Pickup Boxes",
      description:
        "Ready-to-go assortments for gifting, weekends, and market day.",
    },
    items: [
      {
        name: "Weekend Treat Box",
        description: "Six rotating bakes packed for Saturday porch pickup.",
        price: "$24",
        image: weekendTreatImage.src,
      },
      {
        name: "Birthday Dessert Box",
        description:
          "Cupcakes, cookies, and candles packed for small celebrations.",
        price: "$28",
        image: birthdayBoxImage.src,
        outOfStock: true,
      },
      {
        name: "Mini Cookie Sampler",
        description: "A dozen mixed mini cookies for gifting or party tables.",
        price: "$14",
        image: cookieSamplerImage.src,
        note: "Pickup Friday",
      },
    ],
  },
];
