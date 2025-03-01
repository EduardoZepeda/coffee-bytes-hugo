---
date: '2025-02-17'
title: 'Fine-Tuning De Un LLM Guía Práctica Con Recursos'
categories:
- inteligencia artificial
- opiniones
coverImage: "images/Fine-Tuning-LLM-Short-Guide.jpg"
description: 'Una breve guía práctica sobre el proceso de puesta a punto de un LLM y recursos útiles para hacerlo según mi experiencia entrenando Mistral 7B disponible en HuggingFace'
keyword: 'fine-tuning'
keywords:
- 'Inteligencia Artificial'
authors:
- 'Eduardo Zepeda'
---

Intenté hacer fine-tuning de un modelo de DeepSeek pero fracasé, luego intenté hacerlo con Llama y tampoco pude conseguirlo, al final logré hacerlo con un modelo de Mistral, específicamente el de 7B de parámetros. 

Te comparto algunos recursos que encontré útiles durate el proceso. A pesar de estar jugando con la AI, aún sigo creyendo que [estamos en una burbuja de AI.](/es/el-auge-y-la-caida-de-la-burbuja-de-ai/)

## ¿Dónde aprender los fundamentos de AI y redes neuronales?

Si no tienes ni idea de Inteligencia Artificial o lo que es una red neuronal, los videos más completos y didácticos los tiene el canal de 3blue1brown. 

Sin embargo es importante aclarar que estos videos no parten de cero, es necesario que tengas bases de algebra lineal, regresión lineal y cálculo diferencial e integral. Sé que puede ser un poco desmotivador para los que vienen de backgrounds no técnicos pero no es tan difícil como parece.

{{< youtube "jKCQsndqEGQ" >}}

Probablemente ya conozcas a DotCSV, es el pelón que todos queremos, pero lo que quizás no sepas es que DotCSV tiene una introducción sobre redes neuronales y sus videos son excelentes, y lo mejor es que están en español.

{{< youtube "MRIv2IwFTPg" >}}

Platzi también tiene un excelente video donde explican las bases matemáticas de las redes neuronales en español, el video es algo largo, pero vale muchísimo la pena.

{{< youtube "v6tk0CxaVU8" >}}

Pero si ya tienes nociones de redes neuronales, entonces empecemos por el fine-tuning o ajuste fino.

## ¿Qué es el fine-tuning?

El fine-tuning es el procedimiento de seleccionar un modelo ya entrenado y continuar su formación en un conjunto de datos particulares del campo. Como por ejemplo un LLM que ha sido entrenado usando todos los artículos científicos sobre diabetes.

Porque, ¿para qué prompt engineering cuando se puede hacer fine-tuning de un modelo y obtener los mismos resultados?

