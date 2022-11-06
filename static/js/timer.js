const SESSION_TIMEOUT = 120;

const ALERT_TIME = 10;
let timeLimit = SESSION_TIMEOUT;
let min, sec;

let timer = setInterval(callTimer, 1000);

function callTimer() {
  min = parseInt(timeLimit / 60);
  sec = parseInt(timeLimit % 60);

  timeLimit -= 1;

  const timeAlertMessage = `Session has been idle over its time limit(2 mins).\nPress enter sentence to continue session.`;
  if (timeLimit == ALERT_TIME) {
    alert(timeAlertMessage);
  }

  if (timeLimit < -1) {
    alert(`Session has ended`);
    clearInterval(timer);
    return;
  }
}
