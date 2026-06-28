// ========= FLEXIDROP CART PAGE SCRIPT =========

// Load cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.querySelector(".cart-items");
const subtotalEl = document.getElementById("subtotal");
const discountEl = document.getElementById("discount");
const totalEl = document.getElementById("total");

// ========= RENDER CART =========
function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <h3>Your cart is empty 😢</h3>
        <a href="../Home/home.html" class="back-btn">Return to Shop</a>
      </div>`;
    subtotalEl.innerText = "₹0";
    discountEl.innerText = "₹0";
    totalEl.innerText = "₹0";
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="item-details">
        <h3>${item.title}</h3>
        <p class="desc">${item.price}</p>
        <div class="quantity">
          <button class="qty-btn decrease" data-index="${index}">-</button>
          <span class="qty">${item.quantity}</span>
          <button class="qty-btn increase" data-index="${index}">+</button>
        </div>
      </div>
      <div class="item-price">
        <p>${item.price}</p>
        <i class="ri-delete-bin-6-line remove" data-index="${index}"></i>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  attachEvents();
  calculateTotal();
}

// ========= ATTACH EVENT LISTENERS =========
function attachEvents() {
  document.querySelectorAll(".increase").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      cart[index].quantity++;
      saveCart();
      renderCart();
    });
  });

  document.querySelectorAll(".decrease").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart();
        renderCart();
      }
    });
  });

  document.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });
  });
}

// ========= SAVE CART TO LOCAL STORAGE =========
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ========= CALCULATE TOTALS =========
function calculateTotal() {
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

// ========= INITIATE =========
renderCart();

// ========= CHECKOUT BUTTON =========
document.getElementById("checkout-btn").addEventListener("click", () => {
  // Save current cart to localStorage for the payment page
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to the payment page
  window.location.href = "../Payment/payment.html";
});

const addressBox = document.getElementById("deliveryAddress");

const savedAddress = JSON.parse(localStorage.getItem("shippingAddress"));

if(savedAddress){

    addressBox.innerHTML = `
        <h3>Delivery Address</h3>

        <p><strong>${savedAddress.name}</strong></p>

        <p>
            ${savedAddress.house},
            ${savedAddress.street},
            ${savedAddress.city},
            ${savedAddress.state}
            - ${savedAddress.pincode}
        </p>

        <p>${savedAddress.phone}</p>

        <a href="../Address/address.html">
            Change Address
        </a>
    `;
}