```scss

/// Selectores para el container y el item

$nameSpace  : ag                       !default;
$Container  : #{$nameSpace}-Container  !default;
$Item       : #{$nameSpace}-Item       !default;

/// Ancho maximo para los contenedores

$Max-Width  : 1200px    !default;

/// Variable para sobreescribir la propiedad max-width en base al viewport

$FullLayout       : 100vh     !default;

/// Variable para sobreescribir la propiedad max-width en base a un contenedor

$Full             : 100%      !default;

/// Numero de columnas

$Column:12;

/// Separacion entre los items

$Gap       :1rem !default;

/// Mapa de variables para el mixin MediaQuery()

$Breackpoints : (
    xs: 240px,
    s:  320px,
    m:  480px,
    st: 600px,
    t:  768px,
    l:  1024px,
    xl: 1200px
)   !default;
```
