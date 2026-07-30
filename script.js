// Плавое появление блоков

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.2
});

document.querySelectorAll("section").forEach(section=>{

    observer.observe(section);

});

// Параллакс

window.addEventListener("scroll",()=>{

    document.querySelector("header").style.backgroundPositionY =
        window.pageYOffset * 0.5 + "px";

});

// Золотые частицы

function createParticle(){

    const p=document.createElement("div");

    p.className="particle";

    p.style.left=Math.random()*100+"vw";

    p.style.animationDuration=(5+Math.random()*8)+"s";

    p.style.opacity=Math.random();

    p.style.width=p.style.height=
        (3+Math.random()*8)+"px";

    document.body.appendChild(p);

    setTimeout(()=>{

        p.remove();

    },12000);

}

setInterval(createParticle,250);

// Подсветка карточек

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("mousemove",e=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;
        const y=e.clientY-rect.top;

        card.style.background=
        `radial-gradient(circle at ${x}px ${y}px,
        rgba(255,216,107,.25),
        rgba(255,255,255,.05))`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.background="rgba(255,255,255,.08)";

    });

});

// Курсор со свечением

const glow=document.createElement("div");

glow.style.cssText=`
position:fixed;
width:18px;
height:18px;
border-radius:50%;
background:#ffd86b;
pointer-events:none;
filter:blur(8px);
z-index:9999;
`;

document.body.appendChild(glow);

window.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX-9+"px";
    glow.style.top=e.clientY-9+"px";

});

// Чат с цифровым помощником ЦКиД

async function sendMessage() {

    const input = document.getElementById("userMessage");
    const chat = document.getElementById("chatMessages");

    if (!input || !chat) {
        alert("Не найдено окно чата.");
        return;
    }

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    chat.innerHTML += "<div class='user-message'>" + message + "</div>";

    input.value = "";

    try {

        const response = await fetch("/api/bot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        chat.innerHTML +=
            "<div class='bot-message'>" +
            data.answer.replace(/\n/g, "
") +
            "</div>";

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {

        console.error(error);

        chat.innerHTML +=
            "<div class='bot-message'>Ошибка подключения к серверу.</div>";
    }

}
