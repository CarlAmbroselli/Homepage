<?php
$empfaenger = $_POST["email"];

$betreff = "Visitenkarte von Carl Ambroselli";

$dateiname = "./CarlAmbroselli.vcf"; 
$dateiname_mail = "CarlAmbroselli.vcf";

$dateiinhalt = fread(fopen($dateiname, "r"), filesize($dateiname));

$fileatt_type = "application/octet-stream"; // File Type
	
	$headers = "From: Carl Ambroselli <mail@carl-ambroselli.de>";
	$today = date("l, F j, Y, g:i a");
	
	$message = "Visitenkarte von Carl Ambroselli";
	
	$data = chunk_split(base64_encode($dateiinhalt));
	
	$semi_rand = md5(time());
	$mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";
	
	$headers .= "\nMIME-Version: 1.0\n" .
	"Content-Type: multipart/mixed;\n" .
	" boundary=\"{$mime_boundary}\"";
	
	$message .= "This is a multi-part message in MIME format.\n\n" .
	"--{$mime_boundary}\n" .
	"Content-Type:text/html; charset=\"iso-8859-1\"\n" .
	"Content-Transfer-Encoding: 7bit\n\n" .
	$message . "\n\n";
	$message .= "--{$mime_boundary}\n" .
	"Content-Type: {$fileatt_type};\n" .
	" name=\"{$dateiname_mail}\"\n" .
	"Content-Transfer-Encoding: base64\n\n" .
	$data . "\n\n" .
	"--{$mime_boundary}--\n";
	
	mail($empfaenger, $betreff, $message, $headers);
	mail("post@carl-ambroselli.de", "Visitenkarte angefragt", "Die Visitenkarte wurde von ".$empfaenger." heruntergeladen.", "From: Carl Ambroselli <mail@carl-ambroselli.de>");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
		 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Kontaktinformationen von Carl Ambroselli</title>
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"/>  
	<link rel="stylesheet" href="css.css" type="text/css" />
  	<link rel="stylesheet" title="Default" href="theme.css"  type="text/css"/>
</head>

<body>
	<div class="toolbar">
		<h1 id="pageTitle">Carl Ambroselli</h1>
		<a id="backButton" class="button" href="#"></a>
	</div>
	<form selected="true" title="vcard" class="panel" method="post" action="mail.php" target="_self">
		<br/><h2>Die digitale Visitenkarte von Carl Ambroselli wurde an <?php echo $empfaenger;?> versendet.</h2><br/>		</form>
</body>
</html>