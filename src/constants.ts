import baconEggCheeseImage from "@/assets/menu-images/bacon-egg-cheese.webp";
import breakfastPlatterImage from "@/assets/menu-images/breakfast-platter.webp";
import cheeseburgerImage from "@/assets/menu-images/cheeseburger-deluxe.webp";
import chickenCutletImage from "@/assets/menu-images/chicken-cutlet.webp";
import chickenOverRiceImage from "@/assets/menu-images/chicken-over-rice.webp";
import choppedCheeseImage from "@/assets/menu-images/chopped-cheese.webp";
import lambGyroImage from "@/assets/menu-images/lamb-gyro.webp";
import phillyCheesesteakImage from "@/assets/menu-images/philly-cheesesteak.webp";
import sausageEggCheeseImage from "@/assets/menu-images/sausage-egg-cheese.webp";

type CategoryName = "Breakfast" | "Hot Sandwiches" | "Grill Favorites";

export type MenuItemDetail = {
  key: string;
  value: string;
};

export type MenuItem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  details: MenuItemDetail[];
  price: string;
  image: string;
  hidden?: boolean;
  note?: string;
  isSoldOut?: boolean;
};

export type MenuCategory = {
  id: string;
  category: {
    name: CategoryName;
    description: string;
  };
  items: MenuItem[];
};

export const CTA_COPY = "Put your grill menu online";

