---
aliases:
- /inteligencia-artificial-y-diseno-de-farmacos-y-medicamentos
- /inteligencia-artificial-y-diseno-de-farmacos-y-medicamentos-para-desarrolladores
- /es/inteligencia-artificial-y-diseno-de-farmacos-y-medicamentos-para-desarrolladores/
authors:
- Eduardo Zepeda
categories:
- artificial intelligence
coverImage: images/drug-design-using-artificial-intelligence.jpg
date: '2023-12-29'
description: ¿Como funciona un fármaco en el cuerpo y como puede la inteligencia artificial
  y las redes neuronales a encontrar mejores fármacos para las enfermedades de los
  seres humanos?
keywords:
- artificial intelligence
- bioquímica
- redes neuronales
- machine learning
- python
slug: /artificial-intelligence/inteligencia-artificial-y-diseno-de-farmacos-y-medicamentos-para-desarrolladores/
title: Inteligencia Artificial Y Diseño De Farmacos Y Medicamentos para desarrolladores
---

Los usos de la inteligencia artificial van más allá de [resolver problemas de código](/es/artificial-intelligence/pongo-a-prueba-a-chatgpt-con-desafios-de-codigo-de-codewars/), e independientemente de si esta [inteligencia artificial es consciente o no]({{< ref path="/posts/artificial-intelligence/chat-gpt-y-la-habitacion-china-de-searle/index.md" lang="es" >}}), tiene un sin fin de aplicaciones. Una de las aplicaciones más interesantes para la inteligencia artificial es el desarrollo de nuevos fármacos. Llevar un nuevo fármaco al mercado es un proceso arduo, costoso y que, en la mayoría de los casos, es infructuoso. La inteligencia artificial puede acelerar el proceso enormemente y reducir los candidatos a nuevos fármacos a unos cuantos, en lugar de a decenas de ellos.

Para este post voy a tomarme algunas libertades y voy a simplificar conceptos y a sacrificar algo (o mucho) de precisión en aras de un mejor entendimiento. Si tienes dudas sobre quien soy yo para hablar de estos temas, y sobre mis credenciales, siéntete libre de pedírmelas en redes sociales.

Primero voy a explicarte brevemente las bases del funcionamiento de un fármaco.

## ¿Cómo funciona un fármaco en humanos explicado para desarrolladores?

Cuando tú ingieres un fármaco por vía oral, este ingresa a tu sistema digestivo, es absorbido por este y transportado a tu sangre. Una vez en sangre, el sistema circulatorio se encarga de distribuirlo a todo el cuerpo. La sangre tiene contacto con todas tus células. Cuando el fármaco alcanza a las células correctas, se une a unos receptores celulares, los cuales disparan una función normal de la célula; ya sea liberar insulina al cuerpo, bloquear la secreción de alguna hormona.

{{< figure src="images/Receptor_(Biochemistry" class="md-local-image" alt="Representación de un receptor celular. La parte azul y amarillo representa la membrana de una célula. By Wyatt Pyzynski - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=69535544" >}}

A nivel código, puedes pensar en un fármaco como una función que llama a otra función que ya existe en el cuerpo humano:

``` javascript
function releaseInsulin(){}

function administerDrug(drug){
  // ...
  releaseInsulin()
}
```

### ¿Cómo sabe el fármaco sobre que células debe actuar?

La relación entre un fármaco y un receptor celular sigue un mecanismo similar al de llave-cerradura, donde el fármaco (la llave) únicamente va a activar las funciones de aquellas celúlas que tengan un receptor (la cerradura) que "encaje" con el fármaco.

Si encajan o no, depende de la estructura tridimensional de la molécula y del receptor.

``` javascript
function releaseInsulin(){}

function administerDrug(drug){
  if(isReceptorCompatible(cell, drug)){
    releaseInsulin()
  }
}
```

