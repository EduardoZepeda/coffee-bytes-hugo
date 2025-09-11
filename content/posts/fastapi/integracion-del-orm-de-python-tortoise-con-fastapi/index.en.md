---
aliases:
- /en/python-tortoise-orm-integration-with-fastapi/
authors:
- Eduardo Zepeda
categories:
- fastapi
- databases
coverImage: images/IntegrandoFastApiYTortoiseORM.jpg
coverImagecredits: credits https://www.pexels.com/@nguy-n-lam-196145/
date: '2021-09-21'
description: Tortoise is a Python ORM that you can integrate with fastAPI to create
  models and handle SQL queries with various databases.
keywords:
- fastapi
- orm
- tortoise
- python
title: Python tortoise ORM integration with FastAPI
---

One of the things I like most about Django is its ORM; [one of the reasons why this framework is so popular]({{< ref path="/posts/django/por-que-deberias-usar-django-framework/index.md" lang="en" >}}). On the other hand FastAPI does not have an ORM and focuses solely on serving endpoints, showing agnostic on the basis of data. There are enough options ORM to python: django-alchemy, peewee, ponyORM, tortoise. The latter, besides being asynchronous, is inspired by the django ORM, so its syntax is quite similar, even many tortoise functions share name with its Django counterpart, so users who use the Django ORM will save a lot of time learning tortoise functions.

For this tutorial I'm going to use fastAPI and tortoise-orm together so make sure you know at least the basics of the fastAPI framework and database basics.

## Tortoise compatibility

Tortoise is compatible with the following databases.

* PostgreSQL >= 9.4 (using asyncpg)
* SQLite (using aiosqlite)
* MySQL/MariaDB (using aiomysql or asyncmy)

But for this example I am going to use SQLite, because it does not need any kind of configuration.

{{<ad1>}}

## Installation of the Python tortoise ORM

To install tortoise-orm just use the virtual environment manager of your choice, I will use pipenv.

```bash
pip install tortoise-orm
```

I will also install fastAPI and other utilities we will need

```bash
pip install python-multipart fastapi uvicorn pydantic
```

## Create models with tortoise

{{<ad2>}}

Let's create a directory called app and a models file called _models.py_.

```python
# app/models.py
from tortoise.models import Model
from tortoise import fields

class Job(Model):
    # El campo de la llave primaria se crea automáticamente
    # id = fields.IntField(pk=True) 
    name = fields.CharField(max_length=255)
    description = fields.TextField()

    def __str__(self):
        return self.name
```

If you notice the syntax is quite similar to the Django fields, even some parameters are the same.

To start working with the tortoise ORM we need:

{{<ad3>}}

1. Connect to the database.
2. Create the necessary table(s).

## Connecting to database with tortoise

We are going to create a function to connect to the database in a directory called database:

```python
# database/connectToDatabase.py
from tortoise import Tortoise

async def connectToDatabase():
    await Tortoise.init(
        db_url='sqlite://db.sqlite3',
        modules={'models': ['app.models']}
    )
```

## Generating schematics with tortoise

Now let's create a function to generate the models in the root of our application.

```python
# createSchema.py
from tortoise import Tortoise, run_async
from database.connectToDatabase import connectToDatabase

async def main():
    await connectToDatabase()
    await Tortoise.generate_schemas()

if __name__ == '__main__':
    run_async(main())
```

Observe how we import the function to connect that we have just created and then call the _generate_schemas()_ method, which will read our models and make the changes in the database.

Another aspect you should appreciate is that we run the main function inside the _run_async()_ function provided by tortoise. This is necessary for our await functions to run, otherwise only a _corroutine_ object would be created.

Why do we place this method in an external file? Because **_generate_schemas()_ only needs to be used once**; when the tables are created. We should not include it in the file that will be run when fastAPI is executed.

Knowing that, let's run it to create our tables.

```bash
python3 createSchema.py
```

If everything went well we will already have the tables created in our SQLite database.

## tortoise integration with fastAPI

We will start with a simple fastAPI application.

To connect fastAPI with tortoise, the latter gives us a function called _register_tortosise()_. That receives the instance we created with fastAPI, the address to the database and the location of our models.

```python
# main.py
from fastapi import FastAPI
from database.connectToDatabase import connectToDatabase

app = FastAPI()
await connectToDatabase()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

register_tortoise(
    app,
    db_url="sqlite://db.sqlite3",
    modules={"models": ["app.models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
```

## Create an object with tortoise

To create an object we can choose to **call the _create()_ method of the model, inside a function decorated with the _post()_** method of our instance, or also create an instance and then call its _save()_ method.

```python
# main.py
from fastapi import FastAPI
from tortoise.contrib.fastapi import HTTPNotFoundError, register_tortoise

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/job/create/", status_code=201)
async def create_job(name=Form(...), description=Form(...)):
    job = await Job.create(name=name, description=description)
    return {"status":"ok"}
# ...
```

If we now make a web request using the documentation interface that fastAPI creates, in _/docs/_, we will see that we will be able to create a Job object using a name and a description.

