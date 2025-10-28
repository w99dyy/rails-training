let firstCard = 4
let secondCard = 7
let sum = firstCard + secondCard
let hasBlackJack = false
let age = 22
let isAlive = true
let message = ""

if (sum < 21) {
    message = "Do you want to draw a new card?"

}
        else if (sum === 21) {
            message = "Wohoo! You've got Blackjack!"
            hasBlackJack = true

        }

        else  {
            message = "Aughh too bad you've lost!"
            isAlive = false
        }


console.log(message)

if (age > 21) {
    console.log("You can not enter the club!")
}
    else {
        console.log("Welcome!")
    }

    
