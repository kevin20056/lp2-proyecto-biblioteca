const API_URL = "https://openlibrary.org/search.json";

export async function searchBooks(query) {
  // Armamos los parámetros que le vamos a mandar a la URL (lo que el usuario busca, el límite de 24 y los datos exactos)
  const params = new URLSearchParams({
    q: query,
    limit: "24",
    fields: "title,author_name,author_key,first_publish_year,cover_i",
  });

  // Salimos a internet a hacer la petición con fetch, sin usar caché para que siempre traiga datos frescos
  const response = await fetch(`${API_URL}?${params}`, {
    cache: "no-store",
  });

  // El fetch no avisa solito si el servidor falló (tipo 404 o 500), así que lo revisamos a mano y lanzamos el error si pifió
  if (!response.ok) {
    const error = new Error("Error del servidor");
    error.status = response.status;
    throw error;
  }

  // Convertimos la respuesta que mandó la API a un formato de objeto que JavaScript sí entienda (JSON)
  const data = await response.json();

  // Nos aseguramos de que los libros (docs) sí vengan organizados en una lista real
  if (!Array.isArray(data.docs)) {
    throw new Error("Datos inesperados");
  }

  // Devolvemos ya empaquetado un objeto con la lista de libros y el número total que se encontró
  return {
    books: data.docs,
    total: data.numFound ?? data.num_found ?? data.docs.length,
  };
}
