import { cart, RemoveFromCart, updateDeliveryOption } from "../data/cart.js";
import { deliveryOptions, getDeliveryDays } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

//Render default cart
function renderOrderSummary() {
  let cartSummaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
      }
    });
    //Handle delivery-date-title
    let today = dayjs();
    let deliveryDateString = "";
    deliveryDateString = today.add(getDeliveryDays(productId), "days");
    //Generate HTML item in cart
    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
    <div class="delivery-date js-delivery-date-${
      matchingProduct.id
    }">Delivery date: ${deliveryDateString.format("dddd, MMM YY")}</div>
  
    <div class="cart-item-details-grid">
      <img
        class="product-image"
        src="${matchingProduct.image}"
      />
  
      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">$
        ${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span> Quantity: <span class="quantity-label">${
            cartItem.quantity
          }</span> </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
            matchingProduct.id
          }">
            Delete
          </span>
        </div>
      </div>
  
      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  </div>
    `;
  });
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  //add eventlistener
  addEventdeleteProduct();
  addEventDeliveryOption();
}
//Handle delete link
function addEventdeleteProduct() {
  let deleteLinks = document.querySelectorAll(".js-delete-link");
  deleteLinks.forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      //Handle function
      const deletedProductId = deleteLink.dataset.productId;
      // cart.forEach((item, index) => {
      //   if (item.productId === deletedProductId) {
      //     cart.splice(index, 1);
      //   }
      // });
      RemoveFromCart(deletedProductId);
      // RenderCart();
      const container = document.querySelector(
        `.js-cart-item-container-${deletedProductId}`
      );
      container.remove();
    });
  });
}
//deliveryOptionsHTML
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";
  const today = dayjs();
  deliveryOptions.forEach((deliveryOption) => {
    let isChecked = false;
    if (deliveryOption.id === cartItem.deliveryOptionId) {
      isChecked = true;
    }
    const deliveryDay = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDay.format("dddd, MMM D");
    const priceDollarsString =
      deliveryOption.priceCents === 0
        ? "FREE Shipping"
        : "$" + formatCurrency(deliveryOption.priceCents) + " - Shipping";
    html += `
    <div class="delivery-option js-delivery-option" data-product-id="${
      matchingProduct.id
    }" data-delivery-id="${deliveryOption.id}">
    <input
      type="radio"
      ${isChecked ? "checked" : ""}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}"
    />
    <div>
      <div class="delivery-option-date">${dateString}
      </div>
      <div class="delivery-option-price">${priceDollarsString}</div>
    </div>
  </div>
    `;
  });
  return html;
}
//Handle onclick for Delivery option
function addEventDeliveryOption() {
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryId } = element.dataset;
      updateDeliveryOption(productId, deliveryId);
      renderOrderSummary();
    });
  });
}

renderOrderSummary();
