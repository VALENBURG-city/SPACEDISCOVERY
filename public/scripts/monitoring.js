document.addEventListener('DOMContentLoaded', () => {
    // 1. Загружаем данные МКС
    fetchIssData();
    // Обновляем каждые 10 секунд (чтобы не превысить лимит API)
    setInterval(fetchIssData, 10000);

    // 2. Загружаем APOD
    fetchApodData();
});

async function fetchIssData() {
    try {
        const response = await fetch('/api/iss');
        const result = await response.json();

        if (result.status === 'ok') {
            const d = result.data;
            document.getElementById('iss-data').innerHTML = `
                <p>ШИРОТА: ${d.latitude.toFixed(4)}°</p>
                <p>ДОЛГОТА: ${d.longitude.toFixed(4)}°</p>
                <p>ВЫСОТА: ${d.altitude.toFixed(2)} км</p>
                <p>СКОРОСТЬ: ${d.velocity.toFixed(2)} км/ч</p>
                <p>ВИДИМОСТЬ: ${d.visibility.toUpperCase()}</p>
            `;
        }
    } catch (error) {
        console.error('Ошибка при загрузке МКС:', error);
    }
}

async function fetchApodData() {
    try {
        const response = await fetch('/api/apod');
        const result = await response.json();

        if (result.status === 'ok') {
            const d = result.data;
            document.getElementById('apod-data').innerHTML = `
                <p>ДАТА: ${d.date}</p>
                <p>НАЗВАНИЕ: ${d.title}</p>
                <p>ТИП: ${d.media_type}</p>
                <p style="font-size: 0.8rem; max-width: 600px;">${d.explanation}</p>
                ${d.media_type === 'image' ? `<img src="${d.url}" style="max-width: 300px; border: 2px solid var(--DEFCOLOR); margin-top: 10px;">` : ''}
            `;
        }
    } catch (error) {
        console.error('Ошибка при загрузке APOD:', error);
    }
}