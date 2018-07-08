$(function () {
    'use strict';

    var $container = $('#mediaDiv');
    var $image = $container.children('div.on');
    var mediaObj;
    var iTransform, cTransform;

    mediaObj = new Audio();
    mediaObj.src = 'media/QingChengPiPa.mp3';
    mediaObj.loop = true;
    mediaObj.autoplay = true;
    // window.mediaObj = mediaObj;

    $(document).one('touchstart.play click.play', function () {
        mediaObj.play();
        mediaPlay();
    });

    $image.bind('click', function () {
        if (mediaObj.paused) {
            mediaObj.play();
            mediaPlay();
        } else {
            mediaPause();
            mediaObj.pause();
        }
    });

    function mediaPlay() {
        $image.addClass('animate');
    }

    function mediaPause() {
        iTransform = $image.css('transform');
        cTransform = $container.css('transform');
        $container.css('transform', cTransform === 'none' ? iTransform : iTransform.concat(' ', cTransform));
        $image.removeClass('animate');
    }

    $(mediaObj).bind('canplaythrough', function () {
        // mediaObj.play();
    }).bind('pause ended', function () {
        mediaPause();
    }).bind('playing', function () {
        mediaPlay();
    });
    
    /* var isPlaying = false;

    var container = document.querySelector('.wp');
    var image = container.querySelector('img');

    image.addEventListener('click', function bindEvent() {
        isPlaying ? pause() : play();
    });

    function pause() {
        isPlaying = false;
        var iTransform = getComputedStyle(image).transform;
        var cTransform = getComputedStyle(container).transform;
        container.style.transform = cTransform === 'none'
            ? iTransform
            : iTransform.concat(' ', cTransform);
        image.classList.remove('animate');
    }

    function play() {
        isPlaying = true;
        image.classList.add('animate');
    } */

    // $on.bind('click', function () {
    //     if (mediaObj.paused || !$(this).hasClass('play')) {
    //         mediaObj.play();
    //         $(this)
    //             .attr('title', '《倾城琵琶》 - 播放中')
    //             .addClass('play')
    //             .removeClass('paused')
    //             ;
    //     } else {
    //         mediaObj.pause();
    //         $(this)
    //             .attr('title', '《倾城琵琶》 - 已暂停')
    //             .addClass('paused')
    //             .removeClass('play')
    //             ;
    //     }

    //     // alert($(this).attr('class'));
    // });

    // $(document).one('touchstart', function () {
    //     mediaObj.play();
    // });

    // document.addEventListener('touchstart', handler, false);
    // document.removeEventListener('touchstart', handler, false);

    // if (mediaObj.paused) {
    //     mediaObj.play();
    //     $on.attr('title', '《倾城琵琶》 - 播放中');
    // }

    /* $(mediaObj).bind('pause ended', function () {
        $on.addClass('paused');
    }).bind('playing', function () {
        $on.removeClass('paused').addClass('play');
    }); */

    var random = function () {
        // var str = Math.random().toString();
        // return str.substring(str.length - 1);
        return Math.ceil(Math.random() * 15);
    };

    $image.css('backgroundImage', 'url("media/on' + random() + '.JPG")');
});