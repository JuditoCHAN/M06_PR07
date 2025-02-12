function changeColor(color) {
    document.body.style.backgroundColor = color;
    console.log("Color canviat a " + color);

    const gmailLink = document.querySelector("a.gb_X");
    if(gmailLink) {
        gmailLink.innerText = "💮 GMAIL 💮";
    }
}

//almacenamos el id del tab actual
let tabId;
//usa la APi de chrome para buscar la pestaña activa en la ventana actual
chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
    tabId = tabs[0].id;
    console.log("tabId: " + tabId);
})

document.getElementById('btn').addEventListener('click', (event) => {
    //document.body.style.backgroundColor = "lightpink";

    chrome.scripting.executeScript({ //ejecuta script en la pestaña especificada
        target: {tabId: tabId},
        function: changeColor,
        args: ["lightpink"]
    })
});