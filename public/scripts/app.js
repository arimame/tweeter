/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {


 const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

 function renderTweets(tweets) {
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

function loadTweets() {
  $.get('/tweets'), function(data) {
    console.log("data")
  }
}

renderTweets(data);

loadTweets();

});






