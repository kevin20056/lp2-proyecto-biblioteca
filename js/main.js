import { searchBooks } from "./api.js";
import { showBooks, clearBooks, showMessage } from "./ui.js";

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const button = document.querySelector("#search-button");

async function loadBooks() {
  if (button.disabled) return;

  const query = input.value.trim();
  clearBooks();

  if (!query) {
    showMessage("Escribe algo para buscar.", "empty");
    return;
  }

  button.disabled = true;
  showMessage("Cargando...", "loading");

  try {
    const { books, total } = await searchBooks(query);

    if (books.length === 0) {
      showMessage(`No hay resultados para «${query}».`, "empty");
    } else {
      showBooks(books);
      showMessage(`${total} resultados. Mostrando ${books.length}.`, "success");
    }
  } catch (error) {
    if (error.status) {
      showMessage(`Error del servidor: ${error.status}.`, "error");
    } else if (!navigator.onLine || error instanceof TypeError) {
      showMessage("No hay conexión con la API. Revisa tu internet.", "offline");
    } else {
      showMessage("La API devolvió datos incorrectos.", "error");
    }
  } finally {
    button.disabled = false;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loadBooks();
});

loadBooks();