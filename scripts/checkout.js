import { cart, RemoveFromCart } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

//Render default cart
let cartSummaryHTML = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });
  // console.log(matchingProduct);
  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
    <div class="delivery-date">Delivery date: Tuesday, June 21</div>
  
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
addEventdeleteProduct();

//Handle delete link
function addEventdeleteProduct(matchingProduct) {
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
  let deliveryOptionsHTML = "";
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
    <div class="delivery-option">
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
