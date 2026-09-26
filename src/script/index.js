const menuToggle = document.querySelector('.header__menu-btn');
const headerNav = document.querySelector('.header__nav');
const dropdownToggle = document.querySelector('.header__nav-link--dropdown');
const dropdownMenu = document.querySelector('.header__dropdown');
const navLinks = document.querySelectorAll(
    '.header__nav-link:not(.header__nav-link--dropdown), .header__dropdown-link',
);

function openDropdown() {
    if (dropdownMenu) {
        dropdownMenu.classList.add('header__dropdown--open');
    }
    if (dropdownToggle) {
        dropdownToggle.classList.add('header__nav-link--active');
        dropdownToggle.setAttribute('aria-expanded', 'true');
    }
}

function closeDropdown() {
    if (dropdownMenu) {
        dropdownMenu.classList.remove('header__dropdown--open');
    }
    if (dropdownToggle) {
        dropdownToggle.classList.remove('header__nav-link--active');
        dropdownToggle.setAttribute('aria-expanded', 'false');
    }
}

function toggleDropdown() {
    if (!dropdownMenu) return;
    if (dropdownMenu.classList.contains('header__dropdown--open')) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

function openNav() {
    headerNav.classList.add('header__nav--open');
    menuToggle.classList.add('header__menu-btn--active');
    menuToggle.setAttribute('aria-expanded', 'true');
}

function closeNav() {
    headerNav.classList.remove('header__nav--open');
    menuToggle.classList.remove('header__menu-btn--active');
    menuToggle.setAttribute('aria-expanded', 'false');
    closeDropdown();
}

if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', function (event) {
        event.stopPropagation();

        if (headerNav.classList.contains('header__nav--open')) {
            closeNav();
        } else {
            openNav();
        }
    });

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function (event) {
            if (window.innerWidth < 768) {
                event.preventDefault();
                event.stopPropagation();
                toggleDropdown();
            }
        });
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            closeDropdown();
            closeNav();
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
            if (
                dropdownMenu &&
                dropdownMenu.classList.contains('header__dropdown--open')
            ) {
                closeDropdown();
                if (dropdownToggle) {
                    dropdownToggle.focus();
                }
            } else if (headerNav.classList.contains('header__nav--open')) {
                closeNav();
                menuToggle.focus();
            }
        }
    });
}
