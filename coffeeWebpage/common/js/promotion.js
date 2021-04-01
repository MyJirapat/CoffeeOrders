var currentUser = null

const BASE_PATH ="http://localhost:3000"
const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
const emailTv = $('#tvEmail')
const passwordTv = $('#tvPassword')
var pickedItem = null

$(document).ready(function() {
    //listening for dialog open
    const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
        return new mdc.textField.MDCTextField(el);
    });
    initFirebase()
    dialog.listen('MDCDialog:opened', () => {
        console.log("dialog opened")
    });

    dialog.listen('MDCDialog:closing', function() {
        console.log("dialog close")
    });

    $('#milkTeaBt').click(function() {
        console.log("printing")
        let text = $('#milkTeaTv').text()

        pickedItem = new CheckoutCoffee(
            "0",
            "Milk Tea Promotion",
            `Iced Milk Tea x 2
            Iced Milk Tea Foam x 2
            Hot Milk Tea x 1 199 Baht`,
            108,
            "",
            1,
            currentUser.userId
        )
        console.log(JSON.stringify(pickedItem))
        if (currentUser == null) {
            dialog.open()
        } else {

        }

    })

    $('#coffBeanBt').click(function() {
        let text = $('#coffBeanDes').text()
        pickedItem = new CheckoutCoffee(
            "1",
            "Coffee Beans Promotion",
            `Protein Box x 1
            Oat Milk x 1
            Cake Matcha x 1`,
            99,
            "",
            1,
            currentUser.userId
        )
        console.log(JSON.stringify(pickedItem))
        if (currentUser == null) {
            dialog.open()
        }
    })

    $('#coffeeMorBt').click(function() {
        let text = $('#breakSandDes').text()
        pickedItem = new CheckoutCoffee(
            "2",
            "Coffee Morning Set Promotion",
            `Cold Brew x 1
            Dark Cocoa x 1
            Hamberger x 1`,
            89,
            "",
            1,
            currentUser.userId
        )
        console.log(JSON.stringify(pickedItem))
        if (currentUser == null) {
            dialog.open()
        }
    })

})

function addPromotionItemToCart(coffeeModel, amountOrdered) {
    console.log(`amount is ${amountOrdered}`)
    if(coffeeModel != null) {
        let addToCartEndpoint = `${BASE_PATH}/cartItems`
        $.post(
            addToCartEndpoint,
            {
                name: coffeeModel.name,
                des: coffeeModel.description,
                price: coffeeModel.price,
                imgUrl: coffeeModel.imgSrc,
                amount: amountOrdered,
                userId: coffeeModel.userId
            },
            function(data, status) {
                console.log(`${JSON.stringify(JSON.stringify(coffeeModel) )} with status ${status}`)
            }
        )

        console.log(coffeeModel)
    }
}

function onOpenModel() {
    $('#exampleModal').modal('show')
}

function onCloseModel() {
    $('#exampleModal .close').click()
}

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
                currentUser = { userId: user.id }
                console.log(`login user: ${JSON.stringify(user)}`)
                console.log('USER:login with id ' + user.uid)
                currentUser = { userId: user.uid }
                console.log('USER:login with id ' + JSON.stringify(currentUser))
                dialog.close()
                //finish login && create item
                $('#btAddToCart').click(async function() {
                    var amountOrdered = $('#npAmountPicker').val()
                    console.log(amountOrdered)
                    await addPromotionItemToCart(pickedItem, amountOrdered)
                    onCloseModel()
                })
                onOpenModel()
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


function initFirebase() {
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
}

class CheckoutCoffee {
    constructor(id, name, des,price,imgSrc ,amount,userId) {
        this.id = id;
        this.name = name;
        this.description = des;
        this.price = price;
        this.imgSrc = imgSrc;
        this.amount = amount;
        this.userId = userId
    }
};
