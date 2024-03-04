export let cart = JSON.parse(localStorage.getItem("localStorageCart"));

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
