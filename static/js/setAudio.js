var audioCheck = $("#audio-checkbox");
let audioStatus = false;

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
