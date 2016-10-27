<?php
session_start();

class StickyTodo
{
    /*
     * Connection variables.
     */
    private $db_host = "localhost";
    private $db_user = "it57160438";
    private $db_password = "4K5m8eHj";
    private $db_database_select = "it57160438";
    private $link = null;

    /*
     * User information
     */
    private $username = null;

    /*
     * All tasks
     */
    private $allTasks = null;

    /*
     * Database query variables.
     */
    private $sql = null;
    private $result = null;


    function __construct()
    {
        $this->username = $_SESSION['username'];
        $this->allTasks = $_SESSION['all_tasks'];
        $this->Open();
    }

    /*
     * Connect or disconnect the database.
     */

    public function Open()
    {
        if (isset($this->link)) {
            echo "Warning : You already connected to MySql.";
        } else {
            $this->link = mysqli_connect($this->db_host, $this->db_user, $this->db_password, $this->db_database_select);
            if (mysqli_error($this->link)) {
                die("Connection failed: " . mysqli_error($this->link));
            }
            return true;
        }
        return false;


    }

    public function Close()
    {
        mysqli_close($this->link);
    }

    /*
     * Run SQL command to the database.
     */

    public function getResult($mode)
    {
        if($mode == "object")
        {
            return mysqli_fetch_object($this->result);    
        }
        elseif($mode == "assoc")
        {
            return mysqli_fetch_assoc($this->result);
        }
        elseif ($mode == "array")
        {
            return mysqli_fetch_array($this->result);
        }
        return false;
    }
    
    public function getNumRow()
    {
        return mysqli_num_rows($this->result);
    }

    private function executeQuery()
    {
        mysqli_query($this->link,"SET NAMES UTF8");
        if (mysqli_errno($this->link)) {
            echo "MySQL error " . mysqli_errno($this->link) . ": "
                . mysqli_errno($this->link) . "\n<br>When executing <br>\n$this->sql\n<br>";
            return false;
        }
        $this->result = mysqli_query($this->link, $this->sql);
        return true;
    }

    /*
     * Common query.
     */

    public function select_all_from($table)
    {
        $table = mysqli_real_escape_string($this->link, $table);
        $this->sql = "SELECT * FROM `" . $table . "`";
        $this->executeQuery();
    }

    public function select_where_one($field, $predict, $table)
    {
        $predict = mysqli_real_escape_string($this->link, $predict);
        $field = mysqli_real_escape_string($this->link, $field);
        $table = mysqli_real_escape_string($this->link, $table);

        $predict_tmp = null;
        if (!is_numeric($predict)) {
            $predict_tmp = "'" . $predict . "'";
        } else {
            $predict_tmp = $predict;
        }
        $this->sql = "SELECT * FROM `" . $table . "` WHERE `" . $field . "` = " . $predict_tmp;
        $this->executeQuery();
    }

    public function get_lists()
    {
        $this->sql = "select distinct `sticky_lists`.`list_id`, `sticky_lists`.`list_name` from `sticky_lists` natural join `sticky_todo` where `sticky_lists`.`list_owner` = '" . $this->username . "' and `sticky_lists`.`list_visible` = 0 ORDER BY `sticky_lists`.`list_id` ";
        $this->executeQuery();
    }

    public function get_todo()
    {
        //$this->sql = "SELECT * FROM `sticky_todo` WHERE `sticky_todo`.`POST_BY`='" . $this->username."' AND `sticky_todo`.`VISIBLE`=0 ORDER BY  `sticky_todo`.`LAST_MOD` ";
        $this->sql = "SELECT *  FROM `sticky_todo` natural join `sticky_lists` WHERE `sticky_todo`.`POST_BY` = '" . $this->username."' AND `sticky_todo`.`VISIBLE` = 0 AND `sticky_todo`.`todo_list_number` = `sticky_lists`.`list_id` ORDER BY  `sticky_todo`.`LAST_MOD`";
        //echo $this->sql;
        $this->executeQuery();
    }

