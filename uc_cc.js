jQuery(document).ready(function ($) {

    var countdown;
    clearInterval(countdown);
    countdown = 0;
    
    var checker;
    clearInterval(checker);
    checker = 0;

    var timeleft;
    var expired_countdown_content = 'The time limit has been reached. Please close this window and submit your order to try again.';
    var iVal = 1000;
    var selCoin;

    function timer() {
        timeleft = timeleft -1;
        if(timeleft <= 0)
        {
            console.log('time up');
            clearInterval(countdown);
            countdown = 0;
            clearInterval(checker);
            checker = 0;
            document.getElementById('cc-border').innerHTML = expired_countdown_content;

        }
        var minutes = Math.floor(timeleft/60);
        var seconds = timeleft%60;
        var seconds_string = "0" + seconds;
        seconds_string = seconds_string.substr(seconds_string.length - 2);
        if(  document.getElementById('cc_progress_timer') != null) {
		document.getElementById('cc_progress_timer').innerHTML = minutes + ":" + seconds_string;
    
	}else{
		timeleft = 0;	
	}
    }

  function submit_uc_cc_form() {

    console.log('submitted');

    if(typeof timeleft == 'undefined') {
      console.log('no time');
      timeleft = (Drupal.settings.uc_cc.time_limit);
	if(selCoin == "cc_coin_btc"){
		timeleft = timeleft * 2;
		iVal = iVal * 2;
	}
       countdown = setInterval(timer, iVal); //start timer
    } else {
        console.log(timeleft);
        console.log('complete');
        $('form#uc-cc-form').submit();
    }
  }

  $('#edit-submit').mousedown(function() {
    console.log('in');
  });

    $("body").click(function(e) {
      $("#cc_coin_reselect").mousedown(function() {
        console.log('reselect');
        clearInterval(checker); //reset timer
        checker = 0;
        document.getElementById('cc_payment_information').innerHTML = '<p>Please select another currency to continue checkout</p>'; //TODO should be in php

        $("#cc_coin_select_wrapper").fadeTo("slow", 1.00, function(){ //fade and toggle class
             $(this).slideDown("slow");
             $(this).toggleClass("uc_cc_hidden");
        });
        $("#cc_payment_processing_wrapper").fadeTo("slow", 0.00, function(){ //fade and toggle class
             $(this).slideUp("slow");
             $(this).toggleClass("uc_cc_hidden");
        });
        $('#cc_coin_reselect').hide();

      });

      if($(e.target).parent().is('#cc_coin_select_wrapper')) {
        console.log(e.target.id);
        console.log('target');
	selCoin = e.target.id;
           /*   if( selCoin == "cc_coin_btc"){
                timeleft= timeleft * 10;
                iVal = iVal * 10;
        } */

        $('[name="uc_cc_selected_coin"]').val(e.target.id);
        $('#cc_payment_processing_wrapper').show();
        $("#cc_payment_processing_wrapper").fadeTo("slow", 1.00, function(){ //fade and toggle class
             $(this).slideDown("slow");
             $(this).toggleClass("uc_cc_hidden");
         });
        $("#cc_coin_select_wrapper").fadeTo("slow", 0.00, function(){ //fade and toggle class
             $(this).slideUp("slow");
             $(this).toggleClass("uc_cc_hidden");
        });
        
        $('#cc_coin_reselect').show();
        checker = setInterval(submit_uc_cc_form, 5000);
        submit_uc_cc_form();
      }
    });
});
