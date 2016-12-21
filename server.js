var bodyParser = require('body-parser'),
    
    express = require("express"),

	http = require("http"),

	app = express(),

    //toDos['todos']['1']
//    items = toDos['lists']['1']['items']
//    Object.keys(items).forEach(function(key) {
//        currentItem = items[key]
//        [1,5,'test'].forEach(key => items[key])
//    })str_random(10),
//    toDos[str_random] = {key1: value1, key2: value2}
    
    toDos = {
        lists: {
            1: {
                title: "Movies to watch",
                items: {
                    1: {"todoTitle" : "The Hobbit 3",          "date" : null, "important" : "true", "done" : "false"},
                    2: {"todoTitle" : "The Other Woman",       "date" : null, "important" : "false", "done" : "false"},
                    3: {"todoTitle" : "Transcendence",         "date" : null, "important" : "true", "done" : "false"},
                    4: {"todoTitle" : "Noah",                  "date" : null, "important" : null, "done" : "false"},
                    5: {"todoTitle" : "12 Years a Slave",      "date" : null, "important" : null, "done" : "false"},
                    6: {"todoTitle" : "Harry potter",          "date" : null, "important" : "false", "done" : "true"},
                    7: {"todoTitle" : "Star wars",             "date" : null, "important" : "true", "done" : "true"},
                    8: {"todoTitle" : "Ted",                   "date" : null, "important" : null, "done" : "true"},
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



// This route takes the place of our

// todos.json file in our example from

// Chapter 5

app.get("/json/todos.json", function (req, res) {

	res.json(toDos.lists);

});


// tell Express to parse incoming

// JSON objects

app.use(bodyParser.urlencoded({extended: true}));



app.post("/lists", function (req, res) {

	// the object is now stored in req.body

	var newList = req.body;

	lists.lists.push(newList);

	// send back a simple object

	res.json({"message":"You posted your list to the server!"});

});

app.post("/todos", function (req, res) {

	// the object is now stored in req.body

	var newTask = req.body;
    var currentListIndex = Object.keys(newTask)[0];
    var currentTodoIndex = Object.keys(newTask[currentListIndex])[0];
    console.log(currentListIndex);
    console.log(currentTodoIndex);
    
	toDos['lists'][currentListIndex]['items'][currentTodoIndex] = newTask;
    
    console.log(toDos['lists'][currentListIndex]);

	// send back a simple object

	res.json({"message":"Server: You posted your todo to the server!"});

});