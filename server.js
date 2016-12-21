var bodyParser = require('body-parser'),
    
    express = require("express"),

	http = require("http"),

	app = express(),
    
    toDos = {
        lists: {
            1: {
                title: "Movies to watch",
                items: {
                    1: {"todoTitle" : "The Hobbit 3",          "date" : "2017-01-12", "important" : "true", "done" : "false"},
                    2: {"todoTitle" : "The Other Woman",       "date" : "2017-01-12", "important" : "false", "done" : "false"},
                    3: {"todoTitle" : "Transcendence",         "date" : "2017-01-12", "important" : "true", "done" : "false"},
                    4: {"todoTitle" : "Noah",                  "date" : "2017-01-12", "important" : null, "done" : "false"},
                    5: {"todoTitle" : "12 Years a Slave",      "date" : "2017-01-12", "important" : null, "done" : "false"},
                    6: {"todoTitle" : "Harry potter",          "date" : "2016-11-12", "important" : "false", "done" : "true"},
                    7: {"todoTitle" : "Star wars",             "date" : "2016-11-12", "important" : "true", "done" : "true"},
                    8: {"todoTitle" : "Ted",                   "date" : "2016-11-12", "important" : null, "done" : "true"},
                }
            },
            2: {
                title: "Homework",
                items: {
                    1: {"todoTitle" : "Make Lab assignment 3",  "date" : null, "important" : null, "done" : "true"},
                    
                }
            },
            3: {
                title: "Chores",
                items: {
                    1: {"todoTitle" : "Do dishes",              "date" : null, "important" : null, "done" : "true"},
                    2: {"todoTitle" : "Clean garden",           "date" : null, "important" : null, "done" : "true"},
                }
            }
        }
    };


app.use(express.static(__dirname + "/client"));

http.createServer(app).listen(3000);


app.get("/json/todos.json", function (req, res) {

	res.json(toDos.lists);

});



app.post("/todos", function (req, res) {

	// the object is now stored in req.body

	var newTask = req.body;
    var currentListIndex = Object.keys(newTask)[0];
    var currentTodoIndex = Object.keys(newTask[currentListIndex])[0];
    console.log(currentListIndex);
    console.log(currentTodoIndex);
    console.log(newTask[currentListIndex][currentTodoIndex]);
	toDos['lists'][currentListIndex]['items'][currentTodoIndex] = newTask[currentListIndex][currentTodoIndex];
    
    console.log(toDos['lists'][currentListIndex]);

	// send back a simple object

	res.json({"message":"Server: You posted your todo to the server!"});

});

app.post("/removeList", function (req, res) {
    var removeList = req.body;
    delete toDos['lists'][removeList];
});

app.post("/removeTask", function (req, res) {
    var removeTask = req.body;
    delete toDos['lists'][removeTask[0]]['items'][removeTask[1]];
});

// tell Express to parse incoming

// JSON objects

app.use(bodyParser.urlencoded({extended: true}));
