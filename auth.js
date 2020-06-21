auth.onAuthStateChanged(user =>{
    if(user){
        document.getElementById("status").innerHTML = "user logged in";
        console.log("user logged in");
        setupUI(user);
    }else{
        setupUI();
        document.getElementById("status").innerHTML = "user logged out";
        console.log('user logged out');
    }
});
const loggedOutLinks=document.querySelectorAll('.logout');
const loggedInLinks =document.querySelectorAll('.login')
const setupUI =(user)=>{
    if(user){
        loggedInLinks.forEach(item=> item.style.display='block');
        loggedOutLinks.forEach(item =>item.style.display='none');
    }else{
        loggedInLinks.forEach(item=> item.style.display='none');
        loggedOutLinks.forEach(item =>item.style.display='block');
    }
}




const signupForm =document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = signupForm['Email'].value;
    const password =signupForm['Password'].value;
    // console.log(email,password)
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        // console.log(cred.user);
        // const modal =document.querySelector('#signupModal');
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML="signed in successfully";
    }).catch( error =>{
        // console.log(error);
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML=error.message;
        
    })
})

const logout=document.querySelector('#log-out');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        console.log("signout successfully");
    })
})
const loginForm =document.querySelector('#login-form');
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = loginForm['login-Email'].value;
    const password =loginForm['login-Password'].value;
    console.log(email,password)
    auth.signInWithEmailAndPassword(email,password).then(cred =>{
        // console.log(cred.user);
        console.log("logged in");
        loginForm.querySelector('.error').innerHTML="logged in successfully";
        // const modal =document.querySelector('#loginModal');
        loginForm.reset();
    }).catch( error =>{
        // console.log(error);
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML=error.message;
    })
})