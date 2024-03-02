let signUpbtn = document.querySelector('.signUpBtn')

signUpbtn.addEventListener('click', () => {
  let Name = document.querySelector('.firstName').value
  let lastName = document.querySelector('.lastName').value
  let userName = document.querySelector('.userName').value
  let email = document.querySelector('.emailAddress').value
  let phone = document.querySelector('.PhoneNumber').value
  let Password = document.querySelector('.password').value
  let confirmPassword = document.querySelector('.confirmPassword').value

  // Retrieve existing user data from localStorage
  let userData = JSON.parse(localStorage.getItem('userData')) || [];

  // Create new user object
  let newUser = {
    uName: Name,
    uLastName: lastName,
    uUserName: userName,
    uEmail: email,
    uPhone: phone,
    uPassword: Password,
    uConfirmPassword: confirmPassword,
    uScore: 0,
  };

  if (
    Name == '' ||
    lastName == '' ||
    userName == '' ||
    email == '' ||
    phone == '' ||
    Password == '' ||
    confirmPassword == ''
  ) {
    alert(`You must fill in all the inputs, ${Name}!`);
  } else if (Name.length < 3) {
    alert("Name must be 6 characters or more");
  } else if (lastName.length < 3) {
    alert("Last Name must be 6 characters or more");
  } else if (userName.length < 6) {
    alert("User Name must be 6 characters or more");
  } else if (!isValidEmail(email)) {
    alert(`${Name}! Please enter a valid Email Address`);
  } else if (Password.length < 8) {
    alert(`${Name}! Password must be at least 8 characters`);
  } else if (phone.length != 11) {
    alert(`${Name}! Phone Number must be 11 characters`);
  } else if (!isValidPhone(phone)) {
    alert(`${Name}! Phone number is not valid.`);
  } else if (Password !== confirmPassword) {
    alert('Please check your password');
  } else {
    // Add the new user to the array
    userData.push(newUser);

    // Save the updated user data back to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userLoggedIn', Name);
    alert(`Dear ${Name}, your registration is completed.`);
    window.location.href = "./SignIn.html";
  }
});

// Functions
function isValidEmail(Email) {
  const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EmailRegex.test(Email);
}

function isValidPhone(Phone) {
  const PhoneRegex = /^09\d{9}$/;
  return PhoneRegex.test(Phone);
}
