//usa la APi de chrome para buscar la pestaña activa en la ventana actual
let tabId;
chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
    tabId = tabs[0].id;
    console.log("tabId: " + tabId);

    chrome.scripting.executeScript({
        target: {tabId: tabId},
        func: () => {
            //Creación del sticky menu
            const div = document.createElement("div");
            div.style.position = "fixed";
            div.style.right = "10px";
            div.style.top = "50%";
            div.style.transform = "translateY(-50%)";
            div.style.background = "lightblue";
            div.style.border = "3px solid darkblue";
            div.style.padding = "10px";
            div.style.zIndex = "1000";

            div.innerHTML = `<h1 style='color: deeppink;'>Amazon extension</h1>
                <div>
                    <button id='info' style='padding: 10px; background-color: light-pink; border: 1px solid pink; border-radius: 10px;'>Información imágenes</button>
                    <button id='price' style='padding: 10px; background-color: light-pink; border: 1px solid pink; border-radius: 10px;'>Precio más bajo</button>
                </div>`; 
            document.body.appendChild(div);

            //creamos el style para la animación del div con el precio inferior
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes moveLeftRight {
                    0% {
                        transform: translateX(0);
                    }
                    50% {
                        transform: translateX(10px);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
            `;
            document.head.appendChild(style);

            //Evento cuando se hace clic en 'Precio más bajo'
            document.getElementById('price').addEventListener('click', () => {
                //precios estan en spans con clase _cDEzb_p13n-sc-price_3mJ9Z
                //obtenemos todos esos span
                const precios = document.body.querySelectorAll("span._cDEzb_p13n-sc-price_3mJ9Z");

                let elementoPrecioMasBajo = precios[0];
                let precioMasBajo = parseFloat(elementoPrecioMasBajo.innerText.replace(/[^\d,.-]/g, '').replace(',', '.'));
                //sustituir todo lo que no sea un dígito, un punto o una coma por '' y sustituir , por .
                precios.forEach(spanPrecio => {
                    let precio = parseFloat(spanPrecio.innerText.replace(/[^\d,.-]/g, '').replace(',', '.'));
                    if(precio < precioMasBajo) {
                        precioMasBajo = precio;
                        elementoPrecioMasBajo = spanPrecio;
                    }
                });

                elementoPrecioMasBajo.style.color = 'purple';
                //elementoPrecioMasBajo.scrollIntoView();
                
                //DIV padre tiene class="_cDEzb_iveVideoWrapper_JJ34T"
                const divPadre = elementoPrecioMasBajo.closest('div._cDEzb_iveVideoWrapper_JJ34T'); //closest busca el ancestro más cercano con la clase especificada
                if(divPadre) { //si el closest no encuentra nada devuelve null, aqui comprobamos que no sea null
                    divPadre.style.backgroundColor = 'pink';
                    divPadre.style.border = '3px solid #00CED1';
                    divPadre.style.animation = 'moveLeftRight 1s ease-in-out infinite';
                    divPadre.scrollIntoView();
                }

                //alert("Precio más bajo: " + precioMasBajo);
            });


            //Eventos cuando se hace clic en 'Información imágenes'
            document.getElementById('info').addEventListener('click', () => {
                const imgs = document.querySelectorAll('img');
            
                //Al poner el ratón sobre la img
                imgs.forEach(img => {
                    img.addEventListener('mouseenter', () => {
                        console.log("ENTRA EN IMG");
                        
                        const infoImg = document.createElement('div');
                        infoImg.className = 'info-img';
                        infoImg.innerHTML = img.alt;
                        console.log(infoImg);

                        img.style.position = 'relative';

                        infoImg.style.position = 'absolute';
                        infoImg.style.top = '0';
                        infoImg.style.left = '0';
                        infoImg.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                        infoImg.style.color = 'white';
                        infoImg.style.padding = '5px';
                        infoImg.style.borderRadius = '5px';
                        infoImg.style.zIndex = '1000';
                        infoImg.style.pointerEvents = 'none';

                        img.parentElement.appendChild(infoImg);
                    });
                });
                
                //Al sacar el ratón de la img
                imgs.forEach(img => {
                    img.addEventListener('mouseleave', () => {
                        console.log("SALE DE IMG");

                        const infoImg = img.parentElement.querySelector('div.info-img');
                        if(infoImg) infoImg.remove(); //si existe se borra
                    });
                });
            });
            
        }
    });
});





