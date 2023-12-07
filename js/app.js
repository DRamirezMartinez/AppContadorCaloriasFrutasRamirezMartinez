const formFruta = document.querySelector("#valorIntroducido form");
const listaFrutas = document.querySelector("#seccionFrutas ul");
const infoNutricional = document.querySelector("#seccionNutricional p");

formFruta.addEventListener("submit", extraerFruta);

function extraerFruta(e){
    e.preventDefault();
    e.target.valorFruta.value !== ""? fetchFruta(e.target.valorFruta.value) : alert("Introduce una fruta en ingles");
    e.target.valorFruta.value = "";
}

async function fetchFruta(fruta){
    try{
        const resp = await fetch(`https://fruity-api.onrender.com/api/fruits/${fruta}`)

        if(resp.ok){
            const datos = await resp.json();
            nuevaFruta(datos);
        }
    }catch(e){
        console.log(e);
    }      
}

let cal=0;
let calFrutas = {};

function nuevaFruta(fruta){
    const li = document.createElement("li");
    li.textContent = fruta.name;
    li.addEventListener("click", eliminarFruta);
    listaFrutas.appendChild(li);

    calFrutas[fruta.name] = fruta.nutritions.calories;

    cal += fruta.nutritions.calories;
    infoNutricional.textContent = cal + " " + "Calorias totales";
}
function eliminarFruta(e){
    const nombreFruta = e.target.textContent
    cal -= calFrutas[nombreFruta];

    infoNutricional.textContent = cal + " " + "Calorias totales";
    e.target.remove();
}
