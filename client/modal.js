class ImageCarousel {
    constructor() {
        this.modal = null;
        this.currentSlide = 0;
        this.slides = [];
        this.projectData = [];
        this.init();
    }

    init() {
        this.createModal();
        this.setupEventListeners();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-button">&times;</button>
                <div class="carousel">
                    <button class="carousel-button prev-button">&#10094;</button>
                    <button class="carousel-button next-button">&#10095;</button>
                    <div class="project-info">
                        <h3></h3>
                        <p></p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        this.modal = modal;
    }

    setupEventListeners() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.addEventListener('click', () => this.openModal(index));
        });

        const closeButton = this.modal.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeModal());
        }

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'block') {
                switch(e.key) {
                    case 'ArrowLeft': this.prevSlide(); break;
                    case 'ArrowRight': this.nextSlide(); break;
                    case 'Escape': this.closeModal(); break;
                }
            }
        });
    }

    openModal(index) {
        this.collectProjectData();
        this.currentSlide = index;
        this.createSlides();
        this.updateSlide();
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    collectProjectData() {
        this.projectData = [];
        document.querySelectorAll('.project-card').forEach(card => {
            const img = card.querySelector('img');
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            this.projectData.push({ image: img.src, title, description });
        });
    }

    createSlides() {
        const carousel = this.modal.querySelector('.carousel');
        this.slides = this.projectData.map(project => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
            carousel.appendChild(slide);
            return slide;
        });
    }

    updateSlide() {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.slides[this.currentSlide].classList.add('active');

        const projectInfo = this.modal.querySelector('.project-info');
        projectInfo.querySelector('h3').textContent = this.projectData[this.currentSlide].title;
        projectInfo.querySelector('p').textContent = this.projectData[this.currentSlide].description;
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlide();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlide();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageCarousel();
});
