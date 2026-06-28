// ======== FLEXIDROP PAYMENT PAGE ========

// Load total from localStorage
const subtotalEl = document.getElementById("subtotal");
const discountEl = document.getElementById("discount");
const totalEl = document.getElementById("total");
const payBtn = document.getElementById("pay-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ======== CALCULATE SUMMARY ========
function updateSummary() {
  let subtotal = 0;
  cart.forEach((item) => {
    const price = parseInt(item.price.replace(/[₹,]/g, ""));
    subtotal += price * item.quantity;
  });

  const discount = subtotal > 3000 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal - discount;

  subtotalEl.innerText = `₹${subtotal.toLocaleString()}`;
  discountEl.innerText = discount > 0 ? `-₹${discount}` : "₹0";
  totalEl.innerText = `₹${total.toLocaleString()}`;
}
updateSummary();

// ======== PAYMENT METHOD SWITCH ========
const cardForm = document.querySelector(".card-form");
const upiForm = document.querySelector(".upi-form");
const codMsg = document.querySelector(".cod-msg");
const methods = document.querySelectorAll("input[name='payment']");

methods.forEach((m) => {
  m.addEventListener("change", () => {
    cardForm.classList.add("hidden");
    upiForm.classList.add("hidden");
    codMsg.classList.add("hidden");

    if (m.value === "card") cardForm.classList.remove("hidden");
    if (m.value === "upi") upiForm.classList.remove("hidden");
    if (m.value === "cod") codMsg.classList.remove("hidden");
  });
});

// ======== PAYMENT VALIDATION ========
payBtn.addEventListener("click", () => {
  const selected = document.querySelector("input[name='payment']:checked").value;

  if (selected === "card") {
    const num = document.getElementById("card-number").value;
    const name = document.getElementById("card-name").value;
    const cvv = document.getElementById("card-cvv").value;

    if (!name || num.length < 12 || cvv.length < 3) {
      alert("Please fill valid card details.");
      return;
    }
  }

  if (selected === "upi") {
    const upi = document.getElementById("upi-id").value;
    if (!upi.includes("@")) {
      alert("Please enter a valid UPI ID.");
      return;
    }
  }

  // Clear cart after payment
  localStorage.removeItem("cart");

  alert("✅ Payment Successful! Thank you for shopping with FlexiDrop.");
  window.location.href = "../Home/home.html";
});
