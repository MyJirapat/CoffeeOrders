//const textField = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field'));
const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));

const emailTv = $('#tvEmail')
const passwordTv = $('#tvPassword')

$(document).ready(() => {
    console.log("it's up running")
    var firebaseConfig = {
        apiKey: "AIzaSyCE2-mRjHHuoBXuorKp9ObOgn28V9ObXTE",
        authDomain: "fir-example-db91b.firebaseapp.com",
        databaseURL: "https://fir-example-db91b.firebaseio.com",
        projectId: "fir-example-db91b",
        storageBucket: "fir-example-db91b.appspot.com",
        messagingSenderId: "74233054384",
        appId: "1:74233054384:web:f395be37217b03d4162775",
        measurementId: "G-R7M8ML9S4Q"
    };

    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();




    

    let logd = $('#loginDialog')
    console.log(logd)

    dialog.open()

    const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
        return new mdc.textField.MDCTextField(el);
    });


    dialog.listen('MDCDialog:opened', () => {
        console.log("dialog opened")
    });

    dialog.listen('MDCDialog:closing', function() {
        console.log("dialog close")
    });
})









function onLogin() {
    console.log(`email is ${emailTv.val()}`)
    console.log(`password is ${passwordTv.val()}`)
    let uEmail = emailTv.val()
    let uPass = passwordTv.val()
    if(uEmail && uPass) {
        firebase.auth().signInWithEmailAndPassword(uEmail, uPass)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(`login user: ${JSON.stringify(user)}`)
                console.log('USER:login with id ' + user.uid)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
}

function onLogout() {
    dialog.close() 
}