Y no solo eso, un fármaco puede encajar parcialmente en un receptor, lo cual puede provocar un efecto con menor intensidad que si lo hiciera perfectamente, y además, el no encajar perfectamente podría hacerlo activar otros receptores que desencadenarían efectos secundarios indeseados. 

{{< figure src="images/paracetamol_key_lock.png" class="md-local-image" alt="Mira como la molécula encaja perfectamente en este receptor" caption="Mira como la molécula encaja perfectamente en este receptor" >}}

### Los fármacos tienen efectos secundarios indeseables

Administrar un fármaco no es tan simple como un "A" produce "B". Un fármaco no suele tener un solo efecto, sino múltiples. Existen incluso fármacos que tienen como efecto secundario la posibilidad de muerte súbita, sí, así como lo estás leyendo, lo tomas y existe una posibilidad (ínfima, eso sí) de que caigas muerto. 

{{<ad0>}}

Un fármaco óptimo va a provocar el efecto deseado con un mínimo de efectos secundarios, tanto a corto como a largo plazo.

``` javascript
function releaseInsulin(){}

function applyDrug(drug){
  if(isReceptorCompatible(cell, drug)){
    // desired effects
    releaseInsulin()
    // undesired effects
    increaseDizzyness()
    createRash()
  }
}
```

### ¿Cuánto dura un fármaco en el cuerpo?

Bien, la respuesta a eso es "depende". Depende de cada fármaco, algunos pueden durar minutos, otros pueden durar horas y de otros podemos encontrar trazas incluso semanas o meses después. Pero, generalmente todos siguen el mismo patrón, las mismas fases y siempre en este mismo orden:

- Absorción: Si la vía de administración es intravenosa es instantáneo
- Distribución: La sangre se encarga de llevarlo a todo el cuerpo y sus propiedades fisicoquímicas determinan donde permanece. 
- Metabolismo: Generalmente el hígado empieza a descomponer el fármaco y con ello termina su efecto.
- Excreción: Mayormente se excreta por los riñones, con la orina.

{{< figure src="images/farmacocinetics.jpg" class="md-local-image" alt="Gráfico que muestra como se comportan la mayoría de los fármacos administrados por vía oral" >}}

{{<ad1>}}

## ¿De qué depende que un fármaco funcione y sus efectos secundarios?

Como te mencioné anteriormente, el que un fármaco active o no el receptor de una célula depende de si encaja con su "cerradura". Lo anterior lo define su estructura tridimensional. Por esta razón, si dos fármacos se parecen, es probable provoquen efectos similares, pero al ser diferentes uno de ellos provocará menores efectos secundarios.

Generalmente **un fármaco mantiene una estructura base, sin la cual no posee efecto, y pequeñas variaciones en esa estructura base son las que determinan la intensidad del efecto terapéutico y los secundarios**. La parte difícil es intentar deducir cual combinación será la mejor.

{{< figure src="images/analogos_penicilinas.jpg" class="md-local-image" alt="Todas las penicilinas tienen en común la estructura en amarillo. Estas dos difieren en la parte resaltada en rojo" caption="Todas las penicilinas tienen en común la estructura en amarillo. Estas dos difieren en la parte resaltada en rojo" >}}

{{<ad2>}}

Observa las moléculas de arriba, un solo cambio desemboca un comportamiento diferente en el cuerpo, ¿te imaginas la cantidad de variantes que podemos tener para un solo fármaco? Cada una con diferentes propiedades, estructura y, por ende, con diferentes intensidades respecto a su efecto terapéutico y con una combinación única de efectos secundarios.

¿Qué pasas si en lugar de un Oxígeno usamos un azufre, o si removemos la estructura grandota del lado izquierdo con forma de hexágono (benceno) y la reemplazamos por dos carbonos? ¿y si en lugar de dos carbonos usamos tres o cuatro?

Es muy dificil predecirlo de manera manual, pero es justo aquí donde la inteligencia artificial puede brillar.

