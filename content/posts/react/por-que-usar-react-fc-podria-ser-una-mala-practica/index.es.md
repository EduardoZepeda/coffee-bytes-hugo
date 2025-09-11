---
aliases:
- /por-que-usar-react-fc-podria-ser-una-mala-practica
- /por-que-usar-react.fc-podria-ser-una-mala-practica
- /por-que-usar-react.fc-podria-ser-una-mala-practica//1000
- /es/por-que-usar-reactfc-podria-ser-una-mala-practica/
- /es/opinion/por-que-usar-reactfc-podria-ser-una-mala-practica/
- /es/por-que-usar-react.fc-podria-ser-una-mala-practica/
authors:
- Eduardo Zepeda
categories:
- react
- opinion
coverImage: images/react-fc-mala-practica.jpg
date: '2022-02-23'
description: Usar React.FC podría ser una mala práctica por ir en contra de la naturaleza
  explícita de Typescript debido a su ambigua forma de tratar con los hijos, por supuesto
  no es la única forma, hay mejores formas de tratar con componentes React que tienen
  hijos.
keywords:
- react
- typescript
- javascript
- opinion
slug: /react/por-que-usar-reactfc-podria-ser-una-mala-practica/
title: ¿Por qué usar React.FC podria ser una mala practica?
---

Cuando usamos Typescript con React y queremos [pasarle un _children_ como prop a alguno de nuestros componentes](/es/react/que-tipos-o-types-usar-para-componentes-react-con-children/), necesitamos indicar el type. Generalmente se suele usar el type _React.FC_, el cual es el nombre abreviado de _React.FunctionComponent_. Con esto el mensaje de Typescript que nos advierte de un children con tipo any desaparecerá.

```jsx
const Componente: React.FC = ({ children }) => {
    return (<div>{children}</div>)
}
```

Además de permitirnos trabajar con children, _React.FC_ también provoca un error si intentamos devolver _undefined_ desde nuestro componente.

```jsx
const Componente: React.FC = ({ children }) => {
    // El tipo '() => undefined' no se puede asignar al tipo 'FC<{}>'.
    return undefined
}

export default Componente
```

Como puedes ver, es bastante cómodo usarlo, pero algunas personas no están de acuerdo en su uso.

## React.FC ¿más desventajas que ventajas?

¿Dónde está el problema? Pues algunos desarrolladores afirman que _React.FC_ puede traer más desventajas que ventajas, incluso hay una discusión en github (enlace al final), en la que se debate si es conveniente remover uno de los ejemplos en la documentación que lo usa.

El usuario que inició esta discusión considera que **el hecho de que _React.FC_ sea tan popular es debido a que su presencia en la documentación lo posiciona como la manera predeterminada de manejar los componentes de React con Typescript.**

Te explico a continuación algunas de las razones que se exponen para afirmar que React.FC aporta más desventajas que ventajas.

### React.FC no nos avisa de children sin usar

_React.FC_ no siempre es la manera más explícita de indicarle a typescript que un componente recibe _children_ como parte de sus props.

Imagínate que le pasamos un children al componente, pero no lo usamos.

```jsx
import Componente from './Componente';

function App() {
  return (
    <Componente>Soy el children</Componente>
  );
}

export default App;
```

Nuestro componente sí que recibe el _children_ como un prop, pero el type _React.FC_ apacigua a Typescript y evita que este nos devuelva algún error, incluso aunque no lo estemos usando.

```jsx
const Componente: React.FC = () => {
    return (
        <div>No soy el children que recibe Componente</div>
    )
}

export default Componente
```

O, para un caso contrario; imagína que no deseamos que nuestro componente reciba un children como uno de sus props, sin embargo, como estamos usando _React.FC_ no obtendremos ningún error.

```javascript
import Componente from './Componente';

function App() {
  return (
    <Componente><div>Yo no debería de estar aquí</div></Componente>
  );
}

export default App;
```

### El patrón de subcomponentes en React se complica

{{<ad0>}}

El [patrón componente como namespace](https://medium.com/@kunukn_95852/react-components-with-namespace-f3d169feaf91) es bastante sencillo de crear sin usar React.FC, pero con React.FC puede complicarse bastante.

¿No sabes que es? Piensa en un patrón que te permite agrupar componentes dentro de un cierto padre, que funciona como un namespace para nuestros componentes hijos; similar a como funcionaría el namespace _std_ de C++.

```jsx
<Namespace>
	<Namespace.Componente />
</Namespace>
```

En su forma más sencilla, omitiendo React.FC se vería algo así:

```jsx
const Namespace = (props: PropsDelNamespace) => {/* ... */}
Namespace.Componente = (props: PropsDelComponente) => { /*...*/ }
```

Pero si optamos por usar React.FC el código se complicaría y la legibilidad disminuiría un poco.

```jsx
const  Namespace: React.FC<PropsDelNamespace> & { Componente: React.FC<PropsDelComponente> } = (props) => {/* ... */ }
Namespace.Componente = (props) => { /*...*/ }
```

{{<ad1>}}

## ¿Qué deberíamos usar en lugar de React.FC?

El núcleo de las críticas se basta en que **React.FC añade el children de manera implícita, yendo contra la naturaleza explícita de typescript**.

Como usar [el lenguaje de programación Go]({{< ref path="/posts/go/go-lenguaje-de-programacion-introduccion-al-lenguaje-variables-y-tipos-de-dato/index.md" lang="es" >}}) para su compilador.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1741885083/rust-meme-typescript_xa6ajl.webp" class="md-local-image" alt="Typescript decidió utilizar Go para su compilador en lugar de Rust, lo que enfureció a algunos desarrolladores de Rust." caption="Typescript decidió utilizar Go para su compilador en lugar de Rust, lo que enfureció a algunos desarrolladores de Rust." >}}

{{<ad2>}}

Sin embargo, la discusión de la que te hablo es solo eso, una discusión, no está escrita en piedra, puede que tú consideres que es mejor sacrificar un poco de legibilidad en favor de la comodidad o, por el contrario, puede que creas que es importante ser explícito cuando se trabaja con typescript.

Si es el caso, considera que siempre puedes declarar el children como un prop de manera explícita, tal como lo harías con cualquier otro prop. Y de la misma manera, puedes declarar el valor de retorno de tu componente como un elemento de tipo JSX.

```jsx
interface propsWithChildren {
    children: React.ReactNode
}


const Componente = ({ children }: propsWithChildren): JSX.Element => {
    return (
        <div>{children}</div>
    )
}

export default Componente
```

Typescript no debería de advertirte sobre ningún error con esta aproximación al problema.

{{<ad3>}}

## Otros recursos sobre el tema

Aquí abajo te dejo los enlaces a la discusión original y algunos posts al respecto de este tema.

- [Remove React.FC from Typescript template](https://github.com/facebook/create-react-app/pull/8177)
- [Why you probably shouldn’t use React.FC to type your React components](https://medium.com/raccoons-group/why-you-probably-shouldnt-use-react-fc-to-type-your-react-components-37ca1243dd13)
- [Should you use React.FC for typing React Components](https://www.harrymt.com/blog/2020/05/20/react-typescript-react-fc.html)