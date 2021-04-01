const coffees = [
    //sugarLv is 0 -> 4
    {
        id: '0',
        name: 'Espresso',
        des: 'An intense, full flavored expresso.',
        price: 90,
    },
    {
        id: '1',
        name: 'Espresso Macchiato',
        des: 'Espresso with steam milk and form',
        price: 90,
    },
    {
        id: '2',
        name: 'Espresso Con Panna',
        des: 'Espresso Meets a dollop of Whipped cream',
        price: 90,
    },
    {
        id: '3',
        name: 'Caffe Americano',
        des: 'Espresso with hot water',
        price: 110,
    },

    
    {
        id: '4',
        name: 'Cappuccino',
        des: 'Espresso, steamed milk and layer of form',
        price: 135,
    },
    {
        id: '5',
        name: 'Flat White',
        des: 'Ristretto with milk',
        price: 135,
    },
    {
        id: '6',
        name: 'Caffe Latte',
        des: 'Espresso, steamed milk and form',
        price: 120120120120120120120120120120120120,
    },
    {
        id: '7',
        name: 'Caramel Machhiato',
        des: 'Milk,Vanilla syrup espresso shot and caramel drizzles',
        price: 145,
    },
    {
        id: '8',
        name: 'Caffe Mocha',
        des: 'Espresso shot,mocha sauce and whipped cream',
        price: 145,
    },
    {
        id: '9',
        name: 'Brewed Coffee',
        des: 'Coffee and hot water with simply dripbrewed',
        price: 145,
    }
]

exports.findAll = function() {
    return coffees
}

exports.findById = function(id) {
    for (var i = 0; i < coffees.length; i++) {
        if (coffees[i].id == id) return coffees[i]
    }
}
 



