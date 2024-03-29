import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
require('flatpickr/dist/themes/dark.css');

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
startBtn.setAttribute('disabled', true);
let chosenDate;
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      // startBtn.setAttribute('disabled', true);
      dateInput.style.borderColor = 'red';
    } else {
      chosenDate = selectedDates[0];

      startBtn.removeAttribute('disabled');
      startBtn.addEventListener('click', timerOn);
      dateInput.style.borderColor = 'rgb(10, 205, 230)';
    }
  },
};

flatpickr('#datetime-picker', options);

function timerOn() {
  timerId = setInterval(() => {
    startBtn.setAttribute('disabled', true);
    dateInput.setAttribute('disabled', true);
    const deltaTime = chosenDate - Date.now();
    if (deltaTime < 1000) {
      clearInterval(timerId);

      startBtn.removeEventListener('click', timerOn);
      // startBtn.removeAttribute('disabled');
      dateInput.removeAttribute('disabled');
      clearInterval(timerId);
      Notify.info('Repeat?');
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    updClock({ days, hours, minutes, seconds });
  }, 1000);
}

function updClock({ days, hours, minutes, seconds }) {
  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

const addLeadingZero = value => String(value).padStart(2, '0');
