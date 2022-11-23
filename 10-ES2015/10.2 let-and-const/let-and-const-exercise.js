//ES2015
const PI = 3.14;

//1
//var can be redefined and redeclared, while let can only be redefined. 
//var variables persist outside of scope, let does not-- in only works in block scope.

//2
//var can be redefined and redeclared, whie const cannot do EITHER. Const creates a block scope like let.

//3 let can be redefined, but not redeclared. const can neither be redefined nor redeclared.
//

//4 
// Hoisting is when the JS compiler lifts variables to the top of the scope they are declared in.
//Using var, we can access the variable (as undefined) before its declared later on in the code.
// Function declarations are hoisted, and can be invoked before they are defined.