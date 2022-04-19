---
title: "Desestructuración con valores por defecto en Javascript"
date: "2019-12-01"
categories: 
  - "javascript"
coverImage: "desestructuracion_con_valores_por_defecto.jpg"
---

En la [entrada anterior](https://coffeebytes.dev/desestructuracion-de-objetos-anidados/) traté brevemente el tema de la desestructuración con objetos anidados en javascript. En esta publicación voy a hablar un poco sobre como podemos especificar valores por defecto al momento de desestructurar un objeto en javascript.

Para hacerlo crearemos un objeto bastante sencillo:

```javascript
const user = {
  userIsLoggedIn: true, 
  email: "email@example.org",
  accountType: "premium" 
}
```

Este objeto podría ser la respuesta a una petición API. Del objeto anterior podriamos desestructurar tres propiedades, _userIsLoggedIn_, _email_ y _accountType_.

```javascript
const { userIsLoggedIn, email, accountType } = user
```

Pero, ¿qué sucedería si hay un cambio en la API y ahora esta ya no retorna la propiedad el _accountType_?, esto bastaría para que toda la parte del frontend que dependa de la presencia de esa variable tenga errores.

```javascript
if(accountType==='Admin'){
  showAdvancedMenu()
}
if(accountType==='basic'){
  showBasicMenu()
}
```

Bien pues para evitar que suceda eso podemos asignar un valor por defecto cuando la desestructuración no encuentre la propiedad que queremos desestructurar. Si estás siguiendo este ejemplo recuerda limpiar la terminal de javascript y volver a declarar el objeto principal o tendrás un error.

## Asignar un valor por defecto al desestructurar un objeto

Esta vez declaremos el objeto user sin la propiedad _accountType_:

```javascript
const user = {
  userIsLoggedIn: true, 
  email: "email@example.org"
}
```

Bien, si nosotros intentemos desestructurar el objeto y asignar un valor por defecto si no se encuentra la propiedad adecuada lo haremos de la siguiente manera:

```javascript
const { userIsLoggedIn, email, accountType="basic" } = user
accountType
"basic"
```

La constante _accountType_ devuelve 'basic', una propiedad de la cual carecia el objeto original, pero que ahora tendrá un valor por defecto si es omitida. Esto nos permite mantener el frontend sin cambios grandes ante una modificación de una respuesta HTTP y manejar la ausencia de alguna propiedad en un objeto.

Sé que a veces puede ser bastante difícil este tema, a mi también me costó algo de trabajo comprenderlo la primera vez, la desestructuración hace mucho más legible el ya de por sí confuso código de Javascript. Si aún te parece confuso Javascript te dejo una entrada donde hablo del que yo considero el [mejor libro para aprender Javascript](https://coffeebytes.dev/el-mejor-libro-para-aprender-javascript-moderno/) a nivel intermedio.