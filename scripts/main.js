$(document).ready(function () {

    new WOW({
        animateClass: 'animate__animated',
    }).init();


    $('#burger').click(() => {
        $('#header-menu').css('display', 'block');
    })

    $('#header-menu *').click(() => {
        $('#header-menu').css('display', 'none');
    });

    $('.close').click(() =>{
        $('.success-message').css('display', 'none');
    })




    document.querySelector('.button').addEventListener('click', function (e) {
        document.getElementById('menuList').scrollIntoView({behavior: "smooth"});
        e.preventDefault();
    });

    document.querySelectorAll('.button')[1].addEventListener('click', function (e) {
        document.getElementById('order').scrollIntoView({behavior: "smooth"});
        e.preventDefault();
    });

    $('.fotorama').fotorama({
        // width: 700,
        // maxwidth: '100%',
        // ratio: 16/9,
        // allowfullscreen: true,
        // nav: 'thumbs',
        arrows: 'always',
        nav: "dots",
    });

    $('.review').matchHeight();

    $('.owl-carousel').owlCarousel({
        merge: true,
        // loop:true,
        margin: 30,
        nav: true,
        // lazyLoad:true,
        navText: ["<img src='../images/arrowleft.png'>", "<img src='../images/arrowright.png'>"],
        dots: true,
        // center: true,
        items: 2,
        responsive: {
            0: {
                items: 1
            },
            900: {
                items: 1
            },
            1000: {
                items: 2
            }
        }
    })

    $('#phone').inputmask({"mask": "+9(999)999-99-99"});

    $('#submit').click(() => {
        let name = $('#name');
        let phone = $('#phone');
        let select = $('#select');
        let hasError = false;
        //let loader = $('.loader');

        $('.error-input').hide();
        $('input').css('border', '1px solid #ffffff').css('margin-bottom', '20px');
        select.css('border', '1px solid #ffffff').css('margin-bottom', '20px');


        if (!name.val()) {
            name.next().show();
            name.css('margin-bottom', '0')
                .css('border', '1px solid #c20909');
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css('margin-bottom', '0')
                .css('border', '1px solid #c20909');
            hasError = true;
        }

        if (!select.val() || select.val() === "Выберите время") {
            $('#sel').next().show();
            select.css('margin-bottom', '0')
            select.css('border', '1px solid #c20909');
            hasError = true;
        }

        if (!hasError) {
            //loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: name.val(), phone: phone.val(), time: select.val()}
            })
                .done(function (msg) {
                   // loader.hide();
                    if (msg.success === 0) {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                        $('.form')[0].reset();
                    } else if (msg.success === 1) {
                        $('.order-title').remove();
                        $('.order-text').remove();
                        $('form').remove();
                        $('.success-message').css('display', 'flex');
                    }
                });
        }
    })

    $('.showMap').eq(0).click(() =>{
        $('.map').show();
    })

    $('.mapClose').click(() =>{
        $('.map').hide();
    })

})