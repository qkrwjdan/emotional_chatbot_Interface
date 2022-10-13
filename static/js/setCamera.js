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
        height: 240,
      },
    })
    .then(function (mediaStream) {
      isCamera = true;

      isMobile = true;
      videoTag.srcObject = mediaStream;
      videoTag.onloadedmetadata = function (e) {
        videoTag.play();
      };
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
