<?php
/**
 * Created by PhpStorm.
 * User: HatsuneMiku
 * Date: 20/10/2559
 * Time: 17:57
 */
require("stickyTodo.php");
$sticky = new StickyTodo();
$list = $_POST['listname'];
$sticky->add_list($list);