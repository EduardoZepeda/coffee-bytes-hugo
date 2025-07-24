---
aliases:
- /en/fine-tuning-a-llm-small-practical-guide-with-resource
- /en/fine-tuning-a-llm-small-practical-guide-with-resources/
authors:
- Eduardo Zepeda
categories:
- artificial intelligence
- opinion
coverImage: images/Fine-Tuning-LLM-Short-Guide.jpg
date: '2025-02-17'
description: A short practical guide on the process of fine-tuning a LLM and useful
  resources to do so according to my experience training Mistral 7B available on HuggingFace
keyword: fine-tuning
keywords:
- artificial intelligence
title: Fine-Tuning A LLM Small Practical Guide With Resources
---

I tried to fine-tune a DeepSeek model but I failed, then I tried to do it with Llama and I couldn't make it work, finally I succeeded with a Mistral model, specifically the 7B parameter model. 

I felt completely lost, lots of tutorials but none seemed to work, hence I decided to share with my readers my notes and some resources that I found useful during the process. 

Still, don't get confused by this, I still believe that [we are in an AI bubble]({{< ref path="/posts/artificial-intelligence/la-burbuja-de-ai-y-sus-consecuencias/index.md" lang="en" >}}).

## Where to learn the basics of AI and Neural networks?

If you have no idea about artificial intelligence or what a neural network is, the most complete and didactic videos belong to 3blue1brown. 

However, it is important to clarify that these videos do not start from scratch, it is necessary that you have a background in linear algebra, linear regression and differential and integral calculus. I know it can be a little discouraging for those who come from non-technical backgrounds but it is not as difficult as it seems.

{{< youtube "aircAruvnKk" >}}

If you only speak english you probably don't know DotCSV, but what you may not know is that DotCSV has an introduction to neural networks and their videos are excellent, the bad part of course is that his videos are in Spanish. Time to turn on the subtitles.

{{< youtube "MRIv2IwFTPg" >}}

But if you already know everything about neural networks, then, let's start with the fine-tuning concept.

## What is fine-tuning?

Fine-tuning is the procedure of selecting an already trained model and continuing its training on a particular data set from the field. Like for example a LLM that has been trained specifically in scientific articles about diabetes, which you can do through [the Model Context Protocol](/en/artificial-intelligence/understand-the-model-context-protocol-or-mcp-once-and-for-all/).

Because, why use prompt engineering when you can fine-tune a model and get the same results?

{{< figure src="https://i.imgflip.com/9kjbo2.jpg" class="md-local-image" alt="Drake hotline bling meme up: prompt engineering down: fine-tuning" caption="I'm just kidding, always try prompt engineering first" >}}

Most current LLM models exhibit quite positive overall performance, but fail to solve particular problems focused on specific tasks. The fine-tuning procedure provides significant benefits, such as decreased computational costs and the opportunity to use advanced models without the need to build one from scratch. [It may not replace programmers]({{< ref path="/posts/artificial-intelligence/devin-de-cognition-labs-la-inteligencia-artificial-que-reemplaza-a-los-programadores/index.md" lang="en" >}}) but fine-tuning can turn a model into the ultimate prediction tool in an area of knowledge. 


### Steps needed to fine-tune an LLM

The steps may vary according to the model but generally the process looks something like this:

1. Load a dataset: Gather your dataset, either existing or original.
2. Data preprocessing: Tokenize your dataset using model tokenizer and split it into training, validation and test sets.
3. Model selection: Choose a pre-trained LLM.
4. Parameter configuration: Configure the hyperparameters.
5. Training or Fine-Tuning: Train the model on the customized dataset.
6. Evaluation: Test it with the test set.
7. Inference: Deploy the fine-tuned model for inference on new data, making sure it generalizes well to unseen inputs.

Here are some resources about fine-tuning:

