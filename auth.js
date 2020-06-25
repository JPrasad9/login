auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user.email);
        document.getElementById("status").innerHTML = "Hello..  "+user.email;
        console.log("user logged in");
        setupUI(user);
    } else {
        setupUI();
        // document.getElementById("status").innerHTML = "user logged out";
        console.log('user logged out');
    }
});
const loggedOutLinks = document.querySelectorAll('.logout');
const loggedInLinks = document.querySelectorAll('.login')
const setupUI = (user) => {
    if (user) {
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}




const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['Email'].value;
    const password1 = signupForm['Password1'].value;
    const password2 = signupForm['Password2'].value;
    console.log(password1, password2)
    if (password1 != password2) {
        signupForm.querySelector('.error').innerHTML = "Password did not match";
    }
    else {
        auth.createUserWithEmailAndPassword(email, password1).then(cred => {
            // console.log(cred.user);
            // const modal =document.querySelector('#signupModal');
            signupForm.reset();
            signupForm.querySelector('.error').innerHTML = "signed in successfully";
            setTimeout("location.reload(true);", 0.000001);
        }).catch(error => {
            // console.log(error);

            // signupForm.reset();
            signupForm.querySelector('.error').innerHTML = error.message;
        })
    }
})

const logout = document.querySelector('#log-out');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("signout successfully");
    })
})
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-Email'].value;
    const password = loginForm['login-Password'].value;
    // console.log(email,password)
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);
        console.log("logged in");
        // loginForm.querySelector('.error').innerHTML="logged in successfully";
        // const modal =document.querySelector('#loginModal');
        // loginForm.reset();
        setTimeout("location.reload(true);", 0.1);
    }).catch(error => {
        // console.log(error);
        // loginForm.reset();
        loginForm.querySelector('.error').innerHTML = error.message;
        // setTimeout("loginForm.reset();", 5);
        // loginForm.reset();


    })
})



const Comment = document.querySelector("#comment");
Comment.addEventListener('submit', (e) => {
    auth.onAuthStateChanged(user => {
        e.preventDefault();
        if (user) {
            const uid = uuidv4();
            const res = Comment['comment-text'].value;
            ans = {
                name: user.email,
                comment: res
            }
            // console.log(user.email);
            db.collection('Comments').doc(uid).set(ans).then(() => {
                console.log("comment added successfully");
                setTimeout("location.reload(true);", 0.1);
            }).catch(error => {
                console.log("error occured", e);
            })
            Comment.reset();
            // console.log(res);
        }
        else {
            document.getElementById("status").innerHTML = "you need to login for comment";
        }
    })
})

const showComment=function() {

    db.collection('Comments').get().then(data => {
        // console.log(data);
        let divElement = $('<div>');
        // $('.todo').empty();
        data.docs.forEach(element => {
            const ele = element.data();
            divElement.append('<p>'+  ele.comment + '</p>');
            divElement.append('<p class="float-right">'+"-" + ele.name + '</p>'+'<br>');

        });
        $('.todo').append(divElement);
    });
}

showComment();