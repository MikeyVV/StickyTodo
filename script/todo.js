function checked_done(ele, todo_status) {
    $.post("system/checkDone.php",
        {
            id: $(ele).val(),
            status: todo_status
        },
        function (data, status) {
            if (status == "success") {
                remove_list(ele);
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

function remove_list(ele) {
    $("#todo_" + $(ele).val()).remove();
    add_list(ele)
}

function add_list(ele) {
    var ele_id = $(ele).val();
    var ele_text = $(ele).parent().text();
    if ($(ele).is(":checked")) {
        //add to complete
        $("#list_done").append("<a id='todo_" + ele_id + "' class=\"todo-list-check list-group-item\"><div class='checkbox'><label><input onclick=\"checked_done(this,'undone')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + ele_id + "' checked><del><i>" + ele_text + "</i></del><\/label><\/div><\/a>");
    } else {
        //add to undone
        $("#list_undone").append("<a id='todo_" + ele_id + "' class=\"todo-list-check list-group-item\"><div class='checkbox'><label><input onclick=\"checked_done(this,'done')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + ele_id + "'>" + ele_text + "<\/label><\/div><\/a>");
    }
}


(function get_todo() {
    $.get("system/getTodo.php", function (data, success) {
        var todoLists = JSON.parse(data);
        var call_done = true;
        for (var undone_item = 0; undone_item < todoLists.lists.length; undone_item++) {
            if (undone_item == todoLists.lists.length - 1)call_done = true;
            if (todoLists.lists[undone_item].STATUS == 0) {
                $("#list_undone").append("<a id='todo_" + todoLists.lists[undone_item].ID + "' class=\"todo-list-check list-group-item\"><div class='checkbox'><label><input onclick=\"checked_done(this,'done')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[undone_item].ID + "'>" + todoLists.lists[undone_item].TOPIC + "<\/label><\/div><\/a>");
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
                    remove_list();
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