const API_URL = "https://openlibrary.org/search.json";

export async function searchBooks(query) {

  const params = new URLSearchParams({
    q: query,
    limit: "24",
    fields: "title,author_name,author_key,first_publish_year,cover_i",
  });

  const response = await fetch(`${API_URL}?${params}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const error = new Error("Error del servidor");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  if (!Array.isArray(data.docs)) {
    throw new Error("Datos inesperados");
  }

  return {
    books: data.docs,
    total: data.numFound ?? data.num_found ?? data.docs.length,
  };
}
