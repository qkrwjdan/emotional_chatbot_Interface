const SESSION_TIMEOUT = 10000;

let timeLimit = 10;
let min, sec;

let timer = setInterval(callTimer, 1000);

function callTimer() {
  min = parseInt(timeLimit / 60);
  sec = parseInt(timeLimit % 60);

  const displayTime =
    min.toString().padStart(2, "0") + " : " + sec.toString().padStart(2, "0");
  console.log(displayTime);

  timeLimit -= 1;

  if (timeLimit < -1) {
    alert("Session disconnected after 10 seconds.");
    clearInterval(timer);
    timeLimit = timeLimitValue;
    return;
  }
}
