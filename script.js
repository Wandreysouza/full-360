function initPage(){
    showCardsSequentially();
    revealOnScroll();
    initOutrosAccordion();
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

function initOutrosAccordion(){
    const triggers = document.querySelectorAll('.outros-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.outros-item');
            const panel = item.querySelector('.outros-panel');
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.outros-item.active').forEach(other => {
                if(other !== item){
                    const otherPanel = other.querySelector('.outros-panel');
                    other.classList.remove('active');
                    otherPanel.style.maxHeight = null;
                    otherPanel.classList.remove('typing');
                    otherPanel.textContent = otherPanel.dataset.text;
                    other.querySelector('.outros-trigger').setAttribute('aria-expanded', 'false');
                }
            });

            if(isActive){
                item.classList.remove('active');
                panel.style.maxHeight = null;
                panel.classList.remove('typing');
                panel.textContent = panel.dataset.text;
                trigger.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                startTyping(panel);
            }
        });
    });
}

function startTyping(panel){
    const text = panel.dataset.text || '';
    panel.textContent = '';
    panel.classList.add('typing');
    clearInterval(panel._typingTimer);

    let index = 0;
    panel._typingTimer = setInterval(() => {
        panel.textContent += text.charAt(index);
        index += 1;

        if(index > text.length){
            clearInterval(panel._typingTimer);
            panel.classList.remove('typing');
        }
    }, 20);
}
