const booksContainer = document.querySelector("#books-container");
const message = document.querySelector("#status-message");
const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");

function createCard(book) {
  let cover = "https://via.placeholder.com/180x260?text=Sin+Portada";

  if (book.cover_i) {
    cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
  }

  let author = "Desconocido";

  if (book.author_name) {
    author = book.author_name[0];
  }

  let year = "No disponible";

  if (book.first_publish_year) {
    year = book.first_publish_year;
  }

  return `
    <article class="book-card">
      <img src="${cover}" alt="${book.title}">

      <div class="container">
        <h3>${book.title}</h3>
        <p>Autor: ${author}</p>
        <p>Año: ${year}</p>
      </div>
    </article>
  `;
}

function showBooks(books) {
  booksContainer.innerHTML = books
    .slice(0, 20)
    .map(createCard)
    .join("");
}

function showMessage(text) {
  message.textContent = text;
}

async function loadBooks(query) {
  booksContainer.innerHTML = "";
  showMessage("Buscando libros...");

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    showBooks(data.docs);

    showMessage(
      `Resultados encontrados: ${data.docs.length}`
    );
  } catch (error) {
    console.error(error);
    showMessage("Error al cargar los libros");
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const query = input.value.trim();

  if (query !== "") {
    loadBooks(query);
  }
});

// Libros iniciales variados
loadBooks("fiction");