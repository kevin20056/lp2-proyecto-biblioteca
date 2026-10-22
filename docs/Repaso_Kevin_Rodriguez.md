# js/ui.js

# Linea 1 -2
la app va a la API, trae la información y la dibuja como tarjetas en el HTML.
const container = document.querySelector("#books-container");

Lo que hace esa parte es verificar si la API respondió bien o no. Si la información llegó, la carga y la muestra en la pantalla; si no, o si falla la red, muestra el mensaje correspondiente en el HTML (sea de cargando, sin resultados o error del servidor)
const message = document.querySelector("#status-message");

# Linea 4 - 7

El export es lo que le da permiso a los demás archivos para que puedan hacerle el import y usarla.

Coge el mensajito que le mande (ej: "Cargando..." o "Error del servidor") y lo escribe dentro del párrafo de HTML.
 message.textContent = text;

Le cambia el estado en el HTML (si es loading, error, success, etc.) para que el CSS coja ese estado y le pinte el color que es (amarillo, rojo, verde).
  message.dataset.state = state;

# Linea 9 - 11

clearBooks() es solo el nombre de la función. Lo que realmente borra los libros viejos del HTML para que no se amontonen con los nuevos es container.replaceChildren().

export function clearBooks() {
  container.replaceChildren();
}

# Linea 13 - 16

Fábrica de etiquetas:

Creamos una función que recibe dos datos: la etiqueta (tag) y el texto (text). Ella crea una etiqueta limpia en la memoria para cada tarjeta, le mete la información correspondiente a esa tarjeta y al final la retorna ya armada para pegarla en el HTML.

function createText(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}