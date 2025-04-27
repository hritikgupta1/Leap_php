
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    const arrowIcon = document.querySelector(".dropdown a .ast-icon.icon-arrow");

    dropdown.addEventListener("click", function (event) {
        event.stopPropagation();
        this.querySelector(".dropdown-menu").classList.toggle("show");
        arrowIcon.classList.toggle("rotate");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function () {
        document.querySelector(".dropdown-menu").classList.remove("show");
        arrowIcon.classList.remove("rotate");
    });
});

//for about img scrolling effect
document.addEventListener("DOMContentLoaded", function () {
    const aboutImage = document.querySelector(".about-image img");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    aboutImage.classList.add("show"); // Reveal the image
                }
            });
        },
        { threshold: 0.3 } // Triggers when 30% of the image is visible
    );

    observer.observe(aboutImage);
});


// for gallery section
document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentIndex = 0;
    let zoomed = false;

    // Open Lightbox with Selected Image
    function openLightbox(index) {
        currentIndex = index;
        lightbox.style.display = "flex";
        lightboxImg.src = galleryItems[currentIndex].src;
        lightboxImg.style.transform = "scale(1)";
        zoomed = false;
    }

    // Close Lightbox
    function closeLightbox() {
        lightbox.style.display = "none";
        lightboxImg.style.transform = "scale(1)";
        zoomed = false;
    }

    // Change Image (Next or Previous)
    function changeImage(direction) {
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = galleryItems.length - 1;
        if (currentIndex >= galleryItems.length) currentIndex = 0;
        lightboxImg.src = galleryItems[currentIndex].src;
    }

    // Zoom In and Out on Clicked Position
    lightboxImg.addEventListener("click", function (event) {
        if (!zoomed) {
            // Get Click Position
            let rect = lightboxImg.getBoundingClientRect();
            let offsetX = event.clientX - rect.left; // Click X inside image
            let offsetY = event.clientY - rect.top;  // Click Y inside image
            let percentX = (offsetX / rect.width) * 100;
            let percentY = (offsetY / rect.height) * 100;

            // Apply Transform Origin at Clicked Position
            lightboxImg.style.transformOrigin = `${percentX}% ${percentY}%`;
            lightboxImg.style.transform = "scale(2)";
        } else {
            // Reset Zoom
            lightboxImg.style.transform = "scale(1)";
            lightboxImg.style.transformOrigin = "center";
        }
        zoomed = !zoomed;
    });

    // Open Lightbox on Click
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            openLightbox(index);
        });
    });

    // Close Lightbox on Background Click (Not on Image)
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    closeBtn.addEventListener("click", closeLightbox);

    // Prevent Lightbox from Closing When Clicking Navigation Buttons
    nextBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        changeImage(1);
    });

    prevBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        changeImage(-1);
    });

    // Keyboard Controls (Arrow Keys & Escape)
    document.addEventListener("keydown", function (event) {
        if (lightbox.style.display === "flex") {
            if (event.key === "ArrowRight") changeImage(1);
            if (event.key === "ArrowLeft") changeImage(-1);
            if (event.key === "Escape") closeLightbox();
        }
    });
});

// for gallery
// document.addEventListener("DOMContentLoaded", function () {
//     const galleryItems = document.querySelectorAll(".gallery-item");
//     const lightbox = document.getElementById("lightbox");
//     const lightboxImg = document.getElementById("lightbox-img");
//     const closeBtn = document.querySelector(".close");
//     const prevBtn = document.querySelector(".prev");
//     const nextBtn = document.querySelector(".next");

//     let currentIndex = 0;
//     let zoomed = false;

//     // Open Lightbox with Selected Image
//     function openLightbox(index) {
//         currentIndex = index;
//         lightbox.style.display = "flex";
//         lightboxImg.src = galleryItems[currentIndex].src;
//     }

//     // Close Lightbox
//     function closeLightbox() {
//         lightbox.style.display = "none";
//         lightboxImg.style.transform = "scale(1)";
//         zoomed = false;
//     }

