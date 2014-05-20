jQuery(document).ready(function ($) {

  function submit_uc_cc_form(timeout) {
    setTimeout(function() {
        console.log('submit');
        setTimeout(function() {         
            $('form#uc-cc-form').submit();
            submit_uc_cc_form(); }, 5000); //TODO infinite loop
    }, timeout);
  }

  $('#edit-submit').mousedown(function() {
    console.log('in');
    });

    $("body").click(function(e) {
      $("#cc_coin_reselect").mousedown(function() {
        console.log('true');

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
        console.log(e.target.id);;
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
        submit_uc_cc_form(0);
      }
    });
});
