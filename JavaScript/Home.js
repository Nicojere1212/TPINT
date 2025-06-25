const peliculasJSON = localStorage.getItem("peliculas");
const seriesJSON = localStorage.getItem("series");

const peliculas = peliculasJSON ? JSON.parse(peliculasJSON) : DATA_PELICULAS;
const series = seriesJSON ? JSON.parse(seriesJSON) : DATA_SERIES;

const contenedor = document.querySelector(".ContainerContenidos");
const selectCategoria = document.getElementById("selectCategoria");
const listaCategorias = document.querySelectorAll(".ListaCategorias .Categoria a");

const generosPermitidos = [
  "suspenso",
  "acción",
  "ciencia ficción",
  "comedia",
  "drama",
  "romance",
  "documental"
];

// Función para renderizar
function renderContenido(filtradasPelis, filtradasSeries) {
  contenedor.innerHTML = "";

  filtradasPelis.forEach((peli) => {
    const card = document.createElement("div");
    card.className = "CardsContenidos";
    card.innerHTML = `
      <a href="DetallePeli.html?id=${peliculas.indexOf(peli)}">
        <img class="PosterContenidos" src="${peli.portadaJPG}" alt="${peli.titulo}">
      </a>
      <ul class="CardInfo">
        <li>${peli.rating}</li>
        <li>${peli.estreno}</li>
        <li>${peli.duracion} min</li>
        <li>${peli.clasificacion}</li>
      </ul>
    `;
    contenedor.appendChild(card);
  });

  filtradasSeries.forEach((serie) => {
    const card = document.createElement("div");
    card.className = "CardsContenidos";
    card.innerHTML = `
      <a href="detalle-series.html?id=${series.indexOf(serie)}">
        <img class="PosterContenidos" src="${serie.portadaJPG}" alt="${serie.titulo}">
      </a>
      <ul class="CardInfo">
        <li>${serie.rating}</li>
        <li>${serie.estreno}</li>
        <li>${serie.temporadas} temp</li>
        <li>${serie.clasificacion}</li>
      </ul>
    `;
    contenedor.appendChild(card);
  });
}

// Filtrado por género
function filtrarPorGenero(genero) {
  if (genero === "todas") {
    renderContenido(peliculas, series);
  } else if (generosPermitidos.includes(genero)) {
    const pelisFiltradas = peliculas.filter(peli => {
      const generosPeli = peli.genero.toLowerCase().split(",").map(g => g.trim());
      return generosPeli.includes(genero);
    });

    const seriesFiltradas = series.filter(serie => {
      const generosSerie = serie.genero.toLowerCase().split(",").map(g => g.trim());
      return generosSerie.includes(genero);
    });

    renderContenido(pelisFiltradas, seriesFiltradas);
  } else {
    renderContenido(peliculas, series);
  }
}

// Filtrado por nombre
const inputBusqueda = document.getElementById("Busqueda");

inputBusqueda.addEventListener("input", () => {
  const textoBusqueda = inputBusqueda.value.toLowerCase();

  const pelisFiltradas = peliculas.filter(peli =>
    peli.titulo.toLowerCase().includes(textoBusqueda)
  );

  const seriesFiltradas = series.filter(serie =>
    serie.titulo.toLowerCase().includes(textoBusqueda)
  );

  renderContenido(pelisFiltradas, seriesFiltradas);
});

// Evento para select
selectCategoria.addEventListener("change", () => {
  filtrarPorGenero(selectCategoria.value.toLowerCase());
});

// Eventos para lista de categorías
listaCategorias.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const genero = link.parentElement.getAttribute("data-categoria").toLowerCase();

    // Cambiar valor del select para que coincida visualmente
    selectCategoria.value = genero;

    filtrarPorGenero(genero);
  });
});

// Mostrar todo al cargar
renderContenido(peliculas, series);