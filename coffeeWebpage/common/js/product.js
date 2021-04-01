
var coffees = [];
const BASE_PATH = "http://localhost:3000"
//document ready
$(document).ready(function () {
    console.log('running');
    onLoadCoffees();
    // onUpdateUI();
    $('body').bootstrapMaterialDesign();

})
function onLoadCoffees() {

    let endpoint = `${BASE_PATH}/coffees`
    $.ajax({
        type: 'GET',
        url: endpoint,
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log('api requested successfully: ' + result.statusCode);
            let coffeeItem = result.data
            console.log(coffeeItem.length)
            var index;
            for (index = 0; index < coffeeItem.length; index++) {
                let item = coffeeItem[index]
                console.log(item.name + ":" + item.name)
                coffees.push(
                    new Coffee(
                        item._id,
                        item.name,
                        item.des,
                        item.price,
                        item.imgURL
                    )
                )
                onUpdateUIAtPos(index);
            }



            $(".onButtonClick").click(function () {
                var buttonId = $(this).attr('id')
                let coffeeModel = findCoffeeModelById(buttonId)
                console.log(coffeeModel.name)
                console.log(coffeeModel.description)
                console.log(coffeeModel.price)
                console.log(coffeeModel.imgSrc)
                //when button of item is clicked
                onOpenModel()
                console.log(JSON.stringify(coffeeModel))
                $('#btAddToCart').click(function() {
                    var amountOrdered = $('#npAmountPicker').val()
                    addCoffeeToCart(coffeeModel, amountOrdered)
                    onCloseModel()
                })
            })
        }
    });
}

function addCoffeeToCart(coffeeModel, amountOrdered) {
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
                amount: parseInt(amountOrdered)
            }, 
            function(data, status) {
                console.log(`${JSON.stringify(JSON.stringify(coffeeModel) )} with status ${status}`)
            }
        )

        console.log(coffeeModel)
    }
}

function addProduct() {
    
}

function findCoffeeModelById(id) {
    var i
    for(i = 0; i < coffees.length; i++) {
        let item = coffees[i]
        let itemId = item.id
        console.log("this is id" + itemId)
        if (itemId == id) {
            return item
        }
    }
}

function onUpdateUIAtPos(position) {
    let coffeeItem = coffees[position]
    addNewCoffeeItem(coffeeItem)
}

function onUpdateUI() {
    coffees.forEach(function (item) {
        addNewCoffeeItem(item);
    });
}





function addNewCoffeeItem(coffeeItem) {
    let data = coffeeItem.id
    $('#coffeeContainer')
        .append(
            `<div class="col-4">
                <div>
                <img src=${coffeeItem.imgSrc}>
                <h4> ${coffeeItem.name}</h4>
                <p>${coffeeItem.description}</p>
                <p>${coffeeItem.price} Baht</p>
                </div>  
                <button href="#" class="btn onButtonClick" id=${coffeeItem.id}> Buy </button>
            </div>`
        );
}










function onOpenModel() {
    $('#exampleModal').modal('show')
}

function onCloseModel() {
    $('#exampleModal .close').click()
}

//Models
class Coffee {
    constructor(id, name, description, price, imgSrc) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imgSrc = imgSrc;
    }
};
