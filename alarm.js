const time = document.querySelector(".time");
const alarmData = document.querySelector(".alarm-form");
const alarmList = [];
const alarmListDisplay = document.querySelector("#alarmList");
const popupText = document.querySelector("#popupText");
const alarmTone = new Audio("alarmsound.wav");
alarmTone.loop = true;

// Displaying the current time and showing an alert when it's time
const timing = () => {
  const now = new Date();

  const hours = timeFormatting(now.getHours());
  const minutes = timeFormatting(now.getMinutes());
  const seconds = timeFormatting(now.getSeconds());
  const currentTime = `${hours}:${minutes}:${seconds}`;

  const replace = `
    <span>${hours}</span> :
    <span>${minutes}</span> :
    <span>${seconds}</span>
    `;

  time.innerHTML = replace;

  if (alarmList.includes(currentTime)) {
    popupText.innerHTML = `Hey it is ${currentTime}`;
    document.querySelector("#popupClosed").id = "popup";
    document.querySelector(".main-container").className = "main-container-blur";
    alarmTone.play();
  }
};

closePopup = () => {
  document.querySelector("#popup").id = "popupClosed";
  document.querySelector(".main-container-blur").className = "main-container";
  alarmTone.pause();
};

// time formatting to add 0 before single digits
timeFormatting = (val) => {
  if (val < 10 && val.length != 2) {
    return "0" + val;
  }
  return val;
};

// adding alarm to the array and displaying it
alarmData.addEventListener("submit", (e) => {
  e.preventDefault();
  const alarmTime = `${timeFormatting(alarmData.hours.value)}:${timeFormatting(
    alarmData.minutes.value
  )}:${timeFormatting(alarmData.seconds.value)}`;

  if (alarmTime == "00:00:00" || alarmTime.length > 8) {
    alert("Please enter a valid time.");
    return;
  }
  if (!alarmList.includes(alarmTime)) {
    alarmList.push(alarmTime);
  } else {
    alert(`Alarm for ${alarmTime} already exists.`);
    return;
  }

  const alarmText = `<li class="list-item">${alarmTime} <button onclick = "deleteAlarm(this.value)" value=${alarmTime} class="delete-btn">Delete</> </li>`;
  alarmListDisplay.innerHTML += alarmText;

  alarmData.reset();
});

// deleting from the array
deleteAlarm = (alarmTime) => {
  var index = alarmList.indexOf(alarmTime);

  if (index != -1) {
    alarmList.splice(index, 1);
  }
};

alarmListDisplay.addEventListener("click", (e) => {
  console.log(e.target.classList);
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
  }
});

setInterval(timing, 1000);
