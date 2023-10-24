let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
let total = 0;
let costo = 0;
let tipoenvio = "";
let tipopago = "";

function showCart(registro){
    let htmlContentToAppend=`<tr>
    <th></th>
    <th>Nombre</th>
    <th>Costo</th>
    <th>Cantidad</th>
    <th>Subtotal</th>
  </tr>`;
    for (const product of registro) { 
        htmlContentToAppend += `
        <tr>
            <td><img  style="width:15rem" id="imgCarrito" src="${product.image}" class="img-thumbnail img-fluid"> </img></td>
            <td>${product.name}</td>
            <td>${product.currency} ${product.unitCost}</td>
            <td><input type="number" style="height: 30px;width: 40px;" product-id="${product.id}" onchange="actualizarPrecio(this)" value="${product.count}" min="1" onkeydown="return false"></td>
            <td>${product.currency} ${product.unitCost * product.count}</td>
            <td><button type="button" class="btn btn-outline-danger" id="${product.name}" onclick="borrar(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg></button></td>
        </tr>
        `}
    document.getElementById("tabla").innerHTML = htmlContentToAppend;
    subtotales();
    if (tipoenvio !== ""){ 
        calcularEnvio();
    }
    calcularTotal();
}   

function actualizarPrecio(input){
    const productId = input.getAttribute("product-id");
    const producto = carrito.find(item => item.id == productId);

    if (producto) {
            producto.count = input.value;
        }
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        showCart(carrito);
    }
     
document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(CART_INFO_URL+25801+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            const objet = carrito.findIndex((product) => product.id == resultObj.data.articles[0].id)
            if(objet == -1){
            carrito.push(resultObj.data.articles[0]);
            showCart(carrito)
        }else {showCart(carrito)}
    }
    });
});

function subtotales(){
    let temporal = 0;
    for( let articulo of carrito){
        if (articulo.currency == "UYU"){
            temporal += articulo.count * (articulo.unitCost*40);
        }else{
            temporal += articulo.count * articulo.unitCost;
        }
    }
    total = temporal;
    document.getElementById("subtotal").innerHTML = "USD " + total;
}

function envio(input){
    tipoenvio = input;
    calcularEnvio();
}
 
function calcularEnvio(){
    let id = tipoenvio.getAttribute("id");
    switch (id){
        case "premium": costo = total * 0.15;
        break;
        case "express": costo = total * 0.07;
        break
        case "standard": costo = total * 0.05;
    } 
    document.getElementById("envío").innerHTML = "USD " + Math.round(costo);
    calcularTotal()

}

function calcularTotal(){
    let precio = total +  Math.round(costo);
    document.getElementById("total").innerHTML= "USD " + precio;
}

function formaPago(input){
    tipopago = input.getAttribute("id");
    if(tipopago == "crédito"){
        document.getElementById("numero_cuenta").setAttribute("disabled", "");
        document.getElementById("vencimiento_tarjeta").removeAttribute("disabled");
        document.getElementById("codigo_tarjeta").removeAttribute("disabled");
        document.getElementById("num_tarjeta").removeAttribute("disabled");
        document.getElementById("formaDePago").innerText = "Tarjeta de crédito";
    }else{ 
        document.getElementById("numero_cuenta").removeAttribute("disabled");
        document.getElementById("vencimiento_tarjeta").setAttribute("disabled", "");
        document.getElementById("codigo_tarjeta").setAttribute("disabled", "");
        document.getElementById("num_tarjeta").setAttribute("disabled", "");
        document.getElementById("formaDePago").innerText = "Transferencia bancaria";
    }
}

document.getElementById("comprar").addEventListener("click",()=>{
    const calle = document.getElementById("calle");
    const num = document.getElementById("numero");
    const esquina = document.getElementById("esquina");
    const envios = document.getElementsByName("shipping");
    const btn = document.getElementById("link");
    const finalizar = document.getElementsByClassName("is-invalid")

    event.preventDefault();

    if (calle.value == ""){
        calle.classList.add("is-invalid")
    }else{
        calle.classList.remove("is-invalid")
    }
    
    if (num.value == ""){
        num.classList.add("is-invalid")
    }else{
        num.classList.remove("is-invalid")
    }

    if (esquina.value == ""){
        esquina.classList.add("is-invalid")
    }else{
        esquina.classList.remove("is-invalid")
    }

    if (tipoenvio == ""){
        for (let envio of envios){
            envio.classList.add("is-invalid")
        }
    }else{
        for (let envio of envios){
            envio.classList.remove("is-invalid")
        }
    }

    if (tipopago == ""){
        btn.classList.add("is-invalid")
    }else{
        btn.classList.remove("is-invalid")
    }
    if( finalizar.length == 0){
        
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada con éxito',
            showConfirmButton: false,
            timer: 1500
          })
    }

    
})

function borrar(button){
    let cosa = button.getAttribute("id");
    let provicional = [];
    for (let articulo of carrito){
        if (articulo.name !== cosa){
            provicional.push(articulo);
        }
    }
    carrito = provicional;
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    showCart(carrito);
}