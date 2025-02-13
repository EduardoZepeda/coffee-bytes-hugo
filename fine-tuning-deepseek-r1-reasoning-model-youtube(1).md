## Credits

This notebook and this code is a fork of Abid Ali Awan's tutorial on [Fine-Tuning DeepSeek R1](https://www.datacamp.com/tutorial/fine-tuning-deepseek-r1-reasoning-model). Eternally grateful for his work with DataCamp and his contributions to the community.


## Which tools & packages will we be using today?

Packages we're going to be using throughout this walkthrough will be

- `unsloth`: Efficient fine-tuning and inference for LLMs — Specifically we will be using:
    - `FastLanguageModel` module to optimize inference & fine-tuning
    - `get_peft_model` to enable LoRa (Low-Rank Adaptation) fine-tuning
- `peft`: Supports LoRA-based fine-tuning for large models.
- Different Hugging Face modules:
    - `transformers` from HuggingFace to work with our fine-tuning data and handle different model tasks
    - `trl` Transformer Reinforcement Learning from HuggingFace which allows for supervised fine-tuning of the model — we will use the `SFFTrainer` wrapper
    - `datasets` to fetch reasoning datasets from the Hugging Face Hub
- `torch`: Deep learning framework used for training
- `wandb`: Provides access to weights and biases for tracking our fine-tuning experiment 

## Before we get started — how to access the Hugging Face and Weights & Biases API

### Set GPU accelerator
We are using Kaggle Notebooks because we have access to free GPUs. To enable GPU access, press on Settings > Accelerator > GPU T4 x2

### How to access the Hugging Face API

