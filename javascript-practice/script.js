// Scope Differences
function variableHome() {
    var a = "I'm var"; // Function-scoped (or globally scoped if declared outside a function)
    let b = "I'm let"; // Block-scoped
    const c = "I'm const"; // Block-scoped
}
variableHome();
console.log(b); 

// console.log(b);
// console.log(c); 
