let signUpbtn = document.querySelector('.signUpBtn')

signUpbtn.addEventListener('click', () => {
  let Name = document.querySelector('.firstName').value
  let lastName = document.querySelector('.lastName').value
  let userName = document.querySelector('.userName').value
  let email = document.querySelector('.emailAddress').value
  let phone = document.querySelector('.PhoneNumber').value
  let Password = document.querySelector('.password').value
  let confirmPassword = document.querySelector('.confirmPassword').value

  let userData = []
  userData.push({
    uName: Name,
    uLastName: lastName,
    uUserName: userName,
    uEmail: email,
    uPhone: phone,
    uPassword: Password,
    uConfirmPassword: confirmPassword,
    uScore: 0,
  })
  let userJson = JSON.stringify(userData)

  if (
    Name == '' ||
    lastName == '' ||
    userName == '' ||
    email == '' ||
    phone == '' ||
    Password == '' ||
    confirmPassword == ''
  )
    alert(`you must fill all the inputs user!`)
  else if (!isValidEmail(email)) {
    alert(`User! please enter a valid Email Address`)
  } 
  else if(Password.length<8){
    alert(`user! Password must be at least 8 char`)
  }

  else if(Password!==confirmPassword){
    alert('please check your password')
  }
  else {
    localStorage.setItem('userData', userJson)
    localStorage.setItem('userLoggedIn', Name)
    window.location.href="./SignIn.html"
  }
})

// functions
function isValidEmail(Email) {
  const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return EmailRegex.test(Email)
}

