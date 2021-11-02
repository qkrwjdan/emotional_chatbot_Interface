// on input/text enter--------------------------------------------------------------------------------------
$(".usrInput").on("keyup keypress", function (e) {
  var keyCode = e.keyCode || e.which;
  var text = $(".usrInput").val();
  if (keyCode === 13) {
    if (text == "" || $.trim(text) == "") {
      e.preventDefault();
      return false;
    } else {
      $(".usrInput").blur();
      setUserResponse(text);
      send(text);
      e.preventDefault();
      return false;
    }
  }
});

$(".send").on("click", function (e) {
  var text = $(".usrInput").val();

  if (text) {
    setUserResponse(text);
    send(text);
    e.preventDefault();
    return false;
  }
});

//------------------------------------- Set user response------------------------------------
function setUserResponse(val) {
  // var userAvatarSrc = "{{ url_for('static',filename='/img/userAvatar.jpg') }}"
  // var userAvatarSrc = "/static/img/userAvatar.jpg";
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

//---------------------------------- Scroll to the bottom of the chats-------------------------------
function scrollToBottomOfResults() {
  var terminalResultsDiv = document.getElementById("chats");
  terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}

function send(message) {
  console.log("User Message:", message);
  $("#audio").attr("hidden", true);
  $.ajax({
    url: "http://localhost:5000/chat/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      message: message,
      sender: "Me",
    }),
    success: function (data, textStatus) {
      console.log(data);
      if (data != null) {
        console.log("set bot response");
        setBotResponse(data);
        // synthesize(data.text);
      }
      console.log("Rasa Response: ", data, "\n Status:", textStatus);
    },
    error: function (errorMessage) {
      console.log("Error" + errorMessage);
    },
  });
}

//------------------------------------ Set bot response -------------------------------------
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

// ------------------------------------------ Toggle chatbot -----------------------------------------------
$("#profile_div").click(function () {
  $(".profile_div").toggle();
  $(".widget").toggle();
  scrollToBottomOfResults();
});

$("#close").click(function () {
  $(".profile_div").toggle();
  $(".widget").toggle();
});

let isCamera = false;
let isMobile = false;
var check = $("input[type='checkbox']");
let videoStatus = false;
let videoTag = document.getElementsByClassName("user-video")[0];

isMobile = navigator.userAgent.match(/iPad|iPod|Android|iPhone/i);

// Media
if (!isMobile) {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        width: 360,
        height: 240
      },
    })
    .then(function (mediaStream) {
			isCamera = true;

			isMobile = true;
			videoTag.srcObject = mediaStream;
			videoTag.onloadedmetadata = function (e) {
				videoTag.play();
			}
      
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);

      isCamera = false;
      videoStatus = false;
      videoTag.style.display = "none";
    });
}

check.click(function () {
  if (isCamera) {
    $(".switch-text").toggle();
    let videoTag = document.getElementsByClassName("user-video")[0];

    if (videoStatus == false) {
      videoStatus = true;
      videoTag.style.display = "inline";

    } else {
      videoStatus = false;
      videoTag.style.display = "none";
    }
  }
});
