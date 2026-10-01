// Programa
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




// MODAL ENTRADAS
const ticketsModal = document.querySelector("#ticketsModal");
const ticketsButton = document.querySelector(".fixed-tickets-button");
const ticketsClose = document.querySelector(".tickets-close");

function toggleTicketsModal(show) {
    ticketsModal.classList.toggle("open", show);
    ticketsModal.setAttribute("aria-hidden", !show);
}

ticketsButton.addEventListener("click", () => {
    toggleTicketsModal(true);
});

ticketsClose.addEventListener("click", () => {
    toggleTicketsModal(false);
});

ticketsModal.addEventListener("click", event => {
    if (event.target === ticketsModal) {
        toggleTicketsModal(false);
    }
});

//ENTRADAS

function costeTotal() {

    let numeroEntradas = document.getElementById("numero").value;
    let valorExposicion = document.getElementById("exposicion").value;

    let costePorEntrada = 0;

    if (valorExposicion === "e1") {
        costePorEntrada = 19;
    } else if (valorExposicion === "e2") {
        costePorEntrada = 25;
    } else {
        costePorEntrada = 50;
    }

    let costeEntradas = numeroEntradas * costePorEntrada;

    if (!numeroEntradas) {
        costeEntradas = 0;
    }

    document.getElementById("coste").innerHTML = costeEntradas + " €";
}

function comprar() {
  console.log("-----------función comprar");

  document.getElementById("nom").innerHTML =
    document.getElementById("nombre").value;
  document.getElementById("corr").innerHTML =
    document.getElementById("correo").value;
  document.getElementById("num").innerHTML =
    document.getElementById("numero").value;
  document.getElementById("ct").innerHTML =
    document.getElementById("coste").innerHTML;

  let valorExposicion = document.getElementById("exposicion").value;
  let nombreExposicion = "";
  if (valorExposicion === "e1") {
    nombreExposicion = "VERMUT - 19 €";
  } else if (valorExposicion === "e2") {
    nombreExposicion = "CASTIZO - 25 €";
  } else {
    nombreExposicion = "MAESTRO - 50 €";
  }
  document.getElementById("ex").innerHTML = nombreExposicion;

  document.getElementById("modal").style.display = "flex";
  return false;
}

function cerrarVentana() {
    document.getElementById("modal").style.display = "none";
}
