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

type MenuItemDetail = {
  key: string;
  value: string;
};

type MenuItem = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  details: MenuItemDetail[];
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
        tagline:
          "Soft-centered cookies with deep caramel notes and dark chocolate.",
        description:
          "A full dozen of our signature brown butter cookies, baked for crisp edges and tender centers. Each one is packed with dark chocolate chunks that melt into the warm dough. The flavor lands rich, nutty, and just a little salty in the best way.",
        tags: ["best seller", "soft baked", "chocolate", "crowd favorite"],
        details: [
          { key: "Batch", value: "One dozen" },
          { key: "Texture", value: "Crisp edge, soft center" },
          { key: "Chocolate", value: "Dark chocolate chunks" },
          { key: "Best For", value: "Weekend sharing" },
        ],
        price: "$18",
        image: brownButterImage.src,
        note: "Best seller",
      },
      {
        name: "Lemon Sugar",
        tagline: "Bright lemon cookies with a sparkling sugar finish.",
        description:
          "These cookies start with a buttery dough scented heavily with fresh lemon zest. They are rolled in coarse sugar before baking, so the tops crackle lightly with every bite. The result is citrus-forward, tender, and clean instead of overly sweet.",
        tags: ["citrus", "zesty", "classic", "weekend pickup"],
        details: [
          { key: "Batch", value: "One dozen" },
          { key: "Finish", value: "Coarse sugar crust" },
          { key: "Flavor", value: "Fresh lemon zest" },
          { key: "Style", value: "Light and bright" },
        ],
        price: "$16",
        image: lemonSugarImage.src,
      },
      {
        name: "Cookies and Cream",
        tagline: "Vanilla cookies folded with crushed sandwich cookies.",
        description:
          "A dozen soft vanilla cookies loaded with generous pieces of chocolate sandwich cookies throughout. They bake up with creamy sweetness in the center and little pockets of crunch around the edges. It is the familiar cookies-and-cream flavor in a bakery-style format.",
        tags: ["cookies", "creamy", "crunchy", "limited batch"],
        details: [
          { key: "Batch", value: "One dozen" },
          { key: "Base", value: "Vanilla cookie dough" },
          { key: "Mix-In", value: "Crushed sandwich cookies" },
          { key: "Texture", value: "Soft with crunch" },
        ],
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
        tagline: "A polished layer cake with whipped vanilla frosting.",
        description:
          "This three-layer cake is built with real vanilla bean for a warmer, fuller flavor than standard vanilla cake. It is finished with whipped vanilla frosting and clean piping that keeps the look classic and refined. Ideal for birthdays, showers, or any gathering that wants something elegant without feeling formal.",
        tags: ["celebration", "layer cake", "vanilla bean", "classic"],
        details: [
          { key: "Layers", value: "Three layers" },
          { key: "Frosting", value: "Whipped vanilla" },
          { key: "Style", value: "Clean piping" },
          { key: "Best For", value: "Birthdays and showers" },
        ],
        price: "$58",
        image: vanillaBeanCakeImage.src,
      },
      {
        name: "Chocolate Sheet Cake",
        tagline: "Rich chocolate cake made for generous, easy slices.",
        description:
          "A deeply cocoa-forward sheet cake with a plush crumb and a smooth layer of fudge frosting on top. It is designed for simple serving, so it works especially well for classrooms, office celebrations, and casual parties. The finish is nostalgic and rich without becoming too heavy.",
        tags: ["chocolate", "sheet cake", "preorder", "party ready"],
        details: [
          { key: "Format", value: "Sheet cake" },
          { key: "Frosting", value: "Fudge finish" },
          { key: "Serving", value: "Easy to slice" },
          { key: "Best For", value: "Group gatherings" },
        ],
        price: "$42",
        image: chocolateSheetImage.src,
        note: "Preorder",
      },
      {
        name: "Strawberry Shortcake",
        tagline: "Light sponge layered with cream and ripe strawberries.",
        description:
          "Our strawberry shortcake layers delicate sponge with softly whipped cream and berries that have been lightly macerated. The fruit stays bright and juicy, giving the whole cake a fresher feel than a traditional frosted cake. It is the one to order when you want something celebratory that still feels airy.",
        tags: ["seasonal", "berries", "airy", "limited dates"],
        details: [
          { key: "Layers", value: "Sponge, cream, berries" },
          { key: "Fruit", value: "Macerated strawberries" },
          { key: "Feel", value: "Fresh and airy" },
          { key: "Availability", value: "Seasonal dates" },
        ],
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
        tagline: "A rotating box of weekend bakes for porch pickup.",
        description:
          "This box includes six assorted bakes chosen from the weekend menu and packed fresh for Saturday pickup. The mix changes often, so it is a good way to try seasonal flavors or grab an easy dessert spread. Everything is boxed to travel well and still feel giftable when you arrive.",
        tags: ["assorted", "giftable", "weekend", "rotating menu"],
        details: [
          { key: "Count", value: "Six assorted bakes" },
          { key: "Pickup", value: "Saturday porch pickup" },
          { key: "Menu", value: "Rotates weekly" },
          { key: "Best For", value: "Easy hosting" },
        ],
        price: "$24",
        image: weekendTreatImage.src,
      },
      {
        name: "Birthday Dessert Box",
        tagline: "A small-format celebration box with candles included.",
        description:
          "A ready-to-go assortment built for smaller birthday moments that do not need a full cake. Expect a mix of cupcakes, cookies, and candles packed together so the whole celebration is handled in one pickup. It is especially useful for office birthdays, last-minute plans, or low-key family dinners.",
        tags: ["birthday", "gift box", "party ready", "small gathering"],
        details: [
          { key: "Includes", value: "Cupcakes, cookies, candles" },
          { key: "Format", value: "Small celebration box" },
          { key: "Best For", value: "Low-key birthdays" },
          { key: "Pickup", value: "Ready to grab" },
        ],
        price: "$28",
        image: birthdayBoxImage.src,
        outOfStock: true,
      },
      {
        name: "Mini Cookie Sampler",
        tagline: "A mixed dozen of mini cookies for gifting or sharing.",
        description:
          "This sampler packs a dozen miniature cookies in a rotating assortment of house favorites. The smaller size makes it easy to put out on a dessert table, tuck into a gift bag, or share across a group. It is a simple option when you want variety without committing to full-size dozens.",
        tags: ["sampler", "mini cookies", "shareable", "giftable"],
        details: [
          { key: "Count", value: "Twelve mini cookies" },
          { key: "Mix", value: "House favorites" },
          { key: "Size", value: "Party-friendly minis" },
          { key: "Best For", value: "Gifting or tables" },
        ],
        price: "$14",
        image: cookieSamplerImage.src,
        note: "Pickup Friday",
      },
    ],
  },
];
