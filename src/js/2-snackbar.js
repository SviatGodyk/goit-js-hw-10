import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const inputEl = document.querySelector('.input-delay');

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const inputValue = event.target[0].value;
  console.log(inputValue);

  const stateEl = event.target[2].checked;
  console.log(stateEl);

  new Promise((res, rej) => {
    setTimeout(() => {
      if (stateEl) {
        return res();
      } else {
        rej();
      }
    }, inputValue);
  })
    .then(response => {
      return iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${inputValue}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${inputValue}ms`,
      });
    });
});
