var todos;
var main = function () {
    "use strict";
    
    
    
    $.getJSON("json/todos.json", function (json) {
        todos = json.todos;
        console.log(todos);
        todos.forEach(function (todo) {
            if ($(".container .lists .ul:contains(" + todo.listTitle + ")").length !== 0) {
                $(".container .lists ul").append($("<li>").text(todo.listTitle).append($('<button type="button">X</button>')));
            } if (todo.done === false) {
                $(".container .todoList .tasks ul").prepend($("<li>").text(todo.todoTitle));
            } else {
                $(".container .todoList .done  ul").prepend($("<li>").text(todo.todoTitle).append($('<button id= "removeItem" type="button">Remove</button>')));
            }
        });
    });
};
$(document).ready(main);

var lists = function () {
    "use strict";
    var addListFromInputBox = function () {
        var $new_list;
        
        if ($(".list-input input").val() !== "") {
            var description = $(".list-input input").val();
            $new_list = $("<li>").text(description).append($('<button type="button">X</button>'));
            $new_list.hide();
            $(".lists ul").append($new_list);
            $new_list.fadeIn();
            $(".list-input input").val("");
            todos.push({"listTitle" : description});
            $.post("todos", {}, function (response) {
                console.log("We posted and the server responded!");
                console.log(response);
            });
            $(".list-input input").val("");
        }
    };
        
    
    $(".list-input button").on("click", function (event) {
        addListFromInputBox();
    });
    
    $(".list-input input").on("keypress", function (event) {
        if (event.keyCode === 13) {
            addListFromInputBox();
        }
    });
    
    $(".lists ul").on("click", "button", function (event) {
        console.log($(this).html());
        if ($(this).html() === "X") {
            event.stopPropagation();
            $(this).parent().Text().hide()
            $(this).parent().append($("<li>").text("Remove list?").append($('<button type="button">Yes</button>'))append($('<button type="button">No</button>')));
        } if ($(this).html() === "Yes") {
            event.stopPropagation();
            console.log("remove button pressed");
            $(this).parent().remove();
        } else if ($(this).html() === "No"){
            
        }
    });
    
};


$(document).ready(lists);

var tasks = function () {
    "use strict";
    var addTaskFromInputBox = function () {
        var $new_task;
        
        if ($(".todoList input").val() !== "") {
            $new_task = $("<li>").text($(".task-input input").val());
            $new_task.hide();
            $(".tasks ul").append($new_task);
            $new_task.fadeIn();
            $(".todoList input").val("");
        }
    };
        
    $(".task-input button").on("click", function (event) {
        console.log("input button pressed");
        addTaskFromInputBox();
    });
    
    $(".task-input input").on("keypress", function (event) {
        if (event.keyCode === 13) {
            addTaskFromInputBox();
        }
    });
    
    //remove item from done
    $(".done ul").on("click", "button", function (event) {
        event.stopPropagation();
        console.log("remove button pressed");
        $(this).parent().remove();
    });
    
    //moving item from tasks to done
    $(".tasks ul").on("click", "li", function () {
        $(this).fadeOut(function () {
            $(this).append($('<button type="button">Remove</button>'));
            $(".done ul").prepend($(this));
            $(this).fadeIn();
        });
    });
    
    //moving item from done to tasks
    $(".done ul").on("click", "li", function () {
        console.log("move item to tasks");
        $(this).fadeOut(function () {
            $(".tasks ul").append($(this));
            $(this).find("button").remove();
            $(this).fadeIn();
        });
    });
    
    
};

$(document).ready(tasks);





