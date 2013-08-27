<?php
	//header("content-type: text/json");
	header('content-type: application/json; charset=utf-8');

	//============== PHP gets the params that are passed in the URL ================
	$UName=$_GET['UName'];
	$ResetUser=$_GET['ResetUser'];
	$DataType=$_GET['type'];
	$Source=$_GET['source'];
	$TimeStamp=$_GET['time'];
	$Count=$_GET['count'];

	//============== DB Params ==============
	// You'll have to set up your own database for this, but if you want to skip 
	// the DB connection you can use fakeResponse below instead of responce, and 
	// comment out the DB connection lines.
	$user="##########"; // put DB user name here
	$password="##########";  // put DB password here
	$database="##########"; // put DB name here
	$dbaddress= "##########.secureserver.net"; // put DB address here.  
	//$dbaddress= "localhosts"; //You might be able to use "localhost" as the address

	//============ DB Connect and retreive data ===============
	mysql_connect($dbaddress,$user,$password);
	@mysql_select_db($database) or die( "Unable to select database");

	// Get values from the table
	$initialQuery= "SELECT * FROM motion_data";
	$result=mysql_query($initialQuery);
	$numRows=mysql_numrows($result);

	// Once you have your info close the DB connection
	mysql_close();

	//================== Parse into JSON ====================
	$response = array();
	if ($numRows > 0){
		while ($i < $numRows) {
			$response[] = array (
				"id" => mysql_result($result,$i,"id"),
				"time" => mysql_result($result,$i,"time"),
				"count" => mysql_result($result,$i,"count"),
				"interval" => mysql_result($result,$i,"interval")
			);
			$i++;
		}
	}

	//You can use this if you just want to work with out setting up the api
	$fakeResponse = array(
		array(
			"id" => "PIR_1",
			"time" => "2013-04-11 09:00:59",
			"count" => "10",
			"interval" => "120"
			),
		array(
			"id" => "PIR_1",
			"time" => "2013-04-11 09:02:59",
			"count" => "40",
			"interval" => "120"
			),
		array(
			"id" => "PIR_1",
			"time" => "2013-04-11 09:04:59",
			"count" => "45",
			"interval" => "120"
			),
		array(
			"id" => "PIR_1",
			"time" => "2013-04-11 09:06:59",
			"count" => "60",
			"interval" => "120"
			),
		array(
			"id" => "PIR_1",
			"time" => "2013-04-11 09:08:59",
			"count" => "5",
			"interval" => "120"
			)
	);

	// jsonp is required for cross-server requests
	echo $_GET['callback'] . '(' . json_encode($response) . ')';

?>

