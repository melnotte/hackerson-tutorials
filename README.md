# Tutoriales para crear juegos

## Estructura
index.html            la pagina (no se toca)
css/estilos.css       los colores y el diseno
js/app.js             el funcionamiento
data/plataformas.json la lista de plataformas y de tutoriales (el menu)
data/<plataforma>/<tutorial>.json   los pasos de cada tutorial (un archivo por tutorial)

## Agregar un tutorial nuevo
1. Crea data/roblox/moneda.json (copia data/roblox/arma.json como modelo).
2. Agrega una linea en data/plataformas.json, dentro de "tutoriales" de la plataforma:
   { "id": "moneda", "icono": "coins", "titulo": "Contador de monedas", "nivel": "Facil" }
   El "id" debe llamarse igual que el archivo y NO debe tener guiones (-).
3. Sube los cambios a GitHub. Listo.

## Agregar una plataforma nueva
Agrega un bloque en data/plataformas.json con id, nombre, icono, color y "tutoriales": [].
Crea la carpeta data/<id>/ para sus tutoriales.

## Pasos de un tutorial (en su .json)
Paso normal:  { "i": "box", "t": "Crea el proyectil", "s": "Ayuda corta" }
Paso de codigo: { "i": "keyboard", "t": "...", "s": "...", "add": ["linea 1"], "why": "que hace" }
  - "add": lineas que el alumno escribe en ese paso (usa \t para la sangria).
  - "inside": true  -> las lineas entran dentro del ultimo bloque (antes de su "end").
Iconos: https://lucide.dev/icons (usa el nombre).

## Probar en tu computadora
Abrir index.html con doble clic NO funciona (el navegador bloquea la lectura de los .json).
En la carpeta del proyecto ejecuta:  python -m http.server 8000
y abre http://localhost:8000