1. Register to Huggin Face if you have not already
2. Go to [Hugging Face Tokens](https://huggingface.co/settings/tokens).
3. Click **"New Token"**.
4. Select **read/write** permissions if needed.
5. Copy your **API key**.

### Weights & Biases API key**
1. Sign up at [Weights & Biases](https://wandb.ai/site).
2. Go to [W&B Settings](https://wandb.ai/settings).
3. Copy your **API key** from the "API Keys" section.

### Add the API keys to Kaggle Notebooks
1. Press on Add-ons > Secrets
2. Add the API keys under `Hugging_Face_Token` and `wnb` respectively

You can now use this code to retrieve your API keys

```py
from kaggle_secrets import UserSecretsClient
user_secrets = UserSecretsClient()
hugging_face_token = user_secrets.get_secret("Hugging_Face_Token")
wnb_token = user_secrets.get_secret("wnb")
```

## Install relevant packages


```python
%%capture

!pip install unsloth # install unsloth
!pip install --force-reinstall --no-cache-dir --no-deps git+https://github.com/unslothai/unsloth.git # Also get the latest version Unsloth!
```

## Import all relevant packages throughout this walkthrough


```python
# Modules for fine-tuning
from unsloth import FastLanguageModel
import torch # Import PyTorch
from trl import SFTTrainer # Trainer for supervised fine-tuning (SFT)
from unsloth import is_bfloat16_supported # Checks if the hardware supports bfloat16 precision
# Hugging Face modules
from huggingface_hub import login # Lets you login to API
from transformers import TrainingArguments # Defines training hyperparameters
from datasets import load_dataset # Lets you load fine-tuning datasets
# Import weights and biases
import wandb
# Import kaggle secrets
from kaggle_secrets import UserSecretsClient
```

    🦥 Unsloth: Will patch your computer to enable 2x faster free finetuning.
    🦥 Unsloth Zoo will now patch everything to make training faster!


## Create API keys and login to Hugging Face and Weights and Biases


```python
# Initialize Hugging Face & WnB tokens
user_secrets = UserSecretsClient() # from kaggle_secrets import UserSecretsClient
hugging_face_token = user_secrets.get_secret("Hugging_Face_Token")
wnb_token = user_secrets.get_secret("wnb")

# Login to Hugging Face
login(hugging_face_token) # from huggingface_hub import login

# Login to WnB
wandb.login(key=wnb_token) # import wandb
run = wandb.init(
    project='Fine-tune-DeepSeek-R1-Distill-Llama-8B on Medical COT Dataset_YouTube Walkthrough', 
    job_type="training", 
    anonymous="allow"
)
```

    [34m[1mwandb[0m: Using wandb-core as the SDK backend.  Please refer to https://wandb.me/wandb-core for more information.
    [34m[1mwandb[0m: Currently logged in as: [33meduardomzepeda[0m ([33medzepeda[0m). Use [1m`wandb login --relogin`[0m to force relogin
    [34m[1mwandb[0m: [33mWARNING[0m If you're specifying your api key in code, ensure this code is not shared publicly.
    [34m[1mwandb[0m: [33mWARNING[0m Consider setting the WANDB_API_KEY environment variable, or running `wandb login` from the command line.
    [34m[1mwandb[0m: Appending key for api.wandb.ai to your netrc file: /root/.netrc



Tracking run with wandb version 0.19.1



Run data is saved locally in <code>/kaggle/working/wandb/run-20250207_212900-psnsdoh8</code>



Syncing run <strong><a href='https://wandb.ai/edzepeda/Fine-tune-DeepSeek-R1-Distill-Llama-8B%20on%20Medical%20COT%20Dataset_YouTube%20Walkthrough/runs/psnsdoh8' target="_blank">likely-bee-5</a></strong> to <a href='https://wandb.ai/edzepeda/Fine-tune-DeepSeek-R1-Distill-Llama-8B%20on%20Medical%20COT%20Dataset_YouTube%20Walkthrough' target="_blank">Weights & Biases</a> (<a href='https://wandb.me/developer-guide' target="_blank">docs</a>)<br>



View project at <a href='https://wandb.ai/edzepeda/Fine-tune-DeepSeek-R1-Distill-Llama-8B%20on%20Medical%20COT%20Dataset_YouTube%20Walkthrough' target="_blank">https://wandb.ai/edzepeda/Fine-tune-DeepSeek-R1-Distill-Llama-8B%20on%20Medical%20COT%20Dataset_YouTube%20Walkthrough</a>



View run at <a href='https://wandb.ai/edzepeda/Fine-tune-DeepSeek-R1-Distill-Llama-8B%20on%20Medical%20COT%20Dataset_YouTube%20Walkthrough/runs/psnsdoh8' target="_blank">https://wandb.ai/edzepeda/Fine-tune-DeepSeek-R1-Distill-Llama-8B%20on%20Medical%20COT%20Dataset_YouTube%20Walkthrough/runs/psnsdoh8</a>


## Loading DeepSeek R1 and the Tokenizer

**What are we doing in this step?**

In this step, we **load the DeepSeek R1 model and its tokenizer** using `FastLanguageModel.from_pretrained()`. We also **configure key parameters** for efficient inference and fine-tuning. We will be using a distilled 8B version of R1 for faster computation.  

**Key parameters explained**
```py
max_seq_length = 2048  # Define the maximum sequence length a model can handle (i.e., number of tokens per input)
dtype = None  # Default data type (usually auto-detected)
load_in_4bit = True  # Enables 4-bit quantization – a memory-saving optimization
```

**Intuition behind 4-bit quantization**

Imagine compressing a **high-resolution image** to a smaller size—**it takes up less space but still looks good enough**. Similarly, **4-bit quantization reduces the precision of model weights**, making the model **smaller and faster while keeping most of its accuracy**. Instead of storing precise **32-bit or 16-bit numbers**, we compress them into **4-bit values**. This allows **large language models to run efficiently on consumer GPUs** without needing massive amounts of memory. 


```python
# Set parameters
max_seq_length = 2048 # Define the maximum sequence length a model can handle (i.e. how many tokens can be processed at once)
dtype = None # Set to default 
load_in_4bit = True # Enables 4 bit quantization — a memory saving optimization 

# Load the DeepSeek R1 model and tokenizer using unsloth — imported using: from unsloth import FastLanguageModel
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/DeepSeek-R1-Distill-Llama-8B",  # Load the pre-trained DeepSeek R1 model (8B parameter version)
    max_seq_length=max_seq_length, # Ensure the model can process up to 2048 tokens at once
    dtype=dtype, # Use the default data type (e.g., FP16 or BF16 depending on hardware support)
    load_in_4bit=load_in_4bit, # Load the model in 4-bit quantization to save memory
    token=hugging_face_token, # Use hugging face token
)
```

    ==((====))==  Unsloth 2025.2.4: Fast Llama patching. Transformers: 4.48.3.
       \\   /|    GPU: Tesla T4. Max memory: 14.741 GB. Platform: Linux.
    O^O/ \_/ \    Torch: 2.6.0+cu124. CUDA: 7.5. CUDA Toolkit: 12.4. Triton: 3.2.0
    \        /    Bfloat16 = FALSE. FA [Xformers = 0.0.29.post2. FA2 = False]
     "-____-"     Free Apache license: http://github.com/unslothai/unsloth
    Unsloth: Fast downloading is enabled - ignore downloading bars which are red colored!



    model.safetensors:   0%|          | 0.00/5.96G [00:00<?, ?B/s]



    generation_config.json:   0%|          | 0.00/236 [00:00<?, ?B/s]



    tokenizer_config.json:   0%|          | 0.00/52.9k [00:00<?, ?B/s]



    special_tokens_map.json:   0%|          | 0.00/483 [00:00<?, ?B/s]



    tokenizer.json:   0%|          | 0.00/17.2M [00:00<?, ?B/s]


## Testing DeepSeek R1 on a medical use-case before fine-tuning


### Defining a system prompt 
To create a prompt style for the model, we will define a system prompt and include placeholders for the question and response generation. The prompt will guide the model to think step-by-step and provide a logical, accurate response.


```python
# Define a system prompt under prompt_style 
prompt_style = """Below is an instruction that describes a task, paired with an input that provides further context. 
Write a response that appropriately completes the request. 
Before answering, think carefully about the question and create a step-by-step chain of thoughts to ensure a logical and accurate response.

### Instruction:
You are a medical expert with advanced knowledge in clinical reasoning, diagnostics, and treatment planning. 
Please answer the following medical question. 

### Question:
{}

### Response:
<think>{}"""
```

### Running inference on the model

In this step, we **test the DeepSeek R1 model** by providing a **medical question** and generating a response.  
The process involves the following steps:

1. **Define a test question** related to a medical case.
2. **Format the question using the structured prompt (`prompt_style`)** to ensure the model follows a logical reasoning process.
3. **Tokenize the input and move it to the GPU (`cuda`)** for faster inference.
4. **Generate a response using the model**, specifying key parameters like `max_new_tokens=1200` (limits response length).
5. **Decode the output tokens back into text** to obtain the final readable answer.


```python
# Creating a test medical question for inference
question = """A 61-year-old woman with a long history of involuntary urine loss during activities like coughing or 
              sneezing but no leakage at night undergoes a gynecological exam and Q-tip test. Based on these findings, 
              what would cystometry most likely reveal about her residual volume and detrusor contractions?"""

# Enable optimized inference mode for Unsloth models (improves speed and efficiency)
FastLanguageModel.for_inference(model)  # Unsloth has 2x faster inference!

# Format the question using the structured prompt (`prompt_style`) and tokenize it
inputs = tokenizer([prompt_style.format(question, "")], return_tensors="pt").to("cuda")  # Convert input to PyTorch tensor & move to GPU

# Generate a response using the model
outputs = model.generate(
    input_ids=inputs.input_ids, # Tokenized input question
    attention_mask=inputs.attention_mask, # Attention mask to handle padding
    max_new_tokens=1200, # Limit response length to 1200 tokens (to prevent excessive output)
    use_cache=True, # Enable caching for faster inference
)

# Decode the generated output tokens into human-readable text
response = tokenizer.batch_decode(outputs)

# Extract and print only the relevant response part (after "### Response:")
print(response[0].split("### Response:")[1])  
```

    
    <think>
    Okay, so I need to figure out what cystometry would show for this 61-year-old woman. Let me start by breaking down the information given.
    
    She has a history of involuntary urine loss when she coughs or sneezes, but no leakage at night. That makes me think about possible causes. Since she loses urine involuntarily during these activities, it's likely a urethral issue rather than something related to bladder capacity or night-time urination.
    
    Now, she undergoes a gynecological exam and Q-tip test. I'm not entirely sure what the Q-tip test entails, but I think it's used to check for urethral obstruction. If the Q-tip is positive, it suggests that the urethra is blocked, causing the urine to accumulate and be released involuntarily during activities like coughing.
    
    So, if the Q-tip test is positive, that would indicate that her urethral function is impaired. Now, thinking about cystometry, which is a test to measure bladder capacity and check for detrusor contractions. But wait, if her issue is with the urethra rather than the bladder, would cystometry still be helpful?
    
    Involuntary urine loss due to urethral obstruction can sometimes be confused with bladder overactivity, but in this case, it's more about the outlet. If the Q-tip is positive, it's more about the urethral resistance. However, sometimes both bladder and urethral issues can coexist.
    
    But the key point here is that she has no leakage at night. Night-time leakage is more common with bladder problems, especially if the bladder wakens due to overfilling. Since she doesn't leak at night, it's less likely that her bladder has a significant capacity issue or that it's overly sensitive.
    
    So, putting this together, the cystometry would likely show normal or near-normal bladder capacity and low detrusor contractions. The primary issue seems to be at the urethral level, not the bladder itself. Therefore, the findings on cystometry would support that her bladder is functioning normally, without significant residual volume or excessive contractions.
    </think>
    
    Based on the provided information and analysis:
    
    **Answer:**
    Cystometry would most likely reveal normal or near-normal bladder capacity and low detrusor contractions. The findings would indicate that the primary issue lies in the urethral function, as evidenced by the positive Q-tip test, rather than bladder-related problems. The absence of night-time leakage suggests that the bladder is not overfilled or overly sensitive, further supporting the conclusion that the bladder itself is functioning normally.<｜end▁of▁sentence｜>


>**Before starting fine-tuning — why are we fine-tuning in the first place?**
>
> Even without fine-tuning, our model successfully generated a chain of thought and provided reasoning before delivering the final answer. The reasoning process is encapsulated within the `<think>` `</think>` tags. So, why do we still need fine-tuning? The reasoning process, while detailed, was long-winded and not concise. Additionally, we want the final answer to be consistent in a certain style. 



## Fine-tuning step by step

### Step 1 — Update the system prompt 
We will slightly change the prompt style for processing the dataset by adding the third placeholder for the complex chain of thought column. `</think>`


```python
# Updated training prompt style to add </think> tag 
train_prompt_style = """Below is an instruction that describes a task, paired with an input that provides further context. 
Write a response that appropriately completes the request. 
Before answering, think carefully about the question and create a step-by-step chain of thoughts to ensure a logical and accurate response.

### Instruction:
You are a medical expert with advanced knowledge in clinical reasoning, diagnostics, and treatment planning. 
Please answer the following medical question. 

### Question:
{}

### Response:
<think>
{}
</think>
{}"""

```

### Step 2 — Download the fine-tuning dataset and format it for fine-tuning

We will use the Medical O1 Reasoninng SFT found here on [Hugging Face](https://huggingface.co/datasets/FreedomIntelligence/medical-o1-reasoning-SFT). From the authors: This dataset is used to fine-tune HuatuoGPT-o1, a medical LLM designed for advanced medical reasoning. This dataset is constructed using GPT-4o, which searches for solutions to verifiable medical problems and validates them through a medical verifier.


```python
# Download the dataset using Hugging Face — function imported using from datasets import load_dataset
dataset = load_dataset("FreedomIntelligence/medical-o1-reasoning-SFT","en", split = "train[0:500]",trust_remote_code=True) # Keep only first 500 rows
dataset
```


    README.md:   0%|          | 0.00/1.25k [00:00<?, ?B/s]



    medical_o1_sft.json:   0%|          | 0.00/74.1M [00:00<?, ?B/s]



    Generating train split:   0%|          | 0/25371 [00:00<?, ? examples/s]





    Dataset({
        features: ['Question', 'Complex_CoT', 'Response'],
        num_rows: 500
    })




```python
# Show an entry from the dataset
dataset[1]
```




    {'Question': 'A 45-year-old man with a history of alcohol use, who has been abstinent for the past 10 years, presents with sudden onset dysarthria, shuffling gait, and intention tremors. Given this clinical presentation and history, what is the most likely diagnosis?',
     'Complex_CoT': "Alright, let’s break this down. We have a 45-year-old man here, who suddenly starts showing some pretty specific symptoms: dysarthria, shuffling gait, and those intention tremors. This suggests something's going wrong with motor control, probably involving the cerebellum or its connections.\n\nNow, what's intriguing is that he's had a history of alcohol use, but he's been off it for the past 10 years. Alcohol can do a number on the cerebellum, leading to degeneration, and apparently, the effects can hang around or even appear long after one stops drinking.\n\nAt first glance, these symptoms look like they could be some kind of chronic degeneration, maybe something like alcoholic cerebellar degeneration, but hold on. This looks different. The symptoms just came on all of a sudden. Chronic degenerations typically have a more gradual onset.\n\nOkay, let’s reconsider this sudden nature. It’s making me think of something more acute, more rapid onset. Hmm, if we dig back into his history of drinking, there might have been some damage done, leading to nutritional deficiencies, like a lack of thiamine.\n\nWernicke’s encephalopathy is a classic possibility here. That condition pops up due to thiamine deficiency, often after a history of alcohol use. It’s known for causing ataxia, confusion, and eye movement issues. However, he’s not showing the full triad of symptoms; there's no mention of confusion or eye problems, so maybe it doesn’t fit perfectly.\n\nOh, wait a second, maybe we're missing something simpler. Given the acute nature of the symptoms, maybe this is more in line with something like a stroke. Sudden onset can definitely suggest a vascular event. With his alcohol history, he’s at risk for things like high blood pressure, which can increase stroke risk.\n\nIn particular, lacunar strokes can mess with motor coordination, speech, the works. These are small, but significant enough to cause these exact symptoms: dysarthria, tremors, and a shuffling gait.\n\nBut hang on, what if there’s another angle we’re missing? Chronic alcohol effects might still play a role here, just in a different way. There’s a condition called acquired hepatocerebral degeneration. This can happen in people with a history of liver disease due to alcohol, even years after they’ve quit. It can result in symptoms like these because of how substances get deposited in the brain.\n\nLinking this back to our patient, his history with alcohol could’ve led to some liver issues, and now, here we are with these symptoms showing up suddenly. Makes sense, right? So, considering everything, acquired hepatocerebral degeneration seems to fit quite nicely. That’s probably our most fitting diagnosis for this situation.",
     'Response': "Considering the clinical presentation of sudden onset dysarthria, shuffling gait, and intention tremors in a 45-year-old man with a history of alcohol use who has been abstinent for the past 10 years, the most likely diagnosis is acquired hepatocerebral degeneration.\n\nThis condition is associated with chronic liver disease, which can often be a consequence of long-term alcohol use. Despite the patient's abstinence from alcohol for a decade, previous alcohol use may have led to underlying liver dysfunction. This dysfunction, even if subclinical, can cause encephalopathy due to the accumulation of neurotoxic substances that affect the brain. The sudden onset of these neurological symptoms aligns with how acquired hepatocerebral degeneration can manifest, making it a probable diagnosis in this scenario."}



>**Next step is to structure the fine-tuning dataset according to train prompt style—why?**
>
> - Each question is paired with chain-of-thought reasoning and the final response.
> - Ensures every training example follows a consistent pattern.
> - Prevents the model from continuing beyond the expected response lengt by adding the EOS token.


```python
# We need to format the dataset to fit our prompt training style 
EOS_TOKEN = tokenizer.eos_token  # Define EOS_TOKEN which the model when to stop generating text during training
EOS_TOKEN
```




    '<｜end▁of▁sentence｜>'




```python
# Define formatting prompt function
def formatting_prompts_func(examples):  # Takes a batch of dataset examples as input
    inputs = examples["Question"]       # Extracts the medical question from the dataset
    cots = examples["Complex_CoT"]      # Extracts the chain-of-thought reasoning (logical step-by-step explanation)
    outputs = examples["Response"]      # Extracts the final model-generated response (answer)
    
    texts = []  # Initializes an empty list to store the formatted prompts
    
    # Iterate over the dataset, formatting each question, reasoning step, and response
    for input, cot, output in zip(inputs, cots, outputs):  
        text = train_prompt_style.format(input, cot, output) + EOS_TOKEN  # Insert values into prompt template & append EOS token
        texts.append(text)  # Add the formatted text to the list

    return {
        "text": texts,  # Return the newly formatted dataset with a "text" column containing structured prompts
    }
```


```python
# Update dataset formatting
dataset_finetune = dataset.map(formatting_prompts_func, batched = True)
dataset_finetune["text"][0]
```


    Map:   0%|          | 0/500 [00:00<?, ? examples/s]





    "Below is an instruction that describes a task, paired with an input that provides further context. \nWrite a response that appropriately completes the request. \nBefore answering, think carefully about the question and create a step-by-step chain of thoughts to ensure a logical and accurate response.\n\n### Instruction:\nYou are a medical expert with advanced knowledge in clinical reasoning, diagnostics, and treatment planning. \nPlease answer the following medical question. \n\n### Question:\nA 61-year-old woman with a long history of involuntary urine loss during activities like coughing or sneezing but no leakage at night undergoes a gynecological exam and Q-tip test. Based on these findings, what would cystometry most likely reveal about her residual volume and detrusor contractions?\n\n### Response:\n<think>\nOkay, let's think about this step by step. There's a 61-year-old woman here who's been dealing with involuntary urine leakages whenever she's doing something that ups her abdominal pressure like coughing or sneezing. This sounds a lot like stress urinary incontinence to me. Now, it's interesting that she doesn't have any issues at night; she isn't experiencing leakage while sleeping. This likely means her bladder's ability to hold urine is fine when she isn't under physical stress. Hmm, that's a clue that we're dealing with something related to pressure rather than a bladder muscle problem. \n\nThe fact that she underwent a Q-tip test is intriguing too. This test is usually done to assess urethral mobility. In stress incontinence, a Q-tip might move significantly, showing urethral hypermobility. This kind of movement often means there's a weakness in the support structures that should help keep the urethra closed during increases in abdominal pressure. So, that's aligning well with stress incontinence.\n\nNow, let's think about what would happen during cystometry. Since stress incontinence isn't usually about sudden bladder contractions, I wouldn't expect to see involuntary detrusor contractions during this test. Her bladder isn't spasming or anything; it's more about the support structure failing under stress. Plus, she likely empties her bladder completely because stress incontinence doesn't typically involve incomplete emptying. So, her residual volume should be pretty normal. \n\nAll in all, it seems like if they do a cystometry on her, it will likely show a normal residual volume and no involuntary contractions. Yup, I think that makes sense given her symptoms and the typical presentations of stress urinary incontinence.\n</think>\nCystometry in this case of stress urinary incontinence would most likely reveal a normal post-void residual volume, as stress incontinence typically does not involve issues with bladder emptying. Additionally, since stress urinary incontinence is primarily related to physical exertion and not an overactive bladder, you would not expect to see any involuntary detrusor contractions during the test.<｜end▁of▁sentence｜>"



### Step 3 — Setting up the model using LoRA

**An intuitive explanation of LoRA** 

Large language models (LLMs) have **millions or even billions of weights** that determine how they process and generate text. When fine-tuning a model, we usually update all these weights, which **requires massive computational resources and memory**.

LoRA (**Low-Rank Adaptation**) allows to fine-tune efficiently by:

- Instead of modifying all weights, **LoRA adds small, trainable adapters** to specific layers.  
- These adapters **capture task-specific knowledge** while leaving the original model unchanged.  
- This reduces the number of trainable parameters **by more than 90%**, making fine-tuning **faster and more memory-efficient**.  

Think of an LLM as a **complex factory**. Instead of rebuilding the entire factory to produce a new product, LoRA **adds small, specialized tools** to existing machines. This allows the factory to adapt quickly **without disrupting its core structure**.

For a more technical explanation, check out this tutorial by [Sebastian Raschka](https://www.youtube.com/watch?v=rgmJep4Sb4&t).

Below, we will use the `get_peft_model()` function which stands for Parameter-Efficient Fine-Tuning — this function wraps the base model (`model`) with LoRA modifications, ensuring that only specific parameters are trained.


```python
# Apply LoRA (Low-Rank Adaptation) fine-tuning to the model 
model_lora = FastLanguageModel.get_peft_model(
    model,
    r=16,  # LoRA rank: Determines the size of the trainable adapters (higher = more parameters, lower = more efficiency)
    target_modules=[  # List of transformer layers where LoRA adapters will be applied
        "q_proj",   # Query projection in the self-attention mechanism
        "k_proj",   # Key projection in the self-attention mechanism
        "v_proj",   # Value projection in the self-attention mechanism
        "o_proj",   # Output projection from the attention layer
        "gate_proj",  # Used in feed-forward layers (MLP)
        "up_proj",    # Part of the transformer’s feed-forward network (FFN)
        "down_proj",  # Another part of the transformer’s FFN
    ],
    lora_alpha=16,  # Scaling factor for LoRA updates (higher values allow more influence from LoRA layers)
    lora_dropout=0,  # Dropout rate for LoRA layers (0 means no dropout, full retention of information)
    bias="none",  # Specifies whether LoRA layers should learn bias terms (setting to "none" saves memory)
    use_gradient_checkpointing="unsloth",  # Saves memory by recomputing activations instead of storing them (recommended for long-context fine-tuning)
    random_state=3407,  # Sets a seed for reproducibility, ensuring the same fine-tuning behavior across runs
    use_rslora=False,  # Whether to use Rank-Stabilized LoRA (disabled here, meaning fixed-rank LoRA is used)
    loftq_config=None,  # Low-bit Fine-Tuning Quantization (LoFTQ) is disabled in this configuration
)
```

    Unsloth 2025.2.4 patched 32 layers with 32 QKV layers, 32 O layers and 32 MLP layers.


Now, we initialize `SFTTrainer`, a supervised fine-tuning trainer from `trl` (Transformer Reinforcement Learning), to fine-tune our model efficiently on a dataset.


```python
# Initialize the fine-tuning trainer — Imported using from trl import SFTTrainer
trainer = SFTTrainer(
    model=model_lora,  # The model to be fine-tuned
    tokenizer=tokenizer,  # Tokenizer to process text inputs
    train_dataset=dataset_finetune,  # Dataset used for training
    dataset_text_field="text",  # Specifies which field in the dataset contains training text
    max_seq_length=max_seq_length,  # Defines the maximum sequence length for inputs
    dataset_num_proc=2,  # Uses 2 CPU threads to speed up data preprocessing

    # Define training arguments
    args=TrainingArguments(
        per_device_train_batch_size=2,  # Number of examples processed per device (GPU) at a time
        gradient_accumulation_steps=4,  # Accumulate gradients over 4 steps before updating weights
        num_train_epochs=1, # Full fine-tuning run
        warmup_steps=5,  # Gradually increases learning rate for the first 5 steps
        max_steps=60,  # Limits training to 60 steps (useful for debugging; increase for full fine-tuning)
        learning_rate=2e-4,  # Learning rate for weight updates (tuned for LoRA fine-tuning)
        fp16=not is_bfloat16_supported(),  # Use FP16 (if BF16 is not supported) to speed up training
        bf16=is_bfloat16_supported(),  # Use BF16 if supported (better numerical stability on newer GPUs)
        logging_steps=10,  # Logs training progress every 10 steps
        optim="adamw_8bit",  # Uses memory-efficient AdamW optimizer in 8-bit mode
        weight_decay=0.01,  # Regularization to prevent overfitting
        lr_scheduler_type="linear",  # Uses a linear learning rate schedule
        seed=3407,  # Sets a fixed seed for reproducibility
        output_dir="outputs",  # Directory where fine-tuned model checkpoints will be saved
    ),
)

```


    Map (num_proc=2):   0%|          | 0/500 [00:00<?, ? examples/s]


## Step 4 — Model training! 

This should take around 30 to 40 minutes — we can then check out our training results on Weights and Biases


```python
# Start the fine-tuning process
trainer_stats = trainer.train()
```

    ==((====))==  Unsloth - 2x faster free finetuning | Num GPUs = 1
       \\   /|    Num examples = 500 | Num Epochs = 1
    O^O/ \_/ \    Batch size per device = 2 | Gradient Accumulation steps = 4
    \        /    Total batch size = 8 | Total steps = 60
     "-____-"     Number of trainable parameters = 41,943,040




    <div>

      <progress value='60' max='60' style='width:300px; height:20px; vertical-align: middle;'></progress>
      [60/60 20:04, Epoch 0/1]
    </div>
    <table border="1" class="dataframe">
  <thead>
 <tr style="text-align: left;">
      <th>Step</th>
      <th>Training Loss</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>10</td>
      <td>1.304200</td>
    </tr>
    <tr>
      <td>20</td>
      <td>1.283000</td>
    </tr>
    <tr>
      <td>30</td>
      <td>1.287700</td>
    </tr>
    <tr>
      <td>40</td>
      <td>1.226100</td>
    </tr>
    <tr>
      <td>50</td>
      <td>1.269700</td>
    </tr>
    <tr>
      <td>60</td>
      <td>1.221400</td>
    </tr>
  </tbody>
</table><p>



```python
# Save the fine-tuned model
wandb.finish()
```






<br>    <style><br>        .wandb-row {<br>            display: flex;<br>            flex-direction: row;<br>            flex-wrap: wrap;<br>            justify-content: flex-start;<br>            width: 100%;<br>        }<br>        .wandb-col {<br>            display: flex;<br>            flex-direction: column;<br>            flex-basis: 100%;<br>            flex: 1;<br>            padding: 10px;<br>        }<br>    </style><br><div class="wandb-row"><div class="wandb-col"><h3>Run history:</h3><br/><table class="wandb"><tr><td>train/epoch</td><td>▁▂▄▅▇██▁▂▄▅▇██</td></tr><tr><td>train/global_step</td><td>▁▂▄▅▇██▁▂▄▅▇██</td></tr><tr><td>train/grad_norm</td><td>█▂▂▁▂▂▂▃▃▃▃▃</td></tr><tr><td>train/learning_rate</td><td>█▇▅▄▂▁█▇▅▄▂▁</td></tr><tr><td>train/loss</td><td>█▃▃▂▂▂▂▂▂▁▁▁</td></tr></table><br/></div><div class="wandb-col"><h3>Run summary:</h3><br/><table class="wandb"><tr><td>total_flos</td><td>1.8014312853602304e+16</td></tr><tr><td>train/epoch</td><td>0.96</td></tr><tr><td>train/global_step</td><td>60</td></tr><tr><td>train/grad_norm</td><td>0.34937</td></tr><tr><td>train/learning_rate</td><td>0</td></tr><tr><td>train/loss</td><td>1.2214</td></tr><tr><td>train_loss</td><td>1.26536</td></tr><tr><td>train_runtime</td><td>1222.8197</td></tr><tr><td>train_samples_per_second</td><td>0.393</td></tr><tr><td>train_steps_per_second</td><td>0.049</td></tr></table><br/></div></div>



View run <strong style="color:#cdcd00">likely-bee-5</strong> at: <a href='https://wandb.ai/edzepeda/Fine-tune-DeepSeek-R1-Distill-Llama-8B%20on%20Medical%20COT%20Dataset_YouTube%20Walkthrough/runs/psnsdoh8' target="_blank">https://wandb.ai/edzepeda/Fine-tune-DeepSeek-R1-Distill-Llama-8B%20on%20Medical%20COT%20Dataset_YouTube%20Walkthrough/runs/psnsdoh8</a><br> View project at: <a href='https://wandb.ai/edzepeda/Fine-tune-DeepSeek-R1-Distill-Llama-8B%20on%20Medical%20COT%20Dataset_YouTube%20Walkthrough' target="_blank">https://wandb.ai/edzepeda/Fine-tune-DeepSeek-R1-Distill-Llama-8B%20on%20Medical%20COT%20Dataset_YouTube%20Walkthrough</a><br>Synced 5 W&B file(s), 0 media file(s), 0 artifact file(s) and 0 other file(s)



Find logs at: <code>./wandb/run-20250207_212900-psnsdoh8/logs</code>


## Step 5 — Run model inference after fine-tuning


```python
question = """A 61-year-old woman with a long history of involuntary urine loss during activities like coughing or sneezing 
              but no leakage at night undergoes a gynecological exam and Q-tip test. Based on these findings, 
              what would cystometry most likely reveal about her residual volume and detrusor contractions?"""

# Load the inference model using FastLanguageModel (Unsloth optimizes for speed)
FastLanguageModel.for_inference(model_lora)  # Unsloth has 2x faster inference!

# Tokenize the input question with a specific prompt format and move it to the GPU
inputs = tokenizer([prompt_style.format(question, "")], return_tensors="pt").to("cuda")

# Generate a response using LoRA fine-tuned model with specific parameters
outputs = model_lora.generate(
    input_ids=inputs.input_ids,          # Tokenized input IDs
    attention_mask=inputs.attention_mask, # Attention mask for padding handling
    max_new_tokens=1200,                  # Maximum length for generated response
    use_cache=True,                        # Enable cache for efficient generation
)

# Decode the generated response from tokenized format to readable text
response = tokenizer.batch_decode(outputs)

# Extract and print only the model's response part after "### Response:"
print(response[0].split("### Response:")[1])
```

    
    <think>
    Alright, let's think about this situation. We have a 61-year-old woman who's been dealing with involuntary urine loss during things like coughing or sneezing, but she's not leaking at night. This pattern sounds a lot like stress urinary incontinence, which is common in women her age. 
    
    Now, she's had a gynecological exam and a Q-tip test. I know the Q-tip test can help determine if there's urethral obstruction or not. If it's negative, that's a good sign because it suggests her urethra is open, which is what we're looking for in stress incontinence. 
    
    So, what happens with cystometry in someone like her? Cystometry is a test that looks at how the bladder behaves when it's filled. It can tell us two main things: the residual volume of urine left after emptying the bladder and how the detrusor muscle behaves. 
    
    In stress incontinence, the bladder is usually overactive, meaning it contracts too strongly and doesn't wait for the bladder to empty completely. This is why she experiences urine loss during activities like coughing. 
    
    When we look at the cystometry results, we'd expect to see a low residual volume. That's because the bladder doesn't hold much urine after emptying. Then, there's the overactive detrusor contractions, where the bladder muscle contracts too strongly and quickly, leading to the involuntary release of urine. 
    
    So, putting it all together, cystometry should show a low residual volume and overactive detrusor contractions. This matches what we'd expect from stress urinary incontinence. It's all about how the bladder behaves and doesn't hold onto urine effectively.
    </think>
    In a 61-year-old woman experiencing involuntary urine loss during activities such as coughing or sneezing but not at night, the most likely findings in cystometry would be a low residual volume and overactive detrusor contractions. This pattern aligns with stress urinary incontinence, where the bladder is overactive, leading to premature contractions and incomplete emptying. Therefore, the bladder would typically show a low residual volume and overactive detrusor contractions during the test.<｜end▁of▁sentence｜>



```python
question = """A 59-year-old man presents with a fever, chills, night sweats, and generalized fatigue, 
              and is found to have a 12 mm vegetation on the aortic valve. Blood cultures indicate gram-positive, catalase-negative, 
              gamma-hemolytic cocci in chains that do not grow in a 6.5% NaCl medium. 
              What is the most likely predisposing factor for this patient's condition?"""

# Tokenize the input question with a specific prompt format and move it to the GPU
inputs = tokenizer([prompt_style.format(question, "")], return_tensors="pt").to("cuda")

# Generate a response using LoRA fine-tuned model with specific parameters
outputs = model_lora.generate(
    input_ids=inputs.input_ids,          # Tokenized input IDs
    attention_mask=inputs.attention_mask, # Attention mask for padding handling
    max_new_tokens=1200,                  # Maximum length for generated response
    use_cache=True,                        # Enable cache for efficient generation
)

# Decode the generated response from tokenized format to readable text
response = tokenizer.batch_decode(outputs)

# Extract and print only the model's response part after "### Response:"
print(response[0].split("### Response:")[1])
```

    
    <think>
    Okay, so we have a 59-year-old guy coming in with a fever, chills, night sweats, and feeling really tired. That sounds pretty classic for an infection, maybe something like endocarditis? And, there's a vegetation on his aortic valve measuring 12 mm. That's definitely a big clue. 
    
    Now, let's think about what kind of bacteria this could be. Blood cultures show gram-positive, catalase-negative, gamma-hemolytic cocci in chains that don't grow in a 6.5% NaCl medium. Hmm, that's quite specific. These are not your typical Streptococcus species, like the ones that can be salt-loving. 
    
    Oh, wait, that's right. These bacteria are known as Enterococcus faecalis. They're a bit unique because they don't grow in high salt solutions, which helps differentiate them from other gram-positive cocci like Streptococcus. 
    
    Now, why would he have this infection? It's not just random. There must be a reason behind it. Let's think about what could be a risk factor for Enterococcus faecalis endocarditis. 
    
    A lot of the time, these infections happen because of some underlying health issues. For example, if someone has a heart condition like heart valve disease, they might have a higher risk of getting an infection. 
    
    But wait, he's got a vegetation on his aortic valve. That alone suggests he has heart valve disease. It's like a red flag saying, 'Hey, this person has some kind of heart problem.' 
    
    So, putting it all together, it seems like his heart condition is the main reason for this infection. It's like the door that allowed the bacteria to get in and cause trouble. 
    
    In the end, it looks like his heart valve disease is the most likely reason for this Enterococcus faecalis endocarditis. It's the predisposing factor that made this infection possible.
    </think>
    The most likely predisposing factor for this patient's condition, given the presence of Enterococcus faecalis endocarditis, is the underlying heart valve disease. The vegetation on the aortic valve suggests that he has a heart valve condition, which increases the risk of endocarditis due to the presence of a foreign body (the vegetation) that allows the bacteria to adhere and proliferate.<｜end▁of▁sentence｜>

