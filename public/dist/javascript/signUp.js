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
    alert(`you must fill all the inputs ${Name}!`)

    else if(Name.length <6){
      alert("Name must be 6 char or more")
     }
     else if(lastName.length <6){
      alert("Last Name must be 6 char or more")
     }
     else if(userName.length <6){
      alert("User Name must be 6 char or more")
     }
  else if (!isValidEmail(email)) {
    alert(`${Name}! please enter a valid Email Address`)
  } 
  else if(Password.length<8){
    alert(`${Name}! Password must be at least 8 char`)
  }

  else if(Password!==confirmPassword){
    alert('please check your password')
  }
  else {
    localStorage.setItem('userData', userJson)
    localStorage.setItem('userLoggedIn', Name)
    alert(`Dear ${Name} your regestration completed`)
    window.location.href="./SignIn.html"
  }
})

// functions
function isValidEmail(Email) {
  const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return EmailRegex.test(Email)
}