## Inteligencia artificial y desarrollo de fármacos

La inteligencia artificial es capaz de reconocer patrones que los seres humanos no podemos, puede analizar la información relacionada con una gran cantidad de moléculas y sus variantes; sus efectos secundarios, su estructura tridimensional, biodisponibilidad, polaridad, presencia de grupos funcionales y cualquier otra información ya existente sobre cada una de estas moleculas, y usarlos para entrenar un modelo que prediga si una molécula tiene el potencial de convertirse en un buen candidato a fármaco para sus posteriores análisis y pruebas en animales y humanos.

{{< figure src="images/fluoxetin.png" class="md-local-image" alt="Fluoxetina, un antidepresivo que actua bloqueando un receptor" caption="Fluoxetina, un antidepresivo que actua bloqueando un receptor" >}}

{{<ad3>}}

Creo que este será uno de los usos más prometedores que se le darán una vez que [la burbuja de AI estalle]({{< ref path="/posts/artificial-intelligence/la-burbuja-de-ai-y-sus-consecuencias/index.md" lang="es" >}})

## ¿Qué parámetros debo de usar para entrenar un modelo de inteligencia artificial para descubrir nuevos fármacos?

Bien, pues ese es justo el meollo del asunto, la pregunta del millón de dólares. Si nunca has trabajado con sistemas biológicos y fármacos, te se sugiero que le des una leída a las bases de farmacocinética, farmacodinámica y estereoquímica.

Las células son sistemas increíblemente complejos en donde hay un sin número de partes interaccionando entre ellas. No hay una respuesta simple a esta pregunta pues depende del tipo de célula, el tipo de fármaco que se esté usando, incluso factores tan banales como el tipo de alimentación y la hora a la que se administra un fármaco (cronofarmacología) pueden introducir ruido en el comportamiento de estos en un paciente.

Además, hay diferentes aproximaciones que van desde la estructura tridimensional, tomando en cuanto los grupos funcionales o átomos que componen una molécula, así como sus múltiples propiedades fisicoquímicas, entre la que destaca su solubilidad en lípidos, pues indica que tan fácil cruzará las membranas de las células; mayor solubilidad en lípidos, mayor distribución en el cuerpo.

La mayoría de la gente piensa que la química consiste en mezclar cosas y ver cómo cambian los colores, pero en realidad las matemáticas desempeñan un papel fundamental en la química y hay ecuaciones para todo, desde  como calcular cuanto añadir de una sustancia hasta para predecir cuanto es el remanente de una sustancia en el organismo de acuerdo a sus propiedades fisicoquímicas.

### Bases de datos para fármacos disponibles

Hay muchísimas bases de datos disponibles con información recopilada sobre muchísimas moléculas que puedes usar para alimentar tus modelos.

- [ChEMBL](https://www.ebi.ac.uk/chembl/#?)
- [ChemDB](http://cdb.ics.uci.edu/#?)
- [COCONUT](https://coconut.naturalproducts.net/#?)
- [DGIdb](http://www.dgidb.org/#?)
- [DrugBank](http://www.drugbank.ca/#?)
- [DTC](http://drugtargetcommons.fimm.fi/#?)
- [INPUT](http://cbcb.cdutcm.edu.cn/INPUT/#?)
- [PubChem](https://pubchem.ncbi.nlm.nih.gov/#?)
- [SIDER](http://sideeffects.embl.de/#?)
- [STIITCH](http://stitch.embl.de/#?)

Me atrevo a decir que aunque el proceso no será perfecto y estará lleno de tropezones, dado que el cuerpo humano es un sistema sumamente complejo, será mucho mejor que buscar a ciegas entre un sin fin de opciones. 

Si estás interesado en el tema, un buen lugar para empezar es este artículo titulado [Artificial intelligence for drug discovery: Resources, methods, and applications](https://www.sciencedirect.com/science/article/pii/S2162253123000392#?)