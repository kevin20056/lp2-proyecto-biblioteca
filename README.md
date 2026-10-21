# Biblioteca - Equipo 1
Integrantes: Kevin Rodriguez, David Solarte y Cristian Martinez.
Aplicación en HTML, CSS y JavaScript puro para buscar libros en Open Library.
API: https://openlibrary.org/search.json
Muestra título, autor, año y portada. Los datos faltantes aparecen como "Sin dato".
Cada búsqueda muestra el total encontrado y hasta 24 libros.

## Cómo abrir
Clonar el repositorio y abrir su carpeta en Visual Studio Code.
Instalar la extensión Live Server.
Clic derecho en index.html y seleccionar "Open with Live Server".

## Cómo probar los estados
- Cargando: F12 > Network > Slow 4G y realizar una búsqueda.
- Con datos: buscar "cien años" o "harry potter".
- Sin resultados: buscar "zzzzqqxxxxxxxx123456789".
- Error del servidor: cambiar search.json por ruta-inexistente en js/api.js, guardar y buscar.
- Restaurar search.json después de probar el error HTTP.
- Sin conexión: abrir la página, apagar el wifi y buscar; reconectar y buscar sin recargar.
- Datos faltantes: revisar tarjetas sin autor, año o portada y comprobar "Sin dato".