---
aliases:
- /unittest-python-are-python-tests-worthwhile/
- /en/unittest-python-are-python-tests-worthwhile/
authors:
- Eduardo Zepeda
categories:
- python
- testing
coverImage: images/porque_deberias_incorporar_test_a_tu_codigo.jpg
date: '2019-06-11'
description: Tests are a waste, right? Go here and learn about unittest, coverage,
  mock and other popular python tools for testing.
keywords:
- testing
- python
title: Unittest python are python tests worthwhile?
---

Long ago, when I started programming I thought that testing code was a waste of time. Why did I need to write more code? python unittest? mock? I could just read the code, see the places where the code might fail and handle the problem with a try and an except (or the equivalent in another language). I also thought that, aside from syntax errors, no errors would be generated in the flow of the code if one wrote carefully enough. The first programming book I read had a section devoted entirely to testing and I didn't understand what all the fuss was about. why should I incorporate tests into my Python code? It wasn't long before I realized how wrong I was. unittest python

## Testing saves time, lots of time

The code we write increases in size every day, sometimes it also decreases in pursuit of better performance or abstraction, we remove methods that are no longer necessary, we shorten very long methods, we remove unnecessary comments. The code changes and with each of these changes there is the possibility that the code fails to execute; when the complete code is a few lines there is no problem, but when the code is long we do have a problem, we have to find the error and correct it, and sometimes the error does not manifest itself until the code has increased in size.

Sometimes testing the code manually takes a long time and, in many cases, even requires the input of a user or the response of an external web page to a previous web request made by us, this complicates the testing. With tests we can emulate the result of the responses, the input of the users, the result of the functions or methods and, all this, in fractions of a second, without the need to carry out a manual testing process that would take much more time.

{{<ad1>}}

## Testing is an insurance against failure

When there are no tests and the code is being written by a team, every contribution made by a contributor is a potential bug. If a change is implemented and an error appears when executing the code, you will have to find out what went wrong and revert the change. If the error manifests itself after several collaborations made by the team, the loss of time is magnified, since the collaborations have to be undone to correct the error and then implemented again. Proper testing ensures that **after each change in the code it will continue to perform its tasks correctly.**.

## unittest python and other popular testing tools

There are many testing tools and they are different for each language. Here I will list some of the most popular ones for Python.

### Unittest

Unittest is the most common testing tool, powerful and flexible. The following is an example of its use:

{{<ad2>}}

```python
# testing.py
import unittest
from urllib.request import urlopen

class ExampleResponseGetter():

    def retrieveStatusCode(self):
        statusCode = urlopen('http://example.org').code
        return statusCode

    def handleError(self):
        pass

class TestWebPaymentRequest(unittest.TestCase):

    def testHttpResponse(self):
        requestObject = ExampleResponseGetter()
        responseStatus = requestObject.retrieveStatusCode()
        self.assertEqual(200, responseStatus)

if __name__ == '__main__':
    unittest.main()
```

{{<ad3>}}

The retrieveStatusCode method connects to the internet and makes a request to the example.org web site and returns the response code (if everything went well it will be 200). To test if it works we instantiate a class that inherits from unittest.TestCase, the class will test every method that begins with the word 'test'.

The assertEqual method will make sure that the two arguments are equal, in this case 200 and responseStatus, if they are not, it will be considered as a failure and will show the result at the end.

```bash
.
--------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

So far so good, but what if we have a slow internet connection, or no internet access to test? What if the 200 status is in response to a successful payment in an external e-commerce? We can't be paying and returning the money to test.

We need to find a way for the method to return those responses that we need to test, a status of 200, 404, 500, etc. The following library comes to solve these problems.

### Mock

This library has the ability to 'patch' functions or methods to return the value we want, that way we can emulate the result of accessing external APIs and focus on the logic of the code instead of the integration of the tests with an external system of which we often have no control. If you want to perform this test please remember to install mock from pip, preferably from a virtual environment.

```bash
pip install mock
```

Once it is installed, we will proceed to use it.

```python
# testing.py
import unittest
from urllib.request import urlopen

from mock import patch

class ExampleResponseGetter(object):

    def retrieveStatusCode(self):
        statusCode = urlopen('http://example.org').code
        return statusCode

    def handleError(self):
        pass

