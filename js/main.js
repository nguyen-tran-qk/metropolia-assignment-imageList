const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  let isInvalid = false;

  const firstname = document.querySelector('[name="firstname"]').value;
  const lastname = document.querySelector('[name="lastname"]').value;
  const email = document.querySelector('[name="email"]').value;
  const phone = document.querySelector('[name="phone"]').value;
  const postalCode = document.querySelector('[name="postalCode"]').value;
  const password = document.querySelector('[name="password"]').value;
  const errorMessage = document.querySelector('p.error');
  

  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const phoneRegex = /^\+\d{1,15}/;
  const postalCodeRegex = /^\d{5}$/;

  // check required fields
  if (!firstname.length || !lastname.length || !email.length || !phone.length || !password.length) {
    isInvalid = true;
  }

  // check format
  if (!emailRegex.test(email) || !phoneRegex.test(phone) || (postalCode.length &&!postalCodeRegex.test(postalCode))) {
    isInvalid = true;
  }

  if (isInvalid) {
    event.preventDefault();
    errorMessage.innerHTML = 'Form is invalid';
  } else {
    errorMessage.innerHTML = '';
  }
});