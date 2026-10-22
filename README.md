# Biblioteca - Equipo 1
Aplicación con HTML, CSS y JavaScript puro para buscar libros.
API utilizada: https://openlibrary.org/search.json
Muestra portadas, fotos del primer autor, títulos, autores y años.
Cuando falta información o una imagen no carga, muestra "Sin dato".

## Cómo abrir
Abrir la carpeta en Visual Studio Code.
Instalar la extensión Live Server.
Clic derecho en index.html → Open with Live Server.

## Cómo probar los estados
1. Cargando: F12 → Network → Slow 4G y buscar.
2. Con datos: buscar "cien años".
3. Sin resultados: buscar "zzzzqq987654321xyz".
4. Error: cambiar API_URL en api.js por https://openlibrary.org/ruta-inexistente.json y buscar; después restaurarla.
5. Sin conexión: F12 → Network → Offline y buscar.
Volver a Online y buscar sin recargar para comprobar la recuperación.
Probar también con Tab y con una pantalla de 375 px.