const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Programa por días
const dayButtons = document.querySelectorAll(".day-button");
const schedule = document.querySelector(".schedule");

const schedules = {
    viernes: [
        ["18:00", "APERTURA", "Se abre la vuelta", "Inauguración del festival y primera degustación."],
        ["20:00", "MÚSICA", "Verbena de barrio", "Sesión musical al aire libre con sabor castizo."],
        ["22:00", "GASTRONOMÍA", "La gran degustación", "Una selección de tortillas de bares madrileños."]
    ],
    sabado: [
        ["12:00", "TALLER", "Aprende a darle la vuelta", "Taller práctico para preparar una tortilla perfecta."],
        ["17:00", "CONCURSO", "La gran vuelta", "Comienza el concurso oficial de tortilla de patatas."],
        ["21:30", "MÚSICA", "Noche castiza", "Música, vermut y tortilla hasta la noche."]
    ],
    domingo: [
        ["12:00", "VERMUT", "Domingo de barrio", "Vermut, tapas y tortillas en la plaza."],
        ["17:00", "JURADO", "La cata final", "El jurado elige la tortilla ganadora."],
        ["19:30", "PREMIOS", "La vuelta final", "Entrega de premios y cierre del festival."]
    ]
};

function renderSchedule(day) {
    schedule.innerHTML = schedules[day].map(event => `
        <article class="event">
            <time>${event[0]}</time>
            <div>
                <span class="tag">${event[1]}</span>
                <h3>${event[2]}</h3>
                <p>${event[3]}</p>
            </div>
        </article>
    `).join("");
}

dayButtons.forEach(button => {
    button.addEventListener("click", () => {
        dayButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        renderSchedule(button.dataset.day);
    });
});

// Debate de la cebolla
const onionButtons = document.querySelectorAll(".onion-option");
const answer = document.querySelector(".answer");

onionButtons.forEach(button => {
    button.addEventListener("click", () => {
        onionButtons.forEach(item => item.classList.remove("selected"));
        button.classList.add("selected");
        answer.textContent = `HAS ELEGIDO: ${button.dataset.answer}`;
    });
});

// Modal
const modal = document.querySelector("#rulesModal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".modal-close");

function toggleModal(show) {
    modal.classList.toggle("open", show);
    modal.setAttribute("aria-hidden", !show);
}

openModal.addEventListener("click", () => toggleModal(true));
closeModal.addEventListener("click", () => toggleModal(false));

modal.addEventListener("click", event => {
    if (event.target === modal) toggleModal(false);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") toggleModal(false);
});

// Selección de entrada
document.querySelectorAll(".ticket-select").forEach(button => {
    button.addEventListener("click", () => {
        const ticket = button.dataset.ticket;
        document.querySelector("#contacto").scrollIntoView({ behavior: "smooth" });
        document.querySelector("#formMessage").textContent = `Has seleccionado: ${ticket}`;
    });
});

// Formulario con validación JS
const form = document.querySelector("#contactForm");

form.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const terms = document.querySelector("#terms");

    const nameError = document.querySelector("#nameError");
    const emailError = document.querySelector("#emailError");
    const termsError = document.querySelector("#termsError");
    const formMessage = document.querySelector("#formMessage");

    nameError.textContent = "";
    emailError.textContent = "";
    termsError.textContent = "";
    formMessage.textContent = "";

    let valid = true;

    if (name.value.trim().length < 2) {
        nameError.textContent = "Introduce tu nombre.";
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Introduce un email válido.";
        valid = false;
    }

    if (!terms.checked) {
        termsError.textContent = "Debes aceptar esta casilla.";
        valid = false;
    }

    if (valid) {
        formMessage.textContent = "¡Perfecto! Te hemos apuntado a la lista de LA VUELTA.";
        form.reset();
    }
});