    public function get_todo_of($list_number)
    {
        $this->sql = "SELECT * FROM `sticky_todo` natural join `sticky_lists` WHERE `sticky_todo`.`POST_BY` = '" . $this->username."' AND `sticky_todo`.`todo_list_number` = ".$list_number." AND `sticky_todo`.`VISIBLE`=0 AND `sticky_todo`.`todo_list_number` = `sticky_lists`.`list_id` ORDER BY  `sticky_todo`.`LAST_MOD` ";
        $this->executeQuery();
    }

    public function get_undone()
    {
        $this->sql = "SELECT * FROM `sticky_todo` WHERE (`sticky_todo`.`POST_BY`='" . $this->username."' AND `sticky_todo`.`STATUS`=0) AND `sticky_todo`.`VISIBLE`=0";
        //echo $this->sql;
        $this->executeQuery();
    }
    public function get_complete()
    {
        $this->sql = "SELECT * FROM `sticky_todo` WHERE (`sticky_todo`.`POST_BY`='" . $this->username."' AND `sticky_todo`.`STATUS`=1) AND `sticky_todo`.`VISIBLE`=0";
        //echo $this->sql;
        $this->executeQuery();
    }

    public function get_last_add()
    {
        $this->sql = "SELECT * FROM `sticky_todo` WHERE (`sticky_todo`.`POST_BY`= '".$this->username."' AND `sticky_todo`.`STATUS`=0) AND `sticky_todo`.`VISIBLE`=0 ORDER BY `sticky_todo`.`LAST_MOD` DESC LIMIT 1";
        //echo $this->sql;
        $this->executeQuery();
    }

    /*public function query_whatever($sql)
    {
        $this->sql = $sql;
        $this->executeQuery();
    }*/

    /*
     * Todo topic.
     * $due = 0000-00-00 00:00:00
     */

    public function add_todo($topic, $list_number)
    {
        $topic = mysqli_real_escape_string($this->link, $topic);
        $list_number = mysqli_real_escape_string($this->link, $list_number);
        //$due = mysqli_real_escape_string($this->link, $due);
        //$this->sql = "INSERT INTO `it57160438`.`sticky_todo` (START`, `POST_BY`, `DUE`, `TOPIC`, `LAST_MOD`) VALUES ('" . $this->username . "', '" . $due . "', '" . $topic . "',NOW());";
        //if($list_number == $this->allTasks)$list_number = $this->allTasks;
        $this->sql = "INSERT INTO `it57160438`.`sticky_todo` (`POST_BY`, `TOPIC`, `LAST_MOD`, `todo_list_number`) VALUES ('" . $this->username . "', '" . $topic . "',NOW(), ".$list_number.");";
        //echo $this->sql;
        $this->executeQuery();
    }

    public function add_list($list_name)
    {
        $list_name = mysqli_real_escape_string($this->link, $list_name);
        $this->sql = "INSERT INTO `it57160438`.`sticky_lists` (`list_owner`, `list_name`, `CREATED_AT`) VALUES ('".$this->username."', '".$list_name."', NOW());";
        $this->executeQuery();
    }

    public function list_hide($list_id)
    {
        $list_id = mysqli_real_escape_string($this->link, $list_id);
        $this->sql = "UPDATE `it57160438`.`sticky_lists` SET `list_visible` = 1 WHERE `sticky_lists`.`list_id` = ".$list_id.";";
        $this->executeQuery();
        $this->sql = "UPDATE `sticky_todo` SET `VISIBLE`= 1 WHERE `POST_BY` = '".$this->username."' AND `todo_list_number` = ".$list_id;
        $this->executeQuery();
    }

    public function status($id, $order)
    {
        $id = mysqli_real_escape_string($this->link, $id);
        $order = mysqli_real_escape_string($this->link, $order);
        $status = null;
        if ($order == "done") {
            $status = "1";
        } elseif ($order == "undone") {
            $status = "0";
        } else {
            echo "your parameter is invalid.";
        }
        $this->sql = "UPDATE `it57160438`.`sticky_todo` SET `STATUS` = '" . $status . "',`LAST_MOD`=NOW() WHERE `sticky_todo`.`ID` = " . $id . ";";
        $this->executeQuery();
    }

