let audioCheck = $("#audio-checkbox");
let audioStatus = false;
const englishSynthesizeUrl = "https://echatbot.site/synthesize?text=";

// Media
if (!isMobile) {
}

audioCheck.click(function () {
  if (audioStatus == false) {
    audioStatus = true;
  } else {
    audioStatus = false;
  }
});

function synthesize(text) {
  if (!audioStatus) return;
  fetch(englishSynthesizeUrl + encodeURIComponent(text), { cache: "no-cache" })
    .then(function (res) {
      if (!res.ok) throw Error(res.statusText);
      return res.blob();
    })
    .then(function (blob) {
      $("#chatbot-audio").attr("src", URL.createObjectURL(blob));
      $("#chatbot-audio").attr("hidden", false);
    })
    .catch(function (err) {
      console.log(err);
    });
}
