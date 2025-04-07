---
aliases:
- /types-para-react-components-con-children
- /types-para-react-components-con-children//1000
- /es/types-para-react-components-con-children/
authors:
- Eduardo Zepeda
categories:
- react
- typescript
- javascript
coverImage: images/TypesChildrenTypescript.jpg
coverImageCredits: Créditos a https://www.pexels.com/@tranmautritam/
date: '2021-10-19'
description: Te enseño tres maneras diferentes para establecer los types en Typescript para componentes que reciben children como parámetro en El framework de React.
keywords:
- react
- typescript
- javascript
- children
- types
title: Qué Tipos o Types Usar Para Componentes React Con Children
---

Si estás dudando sobre qué tipos utilizar para los componentes de React que tienen hijos en Typescript, para que puedas heredarlos correctamente y evitar errores, entonces este es el post que necesitas leer, te explico tres enfoques diferentes que puedes guardar y utilizar como parte de tus habilidades en Typescript.

Typescript requiere que especifiquemos los types para las diferentes variables y argumentos de funciones en React. Cuando son tipos nativos no es muy complicado, pero para componentes de React puede llegar a ser diferente. Aquí dejo 3 maneras de especificar los types para componentes de React que contienen children como parte de sus props.

## Types Con ReactNode

La manera más sencilla es de manera manual, especificando a children como un nodo de React opcional.

```javascript
import React from 'react'

type props = {
    children?: React.ReactNode
}


const MyComponent = ({ children }: Props) => {
    return (
        <div>
            {children}      
        </div>
    )
}

export default MyComponent
```

{{<ad>}}

## Usando React.FC

La segunda manera es usando un el objeto FC (Functional Component) que nos provee React, el cual deja implícito el uso de children y además evita que devolvamos undefined. Considera que usar _React.FC_ es [considerado por algunos desarrolladores como una mala práctica](/es/por-que-usar-react.fc-podria-ser-una-mala-practica/).

```javascript
import React from 'react'

const MyComponent: React.FC<{}> = ({ children }) => {
    return (
        <div>
            {children}      
        </div>
    )
}

export default MyComponent
```

## React.PropsWithChildren

La última manera es haciendo uso del objeto PropsWithChildren que provee React que, como dice su nombre, ya incluye los props con el componente children, listo para usarse de manera directa.

```javascript
import React from 'react'

type Props = React.PropsWithChildren<{}>

const MyComponent = ({ children }: Props) => {
    return (
        <div>
            {children}      
        </div>
    )
}

export default MyComponent
```

Mira lo que Typescript tiene para decir en React en [su documentación oficial.](https://www.typescriptlang.org/docs/handbook/jsx.html#react-integration)