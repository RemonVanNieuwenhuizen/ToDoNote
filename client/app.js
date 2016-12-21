var todos;
var lists;
var currentListIndex = '1';
var main = function () {
    "use strict";
    
    
    
    $.getJSON("/json/todos.json", function (json) {
        
        Object.keys(json).forEach(function (list) {
            $(".container .lists ul").append($("<li class =" + list + ">").text(json[list].title).append($('<button type="button">X</button>')));
            });
            
        Object.keys(json[currentListIndex]['items']).forEach(function (todo) {

            var currentTodo = json[currentListIndex]['items'][todo];
            var today = new Date();
            today = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
            today = Date.parse(today);
            var due = Date.parse(currentTodo.date);
            var listItem;
            console.log(today);
            console.log(due);
            
            
            if (today<due){
                listItem = $("<li class=" + todo + ">").text(currentTodo.todoTitle + " ").append($("<input type=date>").val(currentTodo.date)).append($("<input type=checkbox>").prop('checked', currentTodo.important === "true"));
            }
            else if(today>due) {
                listItem = $("<li class = " + todo + " id = due>").text(currentTodo.todoTitle + " ").append($("<input type=date>").val(currentTodo.date)).append($("<input type=checkbox>").prop('checked', currentTodo.important === "true"));
            };
                
                
                
            if (currentTodo.done === "false") {
            $(".container .todoList .tasks ul").prepend(listItem.append($("<input type=submit value=update>")));
            } else if (currentTodo.done === "true") {
            $(".container .todoList .done  ul").prepend(listItem.append($('<button type="button">Remove</button>')));
            }
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
            var randomIndex = Math.round(10000000000 * Math.random());
            var description = $(".list-input input").val();
            
            $new_list = $("<li class ="+ randomIndex + ">").text(description).append($('<button type="button">X</button>'));
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
        var clickedList = $(this).parent().attr("class");
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
            
            $.post("removeLists", clickedList , function (result) {
                console.log("We posted and the server responded!");
                console.log(result);
                removelists.push(clickedList);
            });
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
        
        if ($(".todoList input[type=text]").val() !== "") {
            
            var randomIndex = Math.round(10000000000 * Math.random());
            $new_task = $("<li class ="+ randomIndex + ">").text($(".task-input input[type=text]").val() + " ");
            $new_task.append($("<input type=date>").val($(".task-input input[type=date]").val()));
            $(".task-input input[type=checkbox]").clone().appendTo($new_task);
            $new_task.hide();
            $(".tasks ul").append($new_task);
            $new_task.fadeIn();
            newTask = {[currentListIndex] : {[randomIndex] : {todoTitle : $(".task-input input").val(), date : $(".task-input input[type=date]").val(), important : $(".task-input input[type=checkbox]").val(), done : false}}};
            $(".todoList .task-input input[type=text]").val("");
            $(".todoList .task-input input[type=date]").val("");
            $(".todoList .task-input input[type=checkbox]").prop("checked", false);
            
            $.post("todos", newTask, function (result) {
                console.log("We posted and the server responded!");
                console.log(result);
                todos.push(newTask);
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
        var clickedTask = {[currentListIndex] : {[$(this).parent().attr("class")] : {id : [$(this).parent().attr("class")]}}};
        console.log(clickedTask);
        console.log("remove button pressed");
        $(this).parent().remove();
        
        $.post("removeTask", clickedTask , function (result) {
                console.log("We removed the item from the list");
                console.log(result);
                removeTask.push(clickedTask);
            });
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




