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
  if (keyCode === 13 || keyCode === 1) {
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
      let text = null;
      let image = null;
      let sound = null;

      if (val.text.search("\\[IMAGE\\]") != -1) {
        text = val.text.split("[IMAGE]")[0];
        image = val.text.split("[IMAGE]")[1];
      } else if (val.text.search("\\[SOUND\\]") != -1) {
        text = val.text.split("[SOUND]")[0];
        sound = val.text.split("[SOUND]")[1];
      } else if (val.text.search("\\[QUOTE\\]") != -1) {
        text = val.text.split("[QUOTE]")[0];
      } else {
        text = val.text;
      }

      const BotAvatarSrc = "/static/img/botAvatar.png";
      const BotResponse =
        '<div class="messageBox"><img class="botAvatar" src="' +
        BotAvatarSrc +
        '"><div class="botMsg">' +
        text +
        '</div><div class="clearfix"></div></div>';
      $(BotResponse).appendTo(".chats").hide().fadeIn(1000);

      if (image) {
        const BotImageResponse =
          '<div class="messageBox"><img class="botAvatar" src="' +
          BotAvatarSrc +
          '"><div class="botMsg"> <img class="botMsg" src="' +
          image +
          '"></div><div class="clearfix"></div></div>';
        $(BotImageResponse).appendTo(".chats").hide().fadeIn(1000);
      }

      if (sound) {
        const BotSoundResponse =
          '<div class="messageBox"><img class="botAvatar" src="' +
          BotAvatarSrc +
          '"><div class="botMsg"> <audio controls autoplay class="botMsg" src="' +
          sound +
          '"></div><div class="clearfix"></div></div>';
        $(BotSoundResponse).appendTo(".chats").hide().fadeIn(1000);
      }
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
