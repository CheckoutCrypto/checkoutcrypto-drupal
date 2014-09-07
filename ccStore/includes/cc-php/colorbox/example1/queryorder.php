<?php
  if(isset($_POST['orderid'])) {
    $orderid = $_POST['orderid'];
    $url = 'https://95.85.20.20/dev/ccdev/api/api.php?apikey=d7cc4b86e39ca41d2a4b61b25945842bcc39965b&queueid='.$orderid;
    $result = file_get_contents($url);

    $jsonArr = json_decode($result,true);
    try {
        if(isset($jsonArr['response']['status'])) {
            if($jsonArr['response']['status'] == 'success' AND isset($jsonArr['response']['address'])) {
                echo $jsonArr['response']['address'];
            }
        } else {
            echo "nope";
        }
    } catch (exception $e) {
        echo $e;
    }
}
?>
