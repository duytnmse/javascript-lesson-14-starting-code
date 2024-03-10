import { cart } from "./cart.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export const getDeliveryDays = (productId) => {
  let days = "";
  let matchingItem = "";
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  deliveryOptions.forEach((deliveryOption) => {
    if (matchingItem.deliveryOptionId === deliveryOption.id) {
      days = deliveryOption.deliveryDays;
    }
  });
  return days;
};

export const getDeliveryPriceCents = (productId) => {
  let priceCents = 0;
  let matchingItem = "";
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  deliveryOptions.forEach((deliveryOption) => {
    if (matchingItem.deliveryOptionId === deliveryOption.id) {
      priceCents = deliveryOption.priceCents;
    }
  });
  return priceCents;
};
