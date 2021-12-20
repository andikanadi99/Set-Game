# proj5-grubhub-rovers
----------
Welcome to the Grubhub Rovers' implementation of the Set game! This implementation is a single-paged web page written using HTML, CSS, and JavaScript.

Clone the 'cse3901-2021au-1240/proj5-grubhub-rovers' repository to gain access to the files. To view the webpage, you must have the Live Server extension 
installed if using VSCode. More information on installation is found here: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

Open your preferred browser in your Virtual Machine then right-click the startPage.html in VSCode and open as a live server.

<h1>How to Play</h1>
<h2>Objective</h2>
The objective of the game is to identify a set of 3 cards from 12 cards. Each card has 4 different features and 3 different possibilities for each.The features and their possibilities are as follows:

<h2>Cards</h2>
Each card in the deck contains 1 attribute from each of the 4 following categories.
   <ul>
    <li>Shape: oval, squiggle, or diamond</li>
    <li>Color: red, purple, or green</li>
    <li>Number: 1, 2, or 3</li> 
    <li>Shading: solid, striped, or empty.</li>
   </ul>
<h2>What is a Set?</h2>
A set qualifies as something with either all the same or all different in each feature. When a valid set is selected, or there is not a valid set within the 12 cards, 3 more cards will be dealt until a set is in the cards.This continues until there are no more cards in the set. The player with the highest score at the end wins!
<h2>Selecting a Set</h2>
When the player has found the cards they think complete a set, left-click the cards. When selected, a gray border will appear behind the cards. Once the player has selected all their cards for the set, click verify set in the upper-right-hand corner. If the set is correct, the background will flash green for 3/4 of a second, before replacing the three cards that completed the set. If the set is incorrect, the cards will flash red before going back to normal.
    
<h1>Functionalities</h1>
The following functionalities are implemented in this game:

   <ul>
    <li>Creation of cards, each with 4 features and 3 possibilities for each. Each card is visually represented; images were sourced from Team Unniitec</li>
    <li>Creation of the deck, which contains 81 unique combinations of the card features</li>
    <li>Visual game board, intially starting with 12 cards</li>
    <li>Ability for users to click their selection of cards and automatically check if set is correct</li>
    <li>Sidebar of buttons giving users option to view rules, hints, statistics, or to deal 3 additional cards</li>
    <li>Verifying that the player-defined set is correct</li>
    <li>Displaying number of cards left in deck and player score</li>
   </ul>

<h1>Developers</h1>
This section contains more information for developers. 
<h2>Files</h2>
This repository contains the following files:

   <ul>
    <li>README.md - this file, gives information for both players and developers</li>
    <li>startPage.html - file contains the HTML with the content for the site.</li>
    <li>site.css - file that contains the styling for the content of the site.</li>
    <li>site.js - JavaScript functions</li>
    <li>tests.js - testing for JS functions.</li>
    <li>cards_png - folder containing images of the cards.</li>
   </ul>
    
<h2>Functions</h2>
The JavaScript file contains the following functions:

   <ul>
    <li>displayCards: This function displays cards onto the board.</li>
    <li>createDeck - Initializes the deck</li>
    <li>currentCards - holds an array of the first 12 cards to be displayed.</li>
    <li>fullWindowPopup - Displays popup window with rules for the game.</li>
    <li>cardsLeftInDeck - Displays the amount of cards left in the deck.</li>
    <li>displayScore - displays the number of sets found by player.</li>
    <li>replaceCards - replaces cards after a set is verified</li>
    <li>colorCards - displays corresponding color on card select based on if right or wrong</li>
    <li>verifySet - verifies that the 3 selected cards are a set and updates score, deck length as necessary.</li>
    <li>startTimer, stopTimer, and resetTimer - timer functions for statistics and resetTimer button.</li>
    <li>displayStats - displays statistics such as average time to find a set, total attempts, and accuracy.</li>
    <li>select - adds cards to 'selected' array if selected by player</li>
    <li>deal3More - deals three cards after set is verified</li>
    <li>shuffle - shuffles deck</li>
   </ul>
    
<h2>Styling</h2>
The following style guidelines were used. The HTML and CSS files were validated through the W3C CSS validation service (https://jigsaw.w3.org/css-validator/validator) and
returned no errors. The Javascript file was validated using StandardJS (https://standardjs.com/) and a few errors were returned; however, they were primarily due the html file calling these functions as events, rather than a JavaSript file calling functions.
       
