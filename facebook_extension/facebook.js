//FUNCIONES PARA REALIZAR LOS CAMBIOS Y PARA OBTENER LA CURRENT TAB

let tabId; //almacenamos el id del tab actual
//usa la APi de chrome para buscar la pestaña activa en la ventana actual
chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
    tabId = tabs[0].id;
    console.log("tabId: " + tabId);
})


function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    
    const body = document.querySelectorAll('._95k9');
    body.forEach(element => {
        element.style.backgroundColor = color;
    });
    
    document.querySelectorAll("._6luv").style.backgroundColor = color;
}

function changeLinkColor(color) {
    const linkNodes = document.body.querySelectorAll("a");

    linkNodes.forEach(link => {
        link.style.color = color;
    });
}

function deleteAllImages() {
    const imgNodes = document.querySelectorAll('img');

    imgNodes.forEach(img => {
        img.parentNode.removeChild(img);
    });
}

function hideOrShowPasswords() {
    //ponemos el atributo is_pass a los input type passwords
    //para la 1ra vez que clicas el botón
    const inputNodes = document.querySelectorAll("input[type=password]");
    for(let i=0; i < inputNodes.length; i++) {
        if(!inputNodes[i].hasAttribute('is_pass')) {
            inputNodes[i].setAttribute('is_pass', 'true');
            inputNodes[i].type = 'text';
            return;
        }
    }

    //seleccionamos los inputs con atributo is_pass y comprobamos qué valor tiene el atributo
    const inputsWithIsPassAttr = document.querySelectorAll("input[is_pass]");
    inputsWithIsPassAttr.forEach(input => {
        if(input.getAttribute('is_pass') === 'true') {
            input.setAttribute('is_pass', 'false');
            input.type = 'password';
        } else {
            input.setAttribute('is_pass', 'true');
            input.type = 'text';
        }
    });
}



//EVENT LISTENERS
document.getElementById("backgroundColor").addEventListener('click', function(event) {
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        function: changeBackgroundColor,
        args: ["lightcoral"]
    });
});

document.getElementById("changeLinkColor").addEventListener('change', function(event) {
    let color = document.getElementById("changeLinkColor").value;

    chrome.scripting.executeScript({
        target: {tabId: tabId},
        function: changeLinkColor,
        args: [color]
    });
});

document.getElementById('deleteImgs').addEventListener('click', function(event) {
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        function: deleteAllImages,
        args: []
    });
});

document.getElementById('hideOrShowPasswords').addEventListener('click', function(event) {
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        function: hideOrShowPasswords,
        args: []
    });
});