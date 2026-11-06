document.addEventListener('DOMContentLoaded', () => {

    const issLoadingInterval = animateLoading('iss-data');
    const apodLoadingInterval = animateLoading('apod-data');


    fetchIssData(issLoadingInterval);

    setInterval(() => {

        const newInterval = animateLoading('iss-data');
        fetchIssData(newInterval);
    }, 15000);


    fetchApodData(apodLoadingInterval);
});


function animateLoading(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return null;

    let dots = 0;
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        el.innerHTML = `<p>ЗАГРУЗКА ДАННЫХ${'.'.repeat(dots)}</p>`;
    }, 500);

    return interval;
}


async function fetchIssData(loadingInterval) {
    try {
        const response = await fetch('/api/iss');
        const result = await response.json();

        if (result.status === 'ok') {

            if (loadingInterval) clearInterval(loadingInterval);

            const d = result.data;
            document.getElementById('iss-data').innerHTML = `
                <p>ШИРОТА: ${d.latitude.toFixed(4)}°</p>
                <p>ДОЛГОТА: ${d.longitude.toFixed(4)}°</p>
                <p>ВЫСОТА: ${d.altitude.toFixed(2)} км</p>
                <p>СКОРОСТЬ: ${d.velocity.toFixed(2)} км/ч</p>
                <p>ВИДИМОСТЬ: ${d.visibility.toUpperCase()}</p>
            `;
        } else {
            throw new Error(result.message || 'Ошибка сервера');
        }
    } catch (error) {

        if (loadingInterval) clearInterval(loadingInterval);
        document.getElementById('iss-data').innerHTML = '<p style="color: #00ff00;">[ СИГНАЛ ПОТЕРЯН ]</p>';
        console.error('Ошибка при загрузке МКС:', error);
    }
}


async function fetchApodData(loadingInterval) {
    try {
        const response = await fetch('/api/apod');
        const result = await response.json();

        if (result.status === 'ok') {

            if (loadingInterval) clearInterval(loadingInterval);

            const d = result.data;


            const cleanExplanation = d.explanation ? d.explanation.replace(/<[^>]*>?/gm, '') : 'Описание отсутствует';


            document.getElementById('apod-data').innerHTML = `
                <p><strong>ДАТА:</strong> ${d.date || 'Неизвестно'}</p>
                <p><strong>НАЗВАНИЕ:</strong> ${d.title || 'Без названия'}</p>
                <p><strong>ТИП:</strong> ${d.media_type || 'Неизвестен'}</p>
                
                ${d.media_type === 'image'
                    ? `<img src="${d.image_url}" alt="${d.alt}" style="max-width: 100%; border: 2px solid var(--DEFCOLOR); margin: 15px 0;">`
                    : `<p style="color: #00ff00;">[ МЕДИА-ФАЙЛ: ${d.media_type} ] <a href="${d.image_url}" target="_blank" style="color: var(--DEFCOLOR);">ССЫЛКА</a></p>`
                }
                
                <p class="apod-description">${cleanExplanation}</p>
            `;
        } else {
            throw new Error(result.message || 'Ошибка сервера');
        }
    } catch (error) {
        if (loadingInterval) clearInterval(loadingInterval);
        document.getElementById('apod-data').innerHTML = '<p style="color: #00ff00;">[ ОШИБКА ЗАГРУЗКИ APOD ]</p>';
        console.error('Ошибка при загрузке APOD:', error);
    }
}