var fireBaseRef = new Firebase("https://jibberish.firebaseio.com/");
var authUser;

var auth = FirebaseSimpleLogin(fireBaseRef, function(error, user) {
 if (user) {
    console.log("User logged in");
    authUser = user;
  }
});

$("#submit-btn").on("click", function() {
  var chat = $("#chats");
  var chatValue = $.trim(chat.val());
  if (chatValue.length === 0) {
      alert('Please enter some text!');
  } else {
      if (authUser) {
        fireBaseRef.push({chat: chatValue, user: authUser.username}, function(error) {
          if (error !== null) {
            console.log('Could not push chat to FireBase!');
          }
        });
        chat.val("");
      } else {
        alert("Please login!");
      }
  }
  return false;
});

$("#chats").keyup(function(event){
  if(event.keyCode == 13){
    $("#chats").click();
  }
});

$('#clear-btn').on("click", function() {
  $('#chats-container').empty();
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

// TRANSLATE CODE ////////////////////////
