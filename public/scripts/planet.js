document.addEventListener('DOMContentLoaded', () => {

    const pathParts = window.location.pathname.split('/');
    let objectName = pathParts[pathParts.length - 1];

    if (!objectName || objectName === 'planet.html') {
        objectName = 'Mars';
    }

    objectName = decodeURIComponent(objectName);
    objectName = objectName.charAt(0).toUpperCase() + objectName.slice(1);

    loadPlanetData(objectName);
});

async function loadPlanetData(name) {
    try {
        const response = await fetch(`/api/objects/${name}`);
        const result = await response.json();

        if (result.status === 'ok') {
            const d = result.data;


            document.getElementById('obj-name').textContent = d.name || '-';
            document.getElementById('obj-type').textContent = d.type || '-';
            document.getElementById('obj-distance').textContent = d.distance ? `${d.distance} млн км` : '-';
            document.getElementById('obj-mass').textContent = d.mass ? `${d.mass} кг` : '-';
            document.getElementById('obj-radius').textContent = d.radius ? `${d.radius} км` : '-';
            document.getElementById('obj-density').textContent = d.average_density ? `${d.average_density} г/см³` : '-';
            document.getElementById('obj-velocity').textContent = d.first_cosmic_velocity ? `${d.first_cosmic_velocity} км/с` : '-';
            document.getElementById('obj-rotation').textContent = d.rotation_speed ? `${d.rotation_speed} км/ч` : '-';
            document.getElementById('obj-temp').textContent = d.temperature ? `${d.temperature} °C` : '-';
            document.getElementById('obj-pressure').textContent = d.air_pressure ? `${d.air_pressure} атм` : '-';
            document.getElementById('obj-gravity').textContent = d.gravity ? `${d.gravity} м/с²` : '-';
            document.getElementById('obj-moons').textContent = d.moons_count ?? '-';


            const imgElement = document.getElementById('obj-image');
            const btnPrev = document.getElementById('btn-prev');
            const btnNext = document.getElementById('btn-next');

            if (d.image_urls && Array.isArray(d.image_urls) && d.image_urls.length > 0) {

                imgElement.setAttribute('src', d.image_urls[0]);


                if (btnPrev && btnNext) {
                    let currentIndex = 0;
                    btnPrev.onclick = () => {
                        currentIndex = (currentIndex - 1 + d.image_urls.length) % d.image_urls.length;
                        imgElement.setAttribute('src', d.image_urls[currentIndex]);
                    };
                    btnNext.onclick = () => {
                        currentIndex = (currentIndex + 1) % d.image_urls.length;
                        imgElement.setAttribute('src', d.image_urls[currentIndex]);
                    };
                }
            } else {
            }


            document.title = `SPACEDISCOVERY | ${d.name}`;


            const compContainer = document.getElementById('obj-composition');
            if (compContainer) {
                if (d.composition && Array.isArray(d.composition)) {
                    compContainer.innerHTML = d.composition.map(item =>
                        `<p class="BASEtext item">${item.percent}% ${item.element}</p>`
                    ).join('');
                } else {
                    compContainer.innerHTML = '<p class="BASEtext item">Данные отсутствуют</p>';
                }
            }


            const descElement = document.querySelector('.descr .BASEtext.item');
            if (descElement && d.description) {
                descElement.textContent = d.description;
            }


            initNotes(name);

        } else {
            document.getElementById('obj-name').textContent = 'ОБЪЕКТ НЕ НАЙДЕН';
        }
    } catch (error) {
        console.error('Ошибка загрузки данных планеты:', error);
        document.getElementById('obj-name').textContent = 'ОШИБКА СВЯЗИ';
    }
}


async function initNotes(objectName) {
    const notesList = document.getElementById('notes-list');
    const addForm = document.getElementById('add-note-form');
    const loginPrompt = document.getElementById('login-prompt');

    if (!notesList) return;

    try {
        const authRes = await fetch('/api/auth/me');
        const authData = await authRes.json();

        if (authData.status !== 'ok') {
            notesList.innerHTML = '<p class="BASEtext item">Нет заметок.</p>';
            if (loginPrompt) loginPrompt.style.display = 'block';
            if (addForm) addForm.style.display = 'none';
            return;
        }

        if (addForm) addForm.style.display = 'block';
        if (loginPrompt) loginPrompt.style.display = 'none';

        const res = await fetch(`/api/notes/${objectName}`);
        const data = await res.json();

        if (data.status === 'ok' && data.data.length > 0) {
            notesList.innerHTML = data.data.map(n => `<p class="BASEtext item">> ${n.content}</p>`).join('');
        } else {
            notesList.innerHTML = '<p class="BASEtext item">Здесь пока нет ваших заметок.</p>';
        }

        const saveBtn = document.getElementById('save-note-btn');
        if (saveBtn) {
            saveBtn.onclick = async () => {
                const content = document.getElementById('note-input').value.trim();
                if (!content) return;

                const postRes = await fetch('/api/notes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ objectName, content })
                });

                if (postRes.ok) {
                    document.getElementById('note-input').value = '';
                    initNotes(objectName);
                }
            };
        }
    } catch (err) {
        console.error('Ошибка заметок:', err);
        if (notesList) notesList.innerHTML = '<p class="BASEtext item" style="color:red;">Ошибка связи</p>';
    }
}