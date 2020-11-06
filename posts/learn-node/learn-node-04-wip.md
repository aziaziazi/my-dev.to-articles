# WIP express notes

Express apps can use many databases to perform **CRUD** operations: Create, Red, Update and Delete. There's two common approach to perform those operations:

- Using an **ODM** (Object Data Model), or an **ORM** (Object Relational Model). An ODM/ORM represents the website's data as JavaScript objects, which are then mapped to the underlying database. Some ORMs are tied to a specific database, while others provide a database-agnostic backend.
- Using the databases' native query language (e.g. SQL) which have better performance.

We'll use MongoDB and Mongoose (ODM) because they are quite popular at the moment.

## Connect to MongoBD

```js
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
```

## Create Models

Models are defined using the *Schema* interface. The Schema let us define:
- fields stored in each documents
- static/instance methods
- query helpers: extends mongoose's native query: create a "byName" in addition o the "find", "findOne", "findById"...
- virtual properties: *get* and *set* properties that are not stored in the DB. firstname + lastname => fullname

```js
// Define schema
var Schema = mongoose.Schema;

// two ways of defining a field
var SomeModelSchema = new Schema({
  a_string: String,
  another_string: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  }
});

// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );
```

There is various [SchemaTypes and options](https://mongoosejs.com/docs/schematypes.html). They handle build-in and custom [validators](https://mongoosejs.com/docs/validation.html).

I'm surprised that we use the same object to create new instances AND to search in existing ones: `SomeModel.find(query)` `var anInstance = new SomeModel()`

## create/update documents

## search documents

## relate document

Documents can relate to another with it's _id
_id is automatically created for each document
`.populate()` get the referred document values

## Route primer

A route is an association of a verb (GET, POST...) + url with a handler function
There're several ways to create routes, we'll use `express.Router`: it helps to group routes together. So we can group routes in modules "catalog" and "user account".
Use routes with `app.use(path, routerModule)`
The middlewares can take one, two, three or four arguments. Their number defines the signature:
- 3 args or less: request, response, next
- 4 args: error, request, response, next
I need to either call `next()` to continue with next route or complete the request, for exemple using `res.send()`
I can provide an array of callback instead of a single callback
The route path can be a string or a pattern using:
- "kind of" express regex using quoted string
- real regex, not using quotes
I can "extract" parts of routes using route parameters : `/users/:userId/books/:bookId` => req
.params.userID & req.params.bookId
Routes execute in order, therefore I should declare `/users/create` at first to not extracting 'create' as a parameter. Then I should resolve the request to not continue to the :id handler !
mongoose automatically create _id for any model instance
We'll create several routes:
- catalog/ -> index
- catalog/<objects>/ -> list of all instances of an object
- catalog/<object>/id -> object detail
- catalog/<object>/create -> create an object
- catalog/<object>/id/update -> update an object
- catalog/<object>/id/delete -> delete an object
I think it's very nice for a simple tutorial because it handles all the basic actions I'd like to perform
Create one controller file per model. The MDN tutorial propose to put them all in 'controller' folder. I think it's better to keep model and controller together, in a 'modules' folder.
The MDN tuto creates handlers for both GET and POST for the same routes (create_get, create_post / delete_get, delete_post, update_get, update_post). WHY ??? As Rest has semantic verbs I'd exept `create_post`, `udpate_put/patch`, `delete_delete`

plop is usefull to create files from template (handlebars)
handlebars uses {{value}} to inject value
handlebars uses {{function value}} to use custom function on a value

MDN tuto separate the routes and handlers. It's good for separation of concern BUT it can be error prone because we need to maintain params in the two places.

Instead of using the same handler at different places, I may (should ?) res.redirect() to one single handler.

## Asynchronous flow control using async
Async is a node lib to handle (multiples) async operations.

`async.parallel` allow running multiple operations at the same time. Beware they are in fact NOT run in parallel because node is single threaded (if there is no timer). A callback fired when wall operations complete, or an error is returned.

`async.series` run multiples operations one after each other. It should be used when operations do not depend on previous one's output.

Both `parallel` and `series` takes two args:
- an array/object/iterable of operations to execute
- an optional callback fired when every operation finished (or if there is an error). The args of this callback are: `error` and `data` which is the same type of the operations iterables and contains the output values.
Validation is checking if values are appropriate: string length, min age...
Sanitization is removing/replacing characters that can be used to hack the server.

`async.series` run operations in series and pass args from the previous callback to the next operation.

## Templates Primer

Templates are text file that define structure of the output file, with placeholder to insert data. Template use engines to render the output.
In express, templates are referred as "views".
We'll use Pug as it's a very populare choice with node.
With pug, we can use `else` after a loop (`each`), executing if the iterable is empty

## display values

_id and virtual properties are always passed to queries, even if not asked.
I can compute js directly inside pug with unbuffered, buffered and unescaped buffered code:
- unbuffered using `-`
- buffered using `=`
- unescaped buffered code: `!=`
Mongoose has a sort function

## Forms in Express
In a html form, the `action` attribute is the url where the data is submitted. If no action is specified, the form fobmit back to the current page url.
in a html form, the `method` attribute is the verb used to send the data.
`POST` should be used when data is going to update the server's DB. This method helps for cross-site forgery request attacks resistence (why ?)
`GET` is used for forms that does not change user data (eg: a search form). Recommended when you want to bookmark/share url.
express does not provide a tool to validate/sanitize but we can use a middleware like express-validator.
express-validator uses validator.js which is full of features. We can also make custom validation and/or sanitization and/or error functions.

What error is send when multiple validators failed for the same request ?
Not sure I properly get "Dynamic messages" exemples, but  don't think this is a problem.

I can use wildcard (`*`) in the field param to apply a rule to multiple fields in an array or object.

Validation is performed both in the controller (validator.js) AND in the schema declaration (mongoose). Not sure thats a good idea, it's a congif you have to update in two different places.

We put escape after the lenght validation. This means that a value can be created with more characters than the one validated, because the escape process will probably output several charactes for each one escaped :(

Additionall complexities:
 - when I specify a date, JS may add the UTC timezone. however when I read the date, my locale UTC is taken into account. If I live west of UTC the date will be one day before.
 - multi word family names
 - multi authors books

 ## Deploy in production
Choose a server, Paas or Iaas
Log with `debug` (see npm)
Use `compression`(npm's one or nginx)
Use `helmet` (npm) for security basics
