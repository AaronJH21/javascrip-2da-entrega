class  Productos{
    constructor(nombre,tipo,estado,precio){
        this.nombre=nombre
        this.tipo=tipo
        this.estado=estado
        this.precio=precio        
    }
    incremtarPrecio(dineroAincrementar){
        this.precio+=dineroAincrementar;
    }
    decrementarPrecio(dineroADecrementar){
        this.precio -= dineroADecrementar;
    }
}
let productos=[]
let formProductos = document.getElementById('formProductos')
let divProductos = document.getElementById('divProductos')
let parrafoError = document.getElementById('parrafoError')

if(localStorage.getItem('Productos')){
    productos = JSON.parse(localStorage.getItem('Productos'))    
} else{
    productos=[]
}
//ingresa imformacion del fomulario
formProductos.addEventListener('submit',(e) => {
    e.preventDefault()
 
    let nombreProducto = document.getElementById("nombre").value
    let tipoProducto = document.getElementById("tipo").value
    let estadoProducto = document.getElementById("estado").value
    let precioProducto = document.getElementById("precio").value
    
    let objetoProducto = new Productos (nombreProducto,tipoProducto, estadoProducto,precioProducto)
    
    productos.push(objetoProducto)
    
    localStorage.setItem('productos',JSON.stringify (productos))

    formProductos.reset()
})
//Muestro la imformacion del storage por un boton
document.getElementById('botonProductos').addEventListener('click',()=> {
    let productosStorage = JSON.parse(localStorage.getItem ('productos'))
    
    if(divProductos.children.length ==0){
        productosStorage.forEach((productosArray, indice)=>{
            divProductos.innerHTML +=`
            <div class="card" id="Productos${indice}" style="width: 18rem;margin:6px">
            <div class="card-body">
            <h5 class="card-title">${productosArray.nombre}</h5>          
            <p class="card-text">${productosArray.tipo}</p>
            <p class="card-text">${productosArray.estado}</p>
            <p class="card-text">$${productosArray.precio}</p>
            <button id="boton${indice}" class="btn btn-danger">Eliminar</button>
            </div>
            </div>
            `
        })
        //evento de elimiar cards
        productosStorage.forEach((productosArray,indice)=>{
            document.getElementById(`boton${indice}`).addEventListener('click',()=>{
                document.getElementById(`Productos${indice}`).remove()
                productos.splice(indice, 1)
                localStorage.setItem('Productos',JSON.stringify(productos))
                console.log(`El producto${productosArray.nombre}ha sido eliminado`)
            })
        })

        
    } else{
        parrafoError.innerText =" por favor deje de dar click a el boton cargar productos"
    }
})


