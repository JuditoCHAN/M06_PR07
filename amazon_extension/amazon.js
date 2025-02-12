//usa la APi de chrome para buscar la pestaña activa en la ventana actual
let tabId;
chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
    tabId = tabs[0].id;
    console.log("tabId: " + tabId);

    chrome.scripting.executeScript({
        target: {tabId: tabId},
        func: () => {
            const div = document.createElement("div");
            div.style.position = "fixed";
            div.style.right = "10px";
            div.style.top = "50%";
            div.style.transform = "translateY(-50%)";
            div.style.background = "white";
            div.style.border = "1px solid black";
            div.style.padding = "10px";
            div.style.zIndex = "1000";

            div.innerHTML = `<h1 style='color: deeppink;'>Amazon extension</h1>
                <div>
                    <button id='info' style='padding: 10px; background-color: light-pink; border: 1px solid pink; border-radius: 10px;'>Información imágenes</button>
                    <button id='price' style='padding: 10px; background-color: light-pink; border: 1px solid pink; border-radius: 10px;'>Precio más bajo</button>
                </div>`; 
            document.body.appendChild(div);


            document.getElementById('price').addEventListener('click', () => {
                //precios estan en spans con clase _cDEzb_p13n-sc-price_3mJ9Z
                //obtenemos todos los span que contienen los precios
                const precios = document.body.querySelectorAll("span._cDEzb_p13n-sc-price_3mJ9Z");

                let precioMasBajo = precios[0];
                precios.forEach(spanPrecio => {
                    let precio = Number(spanPrecio.innerText);
                    if(precio < precioMasBajo) {

                    }
                });
            });
            
        }
    });
});





