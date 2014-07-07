var fireBaseRef = new Firebase("https://fifa14.firebaseio.com/");
$("#submit-btn").bind("click", function() {
  var chat = $("#comments");
  var chatValue = $.trim(chat.val());

  if (chatValue.length === 0) {
      alert('Please enter some text!');
  } else {
      fireBaseRef.push({chat: chatValue}, function(error) {
          if (error !== null) {
              alert('Could not push chat to FireBase!');
          }
      });
      chat.val("");
  }
  return false;
});

fireBaseRef.on('child_added', function(snapshot) {
  var uniqName = snapshot.name();
  var chat = snapshot.val().chat;
  var commentsContainer = $('#comments-container');

  $('<div/>', {class: 'comment-container'})
    .html('<span class="label label-default">User-'
        + uniqName + '</span>' + chat).appendTo(commentsContainer);

  commentsContainer.scrollTop(commentsContainer.prop('scrollHeight'));
});