
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

/* Despliego el formulario del Index */

const botonMostrar = document.getElementById("mostrarFormulario");
const formularioContainer = document.getElementById("formularioContainer");

botonMostrar.addEventListener("click", () => {
    if (formularioContainer.style.display === "none") {
        formularioContainer.style.display = "block";
    } else {
        formularioContainer.style.display = "none";
    }
});

/* Alerta para Validacion de Formulario index */
const formulario = document.getElementById("form")
const nombre = document.getElementById("text")
const numero = document.getElementById("number")
const email = document.getElementById("email")
const fechaSalida = document.getElementById("fecha-salida")
const fechaLlegada = document.getElementById("fecha-llegada")
const mensaje = document.getElementById("mensaje")
const alerta = document.getElementById("warnings")

function numeroValido(numero) {
  return !isNaN(numero);
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // previene el envio del formulario por defecto
    let alertas = [];
  
    // verifica que todos los campos no están en blanco
    if (nombre.value === "" || 
        numero.value === "" || 
        email.value === "" || 
        fechaSalida.value === "" || 
        fechaLlegada.value === "" || 
        mensaje.value === "") {
          alertas.push("Por favor, complete todos los campos del formulario.");
    }    
     
    for (var i=0; i<nombre.value.length; i++){
      var charCode = nombre.value.charCodeAt(i);       
      if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 32) // no es mayuscula ni minuscula ni espacio en blanco
        alertas.push("El nombre solo puede contener letras y espacios");
        break;
    }
    if (!email.value.includes("@")) {
      alertas.push("La dirección de correo electrónico debe contener el símbolo '@'.");
    }
    if (!numeroValido(numero.value)) {
      alertas.push("El valor ingresado no es un numero valido");
    }
     
    alerta.innerHTML = alertas.join(', ');
  
    // Si no hay alertas, el formulario se envia igual
    if (alertas.length === 0) {
      alert("Formulario enviado correctamente.");
      formulario.submit(); // envia el formulario
    }

    
  });

