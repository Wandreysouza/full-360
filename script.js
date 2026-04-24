function initPage(){
    showCardsSequentially();
    revealOnScroll();
}

document.addEventListener("DOMContentLoaded", initPage);

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (!loader) return;

    setTimeout(() => {
        loader.style.transition = "opacity 1s ease";
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);
    }, 2000);
});

/* MICRO HEADER */
window.addEventListener("scroll",()=>{
    const header = document.querySelector(".header");
    if(window.scrollY > 200){
        header.classList.add("active");
    }else{
        header.classList.remove("active");
    }
});

/* SCROLL REVEAL */
function revealOnScroll(){
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;

    reveals.forEach(el=>{
        const elementTop = el.getBoundingClientRect().top;
        if(elementTop < windowHeight - 100){
            el.classList.add("active");
        }else{
            el.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

/* SCROLL SUAVE */
function scrollToSection(id){
    const el = document.getElementById(id);
    if(el){
        el.scrollIntoView({behavior:'smooth'});
    }
}

/* PARALLAX MARCA D'ÁGUA */
window.addEventListener("scroll",()=>{
    let offset = window.scrollY;
    const watermark = document.querySelector(".watermark");

    if(watermark){
        watermark.style.transform =
        `translate(-50%,-50%) translateY(${offset * 0.1}px)`;
    }
});

/* ENTRADA DOS CARDS */
function showCardsSequentially(){
    const cards = document.querySelectorAll(".card");
    
    cards.forEach((card, index)=>{
        setTimeout(()=>{
            card.classList.add("show");
        }, index * 300);
    });
}