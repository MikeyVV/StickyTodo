<?php
session_start();
class Database
{
    /*
     * Connection variables.
     */
    private $db_host = "localhost";
    private $db_user = "it57160438";
    private $db_password = "4K5m8eHj";
    private $db_database_select = "it57160438";
    private $db_connection_string = null;
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
        $this->db_connection_string = $this->db_host . "," . $this->db_user . "," . $this->db_password . "," . $this->db_database_select;
        $this->username = $_SESSION['username'];
    }

    /*
     * Connect or disconnect the database.
     */

    public function Open()
    {
        $this->link = mysqli_connect($this->db_connection_string);
        if (mysqli_error($this->link)) {
            die("Connection failed: " . mysqli_error($this->link));
        }
        return true;
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
        $this->sql = mysqli_real_escape_string($this->link, $this->sql);

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
        $this->sql = "SELECT * FROM `" . $table . "`";
        $this->executeQuery();
    }

    public function select_where_one($field, $predict, $table)
    {
        $predict_tmp = null;
        if (!is_numeric($predict)) {
            $predict_tmp = "'" . $predict . "'";
        }
        $this->sql = "SELECT * FROM `" . $table . "` WHERE `" . $field . "` = " . $predict_tmp;
        $this->executeQuery();
    }

    public function query_whatever($sql)
    {
        $this->sql = $sql;
        $this->executeQuery();
    }

    /*
     * Todo topic.
     * $due = 0000-00-00 00:00:00
     */

    public function add_todo($topic, $due)
    {
        $this->sql = "INSERT INTO `it57160438`.`sticky_todo` (START`, `POST_BY`, `DUE`,  `TOPIC`) VALUES ('" . $this->username . "', '" . $due . "', '" . $topic . "');";
        $this->executeQuery();
    }

    public function status($id, $order)
    {
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
        $password = md5($password);
        $this->sql = "SELECT `sticky_user`.`USERNAME`, `sticky_user`.`PASSWORD` FROM `sticky_user` WHERE `sticky_user`.`USERNAME` = '".$username."' AND `sticky`.`PASSWORD` = '".$password."'";
        $this->executeQuery();
        if(mysqli_num_rows($this->result) == 1)
        {
            if($stayLoggedIn)
            {
                setcookie('username',$stayLoggedIn,time() + (86400 * 15), "/");
                $_COOKIE['username'] = $stayLoggedIn;
            }
            return true;
        }
        return false;
    }
    
    public function signOut(){
        session_destroy();
        setcookie('username',"",time() - 3600);
    }

    /*
     * Edit todo topic
     */

    public function edit_topic($id, $topic)
    {
        $this->sql = "UPDATE `it57160438`.`sticky_todo` SET `sticky_todo`.`TOPIC` = '".$topic."' WHERE `sticky_todo`.`ID` = ".$id.";";
        $this->executeQuery();
    }

    /*
     * Registration.
     */

    public function add_user($username, $password)
    {
        if (isset($username) AND isset($password)) {
            $this->sql = "INSERT INTO `it57160438`.`sticky_user` (USERNAME`, `PASSWORD`) VALUES ('" . $username . "', '" . md5($password) . "');";
            $this->executeQuery();
            return true;
        } else {
            return false;
        }
    }

}