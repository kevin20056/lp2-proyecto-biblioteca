import { searchBooks } from "./api.js";
import { showBooks, clearBooks, showMessage } from "./ui.js";

// Enter - form
const form = document.querySelector("#search-form");
//Barra de búsqueda
const input = document.querySelector("#search-input");
//Evita
const button = document.querySelector("#search-button");

async function loadBooks() {
  // Evita procesar múltiples solicitudes simultáneas si el botón ya está bloqueado
  if (button.disabled) return;

  // Obtiene el texto ingresado por el usuario y elimina los espacios en blanco sobrantes
  const query = input.value.trim();

  // Limpia los resultados anteriores de la pantalla antes de realizar la nueva búsqueda
  clearBooks();

  // Valida que el campo de búsqueda no esté vacío
  if (!query) {
    showMessage("Escribe algo para buscar.", "empty");
    return;
  }

  // Desactiva el botón y muestra el mensaje visual de que la búsqueda está en curso
  button.disabled = true;
  showMessage("Cargando...", "loading");

  try {
    // Solicita los datos de los libros a la API usando el término de búsqueda
    const { books, total } = await searchBooks(query);

    // Valida si la API devolvió registros o llegó vacía
    if (books.length === 0) {
      showMessage(`No hay resultados para «${query}».`, "empty");
    } else {
      // Pinta los libros en la interfaz y muestra el total de resultados encontrados
      showBooks(books);
      showMessage(`${total} resultados. Mostrando ${books.length}.`, "success");
    }
  } catch (error) {
    // Captura y clasifica los posibles errores ocurridos durante la petición
    if (error.status) {
      // Error devuelto directamente por el servidor (ej. códigos 404 o 500)
      showMessage(`Error del servidor: ${error.status}.`, "error");
    } else if (!navigator.onLine || error instanceof TypeError) {
      // Problemas de conexión a internet o de red
      showMessage("No hay conexión con la API. Revisa tu internet.", "offline");
    } else {
      // Fallos imprevistos en la estructura de los datos devueltos
      showMessage("La API devolvió datos incorrectos.", "error");
    }
  } finally {
    // Bloque que se ejecuta siempre al finalizar (con éxito o error) para rehabilitar el botón
    button.disabled = false;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loadBooks();
});

loadBooks();
