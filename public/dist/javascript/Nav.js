let isLogin = JSON.parse(localStorage.getItem('isLogin'))
let navLogin = document.querySelector('.navbarLoginBtn')
let gamePage = document.querySelector('.game')
let whoisLogin = localStorage.getItem('userLoggedIn')

navLogin.addEventListener('click', () => {
  if (isLogin) {
    localStorage.setItem('isLogin', 'false')
    navLogin.textContent = 'Login'
    window.location.href = '../public/index.html'
  } else {
    window.location.href = '../public/SignIn.html'
  }
})

if (isLogin) {
  navLogin.textContent = `${whoisLogin}`
  navLogin.style.color = '#ff0000'
  navLogin.style.fontWeight = 'bold'
  navLogin.style.fontSize = '15px'
  gamePage.style.display = 'block'
} else {
  gamePage.style.display = 'none'
}
