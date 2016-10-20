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
        ele_text = $("#a_todo_list_" + ele_id).val();
    }
    $("#todo_" + ele_id).remove();
    if ($(ele).is(":checked")) {
        //add to complete
        $("#list_done").append("<a id='todo_" + ele_id + "' data-todo-list-id='" + ele_id + "' class=\"todo-list-check list-group-item\" onmouseover=\"showDeleteSign(this)\"><div class='checkbox'><label><input onclick=\"checked_done(this,'undone')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + ele_id + "' checked><del><i>" + ele_text + "</i></del><\/label><i id=\"del_" + ele_id + "\" onclick='deleteTopic(this)' class=\"fa fa-times-circle pull-right\" style=\"display:none;font-size: x-large;\" data-todo-list-id='" + ele_id + "' aria-hidden=\"true\"></i><\/div><\/a>");
    } else {
        //add to undone
        $("#list_undone").append("<a id='todo_" + ele_id + "' data-todo-list-id='" + ele_id + "' class=\"todo-list-check list-group-item\" onmouseover=\"showDeleteSign(this)\"><div class='checkbox'><label class=\"label-check-list\"><input onclick=\"checked_done(this,'done')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + ele_id + "'></label><label><input id=\"a_todo_list_" + ele_id + "\" data-todo-list-id='" + ele_id + "' class=\"editable_todo_list\" onfocus=\"edit_list(this);\" type=\"text\" value=\"" + ele_text + "\"><\/label><i id=\"del_" + ele_id + "\" onclick='deleteTopic(this)' class=\"fa fa-times-circle pull-right\" style=\"display:none;font-size: x-large;\" data-todo-list-id='" + ele_id + "' aria-hidden=\"true\"></i><\/div><\/a>");
    }
}

function add_new_todo() {
    $.get("system/getLastAdd.php", function (data, status) {
        if (status == "success") {
            var new_todo = JSON.parse(data).lists[0];
            var new_todo_id = new_todo.ID;
            var new_todo_topic = new_todo.TOPIC;
            $("#list_undone").append("<a id='todo_" + new_todo_id + "' data-todo-list-id='" + new_todo_id + "' class=\"todo-list-check list-group-item\" onmouseover=\"showDeleteSign(this)\"><div class='checkbox'><label class=\"label-check-list\"><input onclick=\"checked_done(this,'undone')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + new_todo_id + "'></label><label><input id=\"a_todo_list_" + new_todo_id + "\" data-todo-list-id='" + new_todo_id + "' class=\"editable_todo_list\" onfocus=\"edit_list(this);\" type=\"text\" value=\"" + new_todo_topic + "\"><\/label><i id=\"del_" + new_todo_id + "\" onclick='deleteTopic(this)' class=\"fa fa-times-circle pull-right\" style=\"display:none;font-size: x-large;\" data-todo-list-id='" + new_todo_id + "' aria-hidden=\"true\"></i><\/div><\/a>");
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
                $("#list_undone").append("<a id='todo_" + todoLists.lists[undone_item].ID + "' data-todo-list-id='" + todoLists.lists[undone_item].ID + "' class=\"todo-list-check list-group-item\" onmouseover=\"showDeleteSign(this)\"><div class='checkbox' ><label class=\"label-check-list\"><input onclick=\"checked_done(this,'done')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[undone_item].ID + "'></label><label><input id=\"a_todo_list_" + todoLists.lists[undone_item].ID + "\" data-todo-list-id='" + todoLists.lists[undone_item].ID + "' class=\"editable_todo_list\" onfocus=\"edit_list(this);\" type=\"text\" value=\"" + todoLists.lists[undone_item].TOPIC + "\"><\/label><i id=\"del_" + todoLists.lists[undone_item].ID + "\" onclick='deleteTopic(this)' class=\"fa fa-times-circle pull-right\" style=\"display:none;font-size: x-large;\" data-todo-list-id='" + todoLists.lists[undone_item].ID + "' aria-hidden=\"true\"></i><\/div><\/a>");
            }

        }
        if (call_done) {
            for (var done_item = 0; done_item < todoLists.lists.length; done_item++) {
                if (todoLists.lists[done_item].STATUS == 1) {
                    $("#list_done").append("<a id='todo_" + todoLists.lists[done_item].ID + "' data-todo-list-id='" + todoLists.lists[done_item].ID + "' class=\"todo-list-check list-group-item\" onmouseover=\"showDeleteSign(this)\"><div class='checkbox'><label><input onclick=\"checked_done(this,'undone')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[done_item].ID + "' checked><del><i>" + todoLists.lists[done_item].TOPIC + "</i></del><\/label><i id=\"del_" + todoLists.lists[done_item].ID + "\" onclick='deleteTopic(this)' class=\"fa fa-times-circle pull-right\" style=\"display:none;font-size: x-large;\" data-todo-list-id='" + todoLists.lists[done_item].ID + "' aria-hidden=\"true\"></i><\/div><\/a>");
                }
            }
        }
    });
})();

function get_todo_of() {
    $.post("system/getTodo.php", {}, function (data, success) {
        var todoLists = JSON.parse(data);
        var call_done = true;
        for (var undone_item = 0; undone_item < todoLists.lists.length; undone_item++) {
            if (undone_item == todoLists.lists.length - 1)call_done = true;
            if (todoLists.lists[undone_item].STATUS == 0) {
                $("#list_undone").append("<a id='todo_" + todoLists.lists[undone_item].ID + "' data-todo-list-id='" + todoLists.lists[undone_item].ID + "' class=\"todo-list-check list-group-item\" onmouseover=\"showDeleteSign(this)\"><div class='checkbox' ><label class=\"label-check-list\"><input onclick=\"checked_done(this,'done')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[undone_item].ID + "'></label><label><input id=\"a_todo_list_" + todoLists.lists[undone_item].ID + "\" data-todo-list-id='" + todoLists.lists[undone_item].ID + "' class=\"editable_todo_list\" onfocus=\"edit_list(this);\" type=\"text\" value=\"" + todoLists.lists[undone_item].TOPIC + "\"><\/label><i id=\"del_" + todoLists.lists[undone_item].ID + "\" onclick='deleteTopic(this)' class=\"fa fa-times-circle pull-right\" style=\"display:none;font-size: x-large;\" data-todo-list-id='" + todoLists.lists[undone_item].ID + "' aria-hidden=\"true\"></i><\/div><\/a>");
            }

        }
        if (call_done) {
            for (var done_item = 0; done_item < todoLists.lists.length; done_item++) {
                if (todoLists.lists[done_item].STATUS == 1) {
                    $("#list_done").append("<a id='todo_" + todoLists.lists[done_item].ID + "' data-todo-list-id='" + todoLists.lists[done_item].ID + "' class=\"todo-list-check list-group-item\" onmouseover=\"showDeleteSign(this)\"><div class='checkbox'><label><input onclick=\"checked_done(this,'undone')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[done_item].ID + "' checked><del><i>" + todoLists.lists[done_item].TOPIC + "</i></del><\/label><i id=\"del_" + todoLists.lists[done_item].ID + "\" onclick='deleteTopic(this)' class=\"fa fa-times-circle pull-right\" style=\"display:none;font-size: x-large;\" data-todo-list-id='" + todoLists.lists[done_item].ID + "' aria-hidden=\"true\"></i><\/div><\/a>");
                }
            }
        }
    });
}

(function get_lists() {
    $.get("system/getLists.php", function (data, status) {
        if (status == "success") {
            var lists = JSON.parse(data);
            for (var item = 0; item < lists.lists.length; item++) {
                $("#list").append("<li><a data-toggle='tab' href='#'>" + lists.lists[item].list_name + "</a></li>");
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

function showDeleteSign(ele) {
    var del_sign_id = "#del_" + $(ele).attr("data-todo-list-id");
    $(del_sign_id).show();
    $(ele).mouseleave(function () {
        $(del_sign_id).hide();
    })
}

function deleteTopic(ele) {
    var del_list_id = "#todo_" + $(ele).attr("data-todo-list-id");
    $.post
    (
        "system/deleteList.php",
        {
            id: $(ele).attr("data-todo-list-id"),
            mode: "delete"
        },
        function (data, status) {
            if (status == "success") {
                $(del_list_id).remove();
            }
        }
    );
}


$("#sign-out").click(signOut);
$("#write-todo-form").submit(function (e) {
    e.preventDefault();
    addTodoToDatabase();
    $("#topic_todo").val("");
});

function watchTopicTodo() {
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
                        $("#list_undone").append("<a id='todo_" + todoLists.lists[undone_item].ID + "' data-todo-list-id='" + todoLists.lists[undone_item].ID + "' class=\"todo-list-check list-group-item\" onmouseover=\"showDeleteSign(this)\"><div class='checkbox'><label class=\"label-check-list\"><input onclick=\"checked_done(this,'done')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[undone_item].ID + "'></label><label><input id=\"a_todo_list_" + todoLists.lists[undone_item].ID + "\" data-todo-list-id='" + todoLists.lists[undone_item].ID + "' class=\"editable_todo_list\" onfocus=\"edit_list(this);\" type=\"text\" value=\"" + todoLists.lists[undone_item].TOPIC + "\"><\/label><i id=\"del_" + todoLists.lists[undone_item].ID + "\" onclick='deleteTopic(this)' class=\"fa fa-times-circle pull-right\" style=\"display:none;font-size: x-large;\" data-todo-list-id='" + todoLists.lists[undone_item].ID + "' aria-hidden=\"true\"></i><\/div><\/a>");
                    }

                }
                if (call_done) {
                    for (var done_item = 0; done_item < todoLists.lists.length; done_item++) {
                        if (todoLists.lists[done_item].STATUS == 1) {
                            $("#list_done").append("<a id='todo_" + todoLists.lists[done_item].ID + "' data-todo-list-id='" + todoLists.lists[done_item].ID + "' class=\"todo-list-check list-group-item\" onmouseover=\"showDeleteSign(this)\"><div class='checkbox'><label><input onclick=\"checked_done(this,'undone')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[done_item].ID + "' checked><del><i>" + todoLists.lists[done_item].TOPIC + "</i></del><\/label><i id=\"del_" + todoLists.lists[done_item].ID + "\" onclick='deleteTopic(this)' class=\"fa fa-times-circle pull-right\" style=\"display:none;font-size: x-large;\" data-todo-list-id='" + todoLists.lists[done_item].ID + "' aria-hidden=\"true\"></i><\/div><\/a>");
                        }
                    }
                }
            }
        );
    }
}

function edit_list(ele) {
    $("#" + ele.id).blur(function (e) {
        clearInterval(watchingEditableTodo);
    });
    var old_list = ele.value;
    var id_list = $("#" + ele.id).attr("data-todo-list-id");

    function wathEditableTodo() {
        if (old_list != ele.value && ele.value.length > 0) {
            $.post("system/editList.php",
                {
                    id: id_list,
                    topic: ele.value
                },
                function (data, status) {
                    if (status == "success") {
                        old_list = ele.value;
                    } else {
                        console.log("Somethings wrong.");
                    }
                }
            );
        }
    }

    var watchingEditableTodo = setInterval(wathEditableTodo, 500);
}

setInterval(watchTopicTodo, 1000);

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