export const categorizedItems: MenuCategory[] = [
  {
    id: "breakfast",
    category: {
      name: "Breakfast",
      description: "Hot breakfast sandwiches made fresh on the grill.",
    },
    items: [
      {
        id: "bacon-egg-and-cheese",
        name: "Bacon, Egg & Cheese",
        tagline: "Crispy bacon, two eggs, and melted American cheese.",
        description:
          "A corner-store classic made fresh on the grill with crispy bacon, two eggs, and American cheese. Served on your choice of a roll, bagel, or toasted bread.",
        tags: ["breakfast", "grill", "popular"],
        details: [
          { key: "Eggs", value: "Two eggs" },
          { key: "Cheese", value: "American" },
          { key: "Bread", value: "Roll, bagel, or toast" },
          { key: "Add", value: "Salt, pepper, ketchup" },
        ],
        price: "$6.50",
        image: baconEggCheeseImage.src,
        note: "Popular",
      },
      {
        id: "sausage-egg-and-cheese",
        name: "Sausage, Egg & Cheese",
        tagline: "Grilled sausage, two eggs, and melted American cheese.",
        description:
          "A hot breakfast sandwich with grilled sausage, two eggs, and melted American cheese. Choose a roll, bagel, or toasted bread.",
        tags: ["breakfast", "sausage", "hot sandwich"],
        details: [
          { key: "Eggs", value: "Two eggs" },
          { key: "Meat", value: "Sausage patty" },
          { key: "Cheese", value: "American" },
          { key: "Bread", value: "Roll, bagel, or toast" },
        ],
        price: "$7.00",
        image: sausageEggCheeseImage.src,
      },
      {
        id: "breakfast-platter",
        name: "Breakfast Platter",
        tagline: "Eggs, home fries, toast, and your choice of meat.",
        description:
          "Two eggs cooked your way with seasoned home fries, buttered toast, and your choice of bacon or sausage.",
        tags: ["breakfast", "platter", "made to order"],
        details: [
          { key: "Eggs", value: "Two, any style" },
          { key: "Side", value: "Home fries" },
          { key: "Meat", value: "Bacon or sausage" },
          { key: "Includes", value: "Buttered toast" },
        ],
        price: "$9.50",
        image: breakfastPlatterImage.src,
        note: "Until 11 AM",
      },
    ],
  },
  {
    id: "hot-sandwiches",
    category: {
      name: "Hot Sandwiches",
      description: "Made-to-order sandwiches straight from the grill.",
    },
    items: [
      {
        id: "chopped-cheese",
        name: "Chopped Cheese",
        tagline: "Seasoned beef, melted cheese, lettuce, tomato, and sauce.",
        description:
          "Seasoned ground beef chopped with onions and melted American cheese, then finished with lettuce, tomato, ketchup, and mayo on a toasted hero.",
        tags: ["best seller", "beef", "grill", "hot sandwich"],
        details: [
          { key: "Meat", value: "Seasoned ground beef" },
          { key: "Cheese", value: "American" },
          { key: "Toppings", value: "Lettuce and tomato" },
          { key: "Bread", value: "Toasted hero" },
        ],
        price: "$9.50",
        image: choppedCheeseImage.src,
        note: "Best seller",
      },
      {
        id: "chicken-cutlet",
        name: "Chicken Cutlet",
        tagline: "Crispy chicken with lettuce, tomato, cheese, and mayo.",
        description:
          "A crispy chicken cutlet served hot with lettuce, tomato, American cheese, and mayo on a toasted hero.",
        tags: ["chicken", "crispy", "hot sandwich"],
        details: [
          { key: "Chicken", value: "Breaded cutlet" },
          { key: "Cheese", value: "American" },
          { key: "Toppings", value: "Lettuce and tomato" },
          { key: "Bread", value: "Toasted hero" },
        ],
        price: "$10.50",
        image: chickenCutletImage.src,
      },
      {
        id: "philly-cheesesteak",
        name: "Philly Cheesesteak",
        tagline: "Grilled steak, peppers, onions, and melted provolone.",
        description:
          "Thin-sliced steak grilled with peppers and onions, topped with melted provolone, and served on a toasted hero.",
        tags: ["steak", "grill", "hot sandwich"],
        details: [
          { key: "Meat", value: "Thin-sliced steak" },
          { key: "Cheese", value: "Provolone" },
          { key: "Toppings", value: "Peppers and onions" },
          { key: "Bread", value: "Toasted hero" },
        ],
        price: "$11.00",
        image: phillyCheesesteakImage.src,
        isSoldOut: true,
      },
    ],
  },
  {
    id: "grill-favorites",
    category: {
      name: "Grill Favorites",
      description: "Burgers, platters, and hot meals made to order.",
    },
    items: [
      {
        id: "cheeseburger-deluxe",
        name: "Cheeseburger Deluxe",
        tagline: "Grilled beef, American cheese, fresh toppings, and fries.",
        description:
          "A seasoned beef patty with melted American cheese, lettuce, tomato, onion, pickles, and house sauce. Served with fries.",
        tags: ["burger", "combo", "grill"],
        details: [
          { key: "Patty", value: "Seasoned beef" },
          { key: "Cheese", value: "American" },
          { key: "Toppings", value: "Lettuce, tomato, onion, pickles" },
          { key: "Includes", value: "French fries" },
        ],
        price: "$10.00",
        image: cheeseburgerImage.src,
      },
      {
        id: "chicken-over-rice",
        name: "Chicken Over Rice",
        tagline: "Seasoned grilled chicken with rice, salad, and sauces.",
        description:
          "Grilled seasoned chicken served over yellow rice with lettuce, tomato, white sauce, and your choice of hot sauce.",
        tags: ["platter", "chicken", "halal"],
        details: [
          { key: "Protein", value: "Grilled chicken" },
          { key: "Base", value: "Yellow rice" },
          { key: "Side", value: "Lettuce and tomato" },
          { key: "Sauces", value: "White and hot sauce" },
        ],
        price: "$11.50",
        image: chickenOverRiceImage.src,
        note: "Customer favorite",
      },
      {
        id: "lamb-gyro",
        name: "Lamb Gyro",
        tagline: "Seasoned lamb, fresh salad, and white sauce in warm pita.",
        description:
          "Seasoned lamb with lettuce, tomato, onion, and white sauce, wrapped in a warm pita.",
        tags: ["gyro", "lamb", "hot food"],
        details: [
          { key: "Protein", value: "Seasoned lamb" },
          { key: "Bread", value: "Warm pita" },
          { key: "Toppings", value: "Lettuce, tomato, onion" },
          { key: "Sauce", value: "White sauce" },
        ],
        price: "$10.00",
        image: lambGyroImage.src,
        note: "Made to order",
      },
    ],
  },
];
