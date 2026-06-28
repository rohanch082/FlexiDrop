// Toggle password visibility
const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

toggle.addEventListener("click", () => {
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  toggle.classList.toggle("ri-eye-line");
  toggle.classList.toggle("ri-eye-off-line");
});

// Simple form validation
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const pwd = password.value.trim();

  if (email === "" || pwd === "") {
    alert("Please fill all fields!");
    return;
  }

  // Mock login check
  if (email === "test@demo.com" && pwd === "12345") {
    alert("Login successful! Redirecting...");
    window.location.href = "index.html"; // Redirect to homepage
  } else {
    alert("Invalid credentials. Try again!");
  }
});
