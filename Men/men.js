let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cartCount");

/* UPDATE CART COUNT */
function updateCartCount() {
  cartCount.innerText = cart.length;
}
updateCartCount();

/* ADD TO CART */
document.addEventListener("click", function (e) {
  if (e.target.innerText === "Add to Cart") {
    const card = e.target.closest(".men-card");

    const product = {
      name: card.querySelector("h3").innerText,
      price: card.querySelector(".price").innerText,
      image: card.querySelector("img").src,
      quantity: 1
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    e.target.innerText = "Added ✔";
    setTimeout(() => e.target.innerText = "Add to Cart", 1200);
  }
});

/* SEARCH */
document.getElementById("searchMen").addEventListener("keyup", function () {
  let value = this.value.toLowerCase();
  document.querySelectorAll(".men-card").forEach(card => {
    let title = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = title.includes(value) ? "flex" : "none";
  });
});
