const CARS = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let categoriesArray = [];

<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CARS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray.products); 
        }
    });
});

=======
>>>>>>> 949b95eda9a50f871bbe16c44b0258da1365d5d2
function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let autos = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + autos.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ autos.name +`</h4>
                        <p> `+ autos.description +`</p> 
                        </div>
                        <small class="text-muted">` + autos.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("container").innerHTML = htmlContentToAppend; 
    }
<<<<<<< HEAD
}
=======
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CARS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray.products); 
        }
    });
});