class TestWebPaymentRequest(unittest.TestCase):

    @patch('urllib.request.urlopen')
    def testHttpResponse(self, mockedStatus):
        mockedStatus.return_value.code = 200
        StatusRetriever = ExampleResponseGetter()
        responseStatus = StatusRetriever.retrieveStatusCode()
        self.assertEqual(200, responseStatus)

if __name__ == '__main__':
    unittest.main()
```

Here the decorator 'patches' the urllib library function, and the patched version is passed as an argument to the method, we can modify the return value of this patched method, even if the return value is an object with other attributes, as in this case.

By changing the value we assign to it we can handle different scenarios. For example, if instead of assigning a value of 200, we set it to 404, the test will fail, even if example.org is online and working perfectly.

```bash
F
======================================================================
FAIL: testHttpResponse (__main__.TestWebPaymentRequest)
--------------------------------------------------------------------
Traceback (most recent call last):
  File "/home/eduardo/venv/lib/python3.8/site-packages/mock/mock.py", line 1305, in patched
    return func(*args, **keywargs)
  File "testing.py", line 24, in testHttpResponse
    self.assertEqual(200, responseStatus)
AssertionError: 200 != 404
--------------------------------------------------------------------
Ran 1 test in 0.001s

FAILED (failures=1)
```

### Coverage

Coverage monitors your code and examines the parts that were executed as well as the parts that were not, if we combine it with testing methods, it tells us which parts of the code are not being executed, this way we can find out which parts of the code are not being tested and write the appropriate code for it. Remember to install coverage if you want to test it.

```bash
coverage report testing.py
Name Stmts Miss Cover
-----------------------------
testing.py 17 1 94%
```

The report shows that there are 17 declarations, of which only one is not being executed, giving a coverage of 94%. The missing method must be handleError, to which we only assign a pass, it is not executed at any time and we do not have it covered in the tests either. Let's see if it matches our hypothesis. Coverage also allows you to generate a file where it shows you which portions of the code are being executed and which are not.

We execute coverage run and the name of our file, in this case _testing.py_, followed by coverage annotate.

```bash
coverage run testing.py

coverage annotate
```

A file will be generated in the folder where we are working with the name of your file and ending '_,cover_'. This report will show the lines of our code and their status. The convention for the generated report is the following:

* \> Executed
* ! Not executed
* - Excluded

```python
# testing.py,cover
> import unittest
> from urllib.request import urlopen

> from mock import patch

> class ExampleResponseGetter(object):

>     def retrieveStatusCode(self):
>         statusCode = urlopen('http://example.org').code
>         return statusCode

>     def handleError(self):
!         pass

> class TestWebPaymentRequest(unittest.TestCase):

>     @patch('urllib.request.urlopen')
>     def testHttpResponse(self, mockedStatus):
>         mockedStatus.return_value.code = 200
>         StatusRetriever = ExampleResponseGetter()
>         responseStatus = StatusRetriever.retrieveStatusCode()
>         self.assertEqual(200, responseStatus)

> if __name__ == '__main__':
>     unittest.main()
```

Our assumption is correct, the only line that stands out is the pass line of the handleError method. This method is not executed neither in the tests nor in the main class, it is uncovered code, which should be included later in the tests. The purpose of using coverage is to verify that your tests are covering as much of your code as possible. There are programmers that even go further and do not allow a code change if it decreases the percentage generated by coverage, that way they make sure that each new commit **increases the amount of code covered by the tests.

### Other Testing Libraries

Above I have placed some of the most popular ones, but there are enough libraries to choose the one we feel most comfortable with. Here are two others:

Pylint warns you of errors in your code, suggests how to refactor code blocks, checks that your variable names are well-formed and also ensures that specific conventions are followed with respect to code formatting.

It does not extend unittest, shows you more information about each bug and allows you to integrate its operation with other libraries, including coverage, through third-party plugins.

### But... you didn't mention Tox.

That's right, I didn't mention it because I want to deal with the subject in a little more depth than I do here. In the next post I will talk about a tool called Tox, which makes it easy to run tests in different Python environments and versions, [go here to read it](/en/python/testing-with-tox-in-python-tutorial-from-scratch/).