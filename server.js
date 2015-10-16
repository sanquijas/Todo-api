var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Todo API Root');
});

// GET /todos
app.get('/todos', function (req, res) {
  res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function (req, res) {
  var todoId = parseInt(req.params.id, 10);
  var todo;

  for (i=0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      todo = todos[i]; 
    }
  }
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send();
  }
  // Iterate of todos array. Find the match
  // res.status(404).send();
  // res.send('Asking for todo with id of ' + req.params.id)
  //res.send(typeof todoId)
});

// POST /todos/
app.post('/todos', function (req, res) {
  var body = req.body;

  // add id field (I could get length of todos array and add 1 for id)
  body.id = todoNextId++;

  // push body into array
  todos.push(body);

  console.log('description ' + body.description);

  res.json(body);  
});

app.listen(PORT, function() {
  console.log('Express listening on port ' + PORT + '!');
});
