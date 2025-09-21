---
aliases:
- /en/go-basic-testing-and-coverage/
authors:
- Eduardo Zepeda
categories:
- go
- testing
coverImage: images/go-testing-coverage.jpg
date: '2022-02-09'
description: 'Entry on basic testing in go: creating tests, handling multiple cases,
  coverage and exporting results to html.'
keywords:
- go
- testing
title: 'Go: basic testing and coverage'
---

Go already has a testing module in its standard library that is ready for our use, we just need to import it and use it.

{{<box link="/en/pages/go-programming-language-tutorial/" image="https://res.cloudinary.com/dwrscezd2/image/upload/v1717959563/Go_gopher_favicon_uzxa20.svg" type="info" message="Hey! did you know that I wrote a completely Free Go programming language tutorial?, click here to read it it">}}

## Testing preparation in go

For the tests to be carried out we need:

A file ending in __test.go_ * A file ending in __test.go_ * Run the command _go test_.
* Run the _go test_ command

```bash
├── go.mod
├── main.go
└── testing
    ├── main.go
    └── main_test.go

1 directory, 5 files
```

Consider that, if you are going to [assign a name to your package]({{< ref path="/posts/go/go-importacion-de-paquetes-y-manejo-de-modulos/index.md" lang="en" >}})**, you should never name it _testing_**. Why? If you do, go will confuse its _testing_ package with yours, returning those incorrect results.

To create the tests, inside the _testing/main_test.go_ file, we need a function that receives as argument our testing package with the destructuring character.

{{<ad0>}}

We will compare the result using an if, or whatever we want and, **if the test fails, we will call the _Errorf_** method of the _testing_ module.

```go
package main

import "testing"

func TestDivision(t *testing.T) {
    total := Division(10, 2)
    if total != 5 {
        t.Errorf("División incorrecta, obtuvimos %d pero se esperaba %d", total, 5)
    }
}
```

It is not necessary that the functions to be tested are inside the testing file, in this case I placed them inside _testing/main.go_.

```go
package main

func Division(a int, b int) int {
    return a / b
}
```

{{<ad1>}}

## Execute tests

To run the tests we need to find ourselves inside the directory where our files ending in __test.go_ are located and run the _go test_ command. If the test passes we will get the PASS message.

```go
cd testing/
go test

PASS
ok main/testing 0.001s
```

{{<ad2>}}

On the other hand, if the tests fail, the word FAIL will be printed on the screen:

```go
--- FAIL: TestDivision (0.00s)
    main_test.go:14: División incorrecta, obtuvimos 12 pero se esperaba 5
FAIL
exit status 1
FAIL main/testing 0.001s
```

## Case management with tables

In the above example we used one function to test one case, however, if we needed to test multiple cases, we would need a function for each test, quite tedious, right?

To avoid filling up with functions, developers use an array composed of structs, where each struct represents a case to be tested. You can think of the array of structs as a table, where each row is a case and each column is a data type to be tested.

In this case, each struct in our array consists of three integers; the first two represent the arguments, while the last one is the result.

{{<ad3>}}

```go
tables := []struct {
    	x int
    	y int
    	r int
    }{
    	{100, 10, 10}, // 100 / 10 = 10
    	{200, 20, 10}, // 200 / 20 = 10
    	{300, 30, 10},
    	{1000, 100, 10},
    }
```

I'm sure you've noticed that we're not covering division by zero, but leave it at that for now.

Now that we have our array of structs, we will iterate over each of its elements using [go's range function]({{< ref path="/posts/go/go-arrays-y-slices/index.md" lang="en" >}}). This way we will cover each case.

```go
for _, table := range tables {
    	total := Division(table.x, table.y)
    	if total != table.r {
    		t.Errorf("División de %d entre %d incorrecta, obtuvimos: %d, pero el resultado es: %d.", table.x, table.y, total, table.r)
    	}
    }
```

If everything went well, we will pass all the tests.

## Coverage

Coverage is already part of the code in go, so we do not need external libraries. If you don't know what Coverage is, think of it as the percentage of your code that is tested. If all your code goes through the tests you will have a coverage of 100%, if only half of it goes through the tests the coverage will be 50%. Previously I talked about coverage in my entry [unittest in Python](/en/python/unittest-python-are-python-tests-worthwhile/)

To calculate the coverage, simply add the _-cover_ flag to the _go test_ command.

```bash
go test -cover

PASS
coverage: 100.0% of statements
ok _/home/eduardo/Programacion/goTesting/testing 0.002s
```

As our function is tiny, we obtain a result of 100%, without breaking down, from coverage

### Export coverage results

We can send all the raw data from our coverage test to an external file with the _-coverprofile_ flag.

```bash
go test -coverprofile=coverage.out

mode: set
/home/eduardo/Programacion/goTesting/testing/main.go:3.33,5.2 1 1
```

This file, named _coverage.out_, which was generated, is a file containing raw data and **will be needed to visualize the results** in a more detailed way.

### Viewing results with go tool

To summarize in a more readable way the information of the file containing our coverage test, we will use the tool command, accompanied by the _-func_ flag, followed by the file name. This will return a broken down coverage result.

```bash
go tool cover -func=coverage.out

/home/eduardo/Programacion/goTesting/testing/main.go:3: Division 100.0%
total:                                                  (statements)    100.0%
```

Go also allows us to visualize the coverage in HTML format, with colors, directly in our browser. For this we use the -html option, followed by the file with the coverage data.

When the command is executed, a browser tab will open and show the tested results in green and the untested results in red.

```bash
go tool cover -html=coverage.out
```

{{< figure src="images/Captura-de-pantalla-de-2022-02-09-12-35-57.png" class="md-local-image" alt="Coverage en go" >}}

Full html coverage in go

If we decide to modify our function to handle the division by zero cases, and run the coverage tests again, we will get a different scheme than before. Now a section of code not covered by the tests appears in red and our coverage dropped to 50%.

{{< figure src="images/coverage-en-go.png" class="md-local-image" alt="Screenshot of coverage en go" >}}

Incomplete html coverage in go

This is the end of this super short entry about go testing. For the next entry I will talk a little bit about profiling and I will finish the basic go entries to write again about Python.

## Other resources on testing

* [Started with Friends of go automated tests](https://blog.friendsofgo.tech/posts/empezando-con-los-tests-automatizados-en-go/)
* [Official Go documentation](https://pkg.go.dev/testing)
* [Testify, to emulate Javascript testing syntax](https://github.com/stretchr/testify#assert-package)