![Drake hotline bling meme up: prompt engineering down: fine-tuning](https://i.imgflip.com/9kjbo2.jpg "Sólo estoy bromeando, siempre prueba primero con prompt engineering")

La mayor parte de los modelos LLM actuales exhiben un rendimiento global bastante positivo, pero no logran solucionar problemas particulares enfocados en tareas específicas. El procedimiento de fine-tuning brinda beneficios significativos, tales como la disminución de los costos de cálculo y la oportunidad de utilizar modelos avanzados sin la necesidad de edificar uno desde el inicio.

[Puede que no sustituya a los programadores](/es/devin-ai-el-supuesto-reemplazo-de-los-programadores/), pero el fine-tuning puede convertir un LLM en la herramienta de predicción definitiva en un área de conocimiento.

### Pasos para realizar fine-tuning de un LLM

Los pasos pueden variar de acuerdo al modelo pero generalmente son algo similar a esto

1. Cargar un dataset: Obtener tu dataset, ya sea existente u original.
2. Preprocesamiento de datos: Tokenizar tu dataset usando tokenizador del modelo y dividirlo en conjuntos de entrenamiento, validación y prueba.
3. Selección del modelo: Elija un LLM preentrenado.
4. Configuración de parámetros: Configure los hiperparámetros.
5. Entrenamiento o Fine-Tuning: Entrene el modelo en el conjunto de datos personalizado.
6. Evaluación: Ponlo a prueba con el conjunto de pruebas.
7. Inferencia: Despliegue el modelo ajustado para la inferencia en nuevos datos, asegurándose de que se generaliza bien a entradas no vistas.

Te dejo algunos recursos relacionados con el fine-tuning a continuación.

Me encantó este recurso para entender los [pasos generales para hacer fine-tuning de un LLM](https://www.datacamp.com/tutorial/fine-tuning-large-language-models).

La [notebook que utilice para realizar fine-tuning](https://www.kaggle.com/code/eduardomzepeda/fine-tuning-mistral-7b-with-linkedin-job-posting#?) está en Kaggle y puedes consultarla.

## ¿Dónde conseguir datasets para hacer fine-tuning?

De la misma manera que se necesitan datos para entrenar un modelo de IA, el ajuste requiere que se le proporcionen los mejores datos que se puedan encontrar, y la mejor fuente son los propios datos.

Yo usé datasets de [HuggingFace](https://huggingface.co/datasets/#?), sin embargo es importante considerar que **los modelos pre-entrenados que estén disponibles de manera gratuita seguramente fueron entrenados usando esos mismos datos**, por lo que, si decides usarlos, no esperes tener una mejora substancial respecto al rendimiento normal del modelo, lo mejor sería usar datos propios o contenido original.

- [Awesome public datasets](https://github.com/awesomedata/awesome-public-datasets#?)
- [Kaggle](https://kaggle.com#?)
- [opendatainception](https://opendatainception.io/#?)

Asegúrate de que tu dataset esté en un formato adecuado, yo tuve que preprocesar, uno usando Python, en el que cada linea era un archivo por separado, lo que volvía la importación increíblemente lenta.

## ¿Qué modelos son mejores para hacer fine-tuning?

Para realizar el entrenamiento, debes partir de un modelo preexistente. Mientras más parámetros tenga mejores resultados obtendrás, pero peor será el rendimiento.

Generalmente encontrarás buenos candidatos al fine-tuning en HuggingFace, sobre todo los modelos grandes, entre los más populares que pude encontrar están Llama, DeepSeek, Mistral, Falcon, entre otros.

Yo probé los sisguientes modelos porque eran muy ligeros y no requerían tanto poder de computo, pero tú puedes usar sus versiones con más parámetros: 
- [Llama-3.1B](https://huggingface.co/meta-llama/Llama-3.1-8B#?)
- [DeepSeek-R1-Distill-Qwen-1.5B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B#?)
- [Mistral-7B-v0.x](https://huggingface.co/mistralai/Mistral-7B-v0.3#?)

Obtuve mejores resultados con los de Mistral, probablemente porque los de DeepSeek fueron entrenados con material de origen chino. 

De hecho pude entrenarlo y montarlo pero el modelo me retornaba caracteres chinos, igualito [a la habitación de Searle](/es/chat-gpt-la-habitacion-china-de-searle-y-la-conciencia/), de vez en cuando como parte de la respuesta, aunque eso sí, era increíblemente rápido.

## ¿Dónde hacer fine-tuning de un LLM de manera gratuita?

Lo mejor sería usar tus propias GPUs, pero en caso de que te sea imposible, Google, a través de [Google Colab](https://colab.research.google.com/#?) tiene GPUs disponibles de manera gratuita por una cantidad limitada de horas al día, [Kaggle](https://www.kaggle.com/#?) también **te ofrece 30 horas de uso de GPU a la semana** para que lleves a cabo tus experimentos. ~~Y crees tus imágenes furras usando los modelos prohibidos.~~

En mi búsqueda también encontré una empresa llamada [salad](https://salad.com/#?), que sirve como intermediario entre usuarios y gamers que quieren alquilar sus GPUs, los precios son increíblemente competitivos. [VastAI](https://vast.ai/#?) también es otra opción. [Digital Ocean](https://m.do.co/c/a22240ebb8e7#?) también tiene precios bastante competitivos y provee una amplia variedad de GPUs de donde elegir..

## Tutoriales sobre fine-tuning de LLM

Para hacer Fine-tuning encontré bastante amenos estos videos, y directo al grano, sin embargo no pude producir un modelo que funcionara siquiera, es posible que las notebooks estaban desactualizadas y probablemente mi inexperiencia me hizo imposible conseguirlo.

Este es una buena introducción pero no comparte la notebook, aunque pude encontrarla en Google Colab, te dejo el enlace en la siguiente sección.

{{< youtube "pxhkDaKzBaY" >}}

Él es un poco más específico y también va directo al grano.

{{< youtube "Q9zv369Ggfk" >}}

{{<ad>}}

## Notebooks para hacer fine-tuning de LLM.

Esta fue [la notebook que me permitió hacer fine-tuning al modelo Mistral](https://github.com/brevdev/notebooks/blob/main/mistral-finetune-own-data.ipynb#?), con un par de modificaciones, claro. 

La mayoría de las notebooks solo necesitan que cambies el modelo y adaptes el dataset a la entrada del modelo, por lo que puedes usarlos como punto de partida para tu caso particular.

Otras que encontré particularmente útiles pero no me funcionaron o produjeron resultados no deseados
- [Fine-tuning DeepSeek R1](https://www.kaggle.com/code/kingabzpro/fine-tuning-deepseek-r1-reasoning-model#?)
- [Alpaca + Llama fine-tuning](https://colab.research.google.com/drive/135ced7oHytdxu3N2DNe1Z0kqjyYIkDXp#?)


## ¿Dónde hacer deploy de un modelo de LLM?

Después de entrear tu modelo quizás querrás ponerlo a disposición de los demás.

Generalmente existen herramientas como Gradio que abstraen el proceso de generar un servidor de chat como el de OpenAI, puedes montarlos por tu cuenta o usar de los que dispone HuggingFace, aunque obviamente por un costo mensual, los planes gratuitos solo tienen CPU y RAM, por lo que no suele ser suficiente para ejecutar tus LLM, sobre todo los grandes. 

Como mi proyecto fue con fines educativos y no quiero pagar por un plan premium, yo decidí dejar el código necesario para ejecutar mi modelo en una libreta de [GoogleColab con el código necesario para ejecutarlo.](https://colab.research.google.com/drive/1Fe348rmXbDyvjoDPGEKrBtPurpfwnFgG#?)