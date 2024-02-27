let signInBtn =document.querySelector('.signInBtn')
signInBtn.addEventListener('click',()=>{

    let inputData =document.querySelector('.userNameOrEmail').value
    let password = document.querySelector('.password').value
    let userData = JSON.parse(localStorage.getItem('userData'))
    let userLogin =localStorage.getItem('userLoggedIn')

    if(userData){
        let userExist =userData.find((x)=>x.uPassword==password &&(x.uEmail==inputData ||x.uUserName==inputData))
        
        if(inputData==''||password==''){
            alert(`${userLogin} fill out the inputs`)
        }
        else if(userExist){
            localStorage.setItem('is-Login','true');
            alert(`You are logged in ${userLogin}`);
            window.location.href='../Game.html'
        }
        else{
            alert('Your Email or Password is incorrect')
        }
    }else{
        alert('There is no user in storage with this user name ')
    }
})