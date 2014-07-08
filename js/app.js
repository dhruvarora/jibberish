var fireBaseRef = new Firebase("https://jibberish.firebaseio.com/");

$("#submit-btn").bind("click", function() {
  var chat = $("#chats");
  var chatValue = $.trim(chat.val());
  var username = "Dhruv";
  if (chatValue.length === 0) {
      console.log('Please enter some text!');
  } else {
      fireBaseRef.push({chat: chatValue, user: username}, function(error) {
          if (error !== null) {
              console.log('Could not push chat to FireBase!');
          }
      });
      chat.val("");
  }
  return false;
});

fireBaseRef.on('child_added', function(snapshot) {
  var chat = snapshot.val().chat;
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

$('#clear-btn').bind("click", function() {
  $('#chats-container').empty();
});

$("#signup-btn").on("click", function() {
  auth();
});

var auth = new FirebaseSimpleLogin(fireBaseRef, function(error, user) {
  if (error) {
    console.log(error);
  } else if (user) {
    console.log('Success!')
    console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
  } else {
    login();
  }
});

var login = function() {
  console.log("Hello!")
}