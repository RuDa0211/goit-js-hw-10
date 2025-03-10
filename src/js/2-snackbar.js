import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateRadios = form.querySelectorAll('input[name="state"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const state = Array.from(stateRadios).find(radio => radio.checked)?.value; // Отримуємо вибраний стан

  if (state && delay >= 0) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else if (state === 'rejected') {
          reject(delay);
        }
      }, delay);
    });

    promise
      .then(delay => {
        iziToast.success({
          title: '✅',
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
        });
        console.log(`✅ Fulfilled promise in ${delay}ms`);
      })
      .catch(delay => {
        iziToast.error({
          title: '❌',
          message: `Rejected promise in ${delay}ms`,
          position: 'topRight',
        });
        console.log(`❌ Rejected promise in ${delay}ms`);
      });
  } else {
    iziToast.warning({
      title: 'Warning',
      message: 'Please provide a valid delay and select a state!',
      position: 'topRight',
    });
  }
});
