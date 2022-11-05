const englishChatbotServerUrl = "https://echatbot.site/english";
const koreanChatbotServerUrl = "https://echatbot.site/korean";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

let id = uuidv4();

function send(message) {
  if (timeLimit <= -1) {
    setBotResponse({ text: "session is ended." });
    return;
  }

  timeLimit = SESSION_TIMEOUT;
  $("#audio").attr("hidden", true);
  $.ajax({
    url: englishChatbotServerUrl,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      message: message,
      sender: id,
    }),
    success: function (data, textStatus) {
      if (data != null) {
        timeLimit = SESSION_TIMEOUT;
        setBotResponse(data);
	synthesize(data.text);
      }
    },
    error: function (errorMessage) {
      console.log("Error" + errorMessage);
    },
  });
}
