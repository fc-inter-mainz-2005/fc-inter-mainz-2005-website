<?php header('Content-Type: application/json; charset=utf-8');
$ajaxSpeichernSummary = array(
    "message" => "Undefined",
    "saveStatus" => false
);

include('db.inc.php');
$table = "consults";

if (
    isset($_POST["vorname"]) && isset($_POST["name"]) && isset($_POST["alter"]) && isset($_POST["geburtsdatum"]) && isset($_POST["email"])
) {
    $name = $_POST["name"];
    $vorname = $_POST["vorname"];
    $alter = intval($_POST["alter"]);
    $geburtsdatum = $_POST["geburtsdatum"];
    $email = $_POST["email"];
    if (isset($_POST['telefon'])) {
        $telefon = $_POST["telefon"];
    } else {
        $telefon = null;
    }

    $sql = "INSERT INTO $table (vorname, name, alter, geburtsdatum, email, telefon) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $verbindung->prepare($sql);
    $stmt->bind_param("ssisss", $vorname, $name, $alter, $geburtsdatum, $email, $telefon);
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