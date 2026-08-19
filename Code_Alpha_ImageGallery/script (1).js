// Get gallery elements
const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

// Lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

const closeButton = document.getElementById("close");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let visibleItems = [];
let currentIndex = 0;


// =========================
// UPDATE VISIBLE IMAGES
// =========================

function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(
        item => item.style.display !== "none"
    );
}


// =========================
// IMAGE FILTER
// =========================

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        const filter = this.dataset.filter;

        galleryItems.forEach(item => {

            if (
                filter === "all" ||
                item.dataset.category === filter
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

        updateVisibleItems();
    });

});


// =========================
// OPEN LIGHTBOX
// =========================

galleryItems.forEach(item => {

    item.addEventListener("click", function () {

        updateVisibleItems();

        currentIndex = visibleItems.indexOf(this);

        showImage();

        lightbox.classList.add("show");

        document.body.style.overflow = "hidden";
    });

});


// =========================
// SHOW IMAGE
// =========================

function showImage() {

    const item = visibleItems[currentIndex];

    if (!item) return;

    const image = item.querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = item.dataset.title;
}


// =========================
// NEXT IMAGE
// =========================

function nextImage() {

    if (visibleItems.length === 0) return;

    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    showImage();
}


// =========================
// PREVIOUS IMAGE
// =========================

function previousImage() {

    if (visibleItems.length === 0) return;

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    showImage();
}


// =========================
// NEXT / PREVIOUS BUTTONS
// =========================

nextButton.addEventListener("click", function () {
    nextImage();
});

previousButton.addEventListener("click", function () {
    previousImage();
});


// =========================
// CLOSE LIGHTBOX
// =========================

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";
}

closeButton.addEventListener("click", closeLightbox);


// =========================
// CLOSE BY CLICKING OUTSIDE
// =========================

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// =========================
// KEYBOARD CONTROLS
// =========================

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

});


// =========================
// INITIALIZE GALLERY
// =========================

updateVisibleItems();