```scss
.hola_mundo{
    color:red;
    @include MediaQuery(s){
        color:blue;
    }
}

// Compila a esto

.hola_mundo{
    color:red;
}

@media screen and (min-width:320px){
    .hola_mundo{
        color:blue;
    }
}
```
