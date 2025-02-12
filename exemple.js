document.addEventListener('DOMContentLoaded', () => {
    let segonElem = document.getElementById('segon');

    segonElem.innerHTML = 'Hola <b>món</b>';
    segonElem.textContent = 'Hola <b>món</b>';

    segonElem.style.color = "red";

    document.body.style.backgroundColor = "lightblue";

    let nodeAnterior = segonElem.previousSibling; //accedir al element anterior (no fa falta que sigui un element/tag, pot agafar text després del ul o espai en blanc -> consola -> breakpoint -> data: "\n       ")
    let liAnterior = segonElem.previousElementSibling;
    liAnterior.style.color = "green";

    let quartLi = segonElem.nextElementSibling.nextElementSibling;
    quartLi.style.color = "violet";
    quartLi.id = "quart";
    quartLi.className = "resaltat important";

    let h1 = document.body.firstElementChild;
    // h1.onclick = function() {
    //     alert("Has fet clic sobre l'element h1");
    // } 
    // no permet afegir múltiples esdeveniments, els sobreescriu

    // h1.onclick = function() {
    //     alert("Segon clic");
    // }

    h1.addEventListener('click', (event) => {
        let nouLi = document.createElement("li");
        nouLi.innerHTML = "Nou element";
        nouLi.style.color = "blue";
        //l'hem d'afegir a algun lloc
        quartLi.parentNode.appendChild(nouLi);

        //li afegim un listener al event
        nouLi.addEventListener('click', function(event) {
            event.target.remove();
        });
    });

    document.body.addEventListener('click', function(event) {
        let lis = document.querySelectorAll("li");
        lis.forEach((li) => {
            li.style.backgroundColor = "lightgreen";
        });
    });

    let tercerLi = document.querySelector("li:nth-child(3");
    
    tercerLi.addEventListener('click', function(event) {
        event.target.style = backgroundColor = "lightyellow";
        event.stopPropagation();
   
    });

    
    
    });

   
