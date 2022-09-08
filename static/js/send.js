const englishChatbotServerUrl = "http://localhost:3000/english";
const koreanChatbotServerUrl = "http://localhost:3000/korean";

function send(message) {
  $("#audio").attr("hidden", true);
  $.ajax({
    url: englishChatbotServerUrl,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      message: message,
      sender: "Me",
    }),
    success: function (data, textStatus) {
      if (data != null) {
        setBotResponse(data);
      }
    },
    error: function (errorMessage) {
      console.log("Error" + errorMessage);
    },
  });
}
