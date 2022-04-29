---
title: "Desestructuracion de objetos anidados"
date: "2019-11-16"
categories: 
  - "javascript"
coverImage: "images/desestructuracion_de_objetos_anidadis.jpg"
description: "¿Desestructuración de objetos anidados en javascript? En esta entrada trato el tema de la desestructuración de objetos anidados con ejemplos."
keywords:
  - javascript
---

En las entradas anteriores expliqué brevemente como llevar a cabo una [desestructuración de objetos en Javascript](https://coffeebytes.dev/desestructuracion-de-listas-en-javascript/), pero en la mayoría de los casos no tendremos la suerte de trabajar con objetos planos, sino que nos encontraremos con objetos anidados con varios niveles de profundidad. ¿Tendremos que conformarnos con olvidarnos de esta característica y hacer el trabajo explícitamente asignando una constante a cada objeto? Por suerte Javascript permite trabajar la desestructuración de objetos anidados.

Creemos un ejemplo de objeto para probar.

```javascript
const user = {
  userIsLoggedIn: true, 
  data: {
    email: "email@example.org", 
    name:"Isabel", 
    lastName:"Allende", 
    location:{
      state: "Lima", 
      country: "Peru", 
      postalCode: "15048"
    }
  }
}
```

Obtengamos primero la propiedad _userIsLoggedIn_

```javascript
const { userIsLoggedIn } = user
userIsLoggedIn
true
```

¿Pero y si ahora queremos asignar la propiedad state? Para lograrlo primero pensemos en la estructura del objeto. Nuestro objeto tiene tres niveles; en el primero, está userIsLoggedIn y data; en el segundo, email, name, lastName y location; en el tercer nivel, las propiedades state, country y postalCode. Es en este último nivel donde está la propiedad que intentamos desestructurar.

```javascript
const user = {
  userIsLoggedIn: true, 
  data: {
    email: "email@example.org", 
    name:"Isabel", 
    lastName:"Allende", 
    location:{
      state: "Lima", 
      country: "Peru", 
      postalCode: "15048"
    }
  }
}
```

El primer nivel es _data_, por lo que colocaremos dos puntos ":" ahí y seguiremos descendiendo hasta el nivel deseado . Dejemos pendiente el resto asignándole un "_{...}"_. **Si estás siguiendo este ejemplo no le des ENTER hasta el final.**

```javascript
const {data:{...}}
```

El segundo nivel que nos lleva a nuestra propiedad _state_ es _location_. Por lo que extendemos nuestra asignación anterior:

```javascript
const {data:{location:{...}}}
```

Nuestra proppiedad _state_ se encuentra en el tercer nivel, por lo que ya no hay que descender más, simplemente colocamos la constante a continuación.

```javascript
const {data: {location:{state}}}=user
state
"Lima"
```

Ahora sí ya puedes darle ENTER, cuando accedas a la constante _state_, verás que hace referencia a la propiedad _state_, anidada del objeto.

## Accediendo a más de una propiedad

El ejemplo anterior no estuvo tan complicado, pero que tal si en lugar de una sola propiedad queremos desestructurar el valor de _userIsLoggedIn_, _email_ y _state_.

Para hacer lo anterior bastaría con que ubicaramos en que nivel se encuentran la propiedades que queremos desestructurar e incluirlas en el nivel adecuado en nuestra sentencia de código pasado:

```javascript
const {userIsLoggedIn, data: {email, location:{state}}}=user
userIsLoggedIn
true
email
"email@example.org"
state
"Lima"
```

En la siguiente entrada hablaré sobre como [asignar valores por defecto al desestructurar objetos](https://coffeebytes.dev/desestructuracion-con-valores-por-defecto-en-javascript/).
