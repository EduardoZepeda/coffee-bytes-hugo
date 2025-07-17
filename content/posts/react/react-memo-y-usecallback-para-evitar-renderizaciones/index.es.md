---
aliases:
- /react-memo-y-usecallback-para-evitar-renderizaciones
- /react-memo-usememo-y-usecallback-para-evitar-renderizaciones-en-react
- /es/react-memo-usememo-y-usecallback-para-evitar-renderizaciones-en-react/
authors:
- Eduardo Zepeda
categories:
- react
coverImage: images/useCallbackyMemo.jpg
coverImageCredits: Créditos https://www.pexels.com/es-es/@khoa-vo-2347168/
date: '2021-08-10'
description: Usa el hook de React useCallback y su HOC memo para mejorar el rendimiento
  de tu aplicación evitando renderizaciones en tus componentes
keywords:
- javascript
- react
- rendimiento
slug: /react/react-memo-usememo-y-usecallback-para-evitar-renderizaciones-en-react/
title: React memo, useMemo y useCallback para evitar renderizaciones en React
---

Podemos usar react memo y useCallback para evitar que un componente se renderice, inútilmente, múltiples veces por medio de la memoización. Si no sabes que es memoización o no entiendes para que sirven los componentes de react, useCallback y memo, tengo una entrada donde explico [useCallback, useMemo y memo de React, y para que sirven.](/es/react/react-usecallback-usememo-y-memo-diferencias-y-usos/)

{{<box message="A partir de React 19 todos estos hooks quedan obsoletos, por lo que solamente utiliza este post a manera de referencia para versiones legacy de React, por favor no implementes estos hooks en tu aplicación" type="error">}}

Empecémos nuestro ejemplo con el siguiente componente:

```javascript
import ChildComponent from './ChildComponent'

const MyComponent = () => {
  // callback va a ser diferente cada vez que este componente se renderice
  const callback = () => {
    return 'Texto del componente hijo'
  };
  return <ChildComponent callback={callback} />;
}

export default MyComponent
```

Cada vez que MyComponent se renderice, React creará una función nueva llamada callback, y se la pasará a ChildComponent, que se renderizará a su vez.

El primer paso será memoizar el componente hijo, ChildComponent, para que se mantenga constante mientras sus props no cambien. Para hacerlo basta con pasarle el componente a la función memo y exportarlo.

```javascript
import { memo } from "react";

const ChildComponent = ({ callback }) => {
  const textoDelComponenteHijo = callback();
  return <div>{textoDelComponenteHijo}</div>;
};

export default memo(ChildComponent)
```

Como te mencioné anteriormente, cada vez que React renderiza un componente se crearán nuevamente sus funciones internas, convirtiéndose en un prop diferente para cada componente hijo que las reciba.

Para evitar que los props cambien, tenemos que memoizar la función que memo está recibiendo como prop. ¿Cómo? Pues usando el hook useCallback de React

```javascript
import ChildComponent from './ChildComponent'
import {useCallback} from 'react'

const MyComponent = ({ prop }) => {
  const callback = useCallback(() => {
    return 'Result'
  },[])
  return <ChildComponent callback={callback} />;
}

export default MyComponent
```

Ahora la función callback no cambiará cada que se renderice MyComponent, se mantendrá constante. Por lo anterior, el componente memoizado, ChildComponent, recibirá como prop la misma función, siempre, evitando su re-renderización cada que MyComponent cambie.

## Probando el efecto de React memo y useCallback

¿Aún no te queda claro? Checa este ejemplo en un sandbox.

En el siguiente sandbox, observa como el ChildComponent tiene un método console.log que escribe en terminal cada vez que el componente se renderiza. Si escribes en el input notarás que ChildComponent no se está renderizando con cada tecla presionada.

¿Por qué? Primero, estamos usando memo en el ChildComponent para evitar renderizaciones. Segundo, estamos usando useCallback para evitar que la función de MyComponent cambie, por lo que memo recibe siempre el mismo prop.

Ahora prueba lo siguiente en este sandbox:

