import {getOffset, isjQueryElement} from "./utils";

function backgroundParallax(elements = document.querySelectorAll("[data-parallax]:not(.parallax-enabled)")){
    // check if page has element parallax
    if(elements.length){

        // string
        if(typeof elements === "string"){
            elements = document.querySelectorAll(elements);
        }else if(isjQueryElement(elements)){
            // jQuery element
            elements = elements.get();
        }

        // parallax for element
        elements.forEach((target, index) => {
            let previousScrollAmount, mode = '';

            // set object fit mode if no background image is found
            const img = target.querySelector(':scope > img');

            // has image tag, has object fit, target has no background image
            const isObjectFitMode = img && getComputedStyle(img).objectFit.length && !target.style.backgroundImage.length;
            mode = isObjectFitMode ? 'object-fit' : 'background-image';

            // is translate parallax
            const value = target.getAttribute('data-parallax');
            const speed = parseFloat(value);
            const isTranslateMode = value.length && !isNaN(speed);
            mode = isTranslateMode ? 'translate' : mode;

            // add class
            target.classList.add(`parallax-${mode}`);
            target.classList.add('parallax-enabled');

            const update = () => {
                const scrollAmount = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
                if(previousScrollAmount !== scrollAmount){
                    previousScrollAmount = scrollAmount;

                    // max distance is where the target disappear from viewport, counting from the middle
                    const maxDistance = window.innerHeight * 0.5 + target.offsetHeight * 0.5;

                    // offset to the middle of target
                    const targetOffset = getOffset(target).top + target.offsetHeight * 0.5;

                    // position where the image has the best display
                    let windowPosition = window.innerHeight * 0.5;

                    // if missing top spacing
                    if(targetOffset <= maxDistance){
                        windowPosition = targetOffset;
                    }

                    // if missing bottom spacing
                    const offsetBottom = document.body.clientHeight - getOffset(target).top - target.offsetHeight;
                    const targetBottomOffset = offsetBottom + target.offsetHeight * 0.5;
                    if(targetBottomOffset <= maxDistance){
                        windowPosition = window.innerHeight - targetBottomOffset;
                    }

                    // offset to the window position
                    const windowOffset = scrollAmount + windowPosition;

                    // distance from middle of target to middle of viewport
                    const distance = targetOffset - windowOffset;

                    // only run parallax when target is inside viewport
                    if(distance > -maxDistance && distance < maxDistance){
                        if(isTranslateMode){
                            // parallax translateY
                            img.style.transform = `translateY(${distance * speed}px)`;
                        }else{
                            // auto-detect for background-image
                            // we already have 50%, so we need another 50% to fill up 100%
                            // the other 50% is various base on the distance
                            const parallaxValue = 50 + (distance / maxDistance) * 50;

                            // update background position
                            const value = `center ${parallaxValue}%`;
                            if(isObjectFitMode){
                                img.style.objectPosition = value;
                            }else{
                                target.style.backgroundPosition = value;
                            }
                        }
                    }
                }

                // rAF
                window.requestAnimationFrame(update);
            };

            // rAF
            window.requestAnimationFrame(update);
        });
    }
}

export default backgroundParallax;