```scss

// 1. Puede cambiar el valor de la variable $Core dependiendo de las nesecidades de su proyecto.
// La Variable $Core acepta solo dos valores scss(recomendado) y css

$Core: scss;

// 2. Puede cambiar el valor de la variable $Version dependiendo que caracteristicas de css desea usar en su proyecto.
// La Variable $Version acepta solo tres valores all(recomendado), grid y beta

// all -> Sopote total.
// grid -> Solo para flexbox como para grid
// beta -> Activa las caracteristicas que estan en beta

$Version: all;

// importar ArronaGrid

// Si usa Prepros
@import "node_modules/@andresarronamontoya/arronagrid/ArronaGrid.scss";

// Si usa Gulp.js
@import "~@andresarronamontoya/arronagrid/ArronaGrid.scss";
```
