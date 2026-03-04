
var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
});
window.addEventListener("load", function () {

    let bar = document.querySelector(".progres-bar");
    let percent = document.querySelector("#percent");
    let loader = document.querySelector(".loader");

    let progress = 0;

    let interval = setInterval(function () {

        progress += 1;

        bar.style.width = progress + "%";
        percent.innerHTML = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);

            loader.style.transition = "transform 1s cubic-bezier(0.19, 1, 0.22, 1)";

            loader.style.transform = "translateY(-100%)";
            loader.style.transition = "transform 1s ease";
        }

    }, 0);

});
function firstpage() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            delay: -1,
            duration: 2,
            stagger: 0.2,
        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,
        });
}

function skewmouse() {

    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {

        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circle(xscale, yscale, dets.clientX, dets.clientY);

        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform =
                `translate(${dets.clientX}px, ${dets.clientY}px) scale(0,0)`;
        }, 100);
    });
}

function circle(xscale, yscale, x, y) {
    document.querySelector("#minicircle").style.transform =
        `translate(${x}px, ${y}px) scale(${xscale}, ${yscale})`;

}



skewmouse();
firstpage();


document.querySelectorAll(".elem")
    .forEach(function (elem) {
        var rotate = 0;
        var diffrot = 0;


        elem.addEventListener("mouseleave", function (details) {
            gsap.to(elem.querySelector("img"), {
                opacity: 0,
                ease: Power3,
            });
        });

        elem.addEventListener("mousemove", function (details) {
            var diff = details.clientY - elem.getBoundingClientRect().top;
            diffrot = details.clientX - rotate;
            rotate = details.clientX;
            gsap.to(elem.querySelector("img"), {
                opacity: 1,
                ease: Power3,
                top: diff,
                left: details.clientX,
                rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
            });
        });
    });
