List of Coffees
GET http://localhost:3000/coffees
example -> [ { id: 0, name: "espresso", des: "full flavour", price: 108 } ]


Get Coffee by id
GET http://localhost:3000/coffees/id
example -> { id: 0, name: "espresso", des: "full flavour", price: 108 }


MONGODB set up

//save datas

db.coffees.save([
    {
        name: 'Espresso',
        des: 'An intense, full flavored expresso.',
        price: 90,
    },
    {
        name: 'Espresso Macchiato',
        des: 'Espresso with steam milk and form',
        price: 90,
    },
    {
        name: 'Espresso Con Panna',
        des: 'Espresso Meets a dollop of Whipped cream',
        price: 90,
    },
    {
        name: 'Caffe Americano',
        des: 'Espresso with hot water',
        price: 110,
    },
    {
        name: 'Cappuccino',
        des: 'Espresso, steamed milk and layer of form',
        price: 135,
    },
    {
        name: 'Flat White',
        des: 'Ristretto with milk',
        price: 135,
    },
    {
        name: 'Caffe Latte',
        des: 'Espresso, steamed milk and form',
        price: 120120120120120120120120120120120120,
    },
    {
        name: 'Caramel Machhiato',
        des: 'Milk,Vanilla syrup espresso shot and caramel drizzles',
        price: 145,
    },
    {
        name: 'Caffe Mocha',
        des: 'Espresso shot,mocha sauce and whipped cream',
        price: 145,
    },
    {
        name: 'Brewed Coffee',
        des: 'Coffee and hot water with simply dripbrewed',
        price: 145,
    }
])