    public function visible($id, $order)
    {
        $id = mysqli_real_escape_string($this->link, $id);
        $order = mysqli_real_escape_string($this->link, $order);
        $visible = null;
        if ($order == "delete") {
            $visible = "1";
        } elseif ($order == "recover") {
            $visible = "0";
        } else {
            echo "your parameter is invalid.";
        }
        $this->sql = "UPDATE `it57160438`.`sticky_todo` SET `VISIBLE` = '" . $visible . "' WHERE `sticky_todo`.`ID` = " . $id . ";";
        $this->executeQuery();
    }

    /*
     * User Authentication.
     */

    public function signIn($username, $password, $stayLoggedIn)
    {
        $username = mysqli_real_escape_string($this->link, $username);
        $password = mysqli_real_escape_string($this->link, $password);
        $password = "dskeowiwekd" . (hash("sha256", $password) . "skKaoqi92#*3G93fc$^*S@@a2");
        $this->sql = "SELECT `sticky_user`.`USERNAME`, `sticky_user`.`PASSWORD` FROM `sticky_user` WHERE `sticky_user`.`USERNAME` = '" . $username . "' AND `sticky_user`.`PASSWORD` = '" . $password . "'";
        $this->executeQuery();
        if (mysqli_num_rows($this->result) == 1) {
            $_SESSION['username'] = mysqli_fetch_object($this->result)->USERNAME;
            $_SESSION['all_tasks'] = mysqli_fetch_array(mysqli_query($this->link, "SELECT `list_id` FROM `sticky_lists` WHERE `list_owner` = '".$_SESSION['username']."' AND `list_name` = 'All tasks'"))[0];
            if ($stayLoggedIn == "true")
                setcookie('username', $_SESSION['username'], time() + (86400 * 15), "/");
                setcookie('all_tasks', $_SESSION['all_tasks'], time() + (86400 * 15), "/");
            return true;
        }
        //echo $this->sql;
        return false;
    }

    public function signOut()
    {
        setcookie('username', $_SESSION['username'], time() - 3600, '/');
        setcookie('all_tasks', $_SESSION['all_tasks'], time() - 3600, '/');
        session_destroy();
    }

    /*
     * Edit todo topic
     */

    public function edit_topic($id, $topic)
    {
        $id = mysqli_real_escape_string($this->link, $id);
        $topic = mysqli_real_escape_string($this->link, $topic);
        $this->sql = "UPDATE `it57160438`.`sticky_todo` SET `sticky_todo`.`TOPIC` = '" . $topic . "' WHERE `sticky_todo`.`ID` = " . $id . ";";
        echo $this->sql;
        $this->executeQuery();
    }

    /*
     * search todo topic
     */

    public function search_topic($topic)
    {
        $topic = mysqli_real_escape_string($this->link, $topic);
        $this->sql ="SELECT *  FROM `sticky_todo` natural join `sticky_lists` WHERE `POST_BY` = '".$this->username."' AND `sticky_todo`.`TOPIC` LIKE '%".$topic."%' AND `sticky_todo`.`VISIBLE` = 0 AND `sticky_todo`.`todo_list_number` = `sticky_lists`.`list_id` ORDER BY  `sticky_todo`.`LAST_MOD`";
        $this->executeQuery();
    }

    /*
     * Registration.
     */

    public function add_user($username, $password)
    {
        if (!empty($username) AND !empty($password)) {
            $username = mysqli_real_escape_string($this->link, $username);
            $password = mysqli_real_escape_string($this->link, $password);
            $this->sql = "INSERT INTO `it57160438`.`sticky_user` (`USERNAME`, `PASSWORD`) VALUES ('" . $username . "', '" . "dskeowiwekd" . (hash("sha256", $password) . "skKaoqi92#*3G93fc$^*S@@a2") . "');";
            $this->executeQuery();
            $this->sql = "INSERT INTO `it57160438`.`sticky_lists` (`list_owner`, `list_name`, `list_visible`) VALUES ('".$username."', 'All tasks',0);";
            //echo $this->sql;
            $this->executeQuery();
            return true;
        } else {
            return false;
        }
    }

}
