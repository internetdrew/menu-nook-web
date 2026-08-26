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

export const STORE_NAME_LIMIT = 32;
export const CATEGORY_NAME_LIMIT = 40;
export const CATEGORY_DESCRIPTION_LIMIT = 160;
export const ITEM_NAME_LIMIT = 40;
export const ITEM_DESCRIPTION_LIMIT = 160;

export type MenuItem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  image: string;
  hidden?: boolean;
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

export const CTA_COPY = "Put your store's menu online";

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
        price: "$6.50",
        image: baconEggCheeseImage.src,
      },
      {
        id: "sausage-egg-and-cheese",
        name: "Sausage, Egg & Cheese",
        tagline: "Grilled sausage, two eggs, and melted American cheese.",
        description:
          "A hot breakfast sandwich with grilled sausage, two eggs, and melted American cheese. Choose a roll, bagel, or toasted bread.",
        price: "$7.00",
        image: sausageEggCheeseImage.src,
      },
      {
        id: "breakfast-platter",
        name: "Breakfast Platter",
        tagline: "Eggs, home fries, toast, and your choice of meat.",
        description:
          "Two eggs cooked your way with seasoned home fries, buttered toast, and your choice of bacon or sausage.",
        price: "$9.50",
        image: breakfastPlatterImage.src,
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
        price: "$9.50",
        image: choppedCheeseImage.src,
      },
      {
        id: "chicken-cutlet",
        name: "Chicken Cutlet",
        tagline: "Crispy chicken with lettuce, tomato, cheese, and mayo.",
        description:
          "A crispy chicken cutlet served hot with lettuce, tomato, American cheese, and mayo on a toasted hero.",
        price: "$10.50",
        image: chickenCutletImage.src,
      },
      {
        id: "philly-cheesesteak",
        name: "Philly Cheesesteak",
        tagline: "Grilled steak, peppers, onions, and melted provolone.",
        description:
          "Thin-sliced steak grilled with peppers and onions, topped with melted provolone, and served on a toasted hero.",
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
        price: "$10.00",
        image: cheeseburgerImage.src,
      },
      {
        id: "chicken-over-rice",
        name: "Chicken Over Rice",
        tagline: "Seasoned grilled chicken with rice, salad, and sauces.",
        description:
          "Grilled seasoned chicken served over yellow rice with lettuce, tomato, white sauce, and your choice of hot sauce.",
        price: "$11.50",
        image: chickenOverRiceImage.src,
      },
      {
        id: "lamb-gyro",
        name: "Lamb Gyro",
        tagline: "Seasoned lamb, fresh salad, and white sauce in warm pita.",
        description:
          "Seasoned lamb with lettuce, tomato, onion, and white sauce, wrapped in a warm pita.",
        price: "$10.00",
        image: lambGyroImage.src,
      },
    ],
  },
];
