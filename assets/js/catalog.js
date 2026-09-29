// Shared, side-effect-free catalog behavior, also exercised by the Node checks.
function normalizeQuery(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
}

function selectProjects(items, categoryId, query) {
  const words = normalizeQuery(query).split(' ').filter(Boolean);
  return items.filter(project => {
    const searchable = normalizeQuery(`${project.name} ${new URL(project.url).hostname} ${project.category}`);
    return (categoryId === 'all' || project.categoryId === categoryId) && words.every(word => searchable.includes(word));
  });
}

async function copyProjectUrl(url, clipboard = globalThis.navigator?.clipboard) {
  if (!clipboard?.writeText) return false;
  try {
    await clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}
