const container = document.querySelector("#books-container");
const message = document.querySelector("#status-message");

export function showMessage(text, state) {
  message.textContent = text;
  message.dataset.state = state;
}

export function clearBooks() {
  container.replaceChildren();
}

function createText(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function createImage(path, description) {
  const fallback = createText("div", `Sin dato: ${description}`);
  fallback.className = "no-cover";

  if (!path) return fallback;

  const image = document.createElement("img");
  image.className = "book-cover";
  image.alt = description;
  image.loading = "lazy";
  image.onerror = () => image.replaceWith(fallback);
  image.src = `https://covers.openlibrary.org/${path}-M.jpg?default=false`;

  return image;
}

export function showBooks(books) {
  for (const book of books) {
    const card = document.createElement("article");
    card.className = "book-card";

    const title = book.title || "Sin dato";
    const author = book.author_name?.[0] || "Sin dato";
    const authorId = book.author_key?.[0];

    card.append(
      createImage(
        book.cover_i ? `b/id/${book.cover_i}` : null,
        `Portada de ${title}`
      ),
      createText("h3", title),
      createText("p", `Autor: ${author}`),
      createImage(
        authorId ? `a/olid/${authorId}` : null,
        `Foto de ${author}`
      ),
      createText("p", `Año: ${book.first_publish_year ?? "Sin dato"}`)
    );

    container.append(card);
  }
}