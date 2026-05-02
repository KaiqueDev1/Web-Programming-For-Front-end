const API_URL = 'https://rickandmortyapi.com/api/character';

async function fetchCharacters() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    createCards(data.results);
  } catch (err) {
    console.error('Erro ao carregar personagens:', err);
  }
}

function createCards(characters) {
  const container = document.getElementById('characters-container');

  characters.forEach((char) => {
    const statusClass = char.status.toLowerCase();

    const card = document.createElement('div');
    card.classList.add('character-card');
    card.innerHTML = `
            <img src="${char.image}" alt="${char.name}" class="character-image">
            <div class="character-info">
                <h3>${char.name}</h3>
                <div class="status-badge status-${statusClass}">
                    ${char.status}
                </div>
            </div>
            <button class="btn-detail" onclick='openDrawer(${JSON.stringify(char).replace(/'/g, '&apos;')})'>
                Conheça o personagem
            </button>
        `;
    container.appendChild(card);
  });
}

function openDrawer(char) {
  const overlay = document.getElementById('drawer-overlay');
  const drawer = document.getElementById('side-drawer');
  const content = document.getElementById('drawer-content');

  content.innerHTML = `
        <div class="drawer-profile">
            <img src="${char.image}" alt="${char.name}">
            <h2>${char.name}</h2>
            
            <div class="info-row">
                <label>Espécie</label>
                <span>${char.species}</span>
            </div>
            <div class="info-row">
                <label>Gênero</label>
                <span>${char.gender}</span>
            </div>
            <div class="info-row">
                <label>Origem</label>
                <span>${char.origin.name}</span>
            </div>
            <div class="info-row">
                <label>Localização Atual</label>
                <span>${char.location.name}</span>
            </div>
            <div class="info-row">
                <label>Status</label>
                <span class="status-${char.status.toLowerCase()}">${char.status}</span>
            </div>
        </div>
    `;

  overlay.style.display = 'block';
  setTimeout(() => drawer.classList.add('active'), 10);
}

// Fechar Gaveta
function closeDrawer() {
  const overlay = document.getElementById('drawer-overlay');
  const drawer = document.getElementById('side-drawer');

  drawer.classList.remove('active');
  setTimeout(() => (overlay.style.display = 'none'), 400); 
}

document.getElementById('close-drawer').onclick = closeDrawer;
document.getElementById('drawer-overlay').onclick = (e) => {
  if (e.target.id === 'drawer-overlay') closeDrawer();
};

fetchCharacters();

