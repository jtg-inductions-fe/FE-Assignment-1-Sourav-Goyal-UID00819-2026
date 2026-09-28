import EmblaCarousel from 'embla-carousel';

export function setupCarousel(exclude = []) {
    const carousels = document.querySelectorAll('.carousel');
    if (carousels.length <= 0) {
        return;
    }

    carousels.forEach((carousel) => {
        if (exclude.some((item) => carousel.matches(item))) {
            return;
        }

        const windowEl = carousel.querySelector('.carousel__window');
        if (!windowEl) {
            return;
        }

        const prevBtn = carousel.querySelector('.carousel__btn--prev');
        const nextBtn = carousel.querySelector('.carousel__btn--next');
        const dotsBox = carousel.querySelector('.carousel__dots');

        const options = {
            align: 'start',
            slidesToScroll: 1,
        };

        const carouselApi = EmblaCarousel(windowEl, options);

        if (prevBtn && nextBtn) {
            const updateButtons = () => {
                if (carouselApi.canScrollPrev()) {
                    prevBtn.classList.remove('carousel__btn--disabled');
                } else {
                    prevBtn.classList.add('carousel__btn--disabled');
                }

                if (carouselApi.canScrollNext()) {
                    nextBtn.classList.remove('carousel__btn--disabled');
                } else {
                    nextBtn.classList.add('carousel__btn--disabled');
                }
            };

            prevBtn.addEventListener('click', () => carouselApi.scrollPrev());
            nextBtn.addEventListener('click', () => carouselApi.scrollNext());

            carouselApi.on('select', updateButtons);
            carouselApi.on('reInit', updateButtons);
            updateButtons();
        }

        if (dotsBox) {
            let dotBtns = [];

            const createDots = () => {
                dotsBox.innerHTML = carouselApi
                    .scrollSnapList()
                    .map(
                        (_, index) =>
                            `<button class="carousel__dot" type="button" aria-label="Go to slide ${index}"></button>`,
                    )
                    .join('');

                dotBtns = Array.from(
                    dotsBox.querySelectorAll('.carousel__dot'),
                );

                dotBtns.forEach((dot, index) => {
                    dot.addEventListener('click', () =>
                        carouselApi.scrollTo(index),
                    );
                });
            };

            const updateActiveDot = () => {
                const current = carouselApi.selectedScrollSnap();
                dotBtns.forEach((dot, index) => {
                    dot.classList.toggle(
                        'carousel__dot--active',
                        index === current,
                    );
                });
            };

            createDots();
            updateActiveDot();

            carouselApi.on('select', updateActiveDot);
            carouselApi.on('reInit', updateActiveDot);
        }
    });
}
