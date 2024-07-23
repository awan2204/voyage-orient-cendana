//Toggle class active Hamburger menu
const navbarNav = document.querySelector(".navbar-nav");

//ketika humberger menu diklik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

//klik diluar sidebar untuk menghilangkan nav hamburger menu nya
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// ===============================================================================================
//Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

//klik diluar search button untuk menghilangkan search boxnya
const search = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!search.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

// ==============================================================================

//button send message
function sendEmail() {
  // Prevent default form submission
  event.preventDefault();

  // Get form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Send the data to the server using fetch or an AJAX library
  fetch("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, phone, message }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        // Email sent successfully
        alert("Email sent successfully!");
      } else if (data.error) {
        // Error sending email
        alert("Error sending email: " + data.error);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred. Please try again later.");
    });
}

//Modal Box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");
const modalImage = document.querySelector("#item-detail-modal img");
const modalTitle = document.querySelector("#item-detail-modal h3");
const modalDescription = document.querySelector("#item-detail-modal p");

itemDetailButtons.forEach((btn, index) => {
  btn.onclick = (e) => {
    e.preventDefault();
    itemDetailModal.style.display = "flex";

    // Get the corresponding product card based on the button index
    const productCard = btn.closest(".product-card");

    // Get the image source, title, and description from the product card
    const imageSrc = productCard.querySelector(
      ".product-image-wrapper img"
    ).src;
    const title = productCard.querySelector(".product-details h3").textContent;
    const description =
      productCard.querySelector(".product-details p").textContent;

    // Set the modal content
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
  };
});

// Click on close icon
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

// Click outside the modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};
