---
title: "No uses JWT para gestionar sesiones (Traducción)"
date: "2021-06-22"
categories: 
  - "arquitectura-de-software"
  - "opiniones"
coverImage: "NoUsesJWT.jpg"
---

En la entrada anterior publiqué una [entrada sobre como llevar a cabo autenticación usando JWT y Django Rest Framework](https://coffeebytes.dev/django-rest-framework-y-jwt-para-autenticar-usuarios/), debido a que es un mecanismo de manejo de sesiones bastante popular últimamente, incluso algunos lo consideran un reemplazo de las cookies de sesión. En mi publicación mencioné que hay un debate muy intenso sobre si usar JWT para manejar sesiones es una buena práctica, para complementar lo anterior decidí traducir uno de los artículos más populares que aboga en contra del uso de JWT para manejar sesiones. El autor es Sven Slootweg (joepie91) y el artículo fue publicado en [su blog](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/). Yo solamente lo traduje al español y lo comparto aquí. A partir del siguiente párrafo empieza la traducción del artículo, que lo disfrutes.

## Stop using JWT for sessions (en español)

Desafortunadamente, últimamente he visto a más y más personas recomendar el uso de JWT ([JSON Web tokens](https://es.wikipedia.org/wiki/JSON_Web_Token)) para gestionar las sesiones de usuarios en sus aplicaciones web. Esta es una terrible, terrible idea, y en este post, voy a explicar porque.

Para prevenir cualquier confusión, definiré unos cuantos términos primero:

- **JWT Stateless:** Un JWT token que contiene la información de la sesión, almacenada directamente en el token.
- **JWT Stateful:** Un JWT token que contiene solo una referencia o ID de la sesión. La información de la sesión es almacenada del lado del servidor.
- **Token de sesión/cookie:** Un ID de sesión estándar (opcionalmente firmado), como los que los web frameworks han estado usando por un largo tiempo. La información de la sesión es almacenada del lado del servidor.

Para ser claro: este artículo no argumenta que nunca deberías usar JWT - solo que no es tan adecuado como un mecanismo de sesiones y que es peligroso usarlo de esa manera. Casos de uso válidos existen, en otras áreas. Al final de este artículo, hablaré brevemente de aquellos otros casos de uso.

## Una nota por adelantado

Muchas personas intentan comparar "cookies vs JWT". Esta comparación no tiene sentido, y es comparar manzanas con naranjas -las cookies son un mecanismo de almacenamiento, mientras que las JWT tokens son tokens firmadas criptográficamente.

No son opuestos - sino que pueden ser usadas ya sea de manera conjunta o independiente. La comparación correcta es "sesiones vs JWT" y "cookies vs Local Storage".

En este artículo en particular, estaré comparando las sesiones a los JWT tokens, y ocasionalmente "cookies vs Local Storage" también, donde tenga sentido hacerlo.

## Ventajas atribuidas de las JWT

Cuando las personas recomiendan las JWT, usualmente les atribuyen uno o más de los siguientes beneficios:

- Sencillas de escalar (horizontalmente)
- Sencillas de usar
- Más flexibles
- Más seguras
- Funcionalidad de expiración incluida
- No requiere pedirle al usuario consentimiento para usar cookies
- Previene CSRF
- Funcionan mejor en móviles
- Funcionan para usuarios que bloquean las cookies

Trataré cada una de estas afirmaciones - y porque están equivocadas o inducen al error - individualmente. Algunas de las explicaciones que encontrarás más abajo pueden ser un poco vagas; eso es principalmente porque las afirmaciones, por si mismas, son vagas. Lo actualizaré encantado para tratar afirmaciones más específicas; puedes encontrar mi información de contacto al fondo de este artículo.

### Sencillas de escalar (horizontalmente)

Esta es la única afirmación en la lista que es en cierto modo verdadera, pero solo si estás usando stateless JWT tokens. La realidad, sin embargo, es que casi nadie necesita este tipo de escalabilidad - hay maneras más fáciles de escalar, y a menos que estés operando al tamaño de Reddit, no necesitarás "sesiones stateless".

Algunos ejemplos de escalamiento de sesiones stateful:

1. Una vez que corres múltiples procesos en backend en un servidor: Un daemon de Redis (en ese servidor) para el almacenamiento de sesiones.
2. Cuando corres múltiples servidores: Un servidor dedicado corriendo Redis solo para el almacenamiento de sesiones
3. Una vez que corres en múltiples servidores, en múltiples clusters: sesiones persistentes.

Estos son escenarios que están cubiertos por software existente. Es poco probable que tu aplicación vaya más allá del segundo paso.

Quizás estás pensando que deberías "preparar tu aplicación para el futuro", en caso de que alguna vez escales más allá de eso. En la práctica, sin embargo, es bastante trivial reemplazar el mecanismo de sesiones en un punto posterior, con el único costo de terminar la sesión de cada usuario una vez, cuando hagas la transición. No vale la pena implementar JWT previamente, especialmente considerando las desventajas que trataré más adelante.

### Sencillas de usar

Realmente no lo son. Tendrás que lidiar con el manejo de sesiones por ti mismo, en ambos, del lado del cliente y del servidor, mientras que las cookies estándar de sesiones funcionan, de manera predeterminada. JWT no es más fácil en ninguna manera.

### Más flexibles

Sigo esperando a que alguien explique como JWT es más flexible. Casi todas las implementaciones de sesiones te permiten almacenar información arbitraria para la sesión, y no es diferente a como funciona JWT. Por lo que a mi me consta, esta es solo una palabra pegadiza. Si estás en desacuerdo, siéntete libre de contactarme con ejemplos.

### Más seguras

Muchas personas piensan que las JWT tokens son "más seguras" porque usan criptografía. Si bien las cookies firmadas son más seguras que las cookies no firmadas, esto no es, de ninguna manera, exclusivo de JWT, además las buenas implementaciones de manejo de sesiones usan cookies firmadas también.

"Usar criptografía" no vuelve a algo más seguro mágicamente tampoco; debe servir a un propósito específico, y puede ser una solución efectiva para ese propósito específico. La criptografía usada de manera incorrecta puede, de hecho, hacer algo menos seguro.

Otra explicación del argumento de "más seguro" que escucho mucho, es que (las JWT) "no son enviadas como una cookie". Esto no tiene absoluto sentido -una cookie es solo una cabecera HTTP, y no hay nada inseguro al usar cookies. De hecho, las cookies están especialmente bien protegidas contra código malicioso del lado del servidor, algo que trataré más adelante.

Si estás preocupado porque alguien intercepte tu cookie de sesión, deberías estar usando [TLS](https://es.wikipedia.org/wiki/Seguridad_de_la_capa_de_transporte) en su lugar - cualquier tipo de implementación de sesiones será interceptable si no usas TLS, incluyendo JWT.

### Funcionalidad de expiración incluida

Este es un sinsentido, y no una característica útil. La expiración puede ser implementada del lado del servidor también, y muchas implementaciones lo hacen. La expiración del lado del servidor es preferible, de hecho, permite a tu aplicación limpiar la información de sesión que ya no se necesita, algo que no puedes hacer si usas stateful JWT tokens y confías en su mecanismo de expiración.

### No requiere pedirle al usuario consentimiento para usar cookies

Completamente mal. No hay tal cosa como una "ley de cookies" - Las variadas leyes que involucran a las cookies cubren cualquier tipo de identificador persistente que no sea estrictamente necesario para el funcionamiento del servicio. Cualquier mecanismo de sesión que puedas pensar estará cubierto por esto.

En resumen:

- Si estás usando una sesión o token para propósitos funcionales (ej. mantener a un usuario loggeado), entonces no necesitas pedir el consentimiento del usuario, sin importar como almacenes la sesión.
- Si estás usando una sesión o token para otros propósitos (ej. analíticas o rastreo), entonces necesitas pedir el consentimiento, sin importar como almacenes la sesión.

### Previene CSRF

No lo hace realmente. Hay dos maneras de almacenar una JWT:

- **En una cookie:** Ahora eres vulnerable a ataques CSRF, y necesitas protección contra ellos.
- **En cualquier otro lugar, ej. Local Storage:** Ahora no eres vulnerable a los ataques CSRF, pero tu aplicación o sitio ahora requieren Javascript para funcionar, y te has vuelto vulnerable a otros, potencialmente peores y completamente diferentes, tipos de vulnerabilidades. Más sobre esto abajo.

La única correcta mitigación de los ataques CSRF es un CSRF token. El mecanismo de sesiones no es relevante aquí

### Funcionan mejor en móviles

Tonterías. Cada navegador de móvil en uso soporta cookies, y por lo tanto sesiones. Lo mismo ocurre para cada framework de desarrollo, y cualquier librería seria de HTTP. Este no es un problema.

### Funciona para usuarios que bloquean las cookies.

Poco probable. Los usuarios no solo bloquean las cookies, ellos típicamente bloquean todo medio de persistencia. Lo cual incluye Local Storage, y cualquier otro mecanismo de almacenamiento que permitiría la persistencia de una sesión (con o sin usar JWT). Que uses JWT simplemente no importa aquí, es un problema completamente ajeno - e intentar lograr que una autenticación funcione sin cookies es una causa perdida.

Además de lo anterior, los usuarios que bloquean todas las cookies típicamente entienden que esto romperá la funcionalidad de autenticación para ellos, e individualmente desbloquean las cookies para sitios que les importan. Simplemente no es un problema que tú, como desarrollador web, necesites solucionar; una mejor solución es explicarle a tus usuarios porque tu sitio requiere cookies para funcionar.

## Las desventajas

Ahora que he cubierto todas las afirmaciones falsas y porque están equivocadas, puedes pensar "oh, eso no es un problema, aún no importa que yo use JWT incluso si no me ayuda", y estarías equivocado. Hay algunas desventajas al usar JWT como un mecanismo de sesiones, muchas de ellas son problemas serios de seguridad.

### Usan más espacio

Las JWT tokens no son exactamente pequeñas. Especialmente cuando usas stateless JWT tokens, donde toda la información está codificada directamente en el token, rápidamente excederás el tamaño límite de una cookie o URL. Puedes decidir almacenarlas en el Local Storage en su lugar - sin embargo...

### Son menos seguras

Cuando almacenas tu JWT en una cookie, no es diferente de cualquier otro identificador de sesión. Pero cuando estás almacenando tus JWT en cualquier otro lado, ahora eres vulnerable a una nueva clase de ataques, descritas en [este artículo](http://blog.prevoty.com/does-jwt-put-your-web-app-at-risk) (específicamente, en la sección de "almacenando sesiones"):

> Empezamos donde nos quedamos: de vuelta en el local storage, una adición sorprendente de HTML5 que añade un almacenamiento de llave/valor a los navegadores y cookies. Así que, ¿deberíamos almacenar las JWTs en el local storage? Puede tener sentido dado el tamaño que estos tokens pueden alcanzar. Las cookies tipicamente llegan a su límite en algún punto alrededor de los 4 Kb de almacenamiento. Para un token de gran tamaño, una cookie está fuera de consideración y el local storage sería la solución obvia. Sin embargo, el local storage no provee ninguno de los mismos mecanismos de seguridad que las cookies poseen.
> 
> El Local Storage, a diferencia de las cookies, no manda los contenidos de tu contenido almacenado en cada petición. La única manera de obtener la información del Local Storage es usando Javascript, lo que significa que cualquier Javascript del atacante que pase la política de seguridad de contenido puede accesarr y filtrarlo. No solo eso, sino que a Javascript no le interesa o lleva un seguimiento de que la información se envíe por HTTPS o no. Hasta donde Javascript sabe, es solo información y el navegador operará sobre ella como lo haría con cualquier otra información
> 
> Después de todos los problemas que aquellos ingenieros pasaron para asegurarse de que nadie se hiciera con nuestro frasco de galletas (cookies), henos aquí intentando ignorar todos los trucos sofisticados que nos dieron. Lo anterior me parece un pequeño retroceso.
> 
> http://blog.prevoty.com/does-jwt-put-your-web-app-at-risk

Para ponerlo de manera simple, **usar cookies no es opcional**, sin importar que uses JWT o no.

### No puedes invalidar JWT tokens individuales

Y hay más problemas de seguridad. A diferencia de las sesiones - las cuales pueden ser invalidadas por el servidor cuando se requiera - los stateless JWT tokens individuales no pueden ser invalidadas. Por diseño, serán válidos hasta que expiren, no importa lo que pase. Lo que significa que no puedes, por ejemplo, invalidar la sesión de un atacante después de detectar un fallo de seguridad. Tampoco puedes invalidar viejas sesiones cuando el usuario cambia su contraseña.

No tienes poder alguno, y no puedes "matar" una sesión sin construir una infraestructura (que debe ser stateful) para detectarla y rechazarla explícitamente, anulando por completo el objetivo entero de usar stateless JWT tokens.

### La información se vuelve obsoleta

Relacionado con el problema anterior, y considerado otro problema potencial de seguridad. Justo como en la cache, la información en un stateless token eventualmente se "volverá obsoleta", y no reflejará la última información de la información en tu base de datos.

Esto puede significar que un token contiene alguna información desactualizada como una vieja URL que alguien cambió en su perfil - pero de una manera más seria, también puede significar que alguien posee un token con el rol de administrador, incluso a pesar de que revocaste su rol como administrador. Debido a que tampoco puedes invalidar tokens, no hay manera de que remuevas su acceso de administrador, a menos de que apagues el sistema entero.

### Las implementaciones están menos probadas o son inexistentes

Puedes pensar que todos estos problemas ocurren solo con stateless JWT tokens, y estarías en lo correcto. Sin embargo, usar un stateful token es básicamente equivalente a una cookie de sesión regular, pero sin las implementaciones probadas.

Las implementaciones de sesiones existentes (ej, [express-session](https://github.com/expressjs/session) en Express) han estado ejecutándose en producción por muchos, muchos años, y su seguridad ha sido mejorada debido a eso. No obtienes aquellos beneficios usando JWT tokens como cookies de sesión improvisadas - tendrás que correr tu propia implementación (y muy probablemente introducir vulnerabilidades en el proceso), o usar una implementación de terceros que no ha visto mucho uso en el mundo real.

## Conclusión

Las stateless JWT tokens no pueden ser invalidados o actualizados, e introducirán problemas de tamaño o de seguridad dependiendo de donde las almacenes. Las stateful JWT tokens son funcionalmente iguales a las cookies de sesión, pero sin la puesta a prueba e implementaciones bien revisadas o soporte de clientes.

A menos de que trabajes en una aplicación en la escala de Reddit, no hay razón para usar JWT tokens como un mecanismo de sesiones. _Usa solo sesiones._

### Entonces... ¿para que son buenas las JWT?

Al principio de este artículo, te dije que había buenos casos de uso para las JWT, pero no eran adecuados como un mecanismo de sesiones. Esto es verdad; los casos de uso donde las JWT son particularmente efectivas son típicamente los casos de uso donde son usadas como un token de autorización de único uso.

De la especificación de los [JSON Web Token](https://tools.ietf.org/html/rfc7519):

> Los JSON Web Token (JWT) son un una manera compacta, y a prueba de url de representar una petición que se intercambia entre dos partes \[...\] permitiendo que las peticiones estén firmadas digitalmente o su integridad protegida con un Código de autenticación de mensajes (MAC) y/o cifradas.
> 
> https://tools.ietf.org/html/rfc7519

En este contexto, "petición" puede ser algo como una "solicitud", o una autorización única, o básicamente cualquier otro escenario que puedas nombrar como:

> Hola servidor B, el servidor A me dijo que puedo <petición va aquí>, y aquí está la firma (criptográfica) como prueba.

Por ejemplo, puedes estar corriendo un servicio de hosting de archivos donde el usuario tiene que autenticarse para descargar sus archivos, pero los archivos están siendo servidos por un servidor de descargas stateless externo. En este caso, puede que quieras que el servidor de tu aplicación (Servidor A) emita un "token de descarga" de uso único, que el cliente puede usar para descargar el archivo del servidor de descargas (Servidor B).

Cuando usas JWT de esta manera, hay algunas propiedades específicas

- **Los tokens son de vida corta**. Solo necesitan ser validos por unos minutos, para permitir al cliente iniciar su descarga.
- **Se espera que el token solo se use una vez**. El servidor de la aplicación emitiria un nuevo token para cada descarga, de manera que cada token individual sea usado para solicitar un archivo a la vez, y entonces descartado. No hay un estado persistente.
- **El servidor de la aplicación aún usa sesiones.** Es únicamente el servidor de descargas el que usa tokens para autorizar las descargas individuales, porque no necesita un estado persistente.

Como puedes ver aquí, es completamente razonable combinar sesiones y JWT tokens - cada uno tiene su propio propósito, y algunas veces necesitas ambos. Solo no uses JWT para información persistente de larga duración.

El artículo original está licenciado usando la licencia [WTFPL](http://cryto.net/~joepie91/blog/LICENSE.txt) puedes distribuirlo, usarlo, modificarlo, traducirlo y licenciarlo en cualquier manera.
