<?php

$file = '../../XtRs/save.txt';

$person = $_GET["name"] . ";" . $_GET["email"] . ";" . $_GET["city"] ."\n";

file_put_contents($file, $person, FILE_APPEND | LOCK_EX);

?>