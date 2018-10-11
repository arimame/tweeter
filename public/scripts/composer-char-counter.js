$(document).ready(function() {
  // --- our code goes here ---

  $("textarea").keyup(function(event) {
    var max = 140;
    var count = max - $(this).val().length;
    var $counter = $(this).parent().find(".counter");
    if (count < 0) {
      $counter.addClass("negative-numbers");
    } else {
      $counter.removeClass("negative-numbers");
    }
    $counter.text(count);
  })
});