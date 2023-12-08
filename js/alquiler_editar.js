console.log(location.search) // lee los argumentos pasados a este formulario
var id=location.search.substr(4)
console.log(id)
const { createApp } = Vue
createApp({
data() {
return {
id:0,
nombre:"",
imagen:"",
vehiculo:"",
precio:0,
fecha_desde: new Date(),
fecha_hasta: new Date(),
url:'https://mavepi.pythonanywhere.com/alquileres/'+id,
}
},
methods: {
fetchData(url) {
fetch(url)
.then(response => response.json())
.then(data => {

console.log(data)
this.id=data.id
this.nombre = data.nombre;
this.imagen=data.imagen
this.vehiculo=data.vehiculo
this.precio=data.precio
this.fecha_desde=data.fecha_desde
this.fecha_hasta=data.fecha_hasta
})
.catch(err => {
console.error(err);
this.error=true
})
},
modificar() {
let alquiler = {
nombre:this.nombre,
precio: this.precio,
vehiculo: this.vehiculo,
imagen:this.imagen,
fecha_desde: this.fecha_desde,
fecha_hasta: this.fecha_hasta
}
var options = {
body: JSON.stringify(alquiler),
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
redirect: 'follow'
}
fetch(this.url, options)
.then(function () {
alert("Registro modificado")
window.location.href = "../templates/alquileres.html";
})
.catch(err => {
console.error(err);
alert("Error al Modificar")
})
}
},
created() {
this.fetchData(this.url)
},
}).mount('#app')