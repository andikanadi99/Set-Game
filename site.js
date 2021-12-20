/* ******************Classes for card and deck*********************/

/*
 * Card class contains number, shading, shape, and color.
 */
class Card {
  constructor (color, shape, shading, number) {
    this.color = color
    this.shape = shape
    this.shading = shading
    this.number = number
  }

  number () {
    return this.number
  }

  shading () {
    return this.shading
  }

  shape () {
    return this.shape
  }

  color () {
    return this.color
  }
}

/*
* Class for Deck holds cards, with 81 cards with unique combination of elements.
*/
class Deck {
  constructor (colorArray, shapeArray, shadingArray, numberArray) {
    this.cards = []
    this.numberArray = numberArray
    this.shadingArray = shadingArray
    this.shapeArray = shapeArray
    this.colorArray = colorArray
    this.buildDeck()
  }

  cards () {
    return this.cards
  }

  numberArray () {
    return this.numberArray
  }

  shadingArray () {
    return this.shadingArray
  }

  shapeArray () {
    return this.shapeArray
  }

  colorArray () {
    return this.colorArray
  }

  buildDeck () {
    let index = 0

    // Iterate through numberArray
    this.colorArray.forEach(color => {
      // Iterate through shadingArray
      this.shapeArray.forEach(shape => {
        // Iterate through shapeArray
        this.shadingArray.forEach(shading => {
          // Iterate through colorArray
          this.numberArray.forEach(number => {
            // Add card to card array; card array is within deck that holds info about cards

            this.cards[index] = new Card(color, shape, shading, number)
            // Increment index
            index++
          })
        })
      })
    })
  }
}

/* *****************FUNCTIONS *************************/

/*
* Declare variables to be used throughout program.
*   times = variable to represent time for calculating stats.
*   setsFound = represents the number of sets found in the game.
*   totalAttempts = represents the total times a player has tried to verify a set.
*/
const times = []
let setsFound = 0
let totalAttempts = 0

/*
* Function to display the cards on board.
*/
function displayCards () {
  const board = document.getElementById('mainBoard')
  // Iterate through 12 starting cards
  for (const card of currCards) {
    const divElement = document.createElement('div')
    // Add event listener for adding select styling
    divElement.addEventListener('click', function () {
      select(this)
    })
    // Add cards class
    divElement.classList.add('cards')
    // Set cardId
    divElement.setAttribute('cardId',
      card.color + '' + card.shape + '' +
            card.shading + '' + card.number)
    // Set image
    divElement.innerHTML = '<img src=/cards_png/' +
            card.color + '' + card.shape +
            '' + card.shading + '' +
            card.number + '.png>'

    // Write to file
    board.appendChild(divElement)
  }
}

/*
* createDeck -> creates and initializes new Deck
*/
function createDeck () {
  const colorArray = [0, 1, 2] // 0->green, 1->purple, 2->red
  const shapeArray = [0, 1, 2] // 0->diamond, 1->squiggle, 2->oval
  const shadingArray = [0, 1, 2] // 0->empty, 1->solid, 2->striped
  const numberArray = [0, 1, 2] // 0->1, 1->2, 2->3

  const deck = new Deck(colorArray, shapeArray, shadingArray, numberArray)
  return deck
}

/*
* Function to create array of current amount of cards (12).
*/
function currentCards () {
  let i
  const cardArr = []
  for (i = 0; i < 12; i++) {
    cardArr[i] = deck.cards.pop()
  }
  return cardArr
}

/*
* Window popup to display rules
*/
function fullWindowPopup () {
  const win = window.open('', 'Rules',
    'width=600, height=400, top=100, left=100')
  win.document.body.innerHTML = '<html><head><title>Game Rules</title></head><body>The objective of the game is to identify a set of 3 cards from 12 cards. Each card has 4 different features and 3 different possibilities for each.The features and their possibilities are as follows: <ul>Shape: oval, squiggle, or diamond</ul><ul>Color: red, purple, or green </ul> <ul>Number: 1, 2, or 3 </ul> <ul>Shading: solid, striped, or empty. </ul>A set qualifies as something with either all the same or all different in each feature.\nWhen a valid set is selected, or there is not a valid set within the 12 cards, 3 more cards will be dealt until a set is in the cards.This continues until there are no more cards in the set. The player with the highest score at the end wins!</body></html>'
}

