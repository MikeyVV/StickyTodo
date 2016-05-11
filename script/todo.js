/*
 Variable
 */

var old_topic = "";

/*
 function
 */

function checked_done(ele, todo_status) {
    $.post("system/checkDone.php",
        {
            id: $(ele).val(),
            status: todo_status
        },
        function (data, status) {
            if (status == "success") {
                move_list(ele);
            }
        }
    );
}

//$(document).ready(function () {
$("#sign-in-user").html(username);
function signOut() {
    $.post("system/authentication.php", {mode: "sign out"}, function (data, status) {
        if (status == "success")
            location.reload()
    });
}

function clear_list() {
    $(".todo-list-check").remove();
}

function move_list(ele) {
    var ele_id = $(ele).val();
    var ele_text = $(ele).parent().text();
    if (!ele_text.length) {
        ele_text = $(ele).parent().children().eq(1).val();
    }
    $("#todo_" + ele_id).remove();
    if ($(ele).is(":checked")) {
        //add to complete
        $("#list_done").append("<a id='todo_" + ele_id + "' class=\"todo-list-check list-group-item\"><div class='checkbox'><label><input onclick=\"checked_done(this,'undone')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + ele_id + "' checked><del><i>" + ele_text + "</i></del><\/label><\/div><\/a>");
    } else {
        //add to undone
        $("#list_undone").append("<a id='todo_" + ele_id + "' class=\"todo-list-check list-group-item\"><div class='checkbox'><label class=\"label-todo-list\"><input onclick=\"checked_done(this,'done')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + ele_id + "'><input id=\"a_todo_list_" + ele_id + "\" class=\"editable_todo_list\" type=\"text\" value=\"" + ele_text + "\"><\/label><\/div><\/a>");
    }
}

function add_new_todo() {
    $.get("system/getLastAdd.php", function (data, status) {
        if (status == "success") {
            var new_todo = JSON.parse(data).lists[0];
            var new_todo_id = new_todo.ID;
            var new_todo_topic = new_todo.TOPIC;
            $("#list_undone").append("<a id='todo_" + new_todo_id + "' class=\"todo-list-check list-group-item\"><div class='checkbox'><label class=\"label-todo-list\"><input onclick=\"checked_done(this,'undone')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + new_todo_id + "'><input id=\"a_todo_list_" + new_todo_id + "\" class=\"editable_todo_list\" type=\"text\" value=\"" + new_todo_topic + "\"><\/label><\/div><\/a>");
        }
    });
}

(function get_todo() {
    $.post("system/getTodo.php", {}, function (data, success) {
        var todoLists = JSON.parse(data);
        var call_done = true;
        for (var undone_item = 0; undone_item < todoLists.lists.length; undone_item++) {
            if (undone_item == todoLists.lists.length - 1)call_done = true;
            if (todoLists.lists[undone_item].STATUS == 0) {
                $("#list_undone").append("<a id='todo_" + todoLists.lists[undone_item].ID + "' class=\"todo-list-check list-group-item\"><div class='checkbox'><label class=\"label-todo-list\"><input onclick=\"checked_done(this,'done')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[undone_item].ID + "'><input id=\"a_todo_list_" + todoLists.lists[undone_item].ID + "\" class=\"editable_todo_list\" onfocus=\"edit_list(this);\" type=\"text\" value=\"" + todoLists.lists[undone_item].TOPIC + "\"><\/label><\/div><\/a>");
            }

        }
        if (call_done) {
            for (var done_item = 0; done_item < todoLists.lists.length; done_item++) {
                if (todoLists.lists[done_item].STATUS == 1) {
                    $("#list_done").append("<a id='todo_" + todoLists.lists[done_item].ID + "' class=\"todo-list-check list-group-item\"><div class='checkbox'><label><input onclick=\"checked_done(this,'undone')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[done_item].ID + "' checked><del><i>" + todoLists.lists[done_item].TOPIC + "</i></del><\/label><\/div><\/a>");
                }
            }
        }
    });
})();

function addTodoToDatabase() {
    var todo_topic = $("#topic_todo");
    if (todo_topic.val().length > 0) {
        $.post("system/manageTodo.php",
            {
                topic: todo_topic.val(),
                mode: "add"
            },
            function (data, status) {
                if (status == "success") {
                    add_new_todo();
                }
            }
        );
    }
}


$("#sign-out").click(signOut);
$("#write-todo-form").submit(function (e) {
    e.preventDefault();
    addTodoToDatabase();
    $("#topic_todo").val("");
});

function wathTopicTodo() {
    var new_topic = $("#topic_todo").val();
    if (old_topic != new_topic) {
        old_topic = new_topic;
        $.post(
            "system/getTodo.php",
            {
                mode: "find",
                topic: new_topic
            },
            function (data, success) {
                clear_list();
                var todoLists = JSON.parse(data);
                var call_done = true;
                for (var undone_item = 0; undone_item < todoLists.lists.length; undone_item++) {
                    if (undone_item == todoLists.lists.length - 1)call_done = true;
                    if (todoLists.lists[undone_item].STATUS == 0) {
                        $("#list_undone").append("<a id='todo_" + todoLists.lists[undone_item].ID + "' class=\"todo-list-check list-group-item\"><div class='checkbox'><label class=\"label-todo-list\"><input onclick=\"checked_done(this,'done')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[undone_item].ID + "'><input id=\"a_todo_list_" + todoLists.lists[undone_item].ID + "\" class=\"editable_todo_list\" type=\"text\" value=\"" + todoLists.lists[undone_item].TOPIC + "\"><\/label><\/div><\/a>");
                    }

                }
                if (call_done) {
                    for (var done_item = 0; done_item < todoLists.lists.length; done_item++) {
                        if (todoLists.lists[done_item].STATUS == 1) {
                            $("#list_done").append("<a id='todo_" + todoLists.lists[done_item].ID + "' class=\"todo-list-check list-group-item\"><div class='checkbox'><label><input onclick=\"checked_done(this,'undone')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[done_item].ID + "' checked><del><i>" + todoLists.lists[done_item].TOPIC + "</i></del><\/label><\/div><\/a>");
                        }
                    }
                }
            }
        );
    }
}

function edit_list(ele) {
    $("#" + ele.id).keypress(function (e) {
        if (e.which == 13) {
            clearInterval(watchingEditableTodo);
        }
    });
    $("#" + ele.id).blur(function (e) {
        clearInterval(watchingEditableTodo);
    });
    var old_list = ele.value;
    var id_list = ele.id.charAt(ele.id.length - 1);

    function wathEditableTodo() {
        if (old_list != $(ele).val()) {
            $.post("system/editList.php",
                {
                    id: old_list,
                    topic: ele.value
                },
                function (data, status) {
                    if (status == "success") {
                        old_list = ele.val;
                    }
                }
            );
        }
        //console.log("call");
    }

    var watchingEditableTodo = setInterval(wathEditableTodo, 500);
}

setInterval(wathTopicTodo, 1000);

//get_todo();


/*$("#check_all").click(function () {
 check_todo_lists = $(".check_todo_lists");
 if (!check_todo_lists.prop("checked")){
 $("#check_all").html("Unchecked");
 check_todo_lists.prop("checked", true);
 }
 else {
 $("#check_all").html("Check all");
 check_todo_lists.prop("checked", false);
 }
 });*/


//});