import { Bussines } from "../models/Bussines.mjs";
import { linkedList, arraylist } from "./Dependencies.mjs";

// Función para medir el tiempo de ejecución
function medirTiempo(callback) {
    let startTime = performance.now();
    callback();
    let endTime = performance.now();
    let timeTaken = endTime - startTime;
    return timeTaken;
}

// Inicializar gráficos
document.addEventListener("DOMContentLoaded", function () {
    // Gráfico de tiempos para ArrayList
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['BubbleSort', 'MergeSort', 'RadixSort'],
            datasets: [{
                label: "Tiempo en ms",
                data: [0, 0, 0], // Datos iniciales
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 3
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Tiempo de Ejecución: ArrayList',
                    font: {
                        size: 24
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Tiempo en ms',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    });

    // Gráfico de inserciones para ArrayList
    var ctxInsertions = document.getElementById('insertionsChart').getContext('2d');
    var insertionsChart = new Chart(ctxInsertions, {
        type: 'line',
        data: {
            labels: ['BubbleSort', 'MergeSort', 'RadixSort'],
            datasets: [{
                label: "Inserciones",
                data: [0, 0, 0], // Datos iniciales (número de inserciones)
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 3
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Número de Inserciones: ArrayList',
                    font: {
                        size: 24
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Inserciones',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    });

    // Gráfico de tiempos para LinkedList
    var ctxLinkedList = document.getElementById('linkedListChart').getContext('2d');
    var linkedListChart = new Chart(ctxLinkedList, {
        type: 'line',
        data: {
            labels: ['BubbleSort', 'MergeSort', 'RadixSort'],
            datasets: [{
                label: "Tiempo en ms",
                data: [0, 0, 0], // Datos iniciales
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 3
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Tiempo de Ejecución: LinkedList',
                    font: {
                        size: 24
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Tiempo en ms',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    });

    // Gráfico de inserciones para LinkedList
    var ctxLinkedListInsertions = document.getElementById('linkedListInsertionsChart').getContext('2d');
    var linkedListInsertionsChart = new Chart(ctxLinkedListInsertions, {
        type: 'line',
        data: {
            labels: ['BubbleSort', 'MergeSort', 'RadixSort'],
            datasets: [{
                label: "Inserciones",
                data: [0, 0, 0], // Datos iniciales (número de inserciones)
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 3
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Número de Inserciones: LinkedList',
                    font: {
                        size: 24
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Inserciones',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        }
    });

    // Event listeners para ArrayList
    document.getElementById('saveArray').addEventListener('click', () => {
        fetch("../../../bussines.json")
            .then(response => response.json())
            .then(data => {
                for (let x = 0; x <= 20000; x++) {
                    let bussines = new Bussines(data[x].name, data[x].address, data[x].city, data[x].state, data[x].postal_code);
                    arraylist.push(bussines);
                    if (x === 20000) {
                        console.log("ya se guardaron todas");
                    }
                }
            })
            .catch(err => console.log(err));
    });

    document.getElementById('arrayBubble').addEventListener("click", () => {
        let iterations;
        let timeTaken = medirTiempo(() => iterations = arraylist.bubbleSort());
        document.getElementById("tiempoBubbleA").textContent = `BubbleSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
        // Actualizar gráficos
        myChart.data.datasets[0].data[0] = timeTaken;
        insertionsChart.data.datasets[0].data[0] = iterations;
        myChart.update();
        insertionsChart.update();
    });

    document.getElementById('arrayMerge').addEventListener("click", () => {
        let iterations = { count: 0 };
        let timeTaken = medirTiempo(() => arraylist.mergeSort(arraylist.array, iterations));
        document.getElementById("tiempoMergeA").textContent = `MergeSort Time: ${timeTaken} ms, Iterations: ${iterations.count}`;
        // Actualizar gráficos
        myChart.data.datasets[0].data[1] = timeTaken;
        insertionsChart.data.datasets[0].data[1] = iterations.count;
        myChart.update();
        insertionsChart.update();
    });

    document.getElementById('arrayRadix').addEventListener("click", () => {
        let iterations;
        let timeTaken = medirTiempo(() => iterations = arraylist.radixSort());
        document.getElementById("tiempoRadixA").textContent = `RadixSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
        // Actualizar gráficos
        myChart.data.datasets[0].data[2] = timeTaken;
        insertionsChart.data.datasets[0].data[2] = iterations;
        myChart.update();
        insertionsChart.update();
    });

    // Event listeners para LinkedList
    document.getElementById('saveList').addEventListener('click', () => {
        fetch("../../../bussines.json")
            .then(response => response.json())
            .then(data => {
                for (let x = 0; x <= 20000; x++) {
                    let bussines = new Bussines(data[x].name, data[x].address, data[x].city, data[x].state, data[x].postal_code);
                    linkedList.push(bussines);
                    if (x === 20000) {
                        console.log("ya se guardaron todas");
                    }
                }
            })
            .catch(err => console.log(err));
    });

    document.getElementById('listBubble').addEventListener("click", () => {
        let iterations;
        let timeTaken = medirTiempo(() => iterations = linkedList.bubbleSort());
        document.getElementById("tiempoBubbleL").textContent = `BubbleSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
        // Actualizar gráficos
        linkedListChart.data.datasets[0].data[0] = timeTaken;
        linkedListInsertionsChart.data.datasets[0].data[0] = iterations;
        linkedListChart.update();
        linkedListInsertionsChart.update();
    });

    document.getElementById('listMerge').addEventListener("click", () => {
        let iterations;
        let timeTaken = medirTiempo(() => iterations = linkedList.mergeSort());
        document.getElementById("tiempoMergeL").textContent = `MergeSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
        // Actualizar gráficos
        linkedListChart.data.datasets[0].data[1] = timeTaken;
        linkedListInsertionsChart.data.datasets[0].data[1] = iterations;
        linkedListChart.update();
        linkedListInsertionsChart.update();
    });

    document.getElementById('listRadix').addEventListener("click", () => {
        let iterations;
        let timeTaken = medirTiempo(() => iterations = linkedList.radixSort());
        document.getElementById("tiempoRadixL").textContent = `RadixSort Time: ${timeTaken} ms, Iterations: ${iterations}`;
        // Actualizar gráficos
        linkedListChart.data.datasets[0].data[2] = timeTaken;
        linkedListInsertionsChart.data.datasets[0].data[2] = iterations;
        linkedListChart.update();
        linkedListInsertionsChart.update();
    });
});
