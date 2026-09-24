const menuToggle = document.querySelector('.header__menu-btn');
const headerNav = document.querySelector('.header__nav');
const navLinks = document.querySelectorAll(
    '.header__nav-link, .header__dropdown-link',
);

function openNav() {
    headerNav.classList.add('header__nav--open');
    menuToggle.classList.add('header__menu-btn--active');
}

function closeNav() {
    headerNav.classList.remove('header__nav--open');
    menuToggle.classList.remove('header__menu-btn--active');
}

menuToggle.addEventListener('click', function (event) {
    event.stopPropagation();

    if (headerNav.classList.contains('header__nav--open')) {
        closeNav();
    } else {
        openNav();
    }
});

navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        closeNav();
    });
});

document.addEventListener('click', function (event) {
    const clickedInsideNav = headerNav.contains(event.target);
    const clickedOnButton = menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedOnButton) {
        closeNav();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeNav();
        menuToggle.focus();
    }
});
