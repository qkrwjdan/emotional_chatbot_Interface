$(".usrInput").on("keyup keypress", sendMessage);
$(".send").on("click", sendMessage);

function setUserResponse(val) {
  var userAvatarSrc = "/static/img/user.png";
  var UserResponse =
    '<div class = "messageBox"><img class="userAvatar" src="' +
    userAvatarSrc +
    '"><div class="userMsg">' +
    val +
    ' </div><div class="clearfix"></div></div>';
  $(UserResponse).appendTo(".chats").show("slow");
  $(".usrInput").val("");
  scrollToBottomOfResults();
  $(".suggestions").remove();
}

function sendMessage(e) {
  const keyCode = e.keyCode || e.which;
  const text = $(".usrInput").val();
  if (keyCode === 13 || keyCode ===1 ) {
    if (text == "" || $.trim(text) == "") {
      e.preventDefault();
      return false;
    } else {
      $(".usrInput").blur();
      setUserResponse(text);
      send(text);
      e.preventDefault();
      $(".usrInput").focus();
      return false;
    }
  }
}

function scrollToBottomOfResults() {
  var terminalResultsDiv = document.getElementById("chats");
  terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

function setBotResponse(val) {
  setTimeout(function () {
    if (val.hasOwnProperty("text")) {
      var BotAvatarSrc = "/static/img/botAvatar.png";
      var BotResponse =
        '<div class="messageBox"><img class="botAvatar" src="' +
        BotAvatarSrc +
        '"><div class="botMsg">' +
        val.text +
        '</div><div class="clearfix"></div></div>';
      $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
    }

    scrollToBottomOfResults();
  }, 500);
}

const questionMark = document.querySelector(".question");
const questionBox = document.querySelector(".question-text");
const initQuestion = () => {
  questionMark.addEventListener("click", () =>
    questionBox.classList.toggle("active")
  );
};
initQuestion();
