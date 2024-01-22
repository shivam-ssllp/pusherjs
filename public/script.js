// const Pusher = require("pusher");
(function () {
  PushManager.logToConsole = true;

  var serverUrl = "/";
  comments = [];
  pusher = new Pusher("1907f82a25e16929ea8b", {
    cluster: "ap2",
  });
  console.log("pusher is ", pusher);

  var channel = pusher.subscribe("flash-comments");
  var commentForm = document.getElementById("comment-form");
  var commentsList = document.getElementById("comments-list");
  var commentTemplate = document.getElementById("comment-template");

  channel.bind("new_comment", newCommentReceived);

  commentForm.addEventListener("submit", addNewComment);

  function newCommentReceived(data) {
    console.log("function ran");
    console.log("data is ", data);
    var newCommentHtml = commentTemplate.innerHTML.replace(
      "{{name}}",
      data.name
    );

    newCommentHtml = newCommentHtml.replace("{{email}}", data.email);
    newCommentHtml = newCommentHtml.replace("{{comment}}", data.comment);
    var newCommentNode = document.createElement("div");
    newCommentNode.classList.add("comment");
    newCommentNode.innerHTML = newCommentHtml;
    commentsList.appendChild(newCommentNode);
  }

  function addNewComment(e) {
    e.preventDefault();

    var newComment = {
      name: document.getElementById("new_comment_name").value,
      email: document.getElementById("new_comment_email").value,
      comment: document.getElementById("new_comment_text").value,
    };

    // ajax

    var xhr = new XMLHttpRequest();
    xhr.open("POST", serverUrl + "comment", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4 || xhr.status != 200) return;
      console.log("Success" + xhr.responseText);
      //   commentForm.reset();
    };
    xhr.send(JSON.stringify(newComment));
  }
})();
