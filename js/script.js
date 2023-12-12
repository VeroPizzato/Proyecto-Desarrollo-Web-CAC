const provinciaSeleccionada = document.getElementById("provincia-retiro");
const municipioSeleccionado = document.getElementById("municipio-retiro");
const localidadSeleccionada = document.getElementById("localidad-retiro");

function provincia() {
    try {
        fetch("https://apis.datos.gob.ar/georef/api/provincias")
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
            let options = `<option value="Elige una provincia">Elige una provincia</option>`;

            json.provincias.forEach(el => options += `<option value="${el.nombre}">${el.nombre}</option>`);
                  
            // Verificar si el elemento provinciaSeleccionada existe en el html           
            if (provinciaSeleccionada) {
                provinciaSeleccionada.innerHTML = options;
            } else {
                console.error("El elemento provinciaSeleccionada no fue encontrado en el documento.");
            }        
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
            let options = `<option value="Elige una localidad">Elige una localidad</option>`;

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
            let options = `<option value="Elige un municipio">Elige un municipio</option>`;

            json.municipios.forEach(el => options += `<option value="${el.id}">${el.nombre}</option>`);
        
            municipioSeleccionado.innerHTML = options;            
        });  
    }
    catch(error) {
    console.log("Error al obtener datos: " + error);
    } 
}

provinciaSeleccionada?.addEventListener("change", e => {        
    municipio(e.target.value); 
})

municipioSeleccionado?.addEventListener("change", e => {
    localidad(e.target.value);     
})

/* Despliego el formulario del Index */

const botonMostrar = document.getElementById("mostrarFormulario");
const formularioContainer = document.getElementById("formularioContainer");

botonMostrar?.addEventListener("click", () => {
    if (formularioContainer.style.display === "none") {
        formularioContainer.style.display = "block";
        botonMostrar.style.display = "none";
    } else {
        formularioContainer.style.display = "none";
    }
});

/* Alerta para Validacion de Formulario index */
const formulario1 = document.getElementById("form1")
const formulario2 = document.getElementById("form2")
const nombre = document.getElementById("text")
const numero = document.getElementById("number")
const email = document.getElementById("email")
const fechaSalida = document.getElementById("fecha-salida")
const fechaLlegada = document.getElementById("fecha-llegada")
const mensaje = document.getElementById("mensaje")
const alerta = document.getElementById("warnings")
const alerta2 = document.getElementById("warnings2")

function numeroValido(numero) {
  return !isNaN(numero);
}

formulario1?.addEventListener("submit", (e) => {
    e.preventDefault(); // previene el envio del formulario por defecto
    let alertas = [];
  
    // verifica que todos los campos no están en blanco
    if (fechaSalida.value === "" || 
        fechaLlegada.value === "") {
          alertas.push("Por favor, complete todos los campos del formulario.");
    }   

    if (alertas.length > 0) {
        alerta.textContent = alertas.join(', ');
        alerta.style.display = "block"; // muestra el elemento de alerta
    } else {
        alerta.style.display = "none"; // oculta el elemento de alerta si no hay errores
    }
  
    // Si no hay alertas, el formulario se envia 
    if (alertas.length === 0) {  
        Swal.fire({
            title: 'Formulario enviado correctamente.',                          
            icon: 'success',            
            confirmButtonColor: '#8486a6',                                           
            confirmButtonText: 'Aceptar',
            showConfirmButton: true,
            didClose: () => {
                window.location.href = '../pages/flota.html';  // accedo a la flota de autos después de que el usuario haya cerrado la alerta
            }
        })          
    }        
  });

  formulario2?.addEventListener("submit", (e) => {
    e.preventDefault(); // previene el envio del formulario por defecto
    let alertas = []; 
    
    // verifica que todos los campos no están en blanco
    if (nombre.value === "" || 
        numero.value === "" || 
        email.value === "" ||         
        mensaje.value === "") {           
          alertas.push("Por favor, complete todos los campos del formulario.");
    }    
    else{
      for (let i=0; i<nombre.value.length; i++){
        let charCode = nombre.value.charCodeAt(i);       
        if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 32) // no es mayuscula ni minuscula ni espacio en blanco
        {alertas.push("El nombre solo puede contener letras y espacios");
          break;
         }
      }
      if (!email.value.includes("@")) {
        alertas.push("La dirección de correo electrónico debe contener el símbolo '@'.");
      }
      if (!numeroValido(numero.value)) {
        alertas.push("El valor ingresado no es un numero valido");
      }
    }
     
    if (alertas.length > 0) {
        alerta2.textContent = alertas.join(', ');
        alerta2.style.display = "block"; // muestra el elemento de alerta
    } else {
        alerta2.style.display = "none"; // oculta el elemento de alerta si no hay errores
    }
  

  
    // Si no hay alertas, el formulario se envia 
    if (alertas.length === 0) {  
        Swal.fire({
            title: 'Formulario enviado correctamente.',                          
            icon: 'success',            
            confirmButtonColor: '#8486a6',                                           
            confirmButtonText: 'Aceptar',
            showConfirmButton: true,
            didClose: () => {
                formulario2.submit();  // accedo al formulario de contacto después de que el usuario haya cerrado la alerta
            }
        })          
    }        
  });
