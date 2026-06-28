// ========= FLEXIDROP HOME PAGE SCRIPT =========

// Select elements
const cartButtons = document.querySelectorAll(".item button");
const cartIcon = document.querySelector(".ri-shopping-cart-fill");
const wishlistIcon = document.querySelector(".ri-heart-line");
const searchBox = document.getElementById("searchbox");
const items = document.querySelectorAll(".item");
let cartCount = 0;

// ========= TRENDING ITEMS – ADD TO CART (NO POPUP) =========

cartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".item");

    const title = item.querySelector("h3").innerText;
    const price = item.querySelector(".price").innerText;
    const img = item.querySelector("img").src;

    // Get cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add product
    cart.push({ title, price, img, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart badge
    updateCartIcon();

    // Button feedback (SAME AS NEW ARRIVALS)
    btn.innerText = "Added ✔";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerText = "Add to Cart";
      btn.disabled = false;
    }, 1200);
  });
});


// ========= UPDATE CART ICON BADGE =========
function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let badge = document.querySelector(".cart-badge");

  if (!badge) {
    badge = document.createElement("span");
    badge.classList.add("cart-badge");
    cartIcon.parentElement.style.position = "relative";
    badge.style.cssText = `
      position: absolute;
      top: -8px;
      right: -8px;
      background: red;
      color: white;
      font-size: 12px;
      padding: 2px 6px;
      border-radius: 50%;
    `;
    cartIcon.parentElement.appendChild(badge);
  }

  badge.innerText = cart.length;
}

// ========= WISHLIST TOGGLE =========
wishlistIcon.addEventListener("click", () => {
  wishlistIcon.classList.toggle("ri-heart-line");
  wishlistIcon.classList.toggle("ri-heart-fill");
  wishlistIcon.style.color = wishlistIcon.classList.contains("ri-heart-fill") ? "red" : "inherit";
});

// ========= SEARCH FILTER =========
searchBox.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  items.forEach((item) => {
    const name = item.querySelector("h3")?.innerText.toLowerCase() || "";
    item.style.display = name.includes(searchText) ? "block" : "none";
  });
});

// ========= ITEM HOVER EFFECT =========
items.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "scale(1.05)";
    item.style.transition = "0.3s";
    item.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
  });
  item.addEventListener("mouseleave", () => {
    item.style.transform = "scale(1)";
    item.style.boxShadow = "none";
  });
});

// ========= SHOW INITIAL CART COUNT =========
window.addEventListener("load", () => {
  updateCartIcon();
});

// ========= PROFILE DROPDOWN =========
const profileMenu = document.querySelector('.profile-menu');
const dropdown = document.querySelector('.profile-dropdown');

profileMenu.addEventListener('mouseenter', () => {
  dropdown.style.display = 'flex';
  dropdown.style.opacity = 0;
  setTimeout(() => {
    dropdown.style.opacity = 1;
    dropdown.style.transition = 'opacity 0.3s ease';
  }, 50);
});

profileMenu.addEventListener('mouseleave', () => {
  dropdown.style.opacity = 0;
  setTimeout(() => {
    dropdown.style.display = 'none';
  }, 300);
});

// ========= NEW ARRIVALS ADD TO CART =========

const newArrivalButtons = document.querySelectorAll("#NewArrivals .card button");

newArrivalButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");

    const title = card.querySelector("h3").innerText;
    const price = card.querySelector(".price").innerText;
    const img = card.querySelector("img").src;

    // Get existing cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add product
    cart.push({ title, price, img, quantity: 1 });

    // Save back
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart badge
    updateCartIcon();

    // Button feedback
    btn.innerText = "Added ✔";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerText = "Add to Cart";
      btn.disabled = false;
    }, 1200);
  });
});

// ========= SEARCH FOR NEW ARRIVALS TOO =========

const newArrivalCards = document.querySelectorAll("#NewArrivals .card");

searchBox.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();

  newArrivalCards.forEach((card) => {
    const name = card.querySelector("h3")?.innerText.toLowerCase() || "";
    card.style.display = name.includes(searchText) ? "flex" : "none";
  });
});

// Footer social icon click
document.querySelectorAll(".social-icons i").forEach(icon => {
    icon.addEventListener("click", () => {
        alert("Social media link will be added soon!");
    });
});
