const API_URL = "https://openlibrary.org/search.json";

export async function searchBooks(query) {
  const params = new URLSearchParams({
    q: query,
    limit: "24",
    fields: "key,title,author_name,first_publish_year,cover_i"
  });

  const response = await fetch(`${API_URL}?${params}`, {
    cache: "no-store"
  });

  // fetch no lanza un error automáticamente por un 404 o 500.
  if (!response.ok) {
    const error = new Error("Error del servidor");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  if (!Array.isArray(data.docs)) {
    throw new Error("La API devolvió datos inesperados.");
  }

  return {
    books: data.docs,
    total: data.numFound ?? data.num_found ?? data.docs.length
  };
}