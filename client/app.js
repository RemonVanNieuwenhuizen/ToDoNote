var todos;
var lists;
var currentListIndex = 1;
var main = function () {
    "use strict";
    
    
    
    $.getJSON("/json/todos.json", function (json) {
        console.log(json);
        this.todos = json.todos;
        console.log(todos);
        
        todos.keys(lists).forEach(function(list) {
            $(".container .lists ul").append($("<li>").text(list.title).append($('<button type="button">X</button>')));
            list.keys(items).forEach(function(todo) {
                if (todo.done === "false") {
                $(".container .todoList .tasks ul").prepend($("<li>").text(todo.todoTitle));
                } else if (todo.done === "true") {
                $(".container .todoList .done  ul").prepend($("<li>").text(todo.todoTitle).append($('<button id= "removeItem" type="button">Remove</button>')));
            }});
        });  
    });
};
$(document).ready(main);

var lists = function () {
    "use strict";
    var addListFromInputBox = function () {
        var $new_list;
        var newList;
        
        if ($(".list-input input").val() !== "") {
            var description = $(".list-input input").val();
            
            $new_list = $("<li>").text(description).append($('<button type="button">X</button>'));
            newList = {listTitle : description};
            $new_list.hide();
            $(".lists ul").append($new_list);
            $new_list.fadeIn();
            $(".list-input input").val("");
            
            $.post("lists", newList, function (result) {
                console.log("We posted and the server responded!");
                console.log(result);
                lists.push(newList);
            });
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
    
    //Change list
    
    //Remove list
    $(".lists ul").on("click", "button", function (event) {
        console.log($(this).html());
        //If the cross is presse ask for conformation
        if ($(this).html() === "X") {
            event.stopPropagation();
            $(this).parent().hide();
            $(this).parent().attr("id", "delete");
            ($(this).parent()).after($("<li>").text("Remove list?").append($('<button type="button">Yes</button>')).append($('<button type="button">No</button>')));
        }
        //If yes is pressed remove list and conformation question
        if ($(this).html() === "Yes") {
            event.stopPropagation();
            console.log("remove button pressed");
            $(this).parent().remove();
            $("#delete").remove();
        }
        //If no is pressed reload list title and remove conformation question
        else if ($(this).html() === "No") {
            $(this).parent().remove();
            $("#delete").show();
            $("#delete").attr("id", "");
        }
    });
};
$(document).ready(lists);

var tasks = function () {
    "use strict";
    //Add todo from input box
    var addTaskFromInputBox = function () {
        var $new_task;
        var newTask;
        
        if ($(".todoList input").val() !== "") {
            
            $new_task = $("<li>").text($(".task-input input[type=text]").val() + " ");
            $new_task.append($("<input type=date>").val($(".task-input input[type=date]").val()));
            $(".task-input input[type=checkbox]").clone().appendTo($new_task);
            $new_task.hide();
            $(".tasks ul").append($new_task);
            $new_task.fadeIn();
            newTask = {listTitle : currentListTitle, todoTitle : $(".task-input input").val(), date : $(".task-input input[type=date]").val(), important : $(".task-input input[type=checkbox]").val(), done : false};
            console.log(newTask);
            $(".todoList .task-input input[type=text]").val("");
            $(".todoList .task-input input[type=date]").val("");
            $(".todoList .task-input input[type=checkbox]").prop("checked", false);
            
            $.post("todos", newTask, function (result) {
                console.log("We posted and the server responded!");
                console.log(result);
                lists.push(newTask);
            });
        }
    };
        
    //Add todo on button click
    $(".task-input input[type=submit]").on("click", function (event) {
        console.log("input button pressed");
        addTaskFromInputBox();
    });
    //Add todo on spacebar
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





