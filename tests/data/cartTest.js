import { AddToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("Test suite : addToCart", () => {
  it("add an existing product", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    AddToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    console.log(cart);
    let matchingItem;
    cart.forEach((item) => {
      if (item.productId === "e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        matchingItem = item;
    });
    expect(matchingItem.quantity).toEqual(2);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it("add a new product", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    spyOn(localStorage, "setItem");
    loadFromStorage();
    AddToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].quantity).toEqual(1);
  });
});