/*
* Function to display how many cards are left in the deck.
*/
function cardsLeftInDeck () {
  document.getElementById('deckLength').innerHTML = 'Cards left in deck: ' + deck.cards.length
}

/*
* Function to display how many sets have been found.
*/
function displayScore () {
  document.getElementById('score').innerHTML = 'Score: ' + setsFound
}

/*
* Function to replace cards
*/
function replaceCards (cards) {
  // Remove cards
  for (const card of cards) {
    const elt = document.querySelector("[cardid='" + card + "']")
    elt.remove()
  }

  // Check if more need to be added
  if (document.querySelectorAll('div.cards').length !== 9) {
    console.log('hit')
    cardsLeftInDeck()
    return
  }

  const board = document.getElementById('mainBoard')

  // Add more cards if more exist in the deck
  if (deck.length !== 0) {
    for (let i = 0; i < 3; i++) {
      const card = deck.cards.pop()
      const divElement = document.createElement('div')
      divElement.addEventListener('click', function () {
        select(this)
      })
      divElement.classList.add('cards')
      divElement.setAttribute('cardId', card.color + '' + card.shape + '' + card.shading + '' + card.number)
      divElement.innerHTML = '<img src=/cards_png/' + card.color + '' + card.shape + '' + card.shading + '' + card.number + '.png>'
      board.appendChild(divElement)
    }
  }

  console.log(deck.cards.length)
  cardsLeftInDeck()
}

/*
Function to color cards
*/
function colorCards (cards, isSet) {
  // Depending on boolean, decide which styling to apply
  let set = 'correct'
  if (!isSet) {
    set = 'wrong'
  }
  // Iterate through cards
  for (const card of cards) {
    // Apply styling
    const elt = document.querySelector("[cardid='" + card + "']")
    elt.classList.add(set)
    // Remove styling after 750 ms
    setTimeout(() => {
      while (document.getElementsByClassName(set).length !== 0) {
        document.getElementsByClassName(set)[0].classList.remove(set)
      }
    }, 750)
  }
}

/*
 * checks if a set exist withi a set of 3 cards.
 */
function checkSet(cards){
  // Variable list for specific card and aspects to check if set
  let set = false
  let checkColor = false
  let checkShape = false
  let checkShade = false
  let checkNum = false

  // If statements to check for each attribute of cards to see three cards are a set.

  // Color verification
  if ((cards[0].charAt(0) === cards[1].charAt(0) && cards[1].charAt(0) === cards[2].charAt(0) && cards[0].charAt(0) === cards[2].charAt(0)) ||
      (cards[0].charAt(0) !== cards[1].charAt(0) && cards[1].charAt(0) !== cards[2].charAt(0)) && cards[0].charAt(0) !== cards[2].charAt(0)) {
    checkColor = true
  }
  // Shape verification
  if ((cards[0].charAt(1) === cards[1].charAt(1) && cards[1].charAt(1) === cards[2].charAt(1) && cards[0].charAt(1) === cards[2].charAt(1)) ||
      (cards[0].charAt(1) !== cards[1].charAt(1) && cards[1].charAt(1) !== cards[2].charAt(1)) && cards[0].charAt(1) !== cards[2].charAt(1)) {
    checkShape = true
  }
  // Shade verification
  if ((cards[0].charAt(2) === cards[1].charAt(2) && cards[1].charAt(2) === cards[2].charAt(2) && cards[0].charAt(2) === cards[2].charAt(2)) ||
      (cards[0].charAt(2) !== cards[1].charAt(2) && cards[1].charAt(2) !== cards[2].charAt(2)) && cards[0].charAt(2) !== cards[2].charAt(2)) {
    checkShade = true
  }
  // Number verification
  if ((cards[0].charAt(3) === cards[1].charAt(3) && cards[1].charAt(3) === cards[2].charAt(3) && cards[0].charAt(3) === cards[2].charAt(3)) ||
      (cards[0].charAt(3) !== cards[1].charAt(3) && cards[1].charAt(3) !== cards[2].charAt(3)) && cards[0].charAt(3) !== cards[2].charAt(3)) {
    checkNum = true
  }
  // Set verification
  if (checkNum && checkColor && checkShade && checkShape) {
    set = true
  }
  return set;
}
/*
* Function to verify that 3 cards are a set.
*/
function verifySet () {
  // Update stats
  totalAttempts = totalAttempts + 1

  // Get cards from selected class
  const selectedElements = document.getElementsByClassName('selected')

  // If the number of selected cards isn't 3, it's not a set
  if (selectedElements.length !== 3) {
    // Iterate through the selected elements
    // We iterate and select by continously calling getElementsByClassName because even when stored in a variable, it changes. This ensure perfection.
    while (document.getElementsByClassName('selected').length !== 0) {
      // Add wrong class and selected class for formatting issues
      document.getElementsByClassName('selected')[0].classList.add('wrong')
      document.getElementsByClassName('selected')[0].classList.remove('selected')
    }
    // Remove wrong class
    setTimeout(() => {
      while (document.getElementsByClassName('wrong').length !== 0) {
        document.getElementsByClassName('wrong')[0].classList.remove('wrong')
      }
    }, 750)
    
    return false
  }

  // Cards array containing string version of cards
  const cards = []
  while (cards.length !== 3) {
    for (const elt of document.getElementsByClassName('selected')) {
      if (!cards.includes(elt.getAttribute('cardid'))) {
        cards.push(elt.getAttribute('cardid'))
        elt.classList.remove('selected')
      }
    }
  }
  set = checkSet(cards);
  // If it is a set, stop timer, show coloring, replace cards, update card count
  if (set) {
    stopTimer()
    colorCards(cards, set)
    setTimeout(() => {
      replaceCards(cards)
      startTimer()
    }, 750)
    setsFound = setsFound + 1
    displayScore()
  } else {
    colorCards(cards, set) // Else, color the cards as an invalid set
  }

  return set
}

