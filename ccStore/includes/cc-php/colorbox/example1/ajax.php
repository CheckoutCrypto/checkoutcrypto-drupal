<html>
  <div id="cc_wrapper" style="width:400px;height=300px;text-align:center;">
    <div id="cc_pay" style="background:url(https://95.85.20.20/dev/drupal/dev/drupal-7.26/sites/all/modules/potcoin-cart-drupal/includes/cc-php/colorbox/example1/coinproject15_2.jpg) right center no-repeat #fff; height:70px;">
  </div>
  <div id="cc_pay_status" style="height:70px;">
<?php

var_dump($_POST);
    $orderid = $_POST['orderid'];
    $url = 'https://95.85.20.20/dev/ccdev/api/api.php?apikey=d7cc4b86e39ca41d2a4b61b25945842bcc39965b&queueid='.$orderid;
    $url = 'https://95.85.20.20/dev/ccdev/api/api.php?apikey=d7cc4b86e39ca41d2a4b61b25945842bcc39965b&queueid=72';
    $result = file_get_contents($url);

    $jsonArr = json_decode($result,true);
    try {
        if(isset($jsonArr['response']['status'])) {
            if($jsonArr['response']['status'] == 'success' AND isset($jsonArr['response']['address'])) {
                $address = $jsonArr['response']['address'];
                echo $address;
            }
        } else {
            echo "nope";
        }
    } catch (exception $e) {
        echo $e;
    }
?>
  </div>
  </div> <!-- cc_wrapper -->
</html>
