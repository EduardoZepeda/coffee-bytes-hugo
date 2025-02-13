---
date: '2025-02-12T19:29:09-06:00'
draft: true
title: 'Fine-Tuning A LLM Small Practical Guide With Resources'
categories:
- artificial intelligence
- opinions
coverImage: "images/Fine-Tuning-LLM-Short-Guide.jpg"
description: 'A short practical guide on the process of fine-tuning a LLM and useful resources to do so according to my experience training Mistral 7B available on HuggingFace'
keyword: ''
keywords:
- 'Artificial Intelligence'
authors:
- 'Eduardo Zepeda'
---

I tried to fine-tune a DeepSeek model but failed, then I tried to do it with Llama and I couldn't get it either, finally I managed to do it with a Mistral model, specifically the 7B parameter model. 

I share with you some resources that I found useful during the process. Still, don't get confused by this, I still believe that [we are in an IA bubble](/en/the-rise-and-fall-of-the-ai-bubble/).

## Where to learn the basics of AI and Neural networks?

If you have no idea about Artificial Intelligence or what a neural network is, the most complete and didactic videos are on the 3blue1brown channel. 

However, it is important to clarify that these videos do not start from scratch, it is necessary that you have a background in linear algebra, linear regression and differential and integral calculus. I know it can be a little discouraging for those who come from non-technical backgrounds but it is not as difficult as it seems.

{{< youtube "aircAruvnKk" >}}

If you only speak english you probably don't know DotCSV, but what you may not know is that DotCSV has an introduction to neural networks and their videos are excellent, the bad part is that his videos are in spanish.

{{< youtube "MRIv2IwFTPg" >}}

## What is fine-tuning?

Fine-tuning is the procedure of selecting an already trained model and continuing its training on a particular data set from the field.

Most current LLM models exhibit quite positive overall performance, but fail to solve particular problems focused on specific tasks. The fine-tuning procedure provides significant benefits, such as decreased computational costs and the opportunity to use advanced models without the need to build one from scratch. [It may not replace programmers](/en/devin-ai-the-supposed-replacement-for-programmers/) but fine-tuning can turn a model in the ultimate prediction tool in an area of knowledge. 

I loved this resource for understanding the [general steps to fine-tuning an LLM](https://www.datacamp.com/tutorial/fine-tuning-large-language-models).

### Steps to fine-tune an LLM

The steps may vary according to the model but generally the process looks something like this:

1. Load a dataset: Gather your dataset, either existing or original.
2. Data preprocessing: Tokenize your dataset using model tokenizer and split it into training, validation and test sets.
3. Model selection: Choose a pre-trained LLM.
4. Parameter configuration: Configure the hyperparameters.
5. Training or Fine-Tuning: Train the model on the customized dataset.
6. Evaluation: Test it with the test set.
7. Inference: Deploy the fine-tuned model for inference on new data, making sure it generalizes well to unseen inputs.

## Where to get datasets for fine-tuning?

I used datasets from [HuggingFace](https://huggingface.co/datasets/#?), however it is important to consider that pre-trained models that are freely available were probably trained using the same data, so if you decide to use them, don't expect to have a substantial improvement over normal model performance, it would be best to use your own data or original content.

- [Awesome public datasets](https://github.com/awesomedata/awesome-public-datasets#?)
- [Kaggle](https://kaggle.com#?)
- [opendatainception](https://opendatainception.io/#?)

Make sure your dataset is in a proper format, I had to convert one using Python to JSONL, because each line was a separate file, which made the import incredibly slow.

## Which models are best for fine-tuning?

To do fine-tuning, a good starting point is using a pre-trained LLM.

As a rule of thumb, it's a good idea to browse HuggingFace, and look for large models, among the most popular ones I could find are Llama, DeepSeek, Mistral, Falcon, among others.

I tested the following models because they were very light and did not require as much computing power, but you can use their larger versions with more parameters: 
- [Llama-3.1B](https://huggingface.co/meta-llama/Llama-3.1-8B#?)
- [DeepSeek-R1-Distill-Qwen-1.5B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B#?)
- [Mistral-7B-v0.x](https://huggingface.co/mistralai/Mistral-7B-v0.3#?)


I got better results with the Mistral LLMs, probably because the DeepSeek ones were trained using Chinese sources. 

I was actually able to train and deploy it but the model returned Chinese characters, just like [Searle's room](/en/chat-gpt-searles-chinese-room-and-consciousness/), from time to time as part of the response, although it was incredibly fast.


## Where to fine-tune an LLM for free?

It would be best to have your own GPUs, but in case you can't, Google, through [Google Colab](https://colab.research.google.com/#?) has GPUs available for free for a limited amount of hours per day, [Kaggle](https://www.kaggle.com/#?) also **offers you 30 hours of GPU usage per week** to run your experiments. ~~And create your furry images using the forbidden models.~~

In my fine-tuning adventure I also found a company called [salad](https://salad.com/#?), which serves as an intermediary between users and gamers who want to rent their GPUs, the prices are incredibly competitive. [VastAI](https://vast.ai/#?) is also another option. [Digital Ocean](https://m.do.co/c/a22240ebb8e7#?) also has very competitive prices.

## LLM Fine-tuning Tutorials

For Fine-tuning I found these videos quite enjoyable, and straight to the point, however I could not produce a working model, it is possible that the notebooks were outdated and probably my inexperience made it impossible to get it.

This is a good introduction but does not share the notebook, although I was able to find it on Google Colab, link in the next section.

{{< youtube "pxhkDaKzBaY" >}}

He is a bit more specific and also gets right to the point.

{{< youtube "Q9zv369Ggfk" >}}

{{<ad>}}

## Notebooks for LLM fine-tuning.

This was [the notebook that allowed me to fine-tuning the Mistral model](https://github.com/brevdev/notebooks/blob/main/mistral-finetune-own-data.ipynb#?), with a couple of modifications, of course. 

Most of the notebooks just need you to change the model and adapt the dataset to the model input, so you can use them as a starting point for your particular case.

Others that I found particularly useful but did not work for me or produced unwanted results.
- [Fine-tuning DeepSeek R1](https://www.kaggle.com/code/kingabzpro/fine-tuning-deepseek-r1-reasoning-model#?)
- [Alpaca + Flame fine-tuning](https://colab.research.google.com/drive/135ced7oHytdxu3N2DNe1Z0kqjyYIkDXp#?)

## Where to deploy an LLM model?

After creating your model you may want to make it available to others.

Generally there are tools like Gradio that abstract the process of generating a chat server like OpenAI, you can set them up on your own or use the ones available from HuggingFace, although obviously for a monthly cost, the free plans only have CPU and RAM, so it is usually not enough to run your LLM, especially the big ones.

Since my project was for educational purposes and I don't want to pay for a premium plan, I decided to leave my model in a [GoogleColab notebook with the necessary code to run it.](https://colab.research.google.com/drive/1Fe348rmXbDyvjoDPGEKrBtPurpfwnFgG#?)
