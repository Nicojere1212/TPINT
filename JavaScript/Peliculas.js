//ASI LO COMO LO HACE EL PROFE
/*let peliculas = [];
const peliculasJSON = localStorage.getItem("peliculas");
if(!peliculasJSON){
    localStorage.setItem("peliculas", JSON.stringify(DATA_PELICULAS));
    peliculas = DATA_PELICULAS
}else{
    peliculas = JSON.parse(peliculasJSON);
}*/
//ESTO ME LO RECOMENDO CHAT GPT
const peliculasJSON = localStorage.getItem("peliculas");
const peliculas = peliculasJSON ? JSON.parse(peliculasJSON) : DATA_PELICULAS;
AgregarContenido(1);


function AgregarContenido(numeroDePelicula) {
    let peliculaSeleccionada = numeroDePelicula;
    console.log(peliculas);
    try {

        const titulo = peliculas[peliculaSeleccionada].titulo;
        document.getElementById("titulo").textContent = titulo;

        const duracion = peliculas[peliculaSeleccionada].duracion;
        document.getElementById("duracion").textContent = duracion + " Min";

        const genero = peliculas[peliculaSeleccionada].genero;
        document.getElementById("genero").textContent = genero;

        const descripcion = peliculas[peliculaSeleccionada].descripcion;
        document.getElementById("descripcion").textContent = descripcion;

        const iframe = peliculas[peliculaSeleccionada].iframe;
        document.getElementById("iframe").src = iframe;

        const linkComenzar = peliculas[peliculaSeleccionada].linkComenzar;
        const botonComenzar = document.getElementById("linkComenzar");

        // Abre la pelicula en una pesta a nueva
        botonComenzar.onclick = () => {
            window.open(linkComenzar, "_blank");
        };

        //cargar actores

        const actor1 = peliculas[peliculaSeleccionada].actores[0];
        const actor2 = peliculas[peliculaSeleccionada].actores[1];
        const actor3 = peliculas[peliculaSeleccionada].actores[2];
        const actor4 = peliculas[peliculaSeleccionada].actores[3];

        const actor1Link = peliculas[peliculaSeleccionada].linkActores[0];
        const actor2Link = peliculas[peliculaSeleccionada].linkActores[1];
        const actor3Link = peliculas[peliculaSeleccionada].linkActores[2];
        const actor4Link = peliculas[peliculaSeleccionada].linkActores[3];



        if (peliculas[peliculaSeleccionada].length < 4) { //Se saltea el if nose porque
            document.getElementById("actor1").textContent = actor1;
            document.getElementById("actor2").textContent = actor2;
            document.getElementById("actor3").textContent = actor3;

            document.getElementById("actor1").setAttribute("href", actor1Link);
            document.getElementById("actor2").setAttribute("href", actor2Link);
            document.getElementById("actor3").setAttribute("href", actor3Link);

        } else {
            document.getElementById("actor1").textContent = actor1;
            document.getElementById("actor2").textContent = actor2;
            document.getElementById("actor3").textContent = actor3;
            document.getElementById("actor4").textContent = actor4;

            document.getElementById("actor1").setAttribute("href", actor1Link);
            document.getElementById("actor2").setAttribute("href", actor2Link);
            document.getElementById("actor3").setAttribute("href", actor3Link);
            document.getElementById("actor4").setAttribute("href", actor4Link);

        }
    } catch (error) {
        console.error("Error al generar contenido" + error);
    }

    const contenedorCarrusel = document.getElementById("carruselSimilares");
    contenedorCarrusel.innerHTML = ""; // Limpia por si recargás

    // Seleccionar hasta 5 peliculas distintas a la actual
    const peliculasSimilares = peliculas.filter((_, i) => i !== peliculaSeleccionada);
    const maxSimilares = Math.min(5, peliculasSimilares.length);
    const mezcladas = peliculasSimilares.sort(() => Math.random() - 0.5).slice(0, maxSimilares);

    mezcladas.forEach((pelicula) => {
    const indexOriginal = peliculas.findIndex(p => p.titulo === pelicula.titulo);

    const link = document.createElement("a");
    link.href = `DetallePeli.html?id=${indexOriginal}`;

    const imagen = document.createElement("img");
    imagen.src = pelicula.portadaJPG;
    imagen.alt = pelicula.titulo;

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
if (id !== null && !isNaN(id) && peliculas[id]) {
    AgregarContenido(parseInt(id));
} else {
    // Si no hay id o es inválido, cargar por defecto la película 0 o mostrar error
    console.warn("Película no encontrada o ID inválido. Se cargará la primera por defecto.");
    AgregarContenido(0);
}
