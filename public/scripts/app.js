/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {


$("#compose").click(function() {
  $(".new-tweet").slideToggle();
  $('textarea').focus();
})



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
  var year =  Math.floor(miliseconds / (1000 * 60 * 60 * 24 * 365));
  var day = Math.floor(miliseconds / (1000 * 60 * 60 * 24));
  var hour = Math.floor(miliseconds / (1000 * 60 * 60));
  var min = Math.floor(miliseconds / (1000 * 60));

  if (year > 0) {
    if(year === 1) {
      finalDate = "About " + year + " year ago";
    } else {
      finalDate = "About " + year + " years ago";
    }
  }
  else if (day > 0 && day < 365) {
    if (day === 1) {
      finalDate = day + " day ago";
    } else {
      finalDate = day + " days ago";
   }
  }
  else if (hour > 0 && hour < 24) {
    if (hour === 1) {
      finalDate = hour + " hour ago";
    } else {
      finalDate = hour + " hours ago";
    }
  }
  else if (min > 0 && min < 60) {
    if (min === 1) {
      finalDate = min + " minute ago";
    } else {
      finalDate = min + " minutes ago";
      }
  }
  else {
    finalDate = "less than a minute ago";
  }

//create tweet
  $tweet.append(`
          <header>
            <img class="logo" src=${data.user.avatars.small}>
            <h2>${data.user.name}</h2>
            <p>${data.user.handle}<p>
          </header>`
          ).append($("<p>").text(data.content.text)).append( //cross site scripting
            `<footer>
            <p>${finalDate}</p>
            <div class="icons">
            <i class="material-icons">flag</i>
            <i class="material-icons">repeat</i>
             <i class="material-icons">favorite</i>
          </footer>`
            );
  return $tweet;
}

//POST TWEETS
  $( "form" ).on("submit", function( event ) {
    event.preventDefault();
    var tweetLength = $("textarea").val().length
   if (tweetLength === 0) {
      $(".error").slideUp();
      $(".error > p").text("Error! Your tweet must be at least one character.");
      $(".error").slideDown();
   } else if (tweetLength > 140) {
      $(".error").slideUp();
      $(".error > p").text("Error! Your tweet must be less than 140 characters.")
      $(".error").slideDown();
    } else {
      $(".error").slideUp();
      var tweet = $(this).serialize();
      $.post('/tweets', tweet).then(loadTweets);
      $('form').trigger("reset");
      $(".counter").text("140");
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






