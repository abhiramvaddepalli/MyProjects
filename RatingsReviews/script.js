ratingsReviews = {
    customCarousel: {
        leftV: "",
        viewport: 0,
        carousel: $("#rr-module .carousel-reviews"),
        slide: $("#rr-module #slider"),
        noOfItems: $("#rr-module .carousel-reviews .slides li").length,
        maxNumItems: function() {
            return $(window).width() >= 830 ? 4 : $(window).width() > 660 ? 3 : 1
        },
        slideWidth: function() {
            return $(window).width() >= 830 ? ($(this.slide.selector).parent().width() - 135) / 4 : $(window).width() > 660 ? 170 : 260
        },
        isAnimating: !0,
        prevTitle: "click to go to previous slide",
        nextTitle: "click to go to next slide",
        numOfSlides: function() {
            var e = this.maxNumItems()
              , t = this.noOfItems / e
              , i = this.noOfItems % e == 0 ? t : Math.floor(t) + 1;
            return i
        },
        setViewport: function() {
            $(this.slide.selector).find("li").width(this.slideWidth()),
            this.viewport = $(this.slide.selector).parent().width()
        },
        setSlider: function() {
            $(this.slide.selector).width(this.numOfSlides() * this.viewport)
        },
        hideReviews: function() {
            for (var e = parseInt($(".hp-view-paging .hp-view-active").text()), t = e * this.maxNumItems(); t < this.noOfItems; t++)
                $("#rr-module .carousel-reviews .slides li").eq(t).css("visibility", "hidden")
        },
        showReviews: function() {
            $("#rr-module .carousel-reviews .slides li").css("visibility", "visible")
        },
        wrapItems: function() {
            var e = this.noOfItems
              , t = this.maxNumItems();
            if (t >= e) {
                var i = e % t
                  , s = this.slideWidth()
                  , r = s * t / i;
                $(this.slide.selector).find("li").width(r)
            }
        },
        buildPagination: function() {
            this.carousel.append("<ol class='hp-view-paging'><li class='hp-view-active'>1</li><li class='hp-view-count'>/" + this.numOfSlides() + "</li></ol>")
        },
        buildNavigation: function() {
            this.carousel.append("<ul class='hp-nav-reviews' id='hp-nav-reviews'><li><a class='hp-prev hp-disabled' href='#'>&lt;</a></li><li><a class='hp-next hp-disabled' href='#' title='click to go to next slide' hidefocus='true'>&gt</a></li></ul>")
        },
        updateSlides: function() {
            var e = parseInt($(".hp-view-paging .hp-view-active").text())
              , t = $(this.slide.selector)
              , i = parseInt(t.css("left"))
              , s = this
              , r = this.numOfSlides()
              , a = e > r ? r : e
              , i = s.viewport * (a - 1)
              , l = $(this.carousel.selector).find(".hp-next").removeClass("hp-disabled").attr("title", this.nextTitle)
              , o = $(this.carousel.selector).find(".hp-prev").removeClass("hp-disabled").attr("title", this.prevTitle);
            t.stop().animate({
                left: -i
            }, 100, "swing"),
            0 == Math.abs(i) && o.addClass("hp-disabled").removeAttr("title"),
            Math.abs(i) === this.viewport * (r - 1) && l.addClass("hp-disabled").removeAttr("title"),
            $(".hp-view-paging .hp-view-active").text(a),
            $(".hp-view-paging .hp-view-count").text("/" + r)
        },
        updateNavigation: function() {
            var e = $(this.carousel.selector).find(".hp-view-paging")
              , t = $(this.carousel.selector).find(".hp-nav-reviews")
              , i = $(this.carousel.selector).find(".hp-next");
            this.noOfItems <= this.maxNumItems() ? (e.addClass("disable"),
            t.addClass("disable")) : (e.removeClass("disable"),
            t.removeClass("disable"),
            i.removeClass("hp-disabled"))
        },
        animateCarousel: function(e) {
            if (this.isAnimating) {
                var t = this
                  , i = $(this.slide.selector)
                  , s = $(this.carousel.selector).find(".hp-next").removeClass("hp-disabled").attr("title", this.nextTitle)
                  , r = $(this.carousel.selector).find(".hp-prev").removeClass("hp-disabled").attr("title", this.prevTitle)
                  , a = parseInt($(".hp-view-paging .hp-view-active").text())
                  , l = 0
                  , o = this.numOfSlides();
                "next" == e ? a += 1 : a -= 1,
                l = t.viewport * (a - 1),
                0 == Math.abs(l) && r.addClass("hp-disabled").removeAttr("title"),
                Math.abs(l) === this.viewport * (o - 1) && s.addClass("hp-disabled").removeAttr("title"),
                !(1 > a || a > o) && $(".hp-view-paging .hp-view-active").text(a),
                t.isAnimating = !1,
                i.stop().animate({
                    left: -l
                }, 500, "swing", function() {
                    t.isAnimating = !0
                })
            }
        },
        events: function() {
            var e = this;
            this.carousel.find(".hp-nav-reviews a").on("click", function(t) {
                t.preventDefault(),
                direction = $(this).hasClass("hp-next") ? "next" : "prev",
                !$(this).hasClass("hp-disabled") && e.animateCarousel(direction)
            })
        },
        findFirstInSlide: function() {
            if ($(this.carousel.selector).find(".slides>li").removeClass("first-in-slide"),
            $(window).width() > 660)
                for (var e = $(this.carousel.selector), t = this.noOfItems, i = this.maxNumItems(), s = 0; t / i > s; s++)
                    e.find(".slides>li").eq((s + 1) * i).addClass("first-in-slide")
        },
        alignLineOfSightElements: function() {
            var e = $("#rr-module .slides li h3.summary");
            if (e.height("auto"),
            $(window).width() > 660) {
                for (var t = this.noOfItems, i = this.maxNumItems(), s = new Array, r = 0; t / i > r; r++) {
                    s.push($(e[i * r]).height());
                    for (var a = i * r + 1; i * (r + 1) > a && t > a; a++)
                        s[r] < $(e[a]).height() && (s[r] = $(e[a]).height())
                }
                for (var r = 0; t / i > r; r++)
                    for (var a = i * r; i * (r + 1) > a && t > a; a++)
                        $(e[a]).height(s[r])
            }
        },
        setRepeatorHeight: function() {
            $("#card-review .rr-bgr").height($("#card-review .content").height() + parseInt($("#card-review .content").css("padding-bottom")))
        },
        setOnResize: function() {
            this.updateNavigation(),
            this.setViewport(),
            this.findFirstInSlide(),
            this.setSlider(),
            this.wrapItems(),
            this.alignLineOfSightElements(),
            this.updateSlides(),
            this.showReviews(),
            ratingsReviews.customScrollBar(),
            this.setRepeatorHeight()
        },
        init: function() {
            this.setViewport(),
            this.findFirstInSlide(),
            this.setSlider(),
            this.buildPagination(),
            this.buildNavigation(),
            this.updateNavigation(),
            this.events(),
            this.wrapItems(),
            this.alignLineOfSightElements(),
            this.setRepeatorHeight(),
            ratingsReviews.customScrollBar();
        }
    },
    customScrollBar: function() {
        var e = $(".custom-scrollbar");
       // e.openScrollber()
    },
    onTouchStart: function(e) {
        1 === e.touches.length && (viewAllObj = e.touches[0].target,
        startX = e.touches[0].pageX,
        startY = e.touches[0].pageY,
        startT = Number(new Date),
        rrViewport = ratingsReviews.customCarousel.viewport,
        activeSlide = parseInt($(".hp-view-paging .hp-view-active").text()),
        lastSlide = ratingsReviews.customCarousel.numOfSlides(),
        offset = rrViewport * (activeSlide - 1),
        leftV = rrViewport * activeSlide,
        nextArrow = $(".carousel-reviews .hp-nav-reviews .hp-next"),
        prevArrow = $(".carousel-reviews .hp-nav-reviews .hp-prev"),
        el.addEventListener("touchmove", ratingsReviews.onTouchMove, !1),
        el.addEventListener("touchend", ratingsReviews.onTouchEnd, !1))
    },
    onTouchMove: function(e) {
        dx = startX - e.touches[0].pageX,
        noSlide = 0 > dx && prevArrow.hasClass("hp-disabled") || dx > 0 && nextArrow.hasClass("hp-disabled"),
        scrolling = Math.abs(dx) < Math.abs(e.touches[0].pageY - startY),
        (!scrolling || Number(new Date) - startT > 500) && (e.preventDefault(),
        dx /= 1 === activeSlide && 0 > dx || activeSlide === lastSlide && dx > 0 ? Math.abs(dx) / rrViewport + 2 : 1,
        $("#rr-module #slider").stop().animate({
            left: -(offset + dx)
        }, 10, "swing"))
    },
    onTouchEnd: function(e) {
        el.removeEventListener("touchmove", ratingsReviews.onTouchMove, !1),
        null  !== dx && (Number(new Date) - startT < 500 && Math.abs(dx) >= 50 || Math.abs(dx) >= rrViewport / 2 ? scrolling || (ratingsReviews.customCarousel.isAnimating = !0,
        dx > 0 && nextArrow.trigger("click"),
        0 > dx && prevArrow.trigger("click"),
        noSlide && $("#rr-module #slider").stop().animate({
            left: -offset
        }, 500, "swing")) : $("#rr-module #slider").stop().animate({
            left: -offset
        }, 500, "swing")),
        el.removeEventListener("touchend", ratingsReviews.onTouchEnd, !1),
        viewAllObj = null ,
        startX = null ,
        startY = null ,
        dx = null ,
        offset = null 
    },
    setTouchstartEvent: function() {
        0 != rr_reviws.length && rr_reviws[0].addEventListener("touchstart", ratingsReviews.onTouchStart, !1)
    },
    reInitiateRRCarousel: function(e) {
        660 >= e ? 320 != _bkpt && (ratingsReviews.customCarousel.setOnResize(),
        _bkpt = 320) : 830 >= e ? 661 != _bkpt && (ratingsReviews.customCarousel.setOnResize(),
        _bkpt = 661) : e >= 831 && ratingsReviews.customCarousel.setOnResize()
    }
};

$(window).ready(function(){
    ratingsReviews.customCarousel.init();
});

$(window).resize(function(){
    ratingsReviews.customCarousel.setOnResize();
});