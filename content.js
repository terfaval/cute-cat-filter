// Tartalom szkript: kulcsszavak alapján blokkok cseréje cuki macskákra

// Alap kategóriák és kulcsszavak
const DEFAULT_CATEGORIES = {
  "Közvélemény-kutatás": ["közvélemény-kutatás", "felmérés", "szavazás"],
  "Háború/konfliktus": ["háború", "fegyveres", "csata", "bombázás"],
  "Természeti katasztrófa": ["földrengés", "árvíz", "tűzvész"],
  "Egészség-para": ["járvány", "betegség", "koronavírus"],
  "Gazdasági pánik": ["válság", "infláció", "tőzsde zuhan"],
  "Bulvár/botrány": ["botrány", "pletyka", "szenzáció"]
};

let settings = {};
let keywords = [];

// Beállítások betöltése a storage-ból
chrome.storage.sync.get({
  enabledCategories: Object.keys(DEFAULT_CATEGORIES),
  customKeywords: [],
  imageSource: 'catApi',
  customImages: [],
  apiKey: ''
}, cfg => {
  settings = cfg;
  // Kulcsszavak összeállítása a beállítások alapján
  keywords = [];
  settings.enabledCategories.forEach(cat => {
    if (DEFAULT_CATEGORIES[cat]) {
      keywords = keywords.concat(DEFAULT_CATEGORIES[cat]);
    }
  });
  keywords = keywords.concat(settings.customKeywords);
  keywords = keywords.map(k => k.toLowerCase());

  // Kezdő bejárás
  scanDocument();

  // Figyelő a dinamikus tartalomhoz
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          scanNode(node.parentElement);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          scanNode(node);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

// Dokumentum bejárása kulcsszavak kereséséhez
function scanDocument() {
  scanNode(document.body);
}

// Egy adott node bejárása
function scanNode(root) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) {
    nodes.push(node);
  }
  nodes.forEach(n => {
    const text = n.textContent.toLowerCase();
    if (keywords.some(kw => text.includes(kw))) {
      replaceWithCat(n.parentElement);
    }
  });
}

// Elem lecserélése macskás képre
async function replaceWithCat(element) {
  if (!element || element.classList.contains('cute-cat-replaced')) return;
  element.classList.add('cute-cat-replaced');

  const imgUrl = await getImageUrl();
  const img = document.createElement('img');
  img.src = imgUrl;
  img.alt = 'Cuki macska';
  img.className = 'cute-cat-block';

  element.innerHTML = '';
  element.appendChild(img);
}

// Egyedi macskás kép lekérése
async function getImageUrl() {
  if (settings.imageSource === 'custom' && settings.customImages.length) {
    const idx = Math.floor(Math.random() * settings.customImages.length);
    return settings.customImages[idx];
  }
  try {
    const headers = settings.apiKey ? { 'x-api-key': settings.apiKey } : {};
    const res = await fetch('https://api.thecatapi.com/v1/images/search', { headers });
    const data = await res.json();
    if (data[0] && data[0].url) {
      return data[0].url;
    }
  } catch (e) {
    console.error('Hiba a Cat API hívásakor', e);
  }
  // Hiba esetén fallback egy véletlen macskás kép
  return 'https://cataas.com/cat?cache=' + Date.now();
}