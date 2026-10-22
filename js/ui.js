const container = document.querySelector("#books-container");
const message = document.querySelector("#status-message");

//Coje y pinta 
export function showMessage(text, state) {
  message.textContent = text;
  message.dataset.state = state;
}

export function clearBooks() {
  container.replaceChildren();
}

//Limpia y crea
function createText(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function createImage(path, description) {
  //Crea un cuadrito de respaldo por si el libro no tiene imagen, usando la fábrica de texto
  const fallback = createText("div", `Sin dato: ${description}`);
  //Le asigna css respaldo
  fallback.className = "no-cover";

  //Si la API no mandó ninguna ruta de imagen, se detiene y devuelve el cuadrito de respaldo
  if (!path) return fallback;

  // 1. Crea una etiqueta de imagen limpia en la memoria
  const image = document.createElement("img");
  // 2. Le asigna la clase de CSS para darle el tamaño y diseño a la portada
  image.className = "book-cover";
  // 3. Le pone un texto descriptivo a la imagen por accesibilidad
  image.alt = description;
  // 4. Hace que la imagen solo cargue cuando el usuario baje y la vaya a ver (optimización)
  image.loading = "lazy";
  // 5. Si la imagen falla al cargar desde la API, la reemplaza automáticamente por el plan B (fallback)
  image.onerror = () => image.replaceWith(fallback);
  // 6. Le asigna el enlace oficial de la API de Open Library usando la ruta para traer la portada
  image.src = `https://covers.openlibrary.org/${path}-M.jpg?default=false`;

  return image;
}

export function showBooks(books) {
  // Recorre
  for (const book of books) {
    // Crea
    const card = document.createElement("article");
    card.className = "book-card";

    // Extraemos los datos (o ponemos "Sin dato" si falta alguno)
    const title = book.title || "Sin dato";
    const author = book.author_name?.[0] || "Sin dato";
    const authorId = book.author_key?.[0];

    // Armamos la tarjeta metiéndole la portada, título, autor, foto y año
    card.append(
      // Pinta la portada del libro (o saca el plan B si no hay)
      createImage(
        book.cover_i ? `b/id/${book.cover_i}` : null,
        `Portada de ${title}`,
      ),
      // Pone el título
      createText("h3", title),
      // Pone el autor
      createText("p", `Autor: ${author}`),
      // Pinta la foto del autor (o saca el plan B si no hay)
      createImage(authorId ? `a/olid/${authorId}` : null, `Foto de ${author}`),
      // Pone el año
      createText("p", `Año: ${book.first_publish_year ?? "Sin dato"}`),
    );

    // Mandamos la tarjeta lista a la grilla en el HTML
    container.append(card);
  }
}
