// Obteniendo elementos del DOM
const selectMoneda = document.querySelector('#monedaConvertir');
const inputClp = document.querySelector('#clp');
const total = document.querySelector('#total');
const ctx = document.getElementById('myChart').getContext('2d');
let myChart;

async function obtenerMonedas() {
    try {
        const res = await fetch('https://mindicador.cl/api');
        const data = await res.json();

        selectMoneda.innerHTML += `<option value="dolar">${data.dolar.nombre}</option>`;
        selectMoneda.innerHTML += `<option value="euro">${data.euro.nombre}</option>`;
        selectMoneda.innerHTML += `<option value="uf">${data.uf.nombre}</option>`;
    } catch{
        alert("Hubo un problema al cargar las monedas");
    }
}

obtenerMonedas();

async function convertir() {
    try {
        const valorClp = parseFloat(inputClp.value);
        const monedaSeleccionada = selectMoneda.value;

        if (isNaN(valorClp) || monedaSeleccionada === 'seleccionarMoneda') {
            total.innerHTML = 'Ingrese un valor válido';
            return;
        }

        const res = await fetch(`https://mindicador.cl/api/${monedaSeleccionada}`);
        if (!res.ok) {
            throw new Error('Error en la solicitud a la API');
        }
        const data = await res.json();

        const valorMoneda = data.serie[0].valor;
        let resultadoTotal = valorClp / valorMoneda;
        total.innerHTML = `Total: ${resultadoTotal.toFixed(2)}`;

        mostrarGrafico(data.serie);
    } catch{
        alert("Hubo un problema al realizar la conversión");
    }
}

function mostrarGrafico(data) {
    const labels = data.slice(0, 10).map(item => new Date(item.fecha).toLocaleDateString()).reverse();
    const valores = data.slice(0, 10).map(item => item.valor).reverse();

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valor de la moneda en los últimos 10 días',
                data: valores,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
