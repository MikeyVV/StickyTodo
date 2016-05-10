function checked_done (ele){
    $.post("system/checkDone.php",
        {
            id: $(ele).val(),
            status: "done"
        },
        function(status)
        {
            if(status == "success"){
                get_todo();
            }
        }
    );
}
$(document).ready(function () {
    $("#sign-in-user").html(username);
    function signOut() {
        $.post("system/authentication.php", {mode: "sign out"}, function () {
            location.reload()
        });
    }



    function get_todo(){
        $.get("system/getTodo.php", function (data, success) {
            var todoLists = JSON.parse(data);
            var call_undone = false;
            if(!todoLists.lists)call_undone = true;
            for (var todo_item = 0; todo_item < todoLists.lists.length; todo_item++) {
                if(todo_item == todoLists.lists.length-1)call_undone = true;
                if(todoLists.lists[todo_item].STATUS == 0)
                    $("#list_undone").append("<li id=\"todo_" + todoLists.lists[todo_item].ID + "\" class=\"list-group-item\"><div class='checkbox'><label><input onclick=\"checked_done(this);\" class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[todo_item].ID + "'>" + todoLists.lists[todo_item].TOPIC + "<\/label><\/div><\/li>");
            }
            if(call_undone){
                for (var done_item = 0; done_item < todoLists.lists.length; done_item++) {
                    if(todoLists.lists[done_item].STATUS == 1)
                        $("#list").append("<li id=\"todo_" + todoLists.lists[done_item].ID + "\" class=\"list-group-item\"><div class='checkbox'><label><input class=\"check_todo_lists\" type='checkbox' name=\"check_todo_lists\" value='" + todoLists.lists[done_item].ID + "' checked>" + todoLists.lists[done_item].TOPIC + "<\/label><\/div><\/li>");
                }
            }

        });
    }



    $("#sign-out").click(signOut);
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


});