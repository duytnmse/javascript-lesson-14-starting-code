import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryPriceCents } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let paymentSummaryHTML = `
  <div class="payment-summary js-payment-summary">
  <div class="payment-summary-title">Order Summary</div>

  <div class="payment-summary-row">
    <div>Items (${cart.length}):</div>
    <div class="payment-summary-money">$${formatCurrency(itemsPrice())}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingPrice())}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(
      totalBeforeTax()
    )}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(totalTax())}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(totalAfterTax())}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
</div>
    `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}

//Total items'price
function itemsPrice() {
  let totalPrice = 0;
  cart.forEach((item) => {
    products.forEach((product) => {
      if (item.productId === product.id) {
        totalPrice += product.priceCents;
      }
    });
  });
  return totalPrice;
}
//Total shipping
function shippingPrice() {
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += getDeliveryPriceCents(item.productId);
  });
  return totalPrice;
}
//Total before tax
function totalBeforeTax() {
  return itemsPrice() + shippingPrice();
}
//Total tax 10%
function totalTax() {
  return totalBeforeTax() * 0.1;
}
//Total after tax
function totalAfterTax() {
  return totalBeforeTax() + totalTax();
}
