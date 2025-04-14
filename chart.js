let chart;

document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("numberTable").getElementsByTagName("tbody")[0];
    const canvas = document.getElementById("chartCanvas");
    const ctx = canvas.getContext("2d");

    for (let row of table.rows) {
        row.addEventListener("click", () => {
            const data = Array.from(row.cells).map(cell => Number(cell.textContent));
            drawChart(data);
        });
    }

    function drawChart(data) {
        if (chart) chart.destroy();

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Év1", "Év2", "Év3", "Év4", "Év5"],
                datasets: [{
                    label: 'Kiválasztott adatsor',
                    data: data,
                    borderWidth: 2,
                    fill: false,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
