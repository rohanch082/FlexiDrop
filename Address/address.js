const form = document.getElementById("addressForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const house = document.getElementById("house").value.trim();
    const street = document.getElementById("street").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const country = document.getElementById("country").value.trim();
    const type = document.getElementById("type").value;

    if(
        name==="" ||
        phone==="" ||
        email==="" ||
        house==="" ||
        street==="" ||
        city==="" ||
        state==="" ||
        pincode===""
    ){
        alert("Please fill all the fields.");
        return;
    }

    const address = {
        name,
        phone,
        email,
        house,
        street,
        city,
        state,
        pincode,
        country,
        type
    };

    localStorage.setItem("shippingAddress", JSON.stringify(address));

    alert("Address Saved Successfully!");

    form.reset();

    document.getElementById("country").value = "India";
});

localStorage.setItem("shippingAddress", JSON.stringify(address));

alert("Address Saved Successfully!");

window.location.href = "../Cart/cart.html";
