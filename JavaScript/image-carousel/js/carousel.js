/**
 * 'Class' that defines a carousel
 * @param {*} wrapperClass - REQUIRED: wrapper class of carousel
 * @param {*} width - DEFAULT 400; Width of carousel (px)
 * @param {*} height - DEFAULT 300; Height of carousel (px)
 * @param {*} transition - DEFAULT 1000; Transition time (ms) between images
 * @param {*} hold -DEFAULT 2000; Hold time (ms) of image during automatic slide 
 */
function Carousel(wrapperClass, width, height, transition, hold) {

    //defining wrapper, container and images
    let wrapper = document.getElementsByClassName(wrapperClass)[0];
    let container = wrapper.getElementsByClassName('carousel-container')[0];
    let images = container.getElementsByTagName('img');
    let nextButton, previousButton, navigationDots;

    //params
    width = width || 400;
    height = height || 300;
    transition = transition || 1000;
    hold = hold || 2000;

    //variables
    let currentPosition = 0;
    let fps = 60;
    let frame = 1000 / fps;
    let automaticInterval;

    config();
    init();

    /**
     * Configures wrapper, all additional buttons and navigation labels
     */
    function config() {
        //wrapper
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        wrapper.style.width = width + 'px';

        //container
        container.style.width = width + 'px';
        container.style.height = height + 'px';
        container.style.position = 'relative';

        images
        for (let i = 0; i < images.length; i++) {
            images[i].style.width = '100%';
            images[i].style.height = '100%';
            images[i].style.position = 'absolute';
        }

        //previous-button
        leftArrow = document.createElement('img');
        leftArrow.setAttribute('src', 'https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angle-left-512.png');
        leftArrow.style.height = '32px';
        previousButton = document.createElement('button');
        previousButton.classList.add('previous');
        previousButton.appendChild(leftArrow);
        previousButton.style.position = 'absolute';
        previousButton.style.top = '47%';
        previousButton.style.left = '0';
        previousButton.style.opacity = '0.3';
        previousButton.addEventListener('mouseover', function () {
            previousButton.style.opacity = '0.5';
            previousButton.style.cursor = 'pointer';
        });
        wrapper.appendChild(previousButton);

        //next-button
        rightArrow = document.createElement('img');
        rightArrow.setAttribute('src', 'https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronRight-512.png');
        rightArrow.style.height = '32px';
        nextButton = document.createElement('button');
        nextButton.classList.add('next');
        nextButton.appendChild(rightArrow);
        nextButton.style.position = 'absolute';
        nextButton.style.top = '47%';
        nextButton.style.right = '0';
        nextButton.style.opacity = '0.3';
        nextButton.addEventListener('mouseover', function () {
            nextButton.style.opacity = '0.5';
            nextButton.style.cursor = 'pointer';
        });
        wrapper.appendChild(nextButton);

        //navigationDots
        navigationDots = document.createElement('div');
        navigationDots.classList.add('navigation-dots');
        navigationDots.style.position = 'absolute';
        navigationDots.style.top = '90%';
        navigationDots.style.left = '27%';
        wrapper.appendChild(navigationDots);
    }


    /**
     * Styles each individual naviation dot
     * @param {*} dot - div element for navigation dot
     */
    function styledots(dot) {
        dot.style.float = 'left';
        dot.style.background = '#000000';
        dot.style.height = '10px';
        dot.style.width = '10px';
        dot.style.border = '2px solid #123';
        dot.style.borderRadius = '50%';
        dot.style.margin = '0 4px';
        dot.style.opacity = '0.5';
        dot.addEventListener('mouseover', function () {
            dot.style.opacity = '0.8';
            dot.style.cursor = 'pointer';
        })
    }



    /**
     * Initializes the functional slider
     */
    function init() {
        for (let index = 0; index < images.length; index++) {
            images[index].style.left = (index * 100) + '%';
            createDots(index);
        }
        navigationDots.children[0].style.background = '#eeeeee';
        automaticSlide();
    }

    /**
     * Create each dot dynamically and style them
     * @param {*} dotIndex - index of the dot withing navigationDots div
     */
    function createDots(dotIndex) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        styledots(dot);
        navigationDots.appendChild(dot);
        dot.addEventListener('click', function () {
            let thisIndex = currentPosition / width;
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

    /**
     * View the next iamge
     */
    function viewNext() {
        if (currentPosition != ((images.length - 1) * width)) {
            slideRight(currentPosition + width);
        }
        else {
            slideLeft(0);
        }
    }

    /**
     * view the previous image
     */
    function viewPrevious() {
        if (currentPosition != 0) {
            slideLeft(currentPosition - width);
        }
        else {
            slideRight((images.length - 1) * width);
        }
    }

    /**
     * function to slide images to the right
     * @param {*} targetPosition - position for where the image needs to go
     */
    function slideRight(targetPosition) {
        let step = ((currentPosition - targetPosition) * (transition / 1000)) / fps;
        let currentPositionInterim = currentPosition;
        let sliderInterval = setInterval(function () {
            currentPositionInterim = currentPositionInterim - step;
            container.style.left = '-' + currentPositionInterim + 'px';
            if (currentPositionInterim >= targetPosition) {
                clearInterval(sliderInterval);
                let normalizedPosition = Math.floor(currentPositionInterim / 100) * 100
                container.style.left = '-' + normalizedPosition + 'px';
                currentPosition = normalizedPosition;
                changeCurrentNavDots();
                // console.log(normalizedPosition);
            }
        }, frame)
    }

    /**
     * function to slide images to the left
     * @param {*} targetPosition - position for where the image needs to go
     */
    function slideLeft(targetPosition) {
        let step = ((targetPosition - currentPosition) * (transition / 1000)) / fps;
        let currentPositionInterim = currentPosition;
        let sliderInterval = setInterval(function () {
            currentPositionInterim = currentPositionInterim + step;
            container.style.left = '-' + currentPositionInterim + 'px';
            if (currentPositionInterim <= targetPosition) {
                clearInterval(sliderInterval);
                let normalizedPosition = Math.ceil(currentPositionInterim / 100) * 100
                container.style.left = '-' + normalizedPosition + 'px';
                currentPosition = normalizedPosition;
                changeCurrentNavDots();
                // console.log(normalizedPosition);
            }
        }, frame)
    }

    /**
     * set the automatic interval
     */
    function automaticSlide() {
        automaticInterval = setInterval(function () {
            viewNext();
        }, hold)
    }

    /**
     * change the style of navigation dots as they go
     */
    function changeCurrentNavDots() {
        let index = currentPosition / width;
        for (let i = 0; i < navigationDots.children.length; i++) {
            navigationDots.children[i].style.background = '#000000';
        }
        navigationDots.children[index].style.background = '#eeeeee';
    }

    /**
     * onClick next button
     */
    nextButton.addEventListener('click', function () {
        clearInterval(automaticInterval);
        viewNext();
        setTimeout(function () {
            automaticSlide();
        }, hold + 1000);
    });

    /**onClick previous button */
    previousButton.addEventListener('click', function () {
        clearInterval(automaticInterval);
        viewPrevious();
        setTimeout(function () {
            automaticSlide();
        }, hold + 1000);
    });
}