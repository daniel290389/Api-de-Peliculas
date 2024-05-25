console.log("Activado");
let pagina =1 ;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");


btnSiguiente.addEventListener("click", () => { if (pagina <1000){
    pagina +=1;
    cargarPeliculas();
}



});
btnAnterior.addEventListener("click", () => { if (pagina>1){
    pagina -=1;
    cargarPeliculas();
}



});





const cargarPeliculas = async ()=>{

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=19d383468a9b5db92c3a5e26b807a3d8&language=es-ARG&page=${pagina}`);

        console.log(respuesta);

        // si la respuesta es correcta
        if (respuesta.status === 200) {
        const datos = await respuesta.json();

       // console.log(datos.results);


       let peliculas =' ';

       datos.results.forEach(pelicula=> {
        peliculas += `
        <div class="pelicula">
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        <h3 class="titulo">${pelicula.title}</h3>  
        </div>
        `;
        
        })
        // peliculas = peliculas + `<h1>${pelicula.title}</h1>` detalle a repasar

       document.getElementById('contenedor').innerHTML=peliculas;



        }else if (respuesta.status ===401){
            console.log("Pusiste la llave mal ");
        }else if(respuesta.status ===404){
            console.log('la pelicula que buscas  no Existe');
        }
        else{
            console.log("hubo un error y nosabemos que paso ?");
        }
        
    } catch (error) {
        console.log(error);
    }



}


cargarPeliculas();