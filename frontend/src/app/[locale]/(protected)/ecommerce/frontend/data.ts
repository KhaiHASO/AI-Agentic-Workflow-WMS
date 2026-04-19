import { faker } from "@faker-js/faker";
export const products = [
  {
    id: "c06d48bf-7f35-4789-b71e-d80fee5b430t",
    img: "",
    category: "men",
    name: "Classical Black T-Shirt Classical Black T-Shirt",
    subtitle: "The best cotton black branded shirt.",
    desc: "The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt.",
    rating: "4.8",
    price: 489,
    oldPrice: "$700",
    percent: "40%",
    brand: "apple",
  },
  {
    id: faker.string.uuid(),
    img: "",
    category: "men",
    name: "Classical Black T-Shirt",
    subtitle: "The best cotton black branded shirt.",
    desc: "The best cotton black branded shirt",
    rating: "4.8",
    price: 20,
    oldPrice: "$700",
    percent: "40%",
    brand: "apex",
  },
  {
    id: faker.string.uuid(),
    img: "",
    category: "women",
    name: "Classical Black T-Shirt",
    subtitle: "The best cotton black branded shirt.",
    desc: "The best cotton black branded shirt",
    rating: "4.8",
    price: 120,
    oldPrice: "$700",
    percent: "40%",
    brand: "easy",
  },
  {
    id: faker.string.uuid(),
    img: "",
    category: "women",
    name: "Classical Black T-Shirt",
    subtitle: "The best cotton black branded shirt.",
    desc: "The best cotton black branded shirt",
    rating: "4.8",
    price: 70,
    oldPrice: "$700",
    percent: "40%",
    brand: "pixel",
  },
  {
    id: faker.string.uuid(),
    img: "",
    category: "baby",
    name: "Classical Black T-Shirt",
    subtitle: "The best cotton black branded shirt.",
    desc: "The best cotton black branded shirt",
    rating: "4.8",
    price: 30,
    oldPrice: "$700",
    percent: "40%",
    brand: "apex",
  },
  {
    id: faker.string.uuid(),
    img: "",
    category: "women",
    name: "Classical Black T-Shirt",
    subtitle: "The best cotton black branded shirt.",
    desc: "The best cotton black branded shirt",
    rating: "4.8",
    price: 40,
    oldPrice: "$700",
    percent: "40%",
    brand: "apple",
  },
  {
    id: faker.string.uuid(),
    img: "",
    category: "women",
    name: "Classical Black T-Shirt",
    subtitle: "The best cotton black branded shirt.",
    desc: "The best cotton black branded shirt",
    rating: "4.8",
    price: 90,
    oldPrice: "$700",
    percent: "40%",
    brand: "easy",
  },
  {
    id: faker.string.uuid(),
    img: "",
    category: "women",
    name: "Classical Black T-Shirt",
    subtitle: "The best cotton black branded shirt.",
    desc: "The best cotton black branded shirt",
    rating: "4.8",
    price: 80,
    oldPrice: "$700",
    percent: "40%",
    brand: "pixel",
  },
  {
    id: faker.string.uuid(),
    img: "",
    category: "furniture",
    name: "Classical Black T-Shirt",
    subtitle: "The best cotton black branded shirt.",
    desc: "The best cotton black branded shirt",
    rating: "4.8",
    price: 20,
    oldPrice: "$700",
    percent: "40%",
    brand: "samsung",
  },
];
export type product = (typeof products)[number];

export const getProducts = async () => {
  return products;
};

export const getProductById = async (id: string) => {
  return products.find((product) => product.id === id);
};


//
export const categories = [
  { label: "All", value: "all", count: "9724" },
  { label: "Men", value: "men", count: "1312" },
  { label: "Women", value: "women", count: "3752" },
  { label: "Child", value: "child", count: "985" },
  { label: "Baby", value: "baby", count: "745" },
  { label: "Footwear", value: "footwear", count: "1280" },
  { label: "Furniture", value: "furniture", count: "820" },
  { label: "Mobile", value: "mobile", count: "2460" },
];
export type category = (typeof categories)[number];
//
export const brands = [
  { label: "Apple", value: "apple", count: "9724" },
  { label: "Apex", value: "apex", count: "1312" },
  { label: "Easy", value: "easy", count: "3752" },
  { label: "Pixel", value: "pixel", count: "985" },
  { label: "Samsung", value: "samsung", count: "2460" },
];
export type brand = (typeof brands)[number];
//
export const prices = [
  {
    label: "$0 - $199",
    value: {
      min: 0,
      max: 199,
    },
    count: "9724",
  },
  {
    label: "$200 - $449",
    value: {
      min: 200,
      max: 499,
    },
    count: "1312",
  },
  {
    label: "$450 - $599",
    value: {
      min: 450,
      max: 599,
    },
    count: "3752",
  },
  {
    label: "$600 - $799",
    value: {
      min: 600,
      max: 799,
    },
    count: "985",
  },
  {
    label: "$800 & Above",
    value: {
      min: 800,
      max: 1000,
    },
    count: "745",
  },
];
export type price = (typeof prices)[number];
//
export const ratings = [
  { name: 5, value: 5, count: "9724" },
  { name: 4, value: 4, count: "1312" },
  { name: 3, value: 3, count: "3752" },
  { name: 2, value: 2, count: "985" },
  { name: 1, value: 1, count: "2460" },
];
export type rating = (typeof ratings)[number];
//
export const selectOptions = [
  {
    value: "option1",
    label: "Option 1",
  },
  {
    value: "option2",
    label: "Option 2",
  },
  {
    value: "option3",
    label: "Option 3",
  },
];
export type selectOption = (typeof selectOptions)[number];
//
export const selectCategories = [
  {
    value: "option1",
    label: "Top Rated"
  },
  {
    value: "option2",
    label: "Option 2"
  },
  {
    value: "option3",
    label: "Option 3"
  }
];
export type selectCategory = (typeof selectCategories)[number];
//
export const payments = [
  {
    img: "",
    value: "bkash",
  },
  {
    img: "",
    value: "fatoorah",
  },
  {
    img: "",
    value: "instamojo",
  },
  {
    img: "",
    value: "iyzco",
  },
  {
    img: "",
    value: "nagad",
  },
  {
    img: "",
    value: "ngenious",
  },

  {
    img: "",
    value: "payfast",
  },
  {
    img: "",
    value: "payku",
  },
  {
    img: "",
    value: "paypal",
  },
  {
    img: "",
    value: "paytm",
  },
  {
    img: "",
    value: "razorpay",
  },
  {
    img: "",
    value: "ssl",
  },
  {
    img: "",
    value: "stripe",
  },
  {
    img: "",
    value: "truck",
  },
  {
    img: "",
    value: "vougepay",
  },
];
export type payment = (typeof payments)[number];

export type EcommerceNav = {
  label: string
  href: string
  active: boolean
  icon: string
}

export function getEcommerceNav(pathname: string): EcommerceNav[] {
  return [
    {
      label: 'grid view',
      href: "/ecommerce/frontend",
      icon: "heroicons:view-columns",
      active: pathname === "/ecommerce/frontend",
    },
    {
      label: 'list view',
      href: "/ecommerce/frontend/list",
      icon: "heroicons:list-bullet",
      active: pathname === "/ecommerce/frontend/list",
    }
  ]
}

