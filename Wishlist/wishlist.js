let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("wishlist-container");
const emptyMsg = document.getElementById("empty-msg");

/* RENDER WISHLIST */
function renderWishlist() {
  container.innerHTML = "";

  if (wishlist.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  wishlist.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "wishlist-card";

    card.innerHTML = `
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p class="price">${item.price}</p>
      <button class="add-cart">Add to Cart</button>
      <button class="remove">Remove</button>
    `;

    /* ADD TO CART */
    card.querySelector(".add-cart").onclick = () => {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart ✔");
    };

    /* REMOVE FROM WISHLIST */
    card.querySelector(".remove").onclick = () => {
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      renderWishlist();
    };

    container.appendChild(card);
  });
}

renderWishlist();
