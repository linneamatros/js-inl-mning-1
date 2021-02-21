const form = document.querySelector('#form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const toc = document.querySelector('#toc');
const output = document.querySelector('#output');
const popup = document.querySelector('#popup');

let users = [];


const validate = (input) => {
  switch(input.type) {
    case 'text':
      validateText(input);
      if(validateText(input))
        return true
      else
        return false
    case 'email':
      validateEmail(input);
      if(validateEmail(input))
        return true
      else
        return false
      case 'checkbox':
      validateCheck(input);
      if(validateCheck(input))
        return true
      else
        return false
    default:
      break;
  }
}


const validateText = (input) => {
  if(input.value.trim() === '') {
    setError(input, 'Du måste ange ett namn!');
    return false;
  } else if(input.value.trim().length < 2) {
    setError(input, 'Namnet måste innehålla minst 2 bokstäver!')
    return false;
  } else {
    setSuccess(input)
    return true;
  }
}

const validateEmail = (input) => {
  let regEx = /^\w+@[a-zA-Z]+?\.[a-zA-Z-]{2,}$/

  if(input.value.trim() === '') {
    setError(input, 'Du måste ange en e-postadress!')
    return false;
  } else if (!regEx.test(input.value)) {
    setError(input, 'E-postadressen är inte giltig!')
    return false;
  } else {
    setSuccess(input)
    return true;
  }
}



const validateCheck = input => {
  if(!input.checked) {
    setError(input, 'Du måste godkänna användarvillkoren!')
    return false;
  }
  else {
    setSuccess(input)
    return true;
  }
}

const setError = (input, message) => {
  const inputGroup = input.parentElement;
  inputGroup.classList.add('error');
  inputGroup.classList.remove('success');

  const error = inputGroup.querySelector('small');
  error.innerText = message;
}

const setSuccess = input => {
  const inputGroup = input.parentElement;
  inputGroup.classList.remove('error');
  inputGroup.classList.add('success');

}

const resetForm = () => {
  document.querySelectorAll('input').forEach(input => {
    input.value = '';
    input.classList.remove('is-valid');
  })
}

const createUser = (firstName, lastName, email) => {
  let user = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email
  }

  users.push(user);
  console.log(users);
}


// form.addEventListener('submit', e => {
//   e.preventDefault();

//   const errors = [];

//   validate(form[0]);


//   for(let i = 0; i < form.length; i++) {
//     errors[i] = validate(form[i])
//   }
//   if(!errors.includes(false)) {
//     createUser(firstName.value, lastName.value, email.value,);
//     renderUsers();
//     resetForm();
//   } 
// })



const renderUsers = () => {

  output.innerHTML = '';

  users.forEach(user => {
    let template = `
    <div class="user d-flex justify-content-between align-items-center mb-4">
      <div class="text">
        <h3>${user.firstName} ${user.lastName}</h3>
        <small>${user.email}</small>
      </div>
    </div>
    `

    output.innerHTML += template;
  })

}
renderUsers();


console.log(users)

form.addEventListener('submit', e => {
  e.preventDefault();

  const errors = [];

  validate(form[0]);


  for(let i = 0; i < form.length; i++) {
    errors[i] = validate(form[i])
  }
  if(!errors.includes(false)) {
    createUser(firstName.value, lastName.value, email.value,);
    renderUsers();
    resetForm();
  } 
})
