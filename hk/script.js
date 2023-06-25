function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}


const magicAreas = [...document.querySelectorAll(".c-magic-area")];

const getAreaDetails = (area) => {
    const width = area.clientWidth;
    const height = area.clientHeight;

    const position = area.getBoundingClientRect();
    const top = position.top + window.scrollY;
    const left = position.left;
    console.log(position.top);
    return {
        left,
        height,
        top,
        width
    };
};

const setTweenArea = (link, magicArea) => {
    const { left, height, top, width } = getAreaDetails(link);

    gsap.set(magicArea, {
        top,
        left,
        width,
        height
    });
};

const tweenMagicArea = (target, magicArea) => {
    const { left, height, top, width } = getAreaDetails(target);

    gsap.to(magicArea, 0.5, {
        left,
        top,
        width,
        height,
        ease: Power3.easeInOut
    });
};

const getMagicActiveElement = (links) => {
    return links.filter((link) => {});
};

const moveMagicArea = (links, magicArea, isTweenBack) => {
    const magicActiveElement = getMagicActiveElement(links);

    links.map((link) => {
        link.addEventListener("mouseenter", function(e) {
            tweenMagicArea(e.target, magicArea);
        });

        link.addEventListener("focus", function(e) {
            tweenMagicArea(e.target, magicArea);
        });

        if (isTweenBack && magicActiveElement.length) {
            link.addEventListener("mouseleave", function(e) {
                tweenMagicArea(magicActiveElement[0], magicArea);
            });

            link.addEventListener("focusout", function(e) {
                tweenMagicArea(magicActiveElement[0], magicArea);
            });
        }
    });
};

const setMagic = (links, magicArea) => {
    // check if .is-magic-active || aria-current="page"
    const magicActiveElement = getMagicActiveElement(links);

    if (magicActiveElement.length) {
        setTweenArea(magicActiveElement[0], magicArea);
    } else {
        setTweenArea(links[0], magicArea);
    }
};

const initMagic = ({ isResize } = { isResize: false }) => {
    if (!magicAreas.length) return;

    magicAreas.map((magicArea) => {
        const targetMagicArea = magicArea.getAttribute("data-target-class");

        const links = [...document.querySelectorAll(targetMagicArea)];

        if (!links.length) return;

        setMagic(links, magicArea);

        if (!isResize) {
            const isTweenBack = magicArea.getAttribute("data-tween-back") === "true";

            moveMagicArea(links, magicArea, isTweenBack);
        }
    });
};

initMagic();