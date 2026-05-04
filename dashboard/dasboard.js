
Chart.defaults.font.family = "'Segoe UI', sans-serif";
Chart.defaults.color = '#888';

const BLUE = '#1a3a6e';
const BLUE2 = '#7eb8ff';
const BLUE3 = '#b8d6ff';
const GRAY = '#e8edf8';

function makeGrad(ctx, c1, c2) {
    const g = ctx.createLinearGradient(0, 0, 0, 200);
    g.addColorStop(0, c1); g.addColorStop(1, c2); return g;
}

const lineCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['T11', 'T12', 'T1', 'T2', 'T3', 'T4'],
        datasets: [
            {
                label: '2026', data: [52000, 61000, 58000, 72000, 78000, 84000],
                borderColor: BLUE,
                backgroundColor: makeGrad(lineCtx, 'rgba(26,58,110,0.18)', 'rgba(26,58,110,0)'),
                fill: true, tension: 0.4, pointBackgroundColor: BLUE, pointRadius: 4, borderWidth: 2.5
            },
            {
                label: '2025', data: [44000, 50000, 47000, 60000, 65000, 70000],
                borderColor: BLUE2,
                backgroundColor: makeGrad(lineCtx, 'rgba(126,184,255,0.12)', 'rgba(126,184,255,0)'),
                fill: true, tension: 0.4, pointBackgroundColor: BLUE2, pointRadius: 4, borderWidth: 2,
                borderDash: [5, 3]
            }
        ]
    },
    options: {
        responsive: true,
        plugins: { legend: { position: 'top', labels: { boxWidth: 12, font: { size: 12 } } } },
        scales: {
            y: { grid: { color: '#f0f4ff' }, ticks: { callback: v => '$' + (v / 1000).toFixed(0) + 'k' } },
            x: { grid: { display: false } }
        }
    }
});

new Chart(document.getElementById('donutChart'), {
    type: 'doughnut',
    data: {
        labels: ['Điện tử', 'Thời trang', 'Gia dụng', 'Khác'],
        datasets: [{ data: [38, 27, 22, 13], backgroundColor: [BLUE, BLUE2, BLUE3, GRAY], borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
        responsive: true, cutout: '65%',
        plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 }, padding: 10 } } }
    }
});

new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [{
            label: 'Đơn hàng', data: [210, 185, 260, 240, 310, 290, 180],
            backgroundColor: [BLUE, BLUE2, BLUE, BLUE, BLUE, BLUE2, BLUE3],
            borderRadius: 6, borderSkipped: false
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { grid: { color: '#f0f4ff' } }, x: { grid: { display: false } } }
    }
});

new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: {
        labels: ['Website', 'Mobile', 'Mạng XH', 'Email', 'Đại lý'],
        datasets: [{
            label: 'Hiệu suất', data: [85, 72, 60, 55, 40],
            borderColor: BLUE, backgroundColor: 'rgba(26,58,110,0.15)',
            pointBackgroundColor: BLUE, borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { r: { grid: { color: '#e8edf8' }, pointLabels: { font: { size: 11 } } } }
    }
});

new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
        labels: ['Hoàn thành', 'Đang xử lý', 'Đã huỷ'],
        datasets: [{ data: [62, 28, 10], backgroundColor: [BLUE, BLUE2, BLUE3], borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
        responsive: true,
        plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 }, padding: 10 } } }
    }
});

function setPeriod(el, p) {
    document.querySelectorAll('.pbtn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    const sets = {
        '6T': { labels: ['T11', 'T12', 'T1', 'T2', 'T3', 'T4'], d1: [52000, 61000, 58000, 72000, 78000, 84000], d2: [44000, 50000, 47000, 60000, 65000, 70000] },
        '1N': { labels: ['T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'T1', 'T2', 'T3', 'T4'], d1: [40000, 45000, 48000, 55000, 50000, 58000, 52000, 61000, 58000, 72000, 78000, 84000], d2: [32000, 38000, 40000, 46000, 42000, 50000, 44000, 50000, 47000, 60000, 65000, 70000] },
        'TT': { labels: ['2024 Q1', 'Q2', 'Q3', 'Q4', '2025 Q1', 'Q2', 'Q3', 'Q4', '2026 Q1'], d1: [120000, 135000, 128000, 150000, 148000, 162000, 155000, 175000, 234000], d2: [100000, 110000, 118000, 130000, 135000, 145000, 140000, 160000, 205000] }
    };
    const s = sets[p];
    lineChart.data.labels = s.labels;
    lineChart.data.datasets[0].data = s.d1;
    lineChart.data.datasets[1].data = s.d2;
    lineChart.update();
}

document.querySelectorAll('.nav-item').forEach(el => {
    el.onclick = () => {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        el.classList.add('active');
    };
});