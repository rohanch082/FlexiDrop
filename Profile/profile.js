// Load user info (from localStorage if available)
const username = document.getElementById("username");
const userEmail = document.getElementById("userEmail");

const savedUser = localStorage.getItem("user");

if (savedUser) {
  username.innerText = savedUser.split("@")[0];
  userEmail.innerText = savedUser;
}

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  alert("Logged out successfully!");
  window.location.href = "login.html";
});

// Profile picture upload
const uploadPic = document.getElementById("uploadPic");
const profileImg = document.querySelector(".profile-pic img");

uploadPic.addEventListener("change", () => {
  const file = uploadPic.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profileImg.src = reader.result;
      localStorage.setItem("profilePic", reader.result);
    };
    reader.readAsDataURL(file);
  }
});

// Load saved profile pic
const savedPic = localStorage.getItem("profilePic");
if (savedPic) {
  profileImg.src = savedPic;
}
