const lista = document.getElementById("list");
const btn = document.querySelector("input");
let micomnt = JSON.parse(sessionStorage.getItem("miscoments"+localStorage.getItem("productID"))) || [];
let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
let info = ""

function showProductInfo(product){
    let htmlContentToAppend = `
            <div class="list-group-item">
                <h1>${product.name}</h1>
                <input type="button" onclick="agregarCarrito()" value="Agregar al carrito">
            <div> <br>
                <p>Precio: ${product.currency} ${product.cost}</p>
            </div>
            <div>
                <p>Descripcion:</p> ${product.description}  
            </div>
            <div><br>
                <p>Categoria:</p>  ${product.category}
            </div>
            <div><br>
                <p>Cantidad de vendidos:</p>
                ${product.soldCount}
            </div><br>
                <div class="row">
                    <p>Imagenes ilustrativas:</p>
                    <div class="slider-wrapper"> 
                        <div class="slider"> 
                            ${showPictures(product.images)}
                        </div>
                        <div class="slider-nav"> 
                            <a href="#slider-1"> </a>
                            <a href="#slider-2"> </a>
                            <a href="#slider-3"> </a>
                            <a href="#slider-4"> </a>
                        </div> 
                    </div>
                </div>
            </div>
            `
            info = {
                "id": `${product.id}`,
                "name": `${product.name}`,
                "count": 1,
                "unitCost": `${product.cost}`,
                "currency": `${product.currency}`,
                "image": `${product.images[0]}`,
            }        
        document.getElementById("container").innerHTML = htmlContentToAppend;
    }

function showPictures(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let foto = array[i];
        htmlContentToAppend +=`
        <img id="slider-${i+1}" src="${foto}" alt="">
        `
    }
    return htmlContentToAppend;
}

function Score(n) {
    let htmlContentToAppend="";
    let x=0;
    for(let i=n; i>0; i--){
        htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
        x++;
    };
    for (x; x<5; x++){
        htmlContentToAppend += `<span class="fa fa-star"></span>`;
    };
    return htmlContentToAppend;
};

function showComments(comentarios){
    comentarios.forEach(coment => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.classList.add("coments");
        li.innerHTML = `${coment.user} - ${coment.dateTime} - ${Score(coment.score)} <br>
        ${coment.description}` ;
        lista.appendChild(li);
    });
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function showRelated(registro){
    let htmlContentToAppend="";
    registro.forEach(product => {
        htmlContentToAppend += `
            <div class="related cursor-active" onclick="setProductID(${product.id})">
            <img class="imgrelated card-img-top" id="img-rela" src=${product.image}>
            <div> ${product.name}</div>
            </div>
        `})
        document.getElementById("relatedProducts").innerHTML += htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(PRODUCT_INFO_URL+localStorage.getItem("productID")+".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            productArray = resultObj.data;
            showProductInfo(productArray)
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL+localStorage.getItem("productID")+".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            commentsArray = resultObj.data;
            showComments(commentsArray);
            showRelated(productArray.relatedProducts)
        }
    })

    showComments(micomnt);
});

btn.addEventListener("click",()=>{
    let comentario = document.getElementById("opinion").value;
    let stars = document.querySelector("select").value;
    var date = new Date();
    var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    var date_time = current_date+" "+current_time;    
   
    let data = [{
        user: localStorage.getItem("logeado"),
        description: comentario,
        score: stars,
        dateTime: `${date_time}`
    }];
    micomnt.push(data[0]);
    sessionStorage.setItem("miscoments"+localStorage.getItem("productID"), JSON.stringify(micomnt));

    showComments(data);
})

function agregarCarrito(){
    carrito.push(info);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
}
