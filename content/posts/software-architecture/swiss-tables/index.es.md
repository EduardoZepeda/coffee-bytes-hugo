---
date: '2025-09-21'
title: 'Swiss Tables el hashmap con rendimiento superior'
categories:
- software architecture
- databases
coverImage: "images/swiss-tables-programming.jpg"
description: 'Te explico las Swiss Tables, porqué son tan rápidas, metadata SIMD, hashes y hasta puedes probar un simulador interactivo en tiempo real para aprender mejor'
keyword: 'swiss tables'
keywords:
- ''
authors:
- 'Eduardo Zepeda'
slug: /software-architecture/swiss-tables-el-hashmap-con-rendimiento-superior/
---

## El Hash Map Recibió una Actualización Tipo "Navaja Suiza"

Seguramente ya has usado **hashmaps** antes, pero el asunto aquí es que los usas y te olvidas de sus entrañas. Limitas tu conocimiento de los hashmaps a obtener y asignar llaves, tal vez iterar sobre ellos, y ya.

```javascript
hashmap.get("key")
hashmap.set("key", value)
// o
hashmap["key"] = value
```

{{<ad0>}}

Cada lenguaje que vale la pena aprender tiene su propia implementación, ya sabes, la forma en que funciona "bajo el cofre". Y la mayoría de los devs ni se preocupa por eso, lo cual está bien, yo apoyo las abstracciones de alto nivel.

