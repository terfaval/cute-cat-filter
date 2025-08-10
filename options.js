const DEFAULT_SETTINGS = {
  replacementMode: "catapi",
  catApiKey: ""
};

function load() {
  chrome.storage.sync.get(DEFAULT_SETTINGS, (res) => {
    document.getElementById('mode').value = res.replacementMode || 'catapi';
    document.getElementById('catApiKey').value = res.catApiKey || '';
  });
}

function save() {
  const replacementMode = document.getElementById('mode').value;
  const catApiKey = document.getElementById('catApiKey').value.trim();
  chrome.storage.sync.set({ replacementMode, catApiKey }, () => {
    alert('Mentve!');
  });
}

window.addEventListener('DOMContentLoaded', () => {
  load();
  document.getElementById('save').addEventListener('click', save);
});