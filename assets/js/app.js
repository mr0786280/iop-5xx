// inside out project STEP-502

$("body").prepend('<div class=text-white style=position:fixed;top:0;bottom:0;width:100%;z-index:99999999;padding-top:12%;background-color:rgba(87,87,87,.95);" id="cover-page"><div id="cover-page-con" class="container text-center"style="opacity:100%;"><img alt="Monica Romero"class="img-fluid rounded-circle"src=http://via.placeholder.com/150x150><h1>Monica Romero</h1><p class=lead>...inspired innovative technology leader & follower.<p class=lead style=font-size:80%><i class="fa-1x fa-cog fa-spin fas"></i> we are preparing your experiance now...</div></div>');

var parentPageID = 117;

window.onload = getContent();

function getContent() {
    $.ajax({
        method: 'GET',
        url: 'http://me.catchthesehands.net/wp-json/wp/v2/pages/?parent=' + parentPageID + '&order=asc&orderby=menu_order',
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                var thePage = '';
                var theMenu = '<ul class="navbar-nav ml-auto">';
                var className = '';

                data.forEach(function (item) {
                    if (item.slug === 'home') {
                        $("header").html(item.content.rendered);
                    } else {

                        let isActive = (theMenu === null) ? ' active' : '';
                        theMenu = theMenu + '<li class="nav-item"> <a class="nav-link js-scroll-trigger' + isActive + '" href="#' + item.slug + '">' + item.title.rendered + '</a> </li>';

                        className = (className === '') ? ' class="bg-light"' : '';
                        thePage = thePage + '<section id="' + item.slug + '"' + className + '>' + item.content.rendered + '</section>';

                    }
                });
                $("#navbarResponsive").html(theMenu + '</ul>');
                $("main").html(thePage);
            }
        },
        error: function () {
            console.log('bad');
        }
    });

    setTimeout(function () {
        $("#cover-page").fadeOut(2000);
        startScroll();
        resizeDiv();
    }, 2000);

}

window.onresize = function (event) {
     resizeDiv();
}

function resizeDiv() {
     let vpw = $(window).width();
     let vph = $(window).height();
     let navH = $('nav').height();
     let footerH = $('nav').height();
     let setvph = vph - navH;
     $("section,header").css({
          "height": setvph
     });
     $("header").css({
          "margin-top": navH
     });
}