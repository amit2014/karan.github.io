$(document).ready(function() {

    // set height of the main top page the same as height of browser window
    $(".top").height($(window).height());

    if ($(window).width() < 630) {
        $('.hackathons-nav').css('display', 'none');
    }

    // smooth scroll
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
            return false;
            }
        }
    });

    // sidebar animation
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ($("#sidebar").hasClass("active")) {
            // close sidebar
            closeSidebar();
        } else {
            // open sidebar
            openSidebar();
        }
    });

    function openSidebar() {
        $("#sidebar").addClass("active");
        $("#menu-toggle").addClass("active");
    }

    function closeSidebar() {
        $("#sidebar").removeClass("active");
        $("#menu-toggle").removeClass("active");
    }

    $(document).click(function() {
        if ($("#sidebar").hasClass("active")) {
            closeSidebar();
        }
    });

    $("#sidebar a").click(function() {
        setTimeout(closeSidebar, 500);
    });

    // fluid response when browser size changes
    $(window).resize(function () {
        // for a single paged top part
        $(".top").height($(window).height());
    });


    ////////////////////////////////
    // Load up the hackathons map //
    ////////////////////////////////

    $("#map_canvas").width($(window).width());
    $("#map_canvas").height(0.6 * $(window).height());

    var infowindows = [];

    google.maps.event.addDomListener(window, 'load', initialize);

    function initialize() {
        var map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: new google.maps.LatLng(37.09024, -95.712891),
            zoom: 5,
            scrollwheel: false
        });

        // Create a new LatLngBounds object
        var markerBounds = new google.maps.LatLngBounds();

        // Add your points to the LatLngBounds object.
        var markers = [];
        $.getJSON('/hackathons.json', function(data) {
            var hackathons = data.hackathons;
            for (var i in hackathons) {
                hackathon = hackathons[i];
                var point = new google.maps.LatLng(hackathon.latlng.split(',')[0],
                                                   hackathon.latlng.split(',')[1]);
                addMarker(point, hackathon);
                markerBounds.extend(point);
            }
            // Then you just call the fitBounds method and the Maps widget does all rest.
            map.fitBounds(markerBounds);
        });

        function addMarker(loc, hackathon) {
            var marker;
            if (hackathon.result.what) {
                marker = new google.maps.Marker({
                    position: loc,
                    map: map,
                    title: hackathon.name,
                    icon: 'http://wcdn4.dataknet.com/static/resources/icons/set19/f659c8f85d7.png'
                });
            } else {
                marker = new google.maps.Marker({
                    position: loc,
                    map: map,
                    title: hackathon.name
                });
            }

            var ct = '<div id="map-info-content"><b>' + hackathon.name +
                     '</b><br>' + '<small><em>' + hackathon.when + '<br>at<br>' +
                     hackathon.place + '</em></small><br>';
            if (hackathon.hack.name) {
                ct += '<br><b>Project: <a href="' + hackathon.hack.link +
                      '" target="_blank">' + hackathon.hack.name + '</a></b><br>';
            }
            if (hackathon.result.what) {
                ct += '<br>' + hackathon.result.what + ' ' +
                      hackathon.result.standing + '<br>' + '<b>Prize:</b> ' +
                      hackathon.result.prize;
            }
            ct += '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: ct
            });

            infowindows.push(infowindow);

            google.maps.event.addListener(marker, 'click', function() {
                for (var i = 0; i < infowindows.length; i++) {
                    infowindows[i].close();
                }
                infowindow.open(map, marker);
            });
        }
    }

    var scrollVal = 0;
    var layer1 = document.getElementById("layer-1");
    var layer2 = document.getElementById("layer-2");
    var layer3 = document.getElementById("layer-3");
    var layer4 = document.getElementById("layer-4");
    var layer5 = document.getElementById("layer-5");
    var layer6 = document.getElementById("layer-6");


    function parallaxy() {
        offset6 = -(scrollVal * 1.0);
        offset5 = -(scrollVal * 0.7);
        offset4 = -(scrollVal * 0.5);
        offset3 = -(scrollVal * 0.3);
        offset2 = -(scrollVal * 0.2);
        offset1 = -(scrollVal * 0.1);

        layer1.style.webkitTransform = "translate3d(0, " + offset1 + "px, 0)";
        layer1.style.MozTransform = "translate3d(0, " + offset1 + "px, 0)";
        layer1.style.msTransform = "translateY(" + offset1 + "px)";
        layer1.style.OTransform = "translate3d(0, " + offset1 + "px, 0)";
        layer1.style.transform = "translate3d(0, " + offset1 + "px, 0)";

        layer2.style.webkitTransform = "translate3d(0, " + offset2 + "px, 0)";
        layer2.style.MozTransform = "translate3d(0, " + offset2 + "px, 0)";
        layer2.style.msTransform = "translateY(" + offset2 + "px)";
        layer2.style.OTransform = "translate3d(0, " + offset2 + "px, 0)";
        layer2.style.transform = "translate3d(0, " + offset2 + "px, 0)";

        layer3.style.webkitTransform = "translate3d(0, " + offset3 + "px, 0)";
        layer3.style.MozTransform = "translate3d(0, " + offset3 + "px, 0)";
        layer3.style.msTransform = "translateY(" + offset3 + "px)";
        layer3.style.OTransform = "translate3d(0, " + offset3 + "px, 0)";
        layer3.style.transform = "translate3d(0, " + offset3 + "px, 0)";

        layer4.style.webkitTransform = "translate3d(0, " + offset4 + "px, 0)";
        layer4.style.MozTransform = "translate3d(0, " + offset4 + "px, 0)";
        layer4.style.msTransform = "translateY(" + offset4 + "px)";
        layer4.style.OTransform = "translate3d(0, " + offset4 + "px, 0)";
        layer4.style.transform = "translate3d(0, " + offset4 + "px, 0)";

        layer5.style.webkitTransform = "translate3d(0, " + offset5 + "px, 0)";
        layer5.style.MozTransform = "translate3d(0, " + offset5 + "px, 0)";
        layer5.style.msTransform = "translateY(" + offset5 + "px)";
        layer5.style.OTransform = "translate3d(0, " + offset5 + "px, 0)";
        layer5.style.transform = "translate3d(0, " + offset5 + "px, 0)";

        layer6.style.webkitTransform = "translate3d(0, " + offset6 + "px, 0)";
        layer6.style.MozTransform = "translate3d(0, " + offset6 + "px, 0)";
        layer6.style.msTransform = "translateY(" + offset6 + "px)";
        layer6.style.OTransform = "translate3d(0, " + offset6 + "px, 0)";
        layer6.style.transform = "translate3d(0, " + offset6 + "px, 0)";
    }


    function scrollHandler(e) {
        scrollVal = Math.max(window.pageYOffset,0);
        parallaxy();
    }

    document.addEventListener('scroll', scrollHandler, false);

});
