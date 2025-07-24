---
aliases:
- /en/artificial-intelligence-drug-design-for-developers/
authors:
- Eduardo Zepeda
categories:
- artificial intelligence
coverImage: images/drug-design-using-artificial-intelligence.jpg
date: '2023-12-29'
description: How does a drug work in the body and how can artificial intelligence
  and neural networks help find better drugs for human diseases.
keywords:
- artificial intelligence
- bioquímica
- redes neuronales
- machine learning
- python
title: Artificial Intelligence & Drug Design for Developers
---

The uses of artificial intelligence go beyond [solving coding problems]({{< ref path="/posts/artificial-intelligence/pruebo-chatgpt-3-con-desafios-de-codigo-de-codewars/index.md" lang="en" >}}), and regardless of whether this [artificial intelligence is conscious or not](/en/artificial-intelligence/chat-gpt-searles-chinese-room-and-consciousness/), it has endless applications. One of the most interesting applications for artificial intelligence is the development of new drugs. Bringing a new drug to market is an arduous, costly and, in most cases, unsuccessful process. Artificial intelligence can speed up the process enormously and narrow down the new drug candidates to a few, rather than dozens of them.

For this post I'm going to take some liberties and simplify concepts and sacrifice some (or a lot) of precision for the sake of better understanding. If you have doubts about who I am to talk about these topics, and about my credentials, feel free to ask me on social networks.

First I'm going to briefly explain the basics of how a drug works.

## How does a drug work in humans explained for developers?

When you ingest a drug orally, it enters your digestive system, is absorbed by it and transported into your blood. Once in the blood, the circulatory system is responsible for distributing it throughout the body. The blood has contact with all your cells. When the drug reaches the right cells, it binds to cell receptors, which trigger a normal cell function; either releasing insulin into the body, or blocking the secretion of a hormone.

{{< figure src="images/Receptor_(Biochemistry" class="md-local-image" alt="Representation of a cell receptor. The blue and yellow part represents the membrane of a cell. By Wyatt Pyzynski - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=69535544." >}}

At code level, you can think of a drug as a function that calls another function that already exists in the human body:

``` javascript
function releaseInsulin(){}

function administerDrug(drug){
  // ...
  releaseInsulin()
}
```

### How does the drug know which cells to act on?

The relationship between a drug and a cell receptor follows a key-lock mechanism, where the drug (the key) will only activate the functions of those cells that have a receptor (the lock) that "fits" with the drug.

Whether they fit or not depends on the three-dimensional structure of the molecule and the receptor.

``` javascript
function releaseInsulin(){}

function administerDrug(drug){
  if(isReceptorCompatible(cell, drug)){
    releaseInsulin()
  }
}
```

And not only that, a drug may partially fit a receptor, which may cause an effect with less intensity than if it did fit perfectly, and furthermore, not fitting perfectly could make it activate other receptors that would trigger unwanted side effects. 

{{< figure src="images/paracetamol_key_lock.png" class="md-local-image" alt="Look how the molecule fits perfectly into this receptor." caption="Look how the molecule fits perfectly into this receptor." >}}

### Drugs have undesirable side effects.

Administering a drug is not as simple as an "A" produces "B". A drug does not usually have only one effect, but multiple ones. There are even drugs that have as a side effect the possibility of sudden death, yes, just as you are reading it, you take it and there is a possibility (tiny, yes) that you will drop dead. 

An optimal drug will cause the desired effect with a minimum of side effects, both in the short and long term.

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

### How long does a drug last in the body?

Well, the answer to that is "it depends". It depends on each drug, some may last for minutes, some may last for hours and of others we may find traces even weeks or months later. But, generally they all follow the same pattern, the same phases and always in this same order:

- Absorption: if the route of administration is intravenous it is instantaneous.
- Distribution: The blood is responsible for carrying it throughout the body and its physicochemical properties determine where it remains. 
- Metabolism: Generally, the liver begins to break down the drug and thus its effect ends.
- Excretion: Mostly excreted through the kidneys, in the urine.

{{< figure src="images/farmacocinetics.jpg" class="md-local-image" alt="" >}}

{{<ad>}}

## What does it depend on whether a drug works and its side effects?

As I mentioned earlier, whether or not a drug activates a cell's receptor depends on whether it fits its "lock". This is defined by its three-dimensional structure. For this reason, if two drugs look alike, they are likely to cause similar effects, but being different, one of them will cause fewer side effects.

Generally **a drug maintains a base structure, without which it has no effect, and small variations in that base structure are what determine the intensity of the therapeutic effect and the side effects**. The difficult part is trying to deduce which combination will be the best.

{{< figure src="images/analogos_penicilinas.jpg" class="md-local-image" alt="All penicillins have the yellow structure in common. These two differ in the part highlighted in red." caption="All penicillins have the yellow structure in common. These two differ in the part highlighted in red." >}}

Look at the molecules above, a single change results in different behavior in the body, can you imagine how many variants we can have for a single drug? Each with different properties, structure and thus different intensities of therapeutic effect and with a unique combination of side effects.

What if instead of an Oxygen we use a sulfur, or if we remove the large hexagon-shaped structure on the left side (benzene) and replace it with two carbons? What if instead of two carbons we use three or four?

It is very difficult to predict this manually, but this is exactly where artificial intelligence can shine.

## Artificial intelligence and drug development

Artificial intelligence is able to recognize patterns that humans cannot, it can analyze information related to a large number of molecules and their variants; their side effects, their three-dimensional structure, bioavailability, polarity, presence of functional groups and any other information already existing about each of these molecules, and use them to train a model that predicts whether a molecule has the potential to become a good drug candidate for further analysis and testing in animals and humans.

{{< figure src="images/fluoxetin.png" class="md-local-image" alt="Fluoxetine, an antidepressant that acts by blocking a receptor." caption="Fluoxetine, an antidepressant that acts by blocking a receptor." >}}

Of course AI for drug development will reach its full potential once the [AI bubble crashes]({{< ref path="/posts/artificial-intelligence/la-burbuja-de-ai-y-sus-consecuencias/index.md" lang="en" >}}).

## What parameters should I use to train an artificial intelligence model to discover new drugs?

Well, that's the crux of the matter, the million dollar question. If you have never worked with biological systems and drugs, I suggest you read up on the basics of pharmacokinetics, pharmacodynamics and stereochemistry.

Cells are incredibly complex systems where there are countless parts interacting with each other. There is no simple answer to this question because it depends on the type of cell, the type of drug being used, and even such trivial factors as the type of diet and the time at which a drug is administered (chronopharmacology) can introduce noise in the behavior of drugs in a patient.

In addition, there are different approaches ranging from the three-dimensional structure, taking into account the functional groups or atoms that make up a molecule, as well as its multiple physicochemical properties, among which its solubility in lipids stands out, since it indicates how easily it will cross cell membranes; the greater the solubility in lipids, the greater the distribution in the body.

Most people think that chemistry is all about mixing things and seeing how the colors change, but in reality mathematics plays a fundamental role in chemistry and there are equations for everything from how to calculate how much to add of a substance to predicting how much of a substance remains in the body according to its physicochemical properties.

### Databases for available drugs

There are many, many databases available with information collected on many, many molecules that you can use to feed your models.

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

I dare say that although the process will not be perfect and will be full of stumbles, given that the human body is a highly complex system, it will be much better than blindly searching through endless options. 

If you are interested in the topic, a good place to start is this article titled [Artificial intelligence for drug discovery: Resources, methods, and applications](https://www.sciencedirect.com/science/article/pii/S2162253123000392#?)