var carousel = new Carousel('carousel-container', 400, 300, 1000, 1000);

function Carousel(containerClass, width, height, transition, hold) {
    var container = document.getElementsByClassName(containerClass)[0];
    container.style.width = width + 'px';
    container.style.height = height + 'px';
    var images = container.getElementsByTagName('img');
    var navDots = document.getElementsByClassName('nav-dots')[0];
    var nextButton = document.getElementsByClassName('next')[0];
    var prevButton = document.getElementsByClassName('prev')[0];
    init();
    var currentPosition = 0;
    var fps = 60;
    var frame = 1000 / fps;
    var transitionTime = transition;
    var holdTime = hold;
    var automaticInterval;


    function init() {
        for (var index = 0; index < images.length; index++) {
            images[index].style.left = (index * 100) + '%';
            createDots(index);
        }
        navDots.children[0].classList.add('active');
        automaticSlide();
    };


    function createDots(dotIndex) {
        var dot = document.createElement('div');
        dot.classList.add('single-dot');
        navDots.appendChild(dot);
        dot.addEventListener('click', function () {
            var thisIndex = currentPosition / width;
            if (thisIndex > dotIndex) {
                clearInterval(automaticInterval);
                slideLeft(dotIndex * width);
                setTimeout(function () {
                    automaticSlide();
                }, 5000);
            } else {
                clearInterval(automaticInterval);
                slideRight(dotIndex * width);
                setTimeout(function () {
                    automaticSlide();
                }, 5000);
            }
        });
    }

    function viewNext() {
        if (currentPosition != ((images.length - 1) * width)) {
            slideRight(currentPosition + width);
        }
        else {
            slideLeft(0);
        }
    }

    function viewPrevious() {
        if (currentPosition != 0) {
            slideLeft(currentPosition - width);
        }
        else {
            slideRight((images.length - 1) * width);
        }
    }

    function slideRight(targetPosition) {
        var step = ((currentPosition - targetPosition) * (transitionTime / 1000)) / fps;
        var currentPositionInterim = currentPosition;
        var sliderInterval = setInterval(function () {
            currentPositionInterim = currentPositionInterim - step;
            container.style.left = '-' + currentPositionInterim + 'px';
            if (currentPositionInterim >= targetPosition) {
                clearInterval(sliderInterval);
                var normalizedPosition = Math.floor(currentPositionInterim / 100) * 100
                container.style.left = '-' + normalizedPosition + 'px';
                currentPosition = normalizedPosition;
                changeCurrentNavDots();
                console.log(normalizedPosition);
            }
        }, frame)
    }

    function slideLeft(targetPosition) {
        var step = ((targetPosition - currentPosition) * (transitionTime / 1000)) / fps;
        var currentPositionInterim = currentPosition;
        var sliderInterval = setInterval(function () {
            currentPositionInterim = currentPositionInterim + step;
            container.style.left = '-' + currentPositionInterim + 'px';
            if (currentPositionInterim <= targetPosition) {
                clearInterval(sliderInterval);
                var normalizedPosition = Math.ceil(currentPositionInterim / 100) * 100
                container.style.left = '-' + normalizedPosition + 'px';
                currentPosition = normalizedPosition;
                changeCurrentNavDots();
                console.log(normalizedPosition);
            }
        }, frame)
    }

    function changeCurrentNavDots() {
        var index = currentPosition / width;
        for (var i = 0; i < navDots.children.length; i++) {
            navDots.children[i].classList.remove('active');
        }
        navDots.children[index].classList.add('active');
    }

    function automaticSlide() {
        automaticInterval = setInterval(function () {
            viewNext();
        }, 4000)
    }

    nextButton.addEventListener('click', function () {
        clearInterval(automaticInterval);
        viewNext();
        setTimeout(function () {
            automaticSlide();
        }, 5000);
    });

    prevButton.addEventListener('click', function () {
        clearInterval(automaticInterval);
        viewPrevious();
        setTimeout(function () {
            automaticSlide();
        }, 5000);
    });
}