/*
* Function to display score.
*/
function statistics (score) {
  document.writeln('Current score: ' + score + '.')
}

/*
* Function to start timer
*/
function startTimer () {
  const start = Date.now()
  interval = setInterval(function () {
    clock = ((Date.now() - start) / 1000).toFixed(0)
    document.getElementById('timer').innerHTML = clock
  }, 1000)
}

/*
Function to stop Timer, used when a set is verified
*/
function stopTimer () {
  times[times.length] = clock
  clearInterval(interval)
}

/*
Allow a user to manually reset the timer
*/
function resetTimer () {
  clearInterval(interval)
  startTimer()
}

/*
Function to display statistics
*/
function displayStats () {
  // Check a set has been attempted, calculate accuracy
  let accuracy = 0
  if (totalAttempts !== 0) {
    accuracy = (setsFound / totalAttempts) * 100
  }
  // Check that the player has found a set, calculate average time
  let avgTime = 0.0
  if (times.length !== 0) {
    const sum = (a, b) => parseFloat(a) + parseFloat(b)
    avgTime = (times.reduce(sum) / times.length)
  }
  // Display popup
  const win = window.open('', 'Rules', 'width=600, height=400, top=100, left=100')
  win.document.body.innerHTML = '<html><head><title>Statistics</title>You have found a total of <b>' + setsFound + ' sets</b> with an accuracy rating of <b>' + accuracy.toFixed(2) + '%</b><br>The average time to find a set is <b>' + avgTime.toFixed(1) + '</b> seconds.</head><body></body></html>'
}

/*
* Function to apply the selected class to an element when clicked
*/
function select (el) {
  if (el.classList.contains('selected')) {
    el.classList.remove('selected')
  } else {
    el.classList.add('selected')
  }
}

/*
* Function to diaplaying 3 more cards
*/
function deal3More () {
  const board = document.getElementById('mainBoard')
  for (let i = 0; i < 3; i++) {
    const card = deck.cards.pop()
    const divElement = document.createElement('div')
    divElement.addEventListener('click', function () {
      select(this)
    })
    divElement.classList.add('cards')
    divElement.setAttribute('cardId', card.color + '' + card.shape + '' + card.shading + '' + card.number)
    divElement.innerHTML = '<img src=/cards_png/' + card.color + '' + card.shape + '' + card.shading + '' + card.number + '.png>'
    board.appendChild(divElement)
  }

  cardsLeftInDeck()
}

/*
    * Function to shuffle deck
    */
function shuffle (deck) {
  // Variables used for shuffling.
  let j, x, i
  // For loop to shuffle array.
  for (i = deck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = deck[i]
    deck[i] = deck[j]
    deck[j] = x
  }
  return deck
}

/** ********************** MAIN CODE **************************************/

/*
* Creates deck.
*/
const deck = createDeck()
shuffle(deck.cards)

// Creates cards to be displayed to players.
const currCards = currentCards()
