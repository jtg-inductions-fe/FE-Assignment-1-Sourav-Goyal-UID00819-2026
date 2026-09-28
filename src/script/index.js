document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const headerNav = document.getElementById('primary-navigation');
    const dropdownToggle = document.getElementById('categories-toggle');
    const dropdownMenu = document.getElementById('categories-dropdown');

    const navLinks = document.querySelectorAll(
        '.header__nav-link:not(.header__nav-link--dropdown), .header__dropdown-link',
    );

    if (!menuToggle || !headerNav || !dropdownToggle || !dropdownMenu) {
        return;
    }

    function openDropdown() {
        dropdownMenu.classList.add('header__dropdown--open');
        dropdownToggle.classList.add('header__nav-link--active');
        dropdownToggle.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
        dropdownMenu.classList.remove('header__dropdown--open');
        dropdownToggle.classList.remove('header__nav-link--active');
        dropdownToggle.setAttribute('aria-expanded', 'false');
    }

    function toggleDropdown() {
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

    menuToggle.addEventListener('click', function (event) {
        event.stopPropagation();

        if (headerNav.classList.contains('header__nav--open')) {
            closeNav();
        } else {
            openNav();
        }
    });

    dropdownToggle.addEventListener('click', function (event) {
        if (window.innerWidth < 768) {
            event.preventDefault();
            event.stopPropagation();
            toggleDropdown();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            closeNav();
        }
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', function (event) {
        if (
            !headerNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeNav();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;

        if (dropdownMenu.classList.contains('header__dropdown--open')) {
            closeDropdown();
            dropdownToggle.focus();
        } else if (headerNav.classList.contains('header__nav--open')) {
            closeNav();
            menuToggle.focus();
        }
    });
});
