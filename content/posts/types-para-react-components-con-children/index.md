---
title: "Types para React components con children"
date: "2021-10-19"
categories: 
  - "javascript"
  - "react"
  - "typescript"
coverImage: "TypesChildrenTypescript.jpg"
---

Typescript requiere que especifiquemos los types para las diferentes variables y argumentos de funciones en React. Cuando son tipos nativos no es muy complicado, pero para componentes de React puede llegar a ser diferente. Aquí dejo 3 maneras de especificar los types para componentes de React que contienen children como parte de sus props.

Revisa mis [otras entradas de React](https://coffeebytes.dev/?s=react).

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

## Usando React.FC

La segunda manera es usando un el objeto FC (Functional Component) que nos provee React, el cual deja implícito el uso de children y además evita que devolvamos undefined. Considera que usar _React.FC_ es [considerado por algunos desarrolladores como una mala práctica](https://coffeebytes.dev/por-que-usar-react-fc-podria-ser-una-mala-practica/).

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