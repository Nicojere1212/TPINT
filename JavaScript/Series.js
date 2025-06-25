const seriesJSON = localStorage.getItem("series");
const series = seriesJSON ? JSON.parse(seriesJSON) : DATA_SERIES;

AgregarContenidoSeries(1);
function AgregarContenidoSeries(serieSeleccionada) {
    console.log(series);

    const titulo = series[serieSeleccionada].titulo;
    document.getElementById("titulo").textContent = titulo;

    const genero = series[serieSeleccionada].genero;
    document.getElementById("genero").textContent = genero;

    const descripcion = series[serieSeleccionada].descripcion;
    document.getElementById("descripcion").textContent = descripcion;

    const iframe = series[serieSeleccionada].iframe;
    document.getElementById("iframe").src = iframe;

    const linkComenzar = series[serieSeleccionada].linkComenzar;
    const botonComenzar = document.getElementById("linkComenzar");

    botonComenzar.onclick = () => {
        window.open(linkComenzar, "_blank");
    };
    
    const actor1 = series[serieSeleccionada].actores[0];
    const actor2 = series[serieSeleccionada].actores[1];
    const actor3 = series[serieSeleccionada].actores[2];
    const actor4 = series[serieSeleccionada].actores[3];

    const actor1Link = series[serieSeleccionada].linkActores[0];
    const actor2Link = series[serieSeleccionada].linkActores[1];
    const actor3Link = series[serieSeleccionada].linkActores[2];
    const actor4Link = series[serieSeleccionada].linkActores[3];

    document.getElementById("actor1").textContent = actor1;
    document.getElementById("actor2").textContent = actor2;
    document.getElementById("actor3").textContent = actor3;
    document.getElementById("actor4").textContent = actor4;

    document.getElementById("actor1").setAttribute("href", actor1Link);
    document.getElementById("actor2").setAttribute("href", actor2Link);
    document.getElementById("actor3").setAttribute("href", actor3Link);
    document.getElementById("actor4").setAttribute("href", actor4Link);

    //Logica del Select
    const capitulosArray = series[serieSeleccionada].episodiosPorTemporada;

    // Reemplaza los select para eliminar duplicados y eventos previos
    let selectTemporadas = document.getElementById("selectTemporadas");
    let selectCapitulos = document.getElementById("selectCapitulos");

    selectTemporadas.replaceWith(selectTemporadas.cloneNode(false));
    selectCapitulos.replaceWith(selectCapitulos.cloneNode(false));

    // Vuelve a capturar las referencias nuevas
    selectTemporadas = document.getElementById("selectTemporadas");
    selectCapitulos = document.getElementById("selectCapitulos");

    // Opcional: Agrega un placeholder
    const placeholderTemp = document.createElement("option");
    placeholderTemp.textContent = "Seleccionar temporada";
    placeholderTemp.disabled = true;
    placeholderTemp.selected = true;
    selectTemporadas.appendChild(placeholderTemp);

    capitulosArray.forEach((_, indexTemporada) => {
        const option = document.createElement('option');
        option.value = indexTemporada + 1;
        option.textContent = "Temporada " + (indexTemporada + 1);
        selectTemporadas.appendChild(option);        
    });

    selectTemporadas.addEventListener('change', () => {
        const temporadaNum = parseInt(selectTemporadas.value);
        const numCapitulos = capitulosArray[temporadaNum - 1];

        selectCapitulos.innerHTML = '<option value="" disabled selected>Seleccionar capítulo</option>';
        for (let i = 1; i <= numCapitulos; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = "Capítulo " + i;
            selectCapitulos.appendChild(option);
        }
    });

    const contenedorCarrusel = document.getElementById("carruselSimilares");
    contenedorCarrusel.innerHTML = ""; // Limpia por si recargás

    // Seleccionar hasta 5 series distintas a la actual
    const seriesSimilares = series.filter((_, i) => i !== serieSeleccionada);
    const maxSimilares = Math.min(5, seriesSimilares.length);
    const mezcladas = seriesSimilares.sort(() => Math.random() - 0.5).slice(0, maxSimilares);

    mezcladas.forEach((serie, i) => {
        const indexOriginal = series.indexOf(serie);

        const link = document.createElement("a");
        link.href = `detalle-series.html?id=${indexOriginal}`;

        const imagen = document.createElement("img");
        imagen.src = serie.portadaJPG;
        imagen.alt = serie.titulo;

        link.appendChild(imagen);
        contenedorCarrusel.appendChild(link);
    });

    // Flechas de navegación
    const carrusel = document.getElementById("carruselSimilares");
    const btnIzquierda = document.getElementById("btnIzquierda");
    const btnDerecha = document.getElementById("btnDerecha");

    btnIzquierda.addEventListener("click", () => {
        carrusel.scrollBy({ left: -300, behavior: "smooth" });
    });

    btnDerecha.addEventListener("click", () => {
        carrusel.scrollBy({ left: 300, behavior: "smooth" });
    });
}

// Obtener el valor de "id" desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Verificar si el parámetro existe y es válido
if (id !== null && !isNaN(id) && series[id]) {
    AgregarContenidoSeries(parseInt(id));
} else {
    // Si no hay id o es inválido, cargar por defecto la serie 0 o mostrar error
    console.warn("Serie no encontrada o ID inválido. Se cargará la primera por defecto.");
    AgregarContenidoSeries(0);
}
