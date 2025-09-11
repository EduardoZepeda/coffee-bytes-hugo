---
aliases:
- /en/python-virtualenv-linux-basic-tutorial/
authors:
- Eduardo Zepeda
categories:
- python
coverImage: images/tutorial_basico_virtualenv.jpg
date: '2019-07-15'
description: Learn how to user virtualenv on GNU/Linux, the best known python tool
  for managing virtual environments visit this tutorial.
keywords:
- python
- linux
title: Python virtualenv linux basic tutorial
---

If you have no idea what a virtual environment is for, I have a post where I explain what [virtual environments in Python]({{< ref path="/posts/python/por-que-usar-un-entorno-virtual-en-python/index.md" lang="en" >}}) are for. Today I'm here to bring you a little Python virtualenv tutorial where we'll install a couple of packages in a virtual environment and see how they behave. Make sure you have [Python](https://www.python.org/#?) and [Pip](https://pip.pypa.io/en/stable/installing/#?) installed because we will need them.

## Preparations for using virtualenv

Let's start first by creating a new directory, you can put it wherever you prefer.

```bash
mkdir entornoVirtual; cd entornoVirtual
```

Once we are inside this new directory we will verify our Python installation:

{{<ad0>}}

```bash
Python3
```

Inside the Python interpreter we will try to import the _requests_ library, used to make web requests:

```bash
>>> import requests
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ImportError: No module named 'requests'
```

As we do not have it installed in our operating system we get an error, of course, how smart we are. Let's exit the Python interpreter:

```bash
>>>exit()
```

We could install _requests_ in our operating system, but that would force us to always use the same version, so instead we will install virtualenv, to be able to use virtual environments. To do this we will use _pip_.

```bash
sudo pip install virtualenv
pip3 install virtualenv
Collecting virtualenv
  Downloading https://files.pythonhosted.org/packages/db/9e/df208b2baad146fe3fbe750eacadd6e49bcf2f2c3c1117b7192a7b28aec4/virtualenv-16.7.2-py2.py3-none-any.whl --(3.3MB)
    100% |████████████████████████████████| 3.3MB 3.6MB/s 
Installing collected packages: virtualenv
Successfully installed virtualenv-16.7.2
```

{{<ad1>}}

## Create a virtual environment in python

To create a virtual environment we will use the _virtualenv_ command, specify a version of _Python_ with the _-p_ option and give a name to our virtual environment, for the sake of simplicity I will call it _'virtual'_, but you can call it whatever you want.

```bash
virtualenv -p python3 virtual
Running virtualenv with interpreter
Already using interpreter /usr/bin/python3
Using base prefix '/usr'
New python executable in /tu/python/ruta/virtual/bin/python3
Also creating executable in /tu/python/ruta/virtual/bin/python
Installing setuptools, pip, wheel...
done.
```

Once the command has finished executing, a folder will be created in our current directory. This folder contains all the files necessary to be able to use the virtual environment. The packages that we install while we are using the virtual environment will go inside that folder. I have abbreviated the contents for the sake of simplicity, but you can check the inside of the folder yourself to get to know it completely.

{{<ad2>}}

```bash
└── virtual
    ├── bin
    │   ├── activate
    │   ├── activate.csh
    │   ├── activate.fish
    │   ├── activate.ps1
    │   ├── activate_this.py
    │   ├── activate.xsh
    │   ├── easy_install
    │   ├── easy_install-3.5
    │   ├── pip
    │   ├── pip3
    │   ├── pip3.5
    │   ├── python -> python3
    │   ├── python3
    │   ├── python3.5 -> python3
    │   ├── python-config
    │   └── wheel
    ├── include
    │   └── python3.5m -> /usr/include/python3.5m
    └── lib
        └── python3.5
            ├── abc.py -> /usr/lib/python3.5/abc.py
            ├── ...
```

## Activate a virtual environment

In the above scheme the important part is the file called _activate_, which we will use to activate our virtual environment as follows. Remember to replace the word virtual if you named your virtual environment differently:** **

```bash
source virtual/bin/activate
```

If the previous command was executed without problems, we will be able to see how the interpreter of our terminal changed:

But it is not only the appearance of the terminal that has changed. We can also see that we are now running our python3 command from another location:

{{<ad3>}}

```bash
which python3
 /tu/python/ruta/virtual/bin/python3
```

## Installing a package in a virtual environment

As long as the interpreter looks like this, all packages we install using pip will be installed in our virtual environment and administrator permissions will no longer be required, note the absence of the _sudo_ command:

```bash
pip install requests
Collecting requests
  Downloading https://files.pythonhosted.org/packages/51/bd/23c926cd341ea6b7dd0b2a00aba99ae0f828be89d72b2190f27c11d4b7fb/requests-2.22.0-py2.py3-none-any.whl (57kB)
     |████████████████████████████████| 61kB 690kB/s 
Collecting certifi>=2017.4.17 (from requests)
  Downloading https://files.pythonhosted.org/packages/69/1b/b853c7a9d4f6a6d00749e94eb6f3a041e342a885b87340b79c1ef73e3a78/certifi-2019.6.16-py2.py3-none-any.whl --(157kB)
     |████████████████████████████████| 163kB 1.2MB/s 
Collecting chardet<3.1.0,>=3.0.2 (from requests)
  Using cached https://files.pythonhosted.org/packages/bc/a9/01ffebfb562e4274b6487b4bb1ddec7ca55ec7510b22e4c51f14098443b8/chardet-3.0.4-py2.py3-none-any.whl
Collecting urllib3!=1.25.0,!=1.25.1,<1.26,>=1.21.1 (from requests)
  Downloading https://files.pythonhosted.org/packages/e6/60/247f23a7121ae632d62811ba7f273d0e58972d75e58a94d329d51550a47d/urllib3-1.25.3-py2.py3-none-any.whl (150kB)
     |████████████████████████████████| 153kB 1.7MB/s 
Collecting idna<2.9,>=2.5 (from requests)
  Using cached https://files.pythonhosted.org/packages/14/2c/cd551d81dbe15200be1cf41cd03869a46fe7226e7450af7a6545bfc474c9/idna-2.8-py2.py3-none-any.whl
Installing collected packages: certifi, chardet, urllib3, idna, requests
Successfully installed certifi-2019.6.16 chardet-3.0.4 idna-2.8 requests-2.22.0 urllib3-1.25.3
```

The package that was installed went to the folder that was created by executing the _virtualenv:_ command.

```bash
...
            │   ├── requests
            │   │   ├── adapters.py
            │   │   ├── api.py
            │   │   ├── auth.py
            │   │   ├── certs.py
            │   │   ├── compat.py
...
```

Now let's enter the Python interpreter:

```bash
Python3
```

If all goes well we should be able to import the _requests_ package:

```bash
>>> import requests
>>>
```

We no longer get the error message when importing! Now we can use it freely and the best thing is that the package is in the folder where we are working, not in the operating system. So, if necessary, we can work with different versions of requests easily, each in its own virtual environment.

## Backing up packages from a virtual environment

Now that we are in our virtual environment and have installed a package, we may want to back up our package list, in case we ever want to reinstall packages from our current virtual environment. For this _pip_ is perfect. By running _pip_, followed by the word _freeze_ and sending that information to a file we will have a file with a list of the installed packages:

```bash
pip freeze > requirements.txt
```

With the above file created we can install our packages in any other virtual environment we have using _pip_. Note the absence of the _sudo_ command.

```bash
pip install -r requirements.txt
```

## Deactivate a virtual environment

We are now going to leave the virtual environment we have created. Remember that we used **activate** to enter the virtual environment? Well, we just need to use the _deactivate_ command in our terminal.

```bash
deactivate
```

Notice how our terminal has returned to its previous state. Now, just to corroborate that everything went well, let's enter our Python interpreter again,

```bash
Python3
```

We will notice that the _requests_ package is **NOT installed**; all the changes we made were made only in our virtual environment, not in the operating system.

```bash
>>> import requests
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ImportError: No module named 'requests'
```

## Delete a virtual environment

If you want to delete the virtual environment completely, simply delete the directory where the virtual environment was created. This will leave the folder as it was and all packages that were installed inside the virtual environment will be lost. **Please use this command with caution, avoid deleting the root directory.

```bash
rm -rf EntornoVirtual/
```

## Pipenv

There is another package that joins pip and virtualenv, it allows you to manage virtual environments quite easily and has many improvements over virtualenv. If you want to know more about it visit my [tutorial where I explain what it is and how to use Pipenv](/en/python/pipenv-the-virtual-environment-manager-you-dont-know/).