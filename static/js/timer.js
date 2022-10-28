const SESSION_TIMEOUT = 60;

let timeLimit = SESSION_TIMEOUT;
let min, sec;

let timer = setInterval(callTimer, 1000);

function callTimer() {
  min = parseInt(timeLimit / 60);
  sec = parseInt(timeLimit % 60);

  timeLimit -= 1;

  if (timeLimit < -1) {
    alert(`Session disconnected after ${SESSION_TIMEOUT} seconds.`);
    clearInterval(timer);
    timeLimit = timeLimitValue;
    return;
  }
}
