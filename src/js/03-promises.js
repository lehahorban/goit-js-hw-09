import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form")
const delay = document.querySelector("[name=delay]")
const step = document.querySelector("[name=step]")
const amount = document.querySelector("[name=amount]")
console.log(form);
console.log(delay);
console.log(step);
console.log(amount);


function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    const promice = new Promise((reselve, reject) => {
        setTimeout(() => {
           if (shouldResolve) {
    reselve({position, delay})
  } else {
    reject({position, delay})
  }
      }, delay)
  })
 return promice
}

form.addEventListener("submit", submitForm)
function submitForm(e) {    
    e.preventDefault()
   
    const timer = setTimeout(() => {
        for (let position = 0; position < amount.value; position += 1) {
            let totalStep = (Number(delay.value)) + (Number(step.value)) * position
             createPromise(position, totalStep)
            .then(({ position, delay }) => {
                Notify.failure(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
        }
       
    }, delay.value)
    
 
}




