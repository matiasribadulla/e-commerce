let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

function showCart(registro){
    let htmlContentToAppend="";
    for (const product of registro) { 
        htmlContentToAppend += `
        <tr>
            <td><img  style="width:15rem" id="imgCarrito" src="${product.image}" class="img-thumbnail img-fluid"> </img></td>
            <td>${product.name}</td>
            <td id="precio-${product.id}">${product.currency} ${product.unitCost}</td>
            <td><input type="number" style="height: 30px;width: 40px;" product-id="${product.id}" onchange="actualizarPrecio(this)" value="${product.count}" min="1" onkeydown="return false"></td>
            <td id="total-${product.id}">${product.currency} ${product.unitCost}</td>
        </tr>
        `}
    document.getElementById("tabla").innerHTML += htmlContentToAppend;
}   

function actualizarPrecio(input){
    const productId = input.getAttribute("product-id");
    const total = document.getElementById(`total-${productId}`)
    const producto = carrito.find(item => item.id == productId);

    if (producto) {
        const cantidad = input.value;
        const nuevoPrecio = producto.unitCost * cantidad;
        total.innerText = producto.currency + " " + nuevoPrecio;
    }
}
 
document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(CART_INFO_URL+25801+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            carrito.push(resultObj.data.articles[0]);
            showCart(carrito)
        }
    });
});