I borrowed this [notebook because it was the only one that worked and modified accodringly](https://github.com/brevdev/notebooks/blob/main/mistral-finetune-own-data.ipynb), you can thank brevdev for it.

I loved this resource for understanding the [general steps to fine-tuning an LLM](https://www.datacamp.com/tutorial/fine-tuning-large-language-models).

The [notebook that I used to fine-tune](https://www.kaggle.com/code/eduardomzepeda/fine-tuning-mistral-7b-with-linkedin-job-posting#?) the model is here and you can check it.

## Where to get datasets for fine-tuning an LLM?

In the same way you need data to train an AI model, fine-tuning requires that you provide it with the best data can you find, the best source is your own data.

I used datasets from [HuggingFace](https://huggingface.co/datasets/#?), however it is important to **consider that pre-trained models that are freely available were probably trained using the same data, so if you decide to use them, don't expect to have a substantial improvement over normal model performance**, it would be best to use your own data or original content.

Now we should have the data, what LLM should we use?

### Fine-tuning data sources

- [Awesome public datasets](https://github.com/awesomedata/awesome-public-datasets#?)
- [Kaggle](https://kaggle.com#?)
- [opendatainception](https://opendatainception.io/#?)

Make sure your dataset is in a proper format. Eg, I had to convert one using Python to JSONL, because each line was a separate file, which made the import incredibly slow.

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o49qurb343h802weo8cv.png" class="md-local-image" alt="HuggingFace dataset screenshot" >}}

Now we should have the data, what LLM should we use now?

## Which models are best for fine-tuning an LLM?

To do fine-tuning, a good starting point is using a pre-trained LLM, the most parameters the better results but its performance will be worse.

As a rule of thumb, it's a good idea to browse HuggingFace, and look for large models (the ones with more parameters), among the most popular ones I could find are Llama, DeepSeek, Mistral, Falcon, among others.

I tested the following models, not because they were the best, but because they were light and did not require as much computing power (I'm working with limited resources, leave me alone), but you can use their larger versions with more parameters: 
- [Llama-3.1B](https://huggingface.co/meta-llama/Llama-3.1-8B#?)
- [DeepSeek-R1-Distill-Qwen-1.5B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B#?)
- [Mistral-7B-v0.x](https://huggingface.co/mistralai/Mistral-7B-v0.3#?)

I got better results with the Mistral LLMs, probably because the DeepSeek ones were trained using Chinese sources. 

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xuywp28gqcln00ydopo2.jpg" class="md-local-image" alt="Is this Searle's Chinese room meme" >}}

I was actually able to train and deploy it but the model returned Chinese characters, ([just like Searle's room](/en/artificial-intelligence/chat-gpt-searles-chinese-room-and-consciousness/)), from time to time as part of the response, although it was incredibly fast.

Now that we have the data and the model, where can we train our LLM? The cheaper the better.

## Where to fine-tune an LLM for free?

It would be best to have your own GPUs, but in case you can't, Google, through [Google Colab](https://colab.research.google.com/#?) has GPUs available for free for a limited amount of hours per day, [Kaggle](https://www.kaggle.com/#?) also **offers you 30 hours of GPU usage per week** to run your experiments. ~~And create your furry images using the forbidden models.~~

{{< figure src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4o5rmh1dv8il7pdml2gr.png" class="md-local-image" alt="Kaggle free GPUs" >}}

In my fine-tuning adventure I also found a company called [salad](https://salad.com/#?), which serves as an intermediary between users and gamers who want to rent their GPUs, the prices are incredibly competitive. [VastAI](https://vast.ai/#?) is also another option. [Digital Ocean](https://m.do.co/c/a22240ebb8e7#?) also has very competitive prices and provices a wide variety of GPUs.

We have everything we need now, let's review the overall process.

## LLM Fine-tuning Tutorials

For Fine-tuning I found these videos quite enjoyable, short and straight to the point, however I could not produce a working model, it is possible that the notebooks were outdated and probably my inexperience make me fail.

This is a good introduction but does not share the jupyter notebook, although I was able to find it on Google Colab. I put the link in the next section.

{{< youtube "pxhkDaKzBaY" >}}

He is a bit more specific and concise.

{{< youtube "Q9zv369Ggfk" >}}

{{<ad>}}

Now we know the overall process, where can we find some template for fine-tuning?

## Notebooks for LLM fine-tuning.

This was [the notebook that allowed me to fine-tuning the Mistral model](https://github.com/brevdev/notebooks/blob/main/mistral-finetune-own-data.ipynb#?), with a couple of modifications, of course. 

Most of the notebooks just need you to change the model and adapt the dataset to the model input, so you can use them as a starting point for your particular case.

Others that I found particularly well documented but did not work for me or produced unwanted results are these:
- [Fine-tuning DeepSeek R1](https://www.kaggle.com/code/kingabzpro/fine-tuning-deepseek-r1-reasoning-model#?)
- [Alpaca + Flame fine-tuning](https://colab.research.google.com/drive/135ced7oHytdxu3N2DNe1Z0kqjyYIkDXp#?)

## Where to deploy an LLM model?

After creating your model you may want to make it available to others.

Generally there are tools like Gradio that abstract the process of generating a chat server like OpenAI, you can set them up on your own or use the ones available from HuggingFace, although obviously for a monthly cost, the free plans only have CPU and RAM, so it is usually not enough to run your LLM, especially the big ones.

Since my project was for educational purposes and I don't want to pay for a premium plan, I decided to put the code necessary to run my model in a [GoogleColab notebook with the necessary code to run it.](https://colab.research.google.com/drive/1Fe348rmXbDyvjoDPGEKrBtPurpfwnFgG#?)