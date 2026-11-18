
// MOBILE NAVBAR

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }
});

// CLOSE MENU AFTER CLICK

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");
        icon.classList.replace("fa-xmark", "fa-bars");
    });
});

// RESERVATION FORM

const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");
const dateInput = document.getElementById("date");

// Prevent past date selection
const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;

reservationForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const date = dateInput.value;
    const guests = document.getElementById("guests").value;
    const time = document.getElementById("time").value;

    if (!name || !email || !phone || !date || !guests || !time) {
        formMessage.style.color = "#ff5555";
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    const booking = {
        name,
        email,
        phone,
        date,
        guests,
        time
    };

    // Demo booking: save in browser
    const bookings = JSON.parse(
        localStorage.getItem("restaurantBookings") || "[]"
    );

    bookings.push(booking);

    localStorage.setItem(
        "restaurantBookings",
        JSON.stringify(bookings)
    );

    formMessage.style.color = "#c9a45c";
    formMessage.textContent =
        "Thank you " + name + "! Your booking request has been saved.";

    reservationForm.reset();
    dateInput.min = localToday;
});

// SIMPLE SCROLL REVEAL

const revealElements = document.querySelectorAll(
    ".about-content, .about-image, .food-card, .feature"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all .7s ease";
    observer.observe(element);
});
