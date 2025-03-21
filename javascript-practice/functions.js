function welcomeMsg(guest_name) {
    // console.log(`Welcome Home, ${guest_name}`)
    return `Welcome Home, ${guest_name}`
}

// const message = welcomeMsg("Kairaa")
// console.log(message)


// LINEAR SEARCH
// To find if we have 8 in the numbers array
// True or False

const numbers = [2, 5, 3, 6, 1, 7, 4]
const target = 6
function findTarget(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] == target) {
            return true
        }
    }
    return false
}
console.log(findTarget(numbers, target))


// SORT THE ELEMENTS OF THE ARRAY IN ASCENDING ORDER
// BUBBLE SORT
const newnums = [1, 2, 3, 4, 5, 6, 7]