---
authors:
- Eduardo Zepeda
categories:
- artificial intelligence
- javascript
coverImage: images/mcp-server-and-mcp-tools.jpg
date: '2025-07-23T18:00:32-06:00'
description: Aprende a crear un servidor MCP y MCP tools con un ejemplo que cuenta las r's en strawberry, a conectarlo a un LLM y a utilizar el inspector oficial de MCP.
keyword: mcp server
keywords:
- artificial intelligence
- mcp
- llm
- fine tuning
- ai
- claude
- agents
- javascript
- typescript
slug: /artificial-intelligence/como-crear-un-mcp-server-y-mcp-tools-desde-cero/
title: ¿Cómo crear un MCP server y MCP tools desde cero?
---

## ¿Para que querríamos crear un servidor MCP?

Crear un servidor MCP nos permite conectar un LLM o AI con datos en tiempo real, datos personales, u otra fuente de datos. 

Anteriormente escribí un post donde explico [como funciona internamente el Model Context Protocol (MCP)]({{< ref path="/posts/artificial-intelligence/mi-explicacion-del-context-model-protocol-o-cmp/index.md" lang="es" >}}), puedes consultarlo si no te conformas con la receta y quieres saber más.

En este post voy a detallar como crear un servidor MCP. Vamos a crear uno que solucione [uno de los errores más vergonzosos de los LLM; el no saber contar la cantidad de r's](https://community.openai.com/t/incorrect-count-of-r-characters-in-the-word-strawberry/829618#?) en variaciones de la palabra strawberry. Por ejemplo: strawberrrry o strawberrrrrrry. 

Si no eres un bot, ya sabrás que, para un humano, contar letras es una tarea bastante trivial. 

Por otro lado, para un LLM es casi imposible debido a la manera en la que funciona, a base de Tokens. Las [AI son capaces de crear arte y código]({{< ref path="/posts/artificial-intelligence/la-ai-se-percibe-de-manera-diferente-entre-artistas-y-devs/index.md" lang="es" >}}), a pesar de [no ser entes conscientes]({{< ref path="/posts/artificial-intelligence/chat-gpt-y-la-habitacion-china-de-searle/index.md" lang="es" >}}), pero no pueden contar letras, ¿contradictorio no?

Por ahora lo convertiremos en un ejercicio didáctico para desplegar un MCP server.

## Requisitos para crear un MCP server en Javascript

Partimos de una instalación de Node, ya sabes, el resultado de ejecutar: *npm init -y*, creamos el archivo con [el comando de linux touch]({{< ref path="/posts/linux/comandos-de-gnu-linux-que-deberias-conocer/index.md" lang="es" >}})

``` bash
.
├── index.js
├── package.json
└── package-lock.json
```

### Establecer package.json como module

Dentro del archivo *package.json* cambiamos o creamos la propiedad *type* y le asignamos el valor *module*, para que npm la trate como un modulo.

``` javascript
"type": "module"
```

### Instalar la librería

Un servidor requiere el [SDK oficial de Javascript/Typescript](https://github.com/modelcontextprotocol/typescript-sdk#?), basta con instalarlo con npm.
También necesitamos *zod* que, ~~si tienes la mala fortuna de usar Javascript~~, se usa para validar datos.

``` typescript
// 1.16.0
npm install @modelcontextprotocol/sdk@1.16.0 zod@3.25.76
```

## Crear un servidor MCP

{{<ad0>}}

Maneja la comunicacion entre cliente y servidor

``` javascript
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js"

const server = new McpServer({
    name: 'Strawberry Count',
    version: '1.0.0'
})
```

## Crear MCP tools en un servidor MCP

A continuación vamos a definir las herramientas o mcp tools, que nos permitirán recibir un parámetro del LLM, para que podamos hacer con él lo que querramos, en este caso contar sus r's. Te hablé de las mcp tools en mi introducción al Model Context Protocol.

``` javascript
// server.tool("<Name>", "<Description>", {
server.tool("Strawberry Count", "Count the number of r's present in an strawberry variant", {
    param: z.string().describe("The strawberry variant")
},
    // callback 
    // La IA detectará el param automáticamente del input del usuario
    async ({ param }) => {
        return {
            content: [
                {
                    type: 'text',
                    text: `The word has: ${param.toLowerCase().split("").filter(letter => letter == "r").length} r's`
                }
            ]
        }
    }
)
```

Por favor nota que estamos contando las r's manualmente, no hay ningún truco, procesamos el string que recibimos y devolvemos la cantidad de r's.

{{<ad1>}}

Además, quiero destacar lo asombrosa que es la magia oscura que usa el LLM para obtener nuestro parámetro. Nuestro LLM detecta el parámetro que queremos recibir como parámetro de entrada directamente del usuario. ¿Cómo? utilizando como contexto la información de descripción que le pasamos al método *describe*.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1753317103/are-you-a-wizard_hlrgoi.webp" class="md-local-image" alt="MCP meme" >}}

Obviamente tú mcp tool no hará algo tan inútil como contar r's, puedes obtener datos de una API, procesarlos, obtener información del sistema de archivos, o inclusive de otro LLM, lo que sea.

## ¿De donde obtiene el contexto el LLM?

{{<ad2>}}

Para este ejemplo usaremos el STDIO (Standard Input Output), que es básicamente la entrada de texto del usuario. 

Pero recuerda que en mi introducción al MCP te hablé de otras alternativas: SSE y el HTTP Stream.

``` javascript
const transport = new StdioServerTransport()
```

## Ejecutar el servidor MCP para que lea del STDIO

Ahora vamos a conectar esta conexión con el servidor MCP, para que pueda tomar información directamente del STDIO.

``` javascript
await server.connect(transport)
```

{{<ad3>}}

### Conexión del MCP con otras aplicaciones

Podemos conectar el servidor MCP con cualquier programa que soporte el MCP para poder utilizarlo.

Por ejemplo para Claude Desktop tendriamos que llenar el archivo *claude_desktop_config.json*.

Observa como estamos declarando que el servidor MCP debe ejecutarse con el comando npx y a continuación la lista de argumentos en orden.

``` javascript
{
    "mcpservers": {
        "name": {
            "commando": "npx",
                "args": [
                    "-y",
                    "node",
                    "<full_path_to_js_file>"
                ]
        }
    }
}
```

Si quisieras utilizar typescript en lugar de javascript podrías hacer algo como esto.

``` javascript
{
    "mcpservers": {
        "name": {
            "commando": "npx",
                "args": [
                    "-y",
                    "tsx",
                    "<full_path_to_ts_file>"
                ]
        }
    }
}
```

## Analizando el MCP server con el inspector

¿Cómo nos aseguramos de que nuestro servidor MCP funcione bien? Inspector de Claude permite testear y depurar los servidores MCP, podemos ver las tools que hemos creado, y emular su funcionamiento, sin embargo estas no utilizan el LLM, es un servidor plano que funciona como si nosotros fueramos el LLM.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1753313069/coffee-bytes/mcp-inspector-gui.jpg_oyzri4.webp" class="md-local-image" alt="MCP Inspector GUI" >}}

Para ejecutarlo podemos usar *npx* y le pasamos el comando que

``` javascript
npx -y @modelcontextprotocol/inspector <mcp_server_command>
```

Yo no fui capaz de ejecutar el comando reemplazando el comando. Lo intenté con el comando con el directorio relativo y también con el absoluto pero no podía conectarme al servidor, desconozco el porque. 

Sin embargo, sí funcionó llenando los datos manualmente en la interfaz gráfica del inspector.

Tras ejecutar el inspector tendremos un servidor corriendo en el puerto 6274 (por defecto, pero puede cambiarse). 

``` javascript
npx -y @modelcontextprotocol/inspector npm index.js
npx -y @modelcontextprotocol/inspector npm /home/dir/mcp-server/index.js
```

A continuación llenamos el *transport type* y los comandos, en caso de que hayas tenido el mismo problema que yo.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1753313069/coffee-bytes/mcp-inspector-panel.jpg_k2td1x.webp" class="md-local-image" alt="MCP Inspector panel" >}}

Si le damos click en donde dice "list tools" detectará la tool que acabamos de crear.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1753313069/coffee-bytes/mcp-inspector-tools-panel.jpg_fhvq4v.webp" class="md-local-image" alt="MCP Inspector tools panel" >}}

Al darle click a la tool se actviará y podremos pasarle nuestro parámetro: una variante de *strawberry* con el número de r's que nosotros querramos. 

Solo recuerda que este parámetro sería el que recibiríamos directamente de nuestro LLM, es él quien se encargaría de devolverlo de acuerdo a que tan bien lea el input del usuario, así que no intentes complicar las cosas con un input complejo, solo variantes de *strawberry*.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1753313069/coffee-bytes/mcp-strawberry-count-result.jpg_pnon99.webp" class="md-local-image" alt="MCP Inspector input" >}}

Como puedes ver, el código funciona, el MCP server devuelve nuestro mensaje, en un entorno real este sería recibido por el LLM y le informaría al usuario el número correcto de r's que tiene su variante de *strawberry*, sin hacer el ridículo como normalmente haría.