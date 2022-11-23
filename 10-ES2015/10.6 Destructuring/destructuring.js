//destructuring Objects

const teaOrder = {
  variety : 'oolong',
  teaName : 'winter sprout',
  origin : 'taiwan',
  price : 12.99,
  hasCaffeine : true,
  quantity : 3
};

//without destructuring: 
// const price = teaOrder.price;
// const quantity = teaOrder.quantity;
// const teaName = teaOrder.teaName;

//with destructuring:
const { price, quantity, teaName } = teaOrder;
//destructuring does not mutate original object
//price = 12.99
//quantity = 3
//teaName = 'winter sprout'

//destructuring with rest


// const { price, quantity, teaName, ...others } = teaOrder;
//others = {hasCaffeine, origin, variety};
//when destructuring 'rest' must be last element

//-------------------------------------------------
//-------------------------------------------------

const {brewTemp = 175} = teaOrder;
//if a variable/key is undefined, you can create it using same method
// and give it a value 

//renaming the VARIABLE
const {teaName: tea} = teaOrder;
// tea = 'winter sprout'

//can rename and add DEFAULT value at same time
const {brewTemp: temp = 175} = teaOrder;

function checkout(tea){
  const {quantity, price} = tea;
  return quantity * price;
}