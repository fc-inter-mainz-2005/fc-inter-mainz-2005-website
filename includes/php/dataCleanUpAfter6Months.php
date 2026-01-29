<?php
/**
 * F.C. Inter Mainz 2005 - Automatische Datenhygiene
 * Löscht Anfragen, die älter als 6 Monate sind (DSGVO-konform).
 */

// Solo permitir ejecución si es desde la línea de comandos (Cron)
if (php_sapi_name() !== 'cli') {
    die("Access denied");
}

// Evitar que el script se detenga si hay muchos registros
set_time_limit(0);

// Incluir la conexión a la base de datos
include('db.inc.php'); 

$table = "consults";
$logFile = "cleanup_log.txt"; // Archivo para registrar cuándo se limpió la DB

// Definir el intervalo de 6 meses según el peritaje legal
$sql = "DELETE FROM $table WHERE created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH)";

if ($stmt = $verbindung->prepare($sql)) {
    $stmt->execute();
    $deletedRows = $stmt->affected_rows;
    
    // Registrar la actividad en un log
    $statusMessage = date("Y-m-d H:i:s") . " - Reinigung abgeschlossen. Gelöschte Einträge: $deletedRows\n";
    file_put_contents($logFile, $statusMessage, FILE_APPEND);
    
    $stmt->close();
} else {
    file_put_contents($logFile, date("Y-m-d H:i:s") . " - Fehler: " . $verbindung->error . "\n", FILE_APPEND);
}

mysqli_close($verbindung);
?>