<?php header('Content-Type: application/json; charset=utf-8');
$ajaxSpeichernSummary = array(
    "message" => "Undefined",
    "saveStatus" => false
);

include('db.inc.php');
$table = "kontakt_formular";

if (
    isset($_POST["vorname"]) && isset($_POST["name"]) && isset($_POST["betreff"]) && isset($_POST["email"]) && isset($_POST["message"])
) {
    $name = $_POST["name"];
    $vorname = $_POST["vorname"];
    $betreff = $_POST["betreff"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $sql = "INSERT INTO $table (vorname, name, betreff, email, message) VALUES (?, ?, ?, ?, ?)";
    $stmt = $verbindung->prepare($sql);
    $stmt->bind_param("sssss", $vorname, $name, $betreff, $email, $message);
    $result = $stmt->execute();
    if ($result) {
        $ajaxSpeichernSummary['message'] = "Eintrag erfolgreich gespeichert.";
        $ajaxSpeichernSummary['saveStatus'] = true;
    } else {
        $ajaxSpeichernSummary['message'] = "Eintrag konnte nicht gespeichert werden - DBProblem.";
        $ajaxSpeichernSummary['saveStatus'] = false;
    }
}

// JSON-Ausgabe
$json = json_encode($ajaxSpeichernSummary);
print ($json);
// Datenbankverbindung schließen
mysqli_close($verbindung);

?>