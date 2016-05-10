function checked_done(ele, todo_status) {
    $.post("system/checkDone.php",
        {
            id: $(ele).val(),
            status: todo_status
        },
        function (data, status) {
            if (status == "success") {
                remove_list();
                get_todo();
            }
        }
    );
}

//$(document).ready(function () {
$("#sign-in-user").html(username);
function signOut() {
    $.post("system/authentication.php", {mode: "sign out"}, function () {
        location.reload()
    });
}

function remove_list() {
    $(".todo-list-check").remove();

}


function get_todo() {
    $.get("system/getTodo.php", function (data, success) {
        var todoLists = JSON.parse(data);
        var call_undone = true;
        for (var todo_item = 0; todo_item < todoLists.lists.length; todo_item++) {
            if (todo_item == todoLists.lists.length - 1)call_undone = true;
            if (todoLists.lists[todo_item].STATUS == 0) {
                $("#list_undone").append("<a class=\"todo-list-check list-group-item\"><div class='checkbox'><label><input onclick=\"checked_done(this,'done')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[todo_item].ID + "'>" + todoLists.lists[todo_item].TOPIC + "<\/label><\/div><\/a>");
            }

        }
        if (call_undone) {
            for (var done_item = 0; done_item < todoLists.lists.length; done_item++) {
                if (todoLists.lists[done_item].STATUS == 1) {
                    $("#list_done").append("<a class=\"todo-list-check list-group-item\"><div class='checkbox'><label><input onclick=\"checked_done(this,'undone')\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[done_item].ID + "' checked><del><i>" + todoLists.lists[done_item].TOPIC + "</i></del><\/label><\/div><\/a>");
                }
            }
        }
    });
}

function addTodo() {
    var todo_topic = $("#topic_todo");
    if (todo_topic.val().length > 0) {
        $.post("system/manageTodo.php",
            {
                topic: todo_topic.val(),
                mode: "add"
            },
            function (data, status)
            {
                if(status == "success"){
                    remove_list();
                    get_todo();
                }else {
                    
                }
            }
        );
    }
}

//$(".todo")


$("#sign-out").click(signOut);
$("#write-todo-form").submit(function(e){
    e.preventDefault();
    addTodo();
    $("#topic_todo").val("");
});
get_todo();


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