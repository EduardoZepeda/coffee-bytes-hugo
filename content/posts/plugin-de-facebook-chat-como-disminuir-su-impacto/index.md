---
title: "Plugin de facebook chat ¿como disminuir su impacto?"
date: "2021-10-05"
categories: 
  - "javascript"
coverImage: "ReduceElImpactoFb-ChatPlugin.jpg"
keywords:
  - "rendimiento"
  - "javascript"
  - "html"
---

El facebook chat plugin te permite agregar un botón página que se conecta con el chat de una fanpage en facebook. Pero, como ya sabes, facebook es monopólico y la instalación por defecto carga primero el plugin, volviendo tu sitio web más lento y afectando los indicadores de web vitals de las páginas. Hay ciertas maneras de mitigar esto.

## El impacto del plugin de facebook chat

La carga del plugin de facebook desencadena una larga lista de peticiones web que descargan cerca de muchos MB de información y que consumen tiempo valioso que puede impactar la carga de tu página, observa.

![Descargas desencadenadas por el plugin de chat de facebook.](images/CargaArchivosDelFacebookChatPlugin.gif)

95 solicitudes y cerca de 3 mb descargados, 4 segundos.

Los plugin de terceros pueden impactar fuertemente en las métricas y el rendimiento de tus páginas web, tanto en el frontend como el backend.

Si estás usando Django tengo [una entrada donde te explico como mejorar el rendimiento de una aplicación.](https://coffeebytes.dev/como-mejorar-el-rendimiento-de-una-aplicacion-hecha-en-django/)

## Retrasar la carga del plugin

El plugin de facebook requiere dos etiquetas html:

```html
<!-- Messenger plugin de chat Code -->
<div id="fb-root"></div>
<!-- Your plugin de chat code -->
<div id="fb-customer-chat" class="fb-customerchat"></div>
```

Para mitigar el efecto del plugin del facebook chat se pueden realizar varias acciones: podemos retrasar su carga hasta que haya transcurrido cierta cantidad de tiempo, también retrasarlo hasta la interacción de un usuario entre otras cosas. La solución óptima depende de como se comportan tus usuarios y el sitio web que tengas.

Yo voy a retrasar la carga hasta que el usuario interactué con el chat.

Para empezar vamos a colocar un icono falso en lugar del original. Este icono es el mismo que descarga facebook. Dado que es una simple imagen, no carga nada de código JS ni va acompañado de ninguna petición a los servidores de facebook.

Identificaremos este ícono de facebook falso por su id: fb-chat-logo

```html
<div class="position-fixed" id="fb-chat-logo" style="bottom: 20px;right:20px; z-index: 1;"><svg width="60px" height="60px" viewBox="0 0 60 60" cursor="pointer"><svg x="0" y="0" width="60px" height="60px"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><circle fill="#0A7CFF" cx="30" cy="30" r="30"></circle><svg x="10" y="10"><g transform="translate(0.000000, -10.000000)" fill="#FFFFFF"><g id="logo" transform="translate(0.000000, 10.000000)"><path d="M20,0 C31.2666,0 40,8.2528 40,19.4 C40,30.5472 31.2666,38.8 20,38.8 C17.9763,38.8 16.0348,38.5327 14.2106,38.0311 C13.856,37.9335 13.4789,37.9612 13.1424,38.1098 L9.1727,39.8621 C8.1343,40.3205 6.9621,39.5819 6.9273,38.4474 L6.8184,34.8894 C6.805,34.4513 6.6078,34.0414 6.2811,33.7492 C2.3896,30.2691 0,25.2307 0,19.4 C0,8.2528 8.7334,0 20,0 Z M7.99009,25.07344 C7.42629,25.96794 8.52579,26.97594 9.36809,26.33674 L15.67879,21.54734 C16.10569,21.22334 16.69559,21.22164 17.12429,21.54314 L21.79709,25.04774 C23.19919,26.09944 25.20039,25.73014 26.13499,24.24744 L32.00999,14.92654 C32.57369,14.03204 31.47419,13.02404 30.63189,13.66324 L24.32119,18.45264 C23.89429,18.77664 23.30439,18.77834 22.87569,18.45674 L18.20299,14.95224 C16.80079,13.90064 14.79959,14.26984 13.86509,15.75264 L7.99009,25.07344 Z"></path></g></g></svg></g></g></svg></svg></div>
```

Ahora, vamos a obtener y vincular este ícono con los eventos de _mouseover_, _click_, _ontouchstart_ y _ontouchmove_, para que cualquier interacción con el ícono cargue el código de facebook.

```javascript
const fakeFbChatLogo = document.getElementById('fb-chat-logo');

['click','ontouchstart', 'mouseover', 'ontouchmove'].forEach(evt => 
    fakeFbChatLogo.addEventListener(evt, loadFacebookChat, false)
);
```

Y le pasaremos una función llamada _loadFacebookChat_ que crearemos a continuación.

```javascript
function loadFacebookChat() {
      var chatbox = document.getElementById('fb-customer-chat');

      chatbox.setAttribute("page_id", "TU_FACEBOOK_CHAT_ID");
      chatbox.setAttribute("attribution", "biz_inbox");

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/es_LA/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    ['click','ontouchstart', 'mouseover', 'ontouchmove'].forEach(evt => {
    fakeFbChatLogo.removeEventListener(evt, loadFacebookChat, false)
});
      // window needs to be the latest to prevent FB not defined 
      window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v11.0'
        }) ;
        // 
        FB.Event.subscribe('xfbml.render', function(){
          FB.CustomerChat.show(true);
          fakeFbChatLogo.remove();      
        });
      }
}
```

El contenido de la función es el misma que obtienes de [la documentación de facebook](https://www.facebook.com/business/help/1524587524402327) pero con dos pequeños pasos extras.

El primer paso es remover el _eventListener_ que creamos para que no se siga ejecutando una vez que el usuario interaccione con el ícono falso.

```javascript
['click','ontouchstart', 'mouseover', 'ontouchmove'].forEach(evt => {
    fakeFbChatLogo.removeEventListener(evt, loadFacebookChat, false)
});
```

El segundo paso es una suscripción al evento _xfbml.render_, método que se ejecutará cuando nuestro chat se renderice. Es opcional abrir el chat al instante para que el usuario vea interacción, yo lo he he hecho así. Y, como paso final, eliminamos nuestro ícono falso, para que no se muestre junto con el original.

```javascript
FB.Event.subscribe('xfbml.render', function(){
          FB.CustomerChat.show(true); //opcional
          fakeFbChatLogo.remove();      
        });
      }
```

Con los pasos anteriores estamos retrasando la carga del contenido hasta que el usuario interaccione con el. De esta manera la carga del plugin se retrasa hasta que el usuario quiera usarlo, evitando el impacto en la carga inicial.

![Carga retrasada del plugin de facebook](images/CargaRetardadaDelFacebookChatPlugin.gif)

El script del plugin no se activa hasta que interaccionemos con el icono

Mira como el fb parece cargar de manera normal y hay un pequeño cambio de ícono, la animación o detalles extra puedes personalizarlos a tu gusto con CSS y sus animaciones.
