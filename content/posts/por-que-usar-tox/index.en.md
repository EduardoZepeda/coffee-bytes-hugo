---
title: "Testing with tox in Python, tutorial from scratch"
date: "2019-06-18"
categories:
- "python"
- "testing"

coverImage: "images/porque_deberias_usar_tox.jpg"
description: "Learn that it is tox, as it is installed, as tox.ini files are used and how to configure it to create safer tests in Python."
keywords:
- "tox"
- "python"
- "testing"

authors:
- Eduardo Zepeda
---

Previously I briefly discussed [unittest, coverage, mock, nose, nose, pytest and other testing tools in Python](/en/unittest-python-are-python-tests-worthwhile/). You are probably wondering then why do we need more libraries? In this post we are going to talk a bit about tox, a testing tool for testing code in different versions of Python.

## What is Tox for?

Imagine you are writing a small application for the general public. All your code tests pass, the application works perfectly.

After a few days people contact you and let you know that your application crashes, but how, all the tests pass and you have personally tested it yourself. After finding out a bit about the problem you realize that the people using it have the newest version of Python. Apparently the code in the new version changed and made your application unusable in the new versions. But your problems don't end there, there are other users with outdated versions of Python who also have problems.

You decide to test your application with the new versions, but you realize that it's a pain, there are too many versions of Python, you would have to test in each one of them. [Tox](https://tox.readthedocs.io/en/latest/#) does just that for you.

Tox allows you to test your code in different environments, with Python 2.7, Python 3.5, Python 3.6, Python 3.7, with the versions you prefer. That way you can test with which Python versions your code works automatically and write it in the documentation of your application.

## How to install and use tox

Let's briefly test the Tox functionality. To start with, install Tox, if you can do it in a virtual environment, all the better.

```bash
pip install tox
```

## Requirements for using tox

In order to run tox we will need a tox.ini file, a setup.py file and a python file starting with 'test_' .

## Create a tox.ini file with tox-quickstart

One way to create the file needed to use tox is by means of the tox-quickstart command. Tox will ask us several questions and will automatically generate the tox.ini file we need for testing.

```bash
tox-quickstart
```

We will select number 4 to choose the Python versions ourselves and answer with 'Y' to Python 2.7 and Python 3.5 version.

```bash
What Python versions do you want to test against?
            [1] py36
            [2] py27, py36
            [3] (All versions) py27, py34, py35, py36, pypy, jython
            [4] Choose each one-by-one
> Enter the number of your choice [3]:
```

When it asks us for the commands to run the tests we will leave the default command, which is pytest, so we just press ENTER.

```bash
What command should be used to test your project? Examples:            - pytest
"
            - python -m unittest discover
            - python setup.py test
            - trial package.module
> Type the command to run your tests [pytest]:
```

When it asks us for the list of dependencies we have for our project, separated by a comma, we will write only 'mock', without the quotation marks.

```bash
What extra dependencies do your tests have?
default dependencies are: ['pytest']
> Comma-separated list of dependencies:
```

Ready, we have our tox.ini file ready to use that you can see below.

The file specifies the following; the versions to be used in the test, in this case Python 2.7 (py27) and Python 3.5 (py35); the dependencies, mock and pytest; and the command with which the tests will be carried out, it will use the pytest library. All sections are customizable and you can use other commands such as 'coverage' or whatever you can think of.

```ini
# tox (https://tox.readthedocs.io/) is a tool for running tests
# in multiple virtualenvs. This configuration file will run the
# test suite on all supported python versions. To use it, "pip install tox"
# and then run "tox" from this directory.

[tox]
envlist = py27, py35

[testenv]
deps =
    mock
    pytest
commands =
    pytest
```

## Create a setup.py file

Now we will create a simple setup.py file, nothing too sophisticated, just the basics to be able to carry out the tests.

```python
# setup.py
from distutils.core import setup

setup(name='testing',
      version='1.0',
      description='Tox testing',
      author='Eduardo zepeda',
      author_email='hello@eduardozepeda.dev',
      url='https://coffeebytes.dev',
     )
```

## The test file starting with 'test_'.

We will use code from the previous entry. It is a fairly simple code that connects to example.org and returns the response code from the server. The test only checks that the response code is equal to 200. We are using the mock library to patch the function so that the response code is always 200 and we don't need an internet connection to test.

```python
# test_example.py
import unittest
import urllib.request

from mock import patch

class ExampleResponseGetter(object):

    def retrieveStatusCode(self):
        statusCode = urllib.request.urlopen('http://example.org').status
        return statusCode

    def handleError(self):
        pass

class TestWebPaymentRequest(unittest.TestCase):

    @patch('urllib.request.urlopen')
    def testHttpResponse(self, mockedStatus):
        mockedStatus.return_value.status = 200
        StatusRetriever = ExampleResponseGetter()
        responseStatus = StatusRetriever.retrieveStatusCode()
        self.assertEqual(200, responseStatus)

if __name__ == '__main__':
    unittest.main()
```

## How to execute tox?

Once we have the setup.py, tox.ini and test_example.py files, we will run Tox and it will test our code in Python 2.7 and Python 3.5.

```bash
tox
```

Our code failed the tests for Python 2.7! This error happens because the urllib module was split into several modules in Python 3, so the urllib.request library does not exist in Python 2.7. This makes our code incompatible with Python 2.7. On the other hand, our test was successful with Python 3.5.

```bash
test_example.py:2: in <module>
    import urllib.request
E ImportError: No module named request

...
==========1 passed in 0.26 seconds==========
_____________ summary _____________
ERROR:   py27: commands failed
  py35: commands succeeded
```

We will now correct the code so that it passes the tests

To make the code compatible with Python 2.7 there are several things we can do, we will do a little tinker trick with imports. The urllib module in python 2.7 has the urlopen method, which is the one we need for the test to run.

```python
# test_example.py
import unittest
try:
    from urllib.request import urlopen
    route = 'urllib.request.urlopen'
except:
    from urllib import urlopen
    route = 'urllib.urlopen'

from mock import patch

class ExampleResponseGetter(object):

    def retrieveStatusCode(self):
        statusCode = urlopen('http://example.org').code
        return statusCode

    def handleError(self):
        pass

class TestWebPaymentRequest(unittest.TestCase):

    @patch(route)
    def testHttpResponse(self, mockedStatus):
        mockedStatus.return_value.status = 200
        StatusRetriever = ExampleResponseGetter()
        responseStatus = StatusRetriever.retrieveStatusCode()
        self.assertEqual(200, responseStatus)

if __name__ == '__main__':
    unittest.main()
```

First of all let's import the urllib.request library by encapsulating it in a try, if we are in a version other than Python 3 the import will fail. We catch the exception and import the equivalent of the Python 2.7 method and, in each case, define the path that mock needs to patch the method. This way the tests should pass without a problem. Let's run Tox again and see if it works.

```bash
...
============ 1 passed in 0.28 seconds ============
____________________ summary ____________________
  py27: commands succeeded
  py35: commands succeeded
  congratulations :)
```

Testing with tox was successful this time, we now know that our code works perfectly in both Python 2.7 and Python 3.5.