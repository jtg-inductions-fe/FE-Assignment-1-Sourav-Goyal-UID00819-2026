import EmblaCarousel from 'embla-carousel';

export function setupCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) {
        return;
    }

    const windowEl = carousel.querySelector('.carousel__window');
    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');
    const dotsBox = carousel.querySelector('.carousel__dots');

    const options = {
        align: 'start',
        slidesToScroll: 3,
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
        updateButtons();
    }

    if (dotsBox) {
        let dotBtns = [];

        const createDots = () => {
            dotsBox.innerHTML = carouselApi
                .scrollSnapList()
                .map(
                    () =>
                        '<button class="carousel__dot" type="button" aria-label="Go to slide"></button>',
                )
                .join('');

            dotBtns = Array.from(dotsBox.querySelectorAll('.carousel__dot'));
            dotBtns.forEach((dot, index) => {
                dot.addEventListener('click', () =>
                    carouselApi.scrollTo(index),
                );
            });
        };

        const updateActiveDot = () => {
            const prev = carouselApi.previousScrollSnap();
            const current = carouselApi.selectedScrollSnap();

            dotBtns[prev]?.classList.remove('carousel__dot--active');
            dotBtns[current]?.classList.add('carousel__dot--active');
        };

        createDots();
        updateActiveDot();

        carouselApi.on('select', updateActiveDot);
    }

    return carouselApi;
}
