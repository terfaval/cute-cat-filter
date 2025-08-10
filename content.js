const PROXY = "https://cute-cat-filter.workers.dev/";

async function getCatImageUrl() {
  try {
    const res = await fetch(PROXY);
    const data = await res.json();
    return data?.url || "https://cataas.com/cat";
  } catch {
    return "https://cataas.com/cat";
  }
}
