const { createApp } = Vue
createApp({
data() {
return {
alquileres:[],
//url:'http://localhost:5000/alquileres',
// si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
url:'https://mavepi.pythonanywhere.com/alquileres', // si ya lo subieron a pythonanywhere
error:false,
cargando:true,
/*atributos para el guardar los valores del formulario */
id:0,
nombre:"",
imagen:"",
vehiculo:"",
precio:0,
fecha_desde: new Date(),
fecha_hasta: new Date(),
}
},
methods: {
fetchData(url) {
fetch(url)
.then(response => response.json())
.then(data => {
this.alquileres = data;
this.cargando=false
})
.catch(err => {
console.error(err);
this.error=true
})
},
eliminar(alquiler) {
const url = this.url+'/' + alquiler;
var options = {
method: 'DELETE',
}
fetch(url, options)
.then(res => res.text()) // or res.json()
.then(res => {
location.reload();
})
},
grabar(){
let alquiler = {
nombre:this.nombre,
precio: this.precio,
vehiculo: this.vehiculo,
imagen:this.imagen,
fecha_desde: this.fecha_desde,
fecha_hasta: this.fecha_hasta
}
var options = {
body:JSON.stringify(alquiler),
method: 'POST',
headers: { 'Content-Type': 'application/json' },
redirect: 'follow'
}
fetch(this.url, options)
.then(function () {
alert("Registro grabado")
window.location.href = "../templates/alquileres.html";
})
.catch(err => {
console.error(err);
alert("Error al Grabarr")
})
}
},
created() {
this.fetchData(this.url)
},
}).mount('#app')