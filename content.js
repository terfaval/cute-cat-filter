async function getCatApiImage(apiKey) {
  const headers = apiKey ? { 'x-api-key': apiKey } : {};
  const r = await fetch('https://api.thecatapi.com/v1/images/search?size=small&limit=1', { headers });
  const data = await r.json();
  return Array.isArray(data) && data[0]?.url ? data[0].url : null;
}

async function getCataasImage() {
  return 'https://cataas.com/cat';
}

async function getCatImageUrl() {
  const { replacementMode, catApiKey } = await chrome.storage.sync.get(['replacementMode', 'catApiKey']);
  try {
    if (replacementMode === 'catapi') {
      const url = await getCatApiImage(catApiKey);
      if (url) return url;
      return await getCataasImage();
    } else {
      const url = await getCataasImage();
      if (url) return url;
      return await getCatApiImage(catApiKey);
    }
  } catch {
    return replacementMode === 'catapi' ? await getCataasImage() : await getCatApiImage(catApiKey);
  }
}