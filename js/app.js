var fireBaseRef = new Firebase("https://jibberish.firebaseio.com/");
var authUser;
var language = $('#language-selected').val();
var apikey = 'AIzaSyAkyZRebNvuW1NYxt5cUp87K5ruGJjtMLQ';
var dataShot;
var auth = FirebaseSimpleLogin(fireBaseRef, function(error, user) {
 if (user) {
    console.log("User logged in");
    authUser = user;
  }
});

var translate = function(text) {
 $.get("https://www.googleapis.com/language/translate/v2", {
   key: apikey,
   source: "en",
   target: "de",
   q: text
  },
  function(response) {
    fireBasePush(text, response);
   },"json").fail(function(jqXHR, textStatus, errorThrown) {
      alert("error: " + errorThrown);
  });
}

$("#submit-btn").on("click", function() {
  var chat = $("#chats");
  var chatValue = $.trim(chat.val());
  if (chatValue.length === 0) {
      alert('Please enter some text!');
  } else {
      if (authUser) {
        translate(chatValue);
        chat.val("");
      } else {
        alert("Please login!");
      }
  }
  return false;
});

var fireBasePush = function(text, response) {
  fireBaseRef.push({chat_en: text, chat_de: response.data.translations[0].translatedText, user: authUser.username}, function(error) {
    if (error !== null) {
      console.log('Could not push chat to FireBase!');
    }
  });
}

fireBaseRef.on('child_added', function(snapshot) {
  var chat = snapshot.val()[language];
  var user = snapshot.val().user;
  var chatsContainer = $('#chats-container');
  $('<div/>', {class: 'chat-container'})
    .html('<span class="label label-default">' + user + '</span>' + chat).appendTo(chatsContainer);
  chatsContainer.scrollTop(chatsContainer.prop('scrollHeight'));
});

$("#chats").keyup(function(event){
  if(event.keyCode == 13){
    $("#chats").click();
  }
});

$("#language-selected").change(function() {
  console.log("Changed!");
  chatsContainer = $('#chats-container');
  $('#chats-container').empty();
  language = $('#language-selected').val();
  fireBaseRef.once('value', function(dataSnapshot) {
    var x = dataSnapshot.exportVal();
    console.log(typeof x);
    for (var key in x) {
      $('<div/>', {class: 'chat-container'})
        .html('<span class="label label-default">' + x[key].user + '</span>' + x[key][language]).appendTo(chatsContainer);
      chatsContainer.scrollTop(chatsContainer.prop('scrollHeight'));
    };
  });
});




$('#clear-btn').on("click", function() {
  $('#chats-container').empty();
});

$('#reload-bth').on("click", function() {
  location.reload(true);
});

$("#login-btn").on("click", function() {
  console.log("Opening twitter login");
  auth.login('twitter');
});

$("#logout-btn").on("click", function() {
  console.log("Logged out!")
  auth.logout();
  authUser = null;
});