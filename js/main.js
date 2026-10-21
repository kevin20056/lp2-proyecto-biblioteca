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
  let image = "";

  if (book.cover_i) {
    image = `
      <img
        class="book-cover"
        src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
        alt="${book.title}"
      >
    `;
  }

  return `
    <article class="book-card">
      ${image}

      <div class="container">
        <h3>${book.title}</h3>
        <p>${book.author_name ? book.author_name[0] : ""}</p>
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

function updateButtons() {
  prevButton.disabled = !prevPage;
  nextButton.disabled = !nextPage;
}

async function getBooks(url) {
  try {
    message.textContent = "Cargando libros...";

    const response = await fetch(url);
    const data = await response.json();

    showBooks(data.docs);

    const page =
      Number(new URL(url).searchParams.get("page")) || 1;

    const totalPages =
      Math.ceil(data.numFound / 24);

    pageNumber.textContent =
      `Página ${page} de ${totalPages}`;

    if (page > 1) {
      prevPage =
        `https://openlibrary.org/search.json?q=${encodeURIComponent(currentQuery)}&page=${page - 1}`;
    } else {
      prevPage = null;
    }

    if (page < totalPages) {
      nextPage =
        `https://openlibrary.org/search.json?q=${encodeURIComponent(currentQuery)}&page=${page + 1}`;
    } else {
      nextPage = null;
    }

    updateButtons();

    message.textContent =
      "Resultados encontrados: " + data.numFound;
  } catch (error) {
    console.error(error);
    message.textContent =
      "Error al cargar los libros";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  currentQuery = input.value.trim();

  if (currentQuery) {
    getBooks(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(currentQuery)}`
    );
  }
});

prevButton.addEventListener("click", function () {
  if (prevPage) {
    getBooks(prevPage);
  }
});

nextButton.addEventListener("click", function () {
  if (nextPage) {
    getBooks(nextPage);
  }
});

getBooks(
  `https://openlibrary.org/search.json?q=${encodeURIComponent(currentQuery)}`
);