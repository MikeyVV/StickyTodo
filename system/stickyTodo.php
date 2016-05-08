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
     * Database query variables.
     */
    private $sql = null;
    public $result = null;


    function __construct()
    {
        //$this->username = $_SESSION['username'];
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

    private function executeQuery()
    {
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

    /*public function query_whatever($sql)
    {
        $this->sql = $sql;
        $this->executeQuery();
    }*/

    /*
     * Todo topic.
     * $due = 0000-00-00 00:00:00
     */

    public function add_todo($topic, $due)
    {
        $topic = mysqli_real_escape_string($this->link, $topic);
        $due = mysqli_real_escape_string($this->link, $due);
        $this->sql = "INSERT INTO `it57160438`.`sticky_todo` (START`, `POST_BY`, `DUE`,  `TOPIC`) VALUES ('" . $this->username . "', '" . $due . "', '" . $topic . "');";
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
        $this->sql = "UPDATE `it57160438`.`sticky_todo` SET `STATUS` = '" . $status . "' WHERE `sticky_todo`.`ID` = " . $id . ";";
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
            if ($stayLoggedIn == "true")
                setcookie('username', $_SESSION['username'], time() + (86400 * 15), "/");
            return true;
        }
        //echo $this->sql;
        return false;
    }

    public function signOut()
    {
        setcookie('username', $_SESSION['username'], time() - 3600, '/');
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
            $this->sql = "INSERT INTO `it57160438`.`sticky_user` (USERNAME`, `PASSWORD`) VALUES ('" . $username . "', '" . "dskeowiwekd" . (hash("sha256", $password) . "skKaoqi92#*3G93fc$^*S@@a2") . "');";
            $this->executeQuery();
            return true;
        } else {
            return false;
        }
    }

}