//     // Navigate to Next or Previous Image
//     function changeImage(direction) {
//         currentIndex += direction;
//         if (currentIndex < 0) currentIndex = galleryItems.length - 1;
//         if (currentIndex >= galleryItems.length) currentIndex = 0;
//         lightboxImg.src = galleryItems[currentIndex].src;
//     }

//     // Zoom In and Out on Click
//     lightboxImg.addEventListener("click", function () {
//         zoomed = !zoomed;
//         lightboxImg.style.transform = zoomed ? "scale(2)" : "scale(1)";
//     });

//     // Event Listeners for Gallery Items
//     galleryItems.forEach((item, index) => {
//         item.addEventListener("click", function () {
//             openLightbox(index);
//         });
//     });

//     // Close Lightbox on Click Outside Image (but not buttons)
//     lightbox.addEventListener("click", function (event) {
//         if (event.target === lightbox) {
//             closeLightbox();
//         }
//     });

//     closeBtn.addEventListener("click", closeLightbox);

//     // Prevent Closing When Clicking Next & Prev Buttons
//     nextBtn.addEventListener("click", function (event) {
//         event.stopPropagation();  // Prevents lightbox from closing
//         changeImage(1);
//     });

//     prevBtn.addEventListener("click", function (event) {
//         event.stopPropagation();  // Prevents lightbox from closing
//         changeImage(-1);
//     });

//     // Keyboard Controls (Arrow Keys & Escape)
//     document.addEventListener("keydown", function (event) {
//         if (lightbox.style.display === "flex") {
//             if (event.key === "ArrowRight") changeImage(1); // Next
//             if (event.key === "ArrowLeft") changeImage(-1); // Previous
//             if (event.key === "Escape") closeLightbox(); // Close
//         }
//     });
// });





// for changing values dynamically of stats section
document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("stats-table");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting();
                observer.unobserve(table); // Ensure counting happens only once
            }
        });
    }, { threshold: 0.5 });

    observer.observe(table);

    function startCounting() {
        let tds = document.querySelectorAll("#stats-table td");
        let maxCount = Math.max(...Array.from(tds).map(td => parseInt(td.getAttribute("data-count"))));
        let duration = 2000; // Total animation time in milliseconds
        let steps = 50; // Number of steps to reach final value
        let intervalTime = duration / steps; // Time per step

        let stepCounts = Array.from(tds).map(td => parseInt(td.getAttribute("data-count")) / steps);
        let currentCounts = Array(tds.length).fill(0);

        let interval = setInterval(() => {
            let allComplete = true;

            tds.forEach((td, index) => {
                currentCounts[index] += stepCounts[index];

                if (currentCounts[index] >= parseInt(td.getAttribute("data-count"))) {
                    currentCounts[index] = parseInt(td.getAttribute("data-count"));
                } else {
                    allComplete = false;
                }

                td.innerText = Math.round(currentCounts[index]).toLocaleString() + "+";
            });

            if (allComplete) clearInterval(interval);
        }, intervalTime);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Clientele section loaded successfully!");
});

// Contact form script
document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
        name: this.name.value,
        email: this.email.value,
        Mobile: this.Mobile.value,
        message: this.message.value
    };

    const responseMessage = document.getElementById("responseMessage");

    try {
        const response = await fetch("send2.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            responseMessage.style.color = "green";
            responseMessage.textContent = result.message || "Message sent successfully!";
            this.reset(); // Clear the form
        } else {
            responseMessage.style.color = "red";
            responseMessage.textContent = result.message || "Error sending message.";
        }

    } catch (error) {
        responseMessage.style.color = "red";
        responseMessage.textContent = "An unexpected error occurred.";
        console.error("Error:", error);
    }
});



// for events countdown
function countdown(id, eventDate) {
    let now = new Date().getTime();
    let timeLeft = eventDate - now;
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    document.getElementById(id).innerHTML = `Starts in ${days} days!`;
}
countdown("countdown1", new Date("March 20, 2025").getTime());
countdown("countdown2", new Date("April 5, 2025").getTime());
