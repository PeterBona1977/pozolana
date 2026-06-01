document.addEventListener("DOMContentLoaded", function() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");
    const galleryTriggers = document.querySelectorAll(".gallery-trigger");

    // Imagens da galeria do Monte Bom
    const galleries = {
        'monte-bom': [
            'assets/images/portfolio/monte_bom/1.jpg',
            'assets/images/portfolio/monte_bom/2.jpg',
            'assets/images/portfolio/monte_bom/3.jpg',
            'assets/images/portfolio/monte_bom/4.jpg',
            'assets/images/portfolio/monte_bom/5.jpg'
        ],
        'carcavelos': [
            'assets/images/portfolio/carcavelos/1.jpg',
            'assets/images/portfolio/carcavelos/2.jpg'
        ],
        'freiria': [
            'assets/images/portfolio/freiria/1.jpg',
            'assets/images/portfolio/freiria/2.jpg',
            'assets/images/portfolio/freiria/3.jpg',
            'assets/images/portfolio/freiria/4.jpg',
            'assets/images/portfolio/freiria/5.jpg'
        ],
        'alagoa': [
            'assets/images/portfolio/alagoa/1.jpg',
            'assets/images/portfolio/alagoa/2.jpg',
            'assets/images/portfolio/alagoa/3.jpg',
            'assets/images/portfolio/alagoa/4.jpg',
            'assets/images/portfolio/alagoa/5.jpg'
        ]
    };

    let currentGallery = [];
    let currentIndex = 0;

    if (!lightbox) return; // Se não houver lightbox na página, sai

    galleryTriggers.forEach(trigger => {
        trigger.addEventListener("click", function() {
            const galleryId = this.getAttribute("data-gallery");
            if (galleries[galleryId]) {
                currentGallery = galleries[galleryId];
                currentIndex = 0;
                showImage(currentIndex);
                lightbox.style.display = "block";
                document.body.style.overflow = "hidden"; // Prevent scrolling
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    }

    function showImage(index) {
        if (index >= currentGallery.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = currentGallery.length - 1;
        } else {
            currentIndex = index;
        }
        
        // Remove and re-add img to trigger animation
        lightboxImg.src = "";
        setTimeout(() => {
            lightboxImg.src = currentGallery[currentIndex];
        }, 10);
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            showImage(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            showImage(currentIndex + 1);
        });
    }

    // Keyboard navigation
    document.addEventListener("keydown", function(e) {
        if (lightbox.style.display === "block") {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") showImage(currentIndex - 1);
            if (e.key === "ArrowRight") showImage(currentIndex + 1);
        }
    });
});
