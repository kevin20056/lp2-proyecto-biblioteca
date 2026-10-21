const API = "https://openlibrary.org/search.json?q=fiction";

const booksContainer = document.querySelector("#books-container");
const message = document.querySelector("#status-message");
const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const pageNumber = document.querySelector("#page-number");

let currentQuery = "fiction";
let prevPage = null;
let nextPage = null;

function createCard(book) {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/180x260?text=Sin+Portada";

  return `
    <article class="book-card">
      <img class="book-cover" src="${cover}" alt="${book.title}">
      <div class="container">
        <h3>${book.title}</h3>
        <p>${book.author_name?.[0] || ""}</p>
        <p>${book.first_publish_year || ""}</p>
      </div>
    </article>
  `;
}

function showBooks(books) {
  booksContainer.innerHTML = books
    .slice(0, 24)
    .map(createCard)
    .join("");
}

function showMessage(text) {
  message.textContent = text;
}

function updateButtons() {
  prevButton.disabled = !prevPage;
  nextButton.disabled = !nextPage;
}

async function loadBooks(url) {
  showMessage("Cargando libros...");
  booksContainer.innerHTML = "";
  prevButton.disabled = true;
  nextButton.disabled = true;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      showMessage(`Error ${response.status}: no se pudieron cargar los libros.`);
      return;
    }

    const data = await response.json();

    showBooks(data.docs);

    const page =
      Number(new URL(url).searchParams.get("page")) || 1;

    const totalPages = Math.ceil(data.numFound / 24);

    pageNumber.textContent = `Página ${page} de ${totalPages}`;

    prevPage =
      page > 1
        ? `https://openlibrary.org/search.json?q=${encodeURIComponent(currentQuery)}&page=${page - 1}`
        : null;

    nextPage =
      page < totalPages
        ? `https://openlibrary.org/search.json?q=${encodeURIComponent(currentQuery)}&page=${page + 1}`
        : null;

    showMessage(`Resultados encontrados: ${data.numFound}`);
  } catch (error) {
    showMessage("Error al cargar los libros.");
  } finally {
    updateButtons();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  currentQuery = input.value.trim();

  if (currentQuery) {
    loadBooks(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(currentQuery)}`
    );
  }
});

prevButton.addEventListener("click", () => {
  if (prevPage) loadBooks(prevPage);
});

nextButton.addEventListener("click", () => {
  if (nextPage) loadBooks(nextPage);
});

loadBooks(API);