function megaMenu() {
    $('#megaMenu > ul.mega-menu > li > a').click(function (e) {
        var currentId = $(this).attr('id');
        focusOrClick(currentId);
    });

    //click event of back button in mobile view
    $('.navbtn .btn-dark-blue').click(function () {
        if ($('body').width() < 641) {
            if ($(this).hasClass('sub')) {
                $('li.sub ul').removeClass('active');
                $('.navbtn .btn-dark-blue').removeClass('sub');
                $('.sub-menu > ul> li').not('li.active').show();
            }
            else {
                $('#megaMenu > ul.mega-menu > li').not('li.search').not('li.active').show();
                $('#megaMenu > ul.mega-menu > li').removeClass('active');
                $('#megaMenu > ul.top-nav-items').show();
            }
            return false;
        }
    });

    //click event of second level links in mega menu
    $('li.sub a').click(function () {
        if ($(this).closest('.grey-box').hasClass('current')) {
            if ($('body').width() < 641) {
                $('li.sub').removeClass('active');
                $(this).closest('.sub').addClass('active');
                $('#megaMenu > ul.mega-menu> li').not('li.active').hide();
                $('.sub-menu > ul> li').not('li.active').hide();
                $('li.sub ul').addClass('active');
                $('.navbtn .btn-dark-blue').addClass('sub').focus();
            }
            else {
                $('.grey-box.current li.sub').not($(this).parent('li')).removeClass('active');
                $(this).closest('.sub').addClass('active');
            }

            //Code to change height when third level list is taller than min-height of container
            var TotalHeight = 30;//Inital value for top bottom margin of 15px each
            $('#megaMenu > ul > li .grey-box .container .row .sub-menu > ul > li.sub ul li').each(function () {
                if ($(this).height() > 0) {
                    TotalHeight = TotalHeight + $(this).height() + 10;//10px for paddings on each li
                }
            });

            var containerHeight = $('#megaMenu > ul > li .grey-box .container .row .sub-menu').height();
            if (containerHeight < TotalHeight)
                $('#megaMenu > ul > li .grey-box .container .row .sub-menu').css('min-height', TotalHeight);
            TotalHeight = 30;//Reset variable
        }
    });

    //mobile view menu button click event
    $('#toggleMenu').click(function () {
        //to reset menu as default on page load, we have to show all li and click back button once
        $('#megaMenu > ul.mega-menu > li').not('li.search').show();
        $('.navbtn .btn-dark-blue').click();
        //menu reset code end
        $('#megaMenu').toggleClass('active');
        $('.search-grey-box').removeClass('active');
    });

    //mobile view search button click event
    $('#toggleSearch').click(function () {
        $('.search-grey-box').toggleClass('active');
        $('.search-grey-box input[type="text"]').focus();
        $('#megaMenu').removeClass('active');
        return false;
    });

    //bind focus event for menu items
    $(document).keyup(function (e) {
        if (e.which == 9) {
            var obj = (e.target ? e.target : e.srcElement);
            if (obj.id != "" && obj.id != null && obj.id != undefined && obj.id == "itemSearch") {
                //if current item in focus is child of li then trigger focus event
                if ($('#' + obj.id).parent().hasClass('search')) {
                    focusOrClick(obj.id);
                }
            }
            else if ($('#' + obj.id).parent().hasClass('input-group-btn') == false) {
                //if focused object is not a search button
                $('.search-grey-box.active').removeClass('active');
            }
        }
        if (e.keyCode == 27) { // escape key maps to keycode `27`
            $('#megaMenu > ul > li.active > a').focus();
            $('.mega-menu li.active').removeClass('active');
        }
    });

    //close menu when clicked outside
    $(document).click(function (event) {
        //close mega menu onclik outside the mega-menu div
        var obj = event.target;//returns the object on which click event triggered
        var requiredIds = "#megaMenu,.grey-box.current,#toggleMenu,#toggleSearch,.search-grey-box.active";
        var target = $(obj);
        //parents function return true if current element is child of any
        if (target.parents(requiredIds).length) {
            //alert('Your clicked element is having requiredIds as parent');
            //return from function if is child of required ids
            return;
        }
        var currentId = obj.id;
        if (currentId == undefined || currentId.length == 0 || requiredIds.indexOf(currentId) == -1) {
            $(requiredIds).removeClass('active');
            $(requiredIds).removeClass('current');
        }
    });

    //toggle between mobile and desktop view
    $(window).resize(function () {
        if ($('body').width() > 640) {
            $('#megaMenu > ul.mega-menu > li').show();
            $('.sub-menu > ul> li').show();
            $('.search-grey-box').removeClass('active');
        }
    });
}

function focusOrClick(id) {
    var text = $('#' + id).text();
    //remove style attribute from closest container
    $('#megaMenu').closest('.container').removeAttr('style');
    //remove active class from all lis with but not from currently clicked item.
    $('#megaMenu > ul.mega-menu > li').not($('#' + id).parent('li')).removeClass('active');
    //current class added to make a  hook for third level menu
    $('.grey-box').removeClass('current');
    $('#' + id).parent('li').toggleClass('active');
    //add current class to current clicked item's grey-box
    $('#megaMenu > ul.mega-menu > li.active .grey-box').addClass('current');
    if (id != "itemSearch") {
        $('.navbtn .title').html(text);
        //setTimeout(function () {
        $('.navbtn .btn-dark-blue').focus();
        //}, 500);
        if ($('body').width() < 641) {
            $('#megaMenu > ul.mega-menu > li').not('li.active').hide();
            $('#megaMenu > ul.top-nav-items').hide();
        }
        $('.search-grey-box').removeClass('active');
    }
    else {
        $('#megaMenu').closest('.container').css('position', 'relative');
        $('.search-grey-box').toggleClass('active');
        $('.search-grey-box input[type="text"]').focus();
    }
    return false;
}

$(function () {
    megaMenu();
    $('a').click(function () {
        if ($(this).attr('href') == "#") {
            return false;
        }
    });
});