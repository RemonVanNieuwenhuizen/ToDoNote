var bodyParser = require('body-parser')

var express = require("express"),

	http = require("http"),

	app = express(),

    lists = {"lists": [

        {"listTitle" : "Movies to watch"},

        {"listTitle" : "Homework"},

        {"listTitle" : "Chores"}

    ]};

	toDos = {"todos":[

			    {"listTitle" : "Movies to watch",	"todoTitle" : "The Hobbit 3",	        "date" : null, "important" : null, "done" : false},

			    {"listTitle" : "Movies to watch",   "todoTitle" : "The Other Woman",        "date" : null, "important" : null, "done" : false},

			    {"listTitle" : "Movies to watch",   "todoTitle" : "Transcendence",          "date" : null, "important" : null, "done" : false},

			    {"listTitle" : "Movies to watch",   "todoTitle" : "Noah",                   "date" : null, "important" : null, "done" : false},

			    {"listTitle" : "Movies to watch",   "todoTitle" : "12 Years a Slave",       "date" : null, "important" : null, "done" : false},

			    {"listTitle" : "Movies to watch",   "todoTitle" : "Harry potter",           "date" : null, "important" : null, "done" : true},

			    {"listTitle" : "Movies to watch",   "todoTitle" : "Star wars",              "date" : null, "important" : null, "done" : true},

			    {"listTitle" : "Movies to watch",   "todoTitle" : "Ted",                    "date" : null, "important" : null, "done" : true},

			    {"listTitle" : "Homework",          "todoTitle" : "Make Lab assignment 3",  "date" : null, "important" : null, "done" : true},

			    {"listTitle" : "Chores",            "todoTitle" : "Clean garden",           "date" : null, "important" : null, "done" : true},

			    {"listTitle" : "Chores",            "todoTitle" : "Do dishes",              "date" : null, "important" : null, "done" : true}

			]};



app.use(express.static(__dirname + "/client"));



http.createServer(app).listen(3000);



// This route takes the place of our

// todos.json file in our example from

// Chapter 5

app.get("/json/todos.json", function (req, res) {

	res.json(toDos);

});

app.get("/json/lists.json", function (req, res) {

	res.json(lists);

});


// tell Express to parse incoming

// JSON objects

app.use(bodyParser.urlencoded({extended: true}));



app.post("/lists", function (req, res) {

	// the object is now stored in req.body

	var newList = req.body;

	console.log(newList);

	console.log(lists.lists);

	lists.lists.push(newList);

	console.log(lists.lists);

	// send back a simple object

	res.json({"message":"You posted your list to the server!"});

});

app.post("/todos", function (req, res) {

	// the object is now stored in req.body

	var newTask = req.body;

	console.log(newTask);

	console.log(ToDos.ToDos);

	ToDos.ToDos.push(newTask);

	console.log(ToDos.ToDos);

	// send back a simple object

	res.json({"message":"You posted your todo to the server!"});

});