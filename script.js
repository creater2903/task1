document.addEventListener('DOMContentLoaded', function() {
    // Sample image data with categories
    const images = [
        { src: 'images/nature/natural_image1.jpg', category: 'nature', caption: 'Beautiful Nature' },
        { src: 'images/nature/natural_image2.jpg', category: 'nature', caption: 'Beautiful Nature' },
        { src: 'images/nature/natural_image3.jpg', category: 'nature', caption: 'Beautiful Nature' },
        { src: 'images/nature/natural_image4.jpg', category: 'nature', caption: 'Beautiful Nature' },
        
        { src: 'images/architecture/architecture_image1.jpg', category: 'architecture', caption: 'Modern Architecture' },
        { src: 'images/architecture/architecture_image2.jpg', category: 'architecture', caption: 'Modern Architecture' },
        { src: 'images/architecture/architecture_image3.jpg', category: 'architecture', caption: 'Modern Architecture' },
        { src: 'images/architecture/architecture_image4.jpg', category: 'architecture', caption: 'Modern Architecture' },

        { src: 'images/people/portrait_image1.jpg', category: 'people', caption: 'Portrait' },
        { src: 'images/people/portrait_image2.jpg', category: 'people', caption: 'Portrait' },
        { src: 'images/people/portrait_image3.jpg', category: 'people', caption: 'Portrait' },
        { src: 'images/people/portrait_image4.jpg', category: 'people', caption: 'Portrait' },
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentImageIndex = 0;

    // Initialize gallery
    function initGallery() {
        galleryGrid.innerHTML = '';
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${image.category}`;
            galleryItem.setAttribute('data-index', index);
            
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.caption}" class="gallery-img" loading="lazy">
                <div class="image-caption">${image.caption}</div>
            `;
            
            galleryItem.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Filter images by category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            if (filter === 'all') {
                document.querySelectorAll('.gallery-item').forEach(item => {
                    item.style.display = 'block';
                });
            } else {
                document.querySelectorAll('.gallery-item').forEach(item => {
                    item.style.display = item.classList.contains(filter) ? 'block' : 'none';
                });
            }
        });
    });

    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Update lightbox image
    function updateLightboxImage() {
        const image = images[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.caption;
    }

    // Navigate to previous image
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    }

    // Navigate to next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });

    // Initialize the gallery
    initGallery();
});