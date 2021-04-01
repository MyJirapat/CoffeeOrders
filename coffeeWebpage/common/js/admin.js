var admin = []
var currentUser = null
var pickedUserImg = null

const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
const dataTable = new mdc.dataTable.MDCDataTable(document.querySelector('.mdc-data-table'));
initFirebase()
var storage = firebase.storage();
var storageRef = storage.ref();
var imagesRef = storageRef.child('images')
const BASE_PATH = "http://localhost:3000"

$(document).ready(function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        var newMetadata = {
            contentType: 'image/jpeg'
        };
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            console.log(URL.createObjectURL(this.files[0])) // set src to blob url)

            //var imageURL = URL.createObjectURL(this.files[0])
            var file = this.files[0]
            console.log(`filename is ${file.name}`)
            imagesRef = storageRef.child(file.name)
            imagesRef.put(file, newMetadata).then((snapshot) => {
                console.log('Upload a blob or file')
                imagesRef = storageRef.child(file.name)
                //show preview
                imagesRef.getDownloadURL().then((url) => {
                    $('#myImg').attr('src', url) // set src to blob url)
                    console.log(url)
                    $('#myImg').css('display','inline');
                })
            })
        }
    })

    const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
        return new mdc.textField.MDCTextField(el);
    });
    onLoadCart()

    $('#btAdd').click(() => {
        if(currentUser == null) {
            dialog.open()
        } 
    })

    dialog.listen('MDCDialog:opened', () => {
        console.log("dialog opened")
    });

    dialog.listen('MDCDialog:closing', function() {
        console.log("dialog close")
    });
})


function addProduct() {
    /*console.log('dddddddddddddddddddddd')*/
    dialog.close()
}

function onSubmitNewCoffee(){
    console.log(`Product Name is ${tvproduct.val()}`)
    console.log(`Description is ${tvdes.val()}`)
    console.log(`Price is ${tvprice.val()}`)
    console.log(`Image is ${tvimage.val()}`)

}

function addNewCoffee(coffeeModel) {
    console.log(`amount is ${amountOrdered}`)
    if(coffeeModel != null) {
        let newCoffeePath = `${BASE_PATH}/coffees`
        $.post(
            newCoffeePath,
            {
                name: coffeeModel.name,
                des: coffeeModel.des,
                price: coffeeModel.price,
                imgUrl: coffeeModel.imgURL
            }, 
            function(data, status) {
                console.log(`${JSON.stringify(JSON.stringify(coffeeModel) )} with status ${status}`)
            }
        )
        console.log(coffeeModel)
    }
}

function onLoadCart() {
    let endpoint = `${BASE_PATH}/coffees`  
    $.ajax({
        type: 'GET',
        url: endpoint,
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log('api requested successfully: ' + result.statusCode);
            let adminItem = result.data
            console.log("before" + JSON.stringify(adminItem))
            var index;
            for (index = 0; index < adminItem.length; index++) {
                let item = adminItem[index]
                admin.push(
                    new Coffee(
                        item._id,
                        item.name,
                        item.des,
                        item.price,
                        item.imgURL
                    )
                )
                addNewCoffeeItem(admin[index])
            }
        }
    });
}

function onDeleteCoffeeRow(id) {
    console.log(id)
    let endpoint = `${BASE_PATH}/coffees/delete/${id}`
    $.ajax({
        url: endpoint,
        type: 'DELETE',
        success: function(result) {
            console.log("deleted:" + JSON.stringify(result))
            location.reload()
        }
    })
}

function onEditCoffeeRow() {
    console.log("editing")
    $('#imgPickBt').click(function() {
    })
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

async function imgPick() {
    console.log('image picking')
    var metadata = {
        contentType: 'image/jpeg'
    };
    //$('#file-input').trigger('click').click()
    //var file_data = $('#file-input').prop('files')[0];
    //var form_data = new FormData();
    //form_data.append('file', file_data);
    //let imagesRef = storageRef.child('images')
    //imagesRef.put(form_data).then((snapshot) => {
        //console.log('Upload a blob or file')
    //})
    
}

function setUpImagePicker() {

}

function addNewCoffeeItem(coffeeItem) {
    let data = coffeeItem.id
    console.log(JSON.stringify(coffeeItem))
    $('#container-admin')
        .append(
            `<tr class="mdc-data-table__row">

                <th class="mdc-data-table__cell" scope="row">${coffeeItem.name}</th>
                <td class="mdc-data-table__cell" scope="row">${coffeeItem.description}</br> </td>
                <th class="mdc-data-table__cell" scope="row">${coffeeItem.price}</th>
                <!---td class="mdc-data-table__cell mdc-data-table__cell--numeric">70</td--->

                <td class="mdc-data-table__cell"><img src=${coffeeItem.imgURL} width = "55px" > </td>

                    <td><div class="mdc-dialog__actions">
                        <button type="button-delete" class="mdc-button mdc-dialog__button" 
                        onclick="onDeleteCoffeeRow('${coffeeItem.id.replace(/\'/g, '"') } ')">
                            <div class="mdc-button__ripple"></div>
                            <span class="mdc-button__label"scope="row">Delete</span>

                            </button>

                            </td>

                            <td><div class="mdc-dialog__actions">
                                <button type="button-delete" class="mdc-button mdc-dialog__button" id = "onEditBt" onclick="onEditCoffeeRow()">
                                    <div class="mdc-button__ripple"></div>
                                    <span class="mdc-button__label"scope="row">Edit</span>
                                </button>

                            </td>

                            </tr>`);
                                }

function onUpdateUI() {
    coffees.forEach(function (item) {
        addNewCoffeeItem(item);
    });
}

function onAdd() {

    let name = $('#tvproduct').val()
    let des = $('#tvdes').val()
    let price = $('#tvprice').val()
    console.log(`name:${name} des:${des} price:${price}`)
    imagesRef.getDownloadURL().then((URL) => {
        let addCoffeePath = `${BASE_PATH}/coffees`
        console.log("Adding")
       $.post(
            addCoffeePath,
            {
                name: name,
                des: des, 
                price: price,
                imgURL: URL 
            }, 
            function(data, status) {
                window.location.reload()
            }
        )
    })

}

function onLogout() {
    dialog.close() 
}

function onUpdateUIAtPos(position) {
    let adminItem = admin[position]
    updateCartUI(adminItem)
}

//Models
class Coffee {
    constructor(id, name, description, price, imgURL) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imgURL = imgURL;
    }
};
