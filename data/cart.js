import { deliveryOptions } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem("localStorageCart"));

if (!cart || cart.length === 0) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}
function SaveToLocalStorage() {
  localStorage.setItem("localStorageCart", JSON.stringify(cart));
}

export const AddToCart = (productId) => {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  SaveToLocalStorage();
};

export const RemoveFromCart = (productId) => {
  const newCart = [];
  cart.forEach((item) => {
    if (item.productId !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  SaveToLocalStorage();
};

export const updateDeliveryOption = (newProductId, newDeliveryOptionId) => {
  cart.forEach((cartItem) => {
    if (cartItem.productId === newProductId) {
      cartItem.deliveryOptionId = newDeliveryOptionId;
      SaveToLocalStorage();
    }
  });
};
