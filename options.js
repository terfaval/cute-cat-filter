// Beállítások kezelése az options oldalon

document.addEventListener('DOMContentLoaded', () => {
  const checkboxElems = document.querySelectorAll('input[type="checkbox"]');
  const customKeywords = document.getElementById('customKeywords');
  const imageSourceRadios = document.getElementsByName('imageSource');
  const customImages = document.getElementById('customImages');
  const apiKeyInput = document.getElementById('apiKey');

  // Beállítások betöltése
  chrome.storage.sync.get({
    enabledCategories: [],
    customKeywords: [],
    imageSource: 'catApi',
    customImages: [],
    apiKey: ''
  }, data => {
    checkboxElems.forEach(cb => {
      cb.checked = data.enabledCategories.includes(cb.value);
    });
    customKeywords.value = data.customKeywords.join('\n');
    customImages.value = data.customImages.join('\n');
    apiKeyInput.value = data.apiKey || '';
    imageSourceRadios.forEach(r => {
      r.checked = r.value === data.imageSource;
    });
  });

  // Mentés gomb
  document.getElementById('save').addEventListener('click', () => {
    const enabledCategories = Array.from(checkboxElems)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    const customKw = customKeywords.value.split(/\n+/)
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);
    const imgSource = Array.from(imageSourceRadios).find(r => r.checked).value;
    const customImgs = customImages.value.split(/\n+/)
      .map(s => s.trim())
      .filter(Boolean);
    const apiKey = apiKeyInput.value.trim();

    chrome.storage.sync.set({
      enabledCategories: enabledCategories,
      customKeywords: customKw,
      imageSource: imgSource,
      customImages: customImgs,
      apiKey: apiKey
    });
  });
});