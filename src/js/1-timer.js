import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  elements: {
    days: document.querySelector('.js-timer-days'),
    hours: document.querySelector('.js-timer-hours'),
    minutes: document.querySelector('.js-timer-minutes'),
    seconds: document.querySelector('.js-timer-seconds'),
  },
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      return alert('Please choose a date in the future');
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};

const imputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
startBtn.disabled = true;
flatpickr(imputEl, options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  imputEl.disabled = true;
  const intervalId = setInterval(() => {
    const diff = userSelectedDate - new Date();
    const timeConvertMs = this.convertMs(diff);
    this.elements.days.textContent = timeConvertMs.days;
    this.elements.hours.textContent = timeConvertMs.hours;
    this.elements.minutes.textContent = timeConvertMs.minutes;
    this.elements.seconds.textContent = timeConvertMs.seconds;
  }, 1000);
}),
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  };

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
