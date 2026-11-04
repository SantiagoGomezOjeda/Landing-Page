# SG Energy — Landing page y cotizador académico

Autor: Santiago Gómez · TE1020 Análisis de Circuitos Eléctricos.

## ¿Qué incluye?

- `index.html`: landing page de SG Energy.
- `styles.css` y `script.js`: diseño responsive y menú móvil.
- `assets/`: logo e imagen de energía solar alojados localmente.
- `cotizador/`: primera versión del simulador de consumo de Photon Labs, incorporada para que el botón «Abrir cotizador» tenga un destino funcional.
- `.nojekyll`: permite servir archivos directamente con GitHub Pages.

**Importante:** los módulos de dimensionamiento, inversores, baterías, catálogo y PDF del cotizador siguen en desarrollo. No se ofrecen como cálculos técnicos validados ni cotizaciones reales.

## Cómo verla en tu computadora

Descomprime el ZIP y abre `index.html` en el navegador. El enlace «Abrir cotizador» te llevará a `cotizador/index.html`.

## Cómo publicarla gratis en GitHub Pages

1. Entra a https://github.com/new e inicia sesión.
2. Crea un repositorio **público** llamado `sg-energy` (o el nombre que prefieras).
3. En el repositorio, pulsa **Add file > Upload files**.
4. Arrastra **los archivos y carpetas que están dentro de `SG-Energy-Landing`**, no el archivo ZIP. Asegúrate de que `index.html` quede en la raíz. Conserva las rutas `assets/` y `cotizador/`.
5. Haz clic en **Commit changes**.
6. Ve a **Settings > Pages**. En **Build and deployment**, elige **Deploy from a branch**, rama **main**, carpeta **/(root)**, y guarda.
7. Cuando GitHub termine de publicar, abre `https://TU-USUARIO.github.io/sg-energy/` (sustituye `TU-USUARIO` por tu usuario real de GitHub).
8. Prueba que el botón «Abrir cotizador» abra la aplicación y que el logotipo y la imagen se muestren correctamente.

Si cambias el nombre del repositorio, también cambiará la última parte de la URL. Para hacer cambios después, sube los archivos actualizados y confirma los cambios.

## Nota académica

SG Energy es un proyecto educativo individual. Photon Labs forma parte de un escenario académico simulado. Cualquier cifra es preliminar y requiere verificación antes de uso real.
