---
title: "Pipenv: The virtual environment manager you DON'T know"
date: "2020-08-15"
categories:
- "python"

coverImage: "images/Tutorial-de-pipenv.jpg"
coverImageCredits: "credits https://www.pexels.com/es-es/@rodnae-prod/"
description: "I teach you how to install Pipenv, create a Pipfile, set environment variables and what you need to know about this virtual environment manager."
keywords:
- "python"
- "pipenv"

authors:
- Eduardo Zepeda
---

Since I started using Python I use virtualenv and pip to manage virtual environments. But while reading [Django for Professionals](/en/django-for-professionals-review/) I found out that there was a better tool than pip and virtualenv, called Pipenv (they didn't get too complicated with the name). Pipenv has features that make it much more robust and easier to use than virtualenv. In this step-by-step Pipenv tutorial, I will explain the installation, usage, file handling and basic commands of this tool.

First, if you have already heard about virtual environments but don't know what they are for I have a post where I talk about [virtual environments in Python](/en/why-should-you-use-a-virtual-environment-in-python/). On the other hand, if the name _virtualenv_ sounds a bit esoteric to you you might want to read about [virtualenv, the Python virtual environment manager](/en/python-virtualenv-linux-basic-tutorial/)

## Pipenv vs virtualenv

You probably already know that _pip_ is used to handle packages, but we usually want to have the packages of each of our applications isolated from the rest of the system, so we usually combine it with _virtualenv_.

_Pip_ and _virtualenv_ are used together to maintain the dependencies of a virtual environment, but pip can produce different environments, even with the same _requirements.txt_ file, this is something we want to avoid. The creator of _pipenv_ designed his tool trying to solve this problem.

Pipenv is in charge of joining _pip_ and _virtualenv_ in **one tool**, besides making sure that the file where the dependencies that are generated are listed produces **exactly the same package configuration**, pipenv also allows to load environment variable files directly from _.env_ files that are in the working folder where we are.

## Installation and use of pipenv

If you are on Debian or a derivative distribution (such as Ubuntu) you can try your luck by trying to install it directly from the repositories.

```bash
sudo apt install pipenv
```

If it is not in the repositories we can also make use of _pip_, which is already installed in most distributions.

```bash
sudo pip install pipenv
```

Once installed we can start installing packages using the _install_ option, for this example let's try with a specific version of Django.

```bash
pip install django===3.0.1
```

If we do an _ls_ we can notice that two files _Pipfile_ and _Pipfile.lock_ were created.

```bash
ls
Pipfile Pipfile.lock
```

What is in these files? I will explain it below. First let's go to the Pipfile file.

## What's Pipfile for in Pipenv?

Let's start by looking at the contents of the _Pipfile_ file. If you have any difficulty using the command line I suggest you check the entries where I talk about the [basic GNU/Linux commands](/en/linux-basic-commands-grep-ls-cd-cat-cp-rm-scp//).

```bash
cat Pipfile
[[source]]
name = "pypi"
url = "https://pypi.org/simple"
verify_ssl = true

[dev-packages]

[packages]
django = "===3.0.1"

[requires]
python_version = "3.7"
```

Analyzing the content we can see that this file shows several categories

* source: the source of our packages, with its name, url and if encryption was used.
* dev-packages: the development packages, at this moment it is empty.
* packages: the packages that we have installed and that will be used in the project
* requires: the Python version required for the project, it is specified automatically or you can do it yourself.

```bash
pip install --dev pytest
```

If we cat again we will see that under the _[dev-packages]_ section _pytest_ already appears as a dependency.

```bash
cat Pipfile
[[source]]
name = "pypi"
url = "https://pypi.org/simple"
verify_ssl = true

[dev-packages]
pytest = "*"

[packages]
django = "===3.0.1"

[requires]
python_version = "3.7"
```

## What's Pipfile.lock for in Pipenv?

Now let's do a _cat_ to _Pipfile.lock_.

```javascript
cat Pipfile.lock
{
    "_meta": {
        "hash": {
            "sha256": "c2bf0d0008c675fc08df79a9cdb6b94773be0defa60d2c5b8aae0142358aa574"
        },
        "pipfile-spec": 6,
        "requires": {
            "python_version": "3.7"
        },
        "sources": [
            {
                "name": "pypi",
                "url": "https://pypi.org/simple",
                "verify_ssl": true
            }
        ]
    },
    "default": {
        "asgiref": {
            "hashes": [
                "sha256:7e51911ee147dd685c3c8b805c0ad0cb58d360987b56953878f8c06d2d1c6f1a",
                "sha256:9fc6fb5d39b8af147ba40765234fa822b39818b12cc80b35ad9b0cef3a476aed"
            ],
            "markers": "python_version >= '3.5'",
            "version": "==3.2.10"
        },
        "django": {
            "hashes": [
                "sha256:315b11ea265dd15348d47f2cbb044ef71da2018f6e582fed875c889758e6f844",
                "sha256:b61295749be7e1c42467c55bcabdaee9fbe9496fdf9ed2e22cef44d9de2ff953"
            ],
            "index": "pypi",
            "version": "===3.0.1"
        },
...
```

The file may look very flashy, but it is only the hashes of the packages that we install, as well as their dependencies, this way we make sure that the versions we install are the correct ones and also **will allow us to get exactly the same package configuration** if we take these files and take them to another computer.

### How to visualize the dependencies graphically?

If we now use the _pipenv graph_ command it will generate a detailed and visually friendly representation of the dependencies we have installed.

```bash
pipenv graph
Django==3.0.1
  - asgiref [required: ~=3.2, installed: 3.2.10]
  - pytz [required: Any, installed: 2020.1]
  - sqlparse [required: >=0.2.2, installed: 0.3.1]
pytest==5.4.3
  - attrs [required: >=17.4.0, installed: 19.3.0]
  - importlib-metadata [required: >=0.12, installed: 1.7.0]
    - zipp [required: >=0.5, installed: 3.1.0]
  - more-itertools [required: >=4.0.0, installed: 8.4.0]
  - packaging [required: Any, installed: 20.4]
    - pyparsing [required: >=2.0.2, installed: 2.4.7]
    - six [required: Any, installed: 1.15.0]
  - pluggy [required: >=0.12,<1.0, installed: 0.13.1]
    - importlib-metadata [required: >=0.12, installed: 1.7.0]
      - zipp [required: >=0.5, installed: 3.1.0]
  - py [required: >=1.5.0, installed: 1.9.0]
  - wcwidth [required: Any, installed: 0.2.5]
```

### Generate a Pipfile.lock file

We can also generate a _Pipfile.lock_ file from a _Pipfile_ file. Let's delete the _Pipfile.lock_ file and generate a new one

```bash
rm Pipfile.lock
```

Now let's run the _pipenv lock_ command

```bash
pipenv lock
Locking [dev-packages] dependencies…
Building requirements...
Resolving dependencies...
✔ Success! 
Locking [packages] dependencies…
Building requirements...
Resolving dependencies...
✔ Success! 
Updated Pipfile.lock (88888)!
```

At the end of the process we will have our _Pipfile.lock_ file again in the same folder

## Finding a virtual environment with pipenv

All good up to this point, but we are not yet inside our virtual environment, moreover, we only have the _Pipfile_ and _Pipfile.lock_ files in our current folder. And the virtual environment? Well, pipenv places the virtual environment in another location, to find it out we can use the _--venv_ option.

```bash
pipenv --venv
/home/usuario/.local/share/virtualenvs/proyecto-HHqROqC2
```

And now, instead of locating the activate file manually in the above path, as we did with [virtualenv](/en/python-virtualenv-linux-basic-tutorial/), we can activate the virtual environment using the _pipenv shell_ command and this will be done for us automatically

```bash
pipenv shell
```

As with [virtualenv](/en/python-virtualenv-linux-basic-tutorial/) we can see that the prompt will change, indicating that we are inside the virtual environment

## Environment variables with Pipenv

One of the features that makes pipenv different is that it allows you to load environment variables directly from a _.env_ file when you enter a virtual environment. Let's leave the virtual environment for a moment to create the file and load environment variables.

```bash
exit
```

Now that the prompt is back to normal, we will create a _.env_ file with environment variables. I will do this in one step using the _echo_ command and redirecting the result to the file, but if you feel more comfortable using the _touch_ command and then opening it to add the contents you can also do this and it is fine.

```bash
echo "SPAM=eggs" > .env
```

If we do an _ls_ we can see that we now have our _.env_ file in the same folder as _Pipfile_ and _Pipfile.lock_.

```bash
ls -a
.  ..  .env Pipfile Pipfile.lock
```

Now let's reload our virtual environment

```bash
pipenv shell
Loading .env environment variables…
Launching subshell in virtual environment…
 . /home/usuario/.local/share/virtualenvs/proyecto-HHqROqC2/bin/activate
```

The prompt will change again, and, if we run the _printenv_ command we can see that our environment variable was added perfectly.

```bash
printenv
...
SPAM=eggs
...
```

## Uninstalling packages in pipenv

To uninstall packages we will use the _pipenv uninstall_ command and the package name.

```bash
pipenv uninstall pytest
Uninstalling pytest…
Found existing installation: pytest 5.4.3
Uninstalling pytest-5.4.3:
  Successfully uninstalled pytest-5.4.3

Removing pytest from Pipfile…
Locking [dev-packages] dependencies…
Locking [packages] dependencies…
Building requirements...
Resolving dependencies...
✔ Success! 
Updated Pipfile.lock (3f348b)!
```

If we want to uninstall all packages and leave our environment as new we can use the _--all_ option instead of specifying a package name. This will delete all files in the virtual environment but leave the _Pipfile_ completely safe.

```bash
pipenv uninstall --all
Un-installing all [dev-packages] and [packages]…
Found 13 installed package(s), purging…
...
Environment now purged and fresh!
```

If we use the _--all-dev_ option, it will remove all development dependencies, both from the virtual environment and from our _Pipfile_.

```bash
pipenv uninstall --all-dev
Un-installing [dev-packages]…
Locking [dev-packages] dependencies…
Locking [packages] dependencies…
Building requirements...
Resolving dependencies...
✔ Success! 
Updated Pipfile.lock (65a03c)!
```

## Executing commands in virtual environment with pipenv

We can also execute commands directly in the virtual environment without being inside. Exit the virtual environment if you are inside and make sure the prompt has returned to normal before executing the next command.

```bash
pipenv run pip install requests
Loading .env environment variables…
Collecting requests
  Downloading requests-2.24.0-py2.py3-none-any.whl (61 kB)
     |████████████████████████████████| 61 kB 53 kB/s 
Collecting idna<3,>=2.5
  Downloading idna-2.10-py2.py3-none-any.whl (58 kB)
     |████████████████████████████████| 58 kB 641 kB/s 
Collecting chardet<4,>=3.0.2
  Using cached chardet-3.0.4-py2.py3-none-any.whl (133 kB)
Collecting certifi>=2017.4.17
  Downloading certifi-2020.6.20-py2.py3-none-any.whl (156 kB)
     |████████████████████████████████| 156 kB 6.1 MB/s 
Collecting urllib3!=1.25.0,!=1.25.1,<1.26,>=1.21.1
  Using cached urllib3-1.25.9-py2.py3-none-any.whl (126 kB)
Installing collected packages: idna, chardet, certifi, urllib3, requests
Successfully installed certifi-2020.6.20 chardet-3.0.4 idna-2.10 requests-2.24.0 urllib3-1.25.9
```

The previous command left us with the requests package and its dependencies installed in our virtual environment, however the _Pipfile_ and _Pipfile.lock_ file **were not updated.** To delete all those installed packages not found in the two previous files there is _pipenv clean_.

## Clean our virtual environment in pipenv

We can also clean our virtual environment of all those packages that are not specified inside our _Pipfile.lock_ file using _clean_.

```bash
pipenv clean
Uninstalling urllib3…
Uninstalling idna…
Uninstalling requests…
Uninstalling chardet…
Uninstalling certifi…
```

Ready, our environment does not contain any installed package, however it still exists.

## Deleting a virtual environment in pipenv

To delete a virtual environment we will use the _--rm_ option followed by the _pipenv_ command. Note that pipenv will detect the virtual environment to be removed by extracting the information from the folder we are in, so make sure twice that you are in the correct folder.

```bash
pipenv --rm
Removing virtualenv (/home/usuario/.local/share/virtualenvs/prueba-HHqROqC2)…
```

Ready! The virtual environment has been completely removed.

## Alternatives to Pipenv
Pipenv may not convince you, you probably prefer to try another virtual environment manager.

- Conda
- Poetry (I've used it and it's quite good)
- Hatch

If you want to know more about pipenv functions you can visit its [official documentation](https://pipenv-es.readthedocs.io/es/latest/)