{{< figure src="images/CreacionDeUnObjetoTortoise.png" class="md-local-image" alt="Creating an object using fastAPI and tortoise ORM" >}}

## Serializing objects with pydantic and tortoise

We have created the object, but what if we want to return the object after creating it? Since it is an instance of a model, we can't just return it like that. We need a data type suitable for an HTTP response.

**Pydantic allows us to serialize database objects in order to return them as JSON** response or whatever we want.

We must import the _pydantic_model_creator_ function and pass it our model as a parameter.

```python
# main.py
from fastapi import FastAPI
from app.models import Job
from tortoise.contrib.fastapi import HTTPNotFoundError, register_tortoise
from tortoise.contrib.pydantic import pydantic_model_creator

app = FastAPI()

job_pydantic = pydantic_model_creator(Job)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/job/create/", status_code=201)
async def create_job(name=Form(...), description=Form(...)):
    job = await Job.create(name=name, description=description)
    return await job_pydantic.from_tortoise_orm(job)

register_tortoise(
    app,
    db_url="sqlite://db.sqlite3",
    modules={"models": ["app.models"]},
    add_exception_handlers=True,
)
```

And to get our object in JSON we call the method to the _from_tortoise_orm()_ method of the object we just created.

Remember to prefix the word _await_ or what you will return is a _corroutine_.

## Obtain a list of objects from a queryset

We will use the **get()** method of our fastAPI instance.

To obtain a list of objects we use the _all()_ method and serialize the result with _from_queryset()_.

```python
# main.py

# ...

@app.get("/jobs/")
async def get_jobs():
    return await job_pydantic.from_queryset(Job.all())
```

{{< figure src="images/ListadoDeObjetosTortoise.png" class="md-local-image" alt="Getting a list of objects using fastAPI and tortoise ORM" >}}

## Updating an object with tortoise

Now **create an endpoint that receives an id and is decorated with the _put()_** method. We pass as response_model the job_pydantic object, [to validate the data input, include it in the documentation and limit the response to modifiable fields](https://fastapi.tiangolo.com/tutorial/response-model/).

We will also create a second job_pydantic object, i.e. another serializer, which excludes the read-only fields (our primary key), to return them without id.

And, to update an object, we use the fastAPI put method and receive the id of the object to edit. Then we filter those objects that match the id with _Job.filter()_ and then call its _update()_ method. Since the id is unique, as it is a primary key, only the object whose id matches the data we send will be edited.

```python
# main.py

job_pydantic = pydantic_model_creator(Job)
job_pydantic_no_ids = pydantic_model_creator(Job, exclude_readonly=True)
# ...

@app.put("/job/{job_id}", response_model=job_pydantic, responses={404: {"model": HTTPNotFoundError}})
async def update_job(job_id: int, job: job_pydantic):
    await Job.filter(id=job_id).update(**job.dict())
    return await job_pydantic_no_ids.from_queryset_single(Job.get(id=job_id))
```

{{< figure src="images/ActualizacionDeUnObjetoTortoise.png" class="md-local-image" alt="Updating an object using tortoise and fastAPI" >}}

## Obtain an object with tortoise

Now we can apply the same method as in the previous section. This time **we will need an id and the fastAPI's _get()_ method**. We pass it the _response_model_ to take care of the validation and define that the only parameter we will use will be the id, with which we will use the _from_queryset_single_() method on the result of the ORM query: Job.ge_t(id=job_id)_.

```python
# main.py

# ...

@app.get("/job/{job_id}", response_model=job_pydantic, responses={404: {"model": HTTPNotFoundError}})
async def get_job(job_id: int):
    return await job_pydantic_no_ids.from_queryset_single(Job.get(id=job_id))
```

{{< figure src="images/ObtenerUnObjetoTortoise.png" class="md-local-image" alt="Obtaining an object using fastAPI and swagger" >}}

## Remove an object with tortoise

To delete an object we will also **need an id and call fastAPI's _delete()_** method, so the function would look like this:

```python
# main.py
class Status(BaseModel):
    message: str
# ...

@app.delete("/job/{job_id}", response_model=Status, responses={404: {"model": HTTPNotFoundError}})
async def delete_job(job_id: int):
    deleted_job = await Job.filter(id=job_id).delete()
    if not deleted_job:
        raise HTTPException(status_code=404, detail=f"Job {job_id} not found")
    return Status(message=f"Deleted job {job_id}")
```

We filter by the id we get in the url and, if we find the object, we delete it, in case the id of that object does not exist we will return a 404 error through an exception. In case it does, we will no longer return the object, but it will be enough that we return a message warning that the id was deleted.

{{< figure src="images/BorrarUnObjetoTortoise.png" class="md-local-image" alt="Deletion of an object using fastAPI and swagger" >}}

And with that we can perform basic CRUD operations in fastAPI using tortoise as ORM. In this entry I haven't discussed foreign keys, foreign key fields, many to many, or other kinds of relationships between models. I will probably make a future post about that, in the meantime you can read [the official tortoise documentation](https://tortoise.github.io/)