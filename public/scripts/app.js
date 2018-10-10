/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

 function renderTweets(tweets) {
  $("#tweet-container").empty();
  tweets.forEach(function(element) {
  var $tweet = createTweetElement(element);
  $('#tweet-container').append($tweet);
  });
}

function createTweetElement(data) {
  var $tweet = $("<article>").addClass("tweet");

  //get years/days/hours ago
  var timestamp = new Date(data.created_at);
  var todaysDate = new Date();
  var miliseconds = todaysDate.getTime() - timestamp.getTime();
  var finalDate;
  var year =  Math.ceil(miliseconds / (1000 * 60 * 60 * 24 * 365));
  var day = Math.ceil(miliseconds / (1000 * 60 * 60 * 24));
  var hour = Math.ceil(miliseconds / (1000 * 60 * 60));
  if (year > 0) {
    finalDate = "About " + year + " years ago";
  } else if (day < 365) {
    finalDate = day + " days ago";
  } else if (hour < 24) {
    finalDate = hour + "hours ago";
  };

//create tweet
  $tweet.append(`
          <header>
            <img class="logo" src=${data.user.avatars.small}>
            <h2>${data.user.name}</h2>
            <p>${data.user.handle}<p>
          </header>
          <p>${data.content.text}</p>
          <footer>
            <p>${finalDate}</p>
            <div class="icons">
            <i class="material-icons">flag</i>
            <i class="material-icons">repeat</i>
             <i class="material-icons">favorite</i>
          </footer>
        </article>`);


  return $tweet;
}

//POST TWEETS
  $( "form" ).on("submit", function( event ) {
    event.preventDefault();
    var tweetLength = $("textarea").val().length
   if (tweetLength === 0 || tweetLength > 140) {
      alert("Error! Your tweet must be between 1 and 140 characters.")
    } else {
      var tweet = ($(this).serialize());
      $.post('/tweets', tweet).then(loadTweets);
      $('form').trigger("reset");
    }
  });

//GET TWEETS
function loadTweets() {

  $.getJSON('/tweets', function(data) {
    data.sort(function(a, b) {
    return b.created_at - a.created_at;
});
    renderTweets(data);
  });
}

loadTweets();


});