El punto es que, recientemente, [Go decidió cambiar su implementación por defecto de hashmap de Buckets a Swiss tables]({{< ref path="/posts/go/go-maps-o-diccionarios/index.md" lang="es" >}}) buscando un mejor rendimiento ~~tratando de imitar el performance de Rust~~. Y esto ya [ha rendido frutos para algunas empresas ahorrándoles cientos de gigabytes](https://www.datadoghq.com/blog/engineering/go-swiss-tables/#?).

Por cierto, fue Google quien creó las Swiss tables (bueno, uno de sus ingenieros), y también [protobuffers y GRPC]({{< ref path="/posts/software-architecture/que-es-grpc-y-para-que-sirven-los-protobuffers/index.md" lang="es" >}}). Siempre están mejorando el rendimiento de lo que ya existe.

## Entonces, ¿Cuál es la Gran Idea Detrás de las Swiss Tables? Todo Está en la Metadata.

Los hash maps tradicionales con **open-addressing** guardan tus pares llave-valor en un gran arreglo. Cuando insertas un elemento, se hace un hash de la llave para encontrar su "asiento" en el arreglo. Si ese lugar ya está ocupado, vas buscando el siguiente espacio disponible, y así sucesivamente.

| Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 | Slot 6 | slot 7 | slot 8 | slot 9 | slot n |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| →      | →      | →      | →      | ↓      |        |        |        |        |        |
| 1      | 1      | 1      | 1      | Libre  |        |        |        |        |        |

¿Y esto qué tiene de malo? En realidad, nada, salvo que en ciertos escenarios puede volverse un desastre. Para encontrar un elemento, o confirmar que *no* está, quizá tengas que recorrer medio arreglo. Eso es lento.

| Slot 1 | Slot 2 | Slot 3 | Slot 4 | Slot 5 | Slot 6 | slot 7 | slot 8 | slot 9 | slot n |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| 1      | 1      | 1      | 1      | 1      | 1      | 1      | 1      | Libre  |        |

Las Swiss Tables atacan este problema engorroso con una idea brillante: un arreglo separado de **metadata**. Por cada espacio en el arreglo principal de datos, hay un byte correspondiente en el arreglo de metadata.

{{<ad1>}}

Este byte no es solo una "tombstone" o un flag de vacío; es un conjunto comprimido de información útil. La parte más crucial son los **7 bits del hash de la llave** almacenados en ese slot.

| Meaning Control bit | Control bit | Bit 1 | Bit 2 | Bit 3 | Bit 4 | Bit 5 | Bit 6 | Bit 7 |
| ------------------- | ----------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Vacío               | 1           | 0     | 0     | 0     | 0     | 0     | 0     | 0     |
| Lleno               | 0           | 0x3A  |       |       |       |       |       |       |
| Borrado             | 1           | 1     | 1     | 1     | 1     | 1     | 1     | 0     |

Esto cambia las reglas del juego. ¿Por qué? Porque para verificar si un slot podría contener tu llave, no necesitas tocar para nada el arreglo principal de datos. Primero puedes revisar la metadata. Esto es una ganancia enorme para el rendimiento.

{{<swissTables>}}

## Un Recorrido Paso a Paso por la Estructura de Datos de las Swiss Tables

Bien, ya hablamos de la "magia esotérica" de la metadata. Pero, ¿cómo funciona paso a paso cuando insertas *my\_app["value"] = value* y cuando preguntas por *my\_map["apple"]*?

### Insertando una llave y su valor en una Swiss Table

Cuando buscas una llave, el proceso general va así:

1. Se hace hash de la llave.
2. Se decide el grupo o bucket usando h1.
3. Se localiza el slot o bloque destino usando h2.
4. Si el slot ya contiene nuestra llave, simplemente se actualiza.
5. Si ningún slot contiene nuestra llave, se busca uno vacío.
6. Si todos los slots están ocupados, saltas al siguiente grupo.

#### Hashear la llave

Primero, la llave "apple" pasa por una función hash robusta. Esto produce un hash completo de 64 bits. Digamos que es algo como 0x5A3F9C42B1D08E3A (un número hermoso y aleatorio). Ahora, las Swiss Tables hacen un truco elegante: dividen este hash en dos partes:

* 57 bits (llamado h1)
* 7 bits (llamado h2)

| H1       | ... | H1       | H2   |
| -------- | --- | -------- | ---- |
| 10101110 | ... | 11100010 | 0x3A |

#### Decidir el grupo inicial usando h1

Los primeros 57 bits (0x5A3F9C42B1D08E...): Esta parte del hash determina a qué grupo inicial o "bucket" pertenece la llave.

```bash
0x5A3F9C42B1D08E % 2
```

#### Localizar el bloque destino

Los últimos 7 bits bajos (0x3A): Este es el "probe index". Le dice al mapa en cuál de los 8 o 16 slots (o "bloques") empezar a buscar.

{{<ad2>}}

### Recuperar el valor de una llave

Cuando buscas una llave, el proceso general va así:

1. Se hace hash de la llave.
2. Se decide el grupo o bucket usando h1.
3. Se localiza el slot o bloque destino usando h2.
4. La CPU toma los 7 bits (h2) del hash de nuestra llave y los carga en un registro especial.
5. Luego compara este único valor contra **todos los 8 o 16 bytes de metadata** del bloque destino—**al mismo tiempo**. Esto se hace usando instrucciones SIMD (Single Instruction, Multiple Data), básicamente paralelismo.

Ahora te explico los pasos.

#### Encontrar el bloque usando el hash de 7 bits

El mapa toma los 7 bits (h2) del "probe index" (0x3A) y los usa para ubicar el bloque específico de 16 slots donde debería estar "apple". Este cálculo es increíblemente rápido.

#### Usar SIMD para comparar los slots

Este es el paso SIMD que nos encanta. La CPU carga los 16 bytes de metadata de ese bloque. Para cada byte, revisa dos cosas:

¿El slot está ocupado? (Un bit especial en el byte de metadata lo indica).

¿El fingerprint de 7 bits (h2) en la metadata coincide con nuestro fingerprint (0x3A)?

Hace esto para los 16 slots A LA VEZ. Y aquí es donde sucede la magia, te lo explico enseguida. El resultado es un **bitmask** de posibles candidatos.

{{<ad3>}}

#### Manejar colisiones si existen

**Un fingerprint de 7 bits coincidente no significa que las llaves sean iguales**; solo significa que *podrían* serlo. Es un pre-filtro. Está diseñado para ser rápido, no perfecto. El hash completo de 57 bits (h1) (y eventualmente la comparación real de la llave) es el árbitro final.

Si hay coincidencias (por ejemplo, los slots 2 y 9 tienen el mismo fingerprint de 7 bits (h2) y están ocupados, o sea, ocurrió una colisión), el mapa finalmente va al arreglo principal de datos. Pero ya no está adivinando. Va directo a los slots 2 y 9 y realiza la comparación completa: stored\_key == "apple"? Esta es la única operación costosa, y la has reducido a una o dos verificaciones. Con suerte no tendrás más de dos colisiones.

#### Recuperar el valor de la llave

Finalmente, si la llave coincide completamente, se devuelve el valor. Si no, o si el paso SIMD no encontró candidatos, **puede afirmar con confianza que la llave no está en el mapa**. Esta última parte—la búsqueda negativa—es donde las Swiss Tables aplastan a los mapas tradicionales que tienen que recorrer largas secuencias de búsqueda.

## ¿Por Qué son Tan Rápidas las Swiss Tables? SIMD y el Bloque de 16 Slots

Aquí es donde entra el verdadero genio. Las CPUs modernas no necesitan revisar las cosas byte por byte. Son sorprendentemente buenas haciendo operaciones en paralelo. Las Swiss Tables están diseñadas para aprovechar esto agrupando slots en bloques (normalmente de 16).

En una sola operación ~~súper rápida~~, la CPU crea un bitmask. Un *1* significa "el fragmento del hash coincide", un *0* significa que no. Solo *después*, para los slots que podrían coincidir, el código realmente va al arreglo principal de datos para hacer la comparación completa de la llave.

Esta es la característica estrella de las Swiss Tables. Minimiza los costosos accesos a memoria y aprovecha la capacidad de procesamiento paralelo de la CPU.

Hace que las búsquedas, especialmente de llaves inexistentes, sean rapidísimas. No estás recorriendo una cadena ni una larga secuencia de probes. Lo que, como sabes, impacta el [rendimiento en notación Big O]({{< ref path="/posts/linux/la-notacion-big-o/index.md" lang="es" >}})

## ¿Por Qué Deberías Preocuparte? Las Ventajas de las Swiss Tables

Esta arquitectura no es solo un ejercicio académico aburrido. Se traduce en beneficios reales y tangibles que los devs más ñoños verán reflejados en sus aplicaciones ~~transformando un 0.0004s en un 0.00002s de ejecución~~. Según la página oficial de Go, [el rendimiento aumentó alrededor de un 63% comparado](https://go.dev/blog/swisstable#?) con la implementación de Buckets.

**1. Búsquedas Rapidísimas:** La combinación del filtro de metadata y SIMD hace que las operaciones *find()* y *contains()* sean significativamente más rápidas que en la mayoría de los mapas tradicionales. No es un margen pequeño; estamos hablando de múltiplos en muchos benchmarks.

**2. Uso de Memoria Súper Eficiente:** Las Swiss Tables suelen implementarse como estructuras "planas". Esto significa que guardan llaves y valores directamente en el arreglo, no como nodos separados asignados en memoria. Esto mejora muchísimo la **localidad de caché**—los datos que necesitas probablemente ya están en la caché rápida del CPU (ya sabes: L1, L2, L3)—y evita la sobrecarga de memoria de los punteros usados en implementaciones encadenadas. Esto las hace superiores en uso de memoria frente a otras implementaciones de hashmaps.

**3. Redimensionamiento Más Inteligente:** El arreglo de metadata hace que la lógica de control interna sea mucho más inteligente. El mapa puede tomar mejores decisiones sobre cuándo rehashear y cómo distribuir los elementos, manteniendo un rendimiento más consistente a medida que aumenta el **load factor**.

## Ok Pero, ¿Qué Hay de las Desventajas de las Swiss Tables?

No todo es miel sobre hojuelas, claro, en tecnología todo es un trade-off. El arreglo separado de metadata consume memoria extra (aprox. 1/16 a 1/8 del arreglo principal), lo que por lo general es un excelente intercambio porque la memoria es uno de los recursos más baratos.

Además, la implementación es compleja pero, afortunadamente, eso no te involucra a ti, porque la vas a usar igual que siempre la has usado.

