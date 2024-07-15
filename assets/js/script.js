// Obteniendo elementos del DOM
const selectMoneda = document.querySelector('#monedaConvertir');
const inputClp = document.querySelector('#clp');
const total = document.querySelector('#total');

async function obtenerMonedas(){
    const res = await fetch('https://mindicador.cl/api');
    const data = await res.json();
    selectMoneda.innerHTML += `<option value="${data.dolar.valor}">${data.dolar.nombre}</option>`;
    selectMoneda.innerHTML += `<option value="${data.euro.valor}">${data.euro.nombre}</option>`;
    selectMoneda.innerHTML += `<option value="${data.uf.valor}">${data.uf.nombre}</option>`;
}

obtenerMonedas();

function convertir(){
    const valorClp = parseFloat(inputClp.value);
    const valorMoneda = parseFloat(selectMoneda.value);

    if (isNaN(valorClp) || isNaN(valorMoneda) || valorMoneda === 0){
        total.innerHTML = 'Ingrese un valor válido';
        return;
    }

    let resultadoTotal = valorClp / valorMoneda;
    total.innerHTML = `Total: ${resultadoTotal.toFixed(2)}`;
}
