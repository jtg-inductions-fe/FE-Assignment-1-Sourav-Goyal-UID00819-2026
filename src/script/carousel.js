import EmblaCarousel from 'embla-carousel';

export function setupCarousel(config = {}) {
    const {
        selector = '.carousel',
        include = [],
        exclude = [],
        emblaOptions = {},
        navigation = true,
        dots = true,
        onInit,
        onSelect,
    } = config;

    const carousels = document.querySelectorAll(selector);
    if (carousels.length <= 0) {
        return;
    }

    carousels.forEach((carousel) => {
        if (
            include.length > 0 &&
            !include.some((sel) => carousel.matches(sel))
        ) {
            return;
        }

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
            ...emblaOptions,
        };

        const carouselApi = EmblaCarousel(windowEl, options);

        if (navigation && prevBtn && nextBtn) {
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

        if (dots && dotsBox) {
            let dotBtns = [];

            const createDots = () => {
                dotsBox.innerHTML = carouselApi
                    .scrollSnapList()
                    .map(
                        (_, index) =>
                            `<button class="carousel__dot" type="button" aria-label="Go to slide ${index + 1}"></button>`,
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

        if (typeof onSelect === 'function') {
            carouselApi.on('select', () => onSelect(carouselApi, carousel));
        }

        if (typeof onInit === 'function') {
            onInit(carouselApi, carousel);
        }
    });
}
