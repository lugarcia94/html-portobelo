import './style';

jQuery('.menu__btn').on('click', function () {
    if (!jQuery(this).parent().parent().hasClass('navigation')) {
        jQuery(this).parent().parent().addClass('navigation__open');
    } else {
        jQuery(this).parent().parent().removeClass('navigation__open');
    }
});

jQuery('.menu-btn__close').on('click', function () {
    jQuery(this).parent().parent().removeClass('navigation__open');
});


