
const provinciaSeleccionada = document.getElementById("provincia-retiro");
const municipioSeleccionado = document.getElementById("municipio-retiro");
const localidadSeleccionada = document.getElementById("localidad-retiro");

function provincia() {
    try {
        fetch("https://apis.datos.gob.ar/georef/api/provincias")
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
            let options = `<option value="Elije una provincia">Elije una provincia</option>`;

            json.provincias.forEach(el => options += `<option value="${el.nombre}">${el.nombre}</option>`);
            
            provinciaSeleccionada.innerHTML = options;
            
        });  
    }
    catch (error) {
        console.log("Error al obtener datos: " + error);
    }    
}

document.addEventListener("DOMContentLoaded", provincia)

function localidad(municipio){
     try {
        fetch(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipio}`)
        .then(res => res.ok ? res.json() : Promise.reject(res))        
        .then(json => {
            let options = `<option value="Elije una localidad">Elije una localidad</option>`;

            json.localidades.forEach(el => options += `<option value="${el.id}">${el.nombre}</option>`);
            
            localidadSeleccionada.innerHTML = options;            
        });  
     }
     catch(error) {
         console.log("Error al obtener datos: " + error);
     }
}

function municipio(provincia){
    try {
        fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}`)
        .then(res => res.ok ? res.json() : Promise.reject(res))        
        .then(json => {
            let options = `<option value="Elije un municipio">Elije un municipio</option>`;

            json.municipios.forEach(el => options += `<option value="${el.id}">${el.nombre}</option>`);
            
            municipioSeleccionado.innerHTML = options;            
        });  
    }
    catch(error) {
        console.log("Error al obtener datos: " + error);
    }
}

provinciaSeleccionada.addEventListener("change", e => {        
    municipio(e.target.value); 
})

municipioSeleccionado.addEventListener("change", e => {
    localidad(e.target.value);     
})