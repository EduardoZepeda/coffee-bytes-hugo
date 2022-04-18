---
title: "Desestructuración de variables en javascript"
date: "2019-10-16"
categories: 
  - "javascript"
---

Para aquellos como yo, cuyo primer lenguage no tuvo la suerte (o desgracia) de ser javascript, la desestructuración puede llegar a tener tintes esotéricos. En esta entrada voy a tratar de explicar de una manera sencilla la desestructuración de objetos en javascript. La destructuración es un proceso que, a diferencia de lo que se cree, es bastante simple en realidad y, además, puede mejorar bastante la legibilidad del código.

Si quieres empezar a aprender Javascript desde cero te recomiendo que leas [esta entrada](https://coffeebytes.dev/el-mejor-libro-para-aprender-javascript-moderno/), aquí recomiendo el que yo considero el mejor libro para empezar.

Desestructurar un objeto significaría convertir las propiedades de un objeto o lista de javascript en variables o constantes para poder acceder más fácilmente a ellas. Partamos de un objeto bastante sencillo.

No, no voy a usar el clásico ejemplo de persona, libro o perro; usemos el ejemplo de características de los datos de una cuenta.

Supongamos que tenemos almacenado un objeto que representa los datos de una cuenta de usuario:

```javascript
const userData = {isLoggedIn: True, profile: "Admin", email: "email@example.org"}
```

El objeto anterior tiene las propiedades isLoggedIn, profile y email. Si nosotros quisieramos acceder a los valores, ya sea para mostrar algún contenido condicionalmente tendríamos que hacer lo siguiente:

```javascript

if(userData.isLoggedIn && userData.profile==='Admin'){
  redirectToDashboard()
}else{
  redirectToUserAccount()
}
```

En el trozo de código anterior, cada vez que accedamos a alguna propiedad del objeto tendremos que escribir el nombre del objeto _userData_. Pero, ¿y si asignamos las propiedades del objeto a otras constantes?

```javascript

const isLoggedIn = userData.isLoggedIn
const profile = userData.profile
const email = userData.email
```

Ahora ya podemos acceder a las constantes individualmente sin hacer referencia al objeto. Pero, ¿no estamos repitiendo userData en cada asignación?

## Desestructuración de un objeto en javascript

Para desestructurar el objeto del ejemplo anterior, podemos usar la siguiente sintaxis:

```javascript
const userData = {isLoggedIn: True, profile: "Admin", email: "email@example.org"}
const {isLoggedIn, profile, email} = userData
```

Ahora en lugar de obtener los valores directamente del objeto podemos obtenerlos de las constantes y el código se vuelve más sencillo de leer.

```javascript

if(isLoggedIn && profile==='Admin'){
  redirectToDashboard()
}else{
  redirectToUserAccount()
}
```

Además de destructurar objetos, Javascript también permite desestructurar listas. Entra en **[mi entrada de destructuración de listas](https://coffeebytes.dev/desestructuracion-de-listas-en-javascript/)** para aprender a desestructurar listas en Javascript.
