let audioCheck = $("#audio-checkbox");
let audioStatus = false;
const englishSynthesizeUrl = "https://echatbot.site/synthesize?text=";

// Media
if (!isMobile) {
}

audioCheck.click(function () {
  if (audioStatus == false) {
    console.log("audio on");
    audioStatus = true;
  } else {
    console.log("audio off");
    audioStatus = false;
  }
});

function synthesize(text) {
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
