var express = require("express"),
	http = require("http"),
	app = express(),
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

// tell Express to parse incoming
// JSON objects
app.use(express.urlencoded());

app.post("/todos", function (req, res) {
	// the object is now stored in req.body
	var newToDo = req.body;
	console.log(newToDo);
	toDos.push(newToDo);
	// send back a simple object
	res.json({"message":"You posted to the server!"});
});