// 1. var
console.log(x); // undefined (hoisted, but not initialized)
var x = 10;
x = 20; // Reassigning is allowed
var x = 30; // Redeclaration is allowed
console.log(x); // 30

// 2. let
// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
y = 20; // Reassigning is allowed
// let y = 30; // SyntaxError: Identifier 'y' has already been declared
console.log(y); // 20

// 3. const
// console.log(z); // ReferenceError: Cannot access 'z' before initialization
const z = 10;
// z = 20; // TypeError: Assignment to constant variable
// const z = 30; // SyntaxError: Identifier 'z' has already been declared
console.log(z); // 10

// Scope Differences
if (true) {
    var a = "I'm var"; // Function-scoped (or globally scoped if declared outside a function)
    let b = "I'm let"; // Block-scoped
    const c = "I'm const"; // Block-scoped
}
console.log(a); // "I'm var"
// console.log(b); // ReferenceError: b is not defined
// console.log(c); // ReferenceError: c is not defined