<iframe src="https://codesandbox.io/embed/sad-almeida-17zgt?autoresize=1&amp;expanddevtools=1&amp;fontsize=14&amp;module=%2Fsrc%2FChildComponent.js&amp;moduleview=1&amp;theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="sad-almeida-17zgt" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

Remueve únicamente la función memo del ChildComponent y escribe en el input. ChildComponent se re-renderizará con cada nueva tecla presionada. Un mensaje nuevo en terminal aparecerá por cada renderización.

```javascript
// ChildComponent.js
export default ChildComponent;
```

{{< figure src="images/eliminandoMemo.gif" class="md-local-image" alt="Eliminar memo del componente hijo causa renderizaciones" >}}

En cambio, si remueves el hook useCallback, sin remover memo, ChildComponent se re-rendizará igualmente con cada tecla presionada. Esto debido a que con cada pulsación, MyComponent se re-renderiza y la función callback se crea nuevamente, al ser una nueva función, memo vuelve a renderizar el componente.

```javascript
// MyComponent.js
const callback = () => {
    return "Texto del componente hijo";
  };
```

Pon atención a la terminal para que aprecies las renderizaciones.

{{< figure src="images/eliminandoUseCallback.gif" class="md-local-image" alt="Eliminar useCallback del componente hijo causa renderizaciones" >}}

Por otro lado, si remueves tanto memo como useCallback, sucederá lo mismo.

{{<ad>}}

## Evitando renderizaciones con useMemo

useMemo también puede ser usado para evitar renderizaciones. ¿Cómo? en la entrada anterior te mencioné que cada vez que un componente se renderiza se crean nuevos objetos, y estos objetos no son iguales, incluso aunque tengan las mismas propiedades, con los mismos valores.

```javascript
const A = {uno: 1, dos:2}
const B = {uno: 1, dos:2}
A===B
// false
```

Mira el siguiente ejemplo, cada vez se re-renderice el componente por efecto de otro componente, o de un cambio en el estado se creará un nuevo objeto *statsDelMonstruo*. Cada  que eso ocurra React preguntará en el interior de useEffect: "¿Es la variable statsDelMonstruo la misma que la vez pasada?" Y la respuesta será "no", porque React crea un nuevo objeto cada vez, incluso aunque este objeto tenga exactamente los mismos valores que su versión anterior, son objetos diferentes.

```javascript
import ChildComponent from './ChildComponent'
import {useCallback} from 'react'

const MyComponent = ({ prop }) => {
  const [hp, setHp] = useValue(100)
  const [mp, setMp] = useValue(100)
  // otro valores de estado

  const statsDelMonstruo = { hp, mp }

  useEffect(()=>{
    console.log(statsDelMonstruo)
  }, [statsDelMonstruo])

  return (
    // Otros componentes
    <RenderizaMonstruo stats={statsDelMonstruo}/>
    );
}

export default MyComponent
```

Para solucionarlo podemos usar useMemo. Nuestra función memoizadora mantendrá el mismo objeto, siempre y cuando los valores dentro de los corchetes no cambien. Ahora, cuando React pregunte: "¿Es la variable *statsDelMonstruo* la misma que la vez pasada?" la respuesta será "sí", es la misma variable, porque mientras las variables en corchetes no cambien, useMemo devolverá el mismo objeto en memoria.

```javascript
import ChildComponent from './ChildComponent'
import {useCallback} from 'react'

const MyComponent = ({ prop }) => {
  const [hp, setHp] = useValue(100)
  const [mp, setMp] = useValue(100)
  // otro valores de estado

  const statsDelMonstruo = useMemo(()=> {
    return { hp, mp }
  }, [hp, mp])

  useEffect(()=>{
    console.log(statsDelMonstruo)
  }, [statsDelMonstruo])

  return (
    // Otros componentes
    <RenderizaMonstruo stats={statsDelMonstruo}/>
    );
}

export default MyComponent
```

Si quieres profundizar más en el tema encontré un excelente [video de youtube](https://www.youtube.com/watch?v=uojLJFt9SzY) donde lo explican bastante bien.