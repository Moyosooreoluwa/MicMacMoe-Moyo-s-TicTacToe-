# MicMacMoe-Moyo-s-TicTacToe-

Tic Tac Toe Game - Jan 2022

HTML

Create a table of 3 rows and 3 cols each td will have an ID of numbers from 0-9.
Remove the top  borders of the 1st row.
Remove the bottom border of the last row.
Remove the left borders of the 1st col.
Remove the right borders of the last col.

Create a div which will contain the game result and buttons to play again and choose the difficulty.
This div will not be visible until game is over.


JavaScript

Create empty variable for the game board.
Assign "X" or "O" to player and computer variables.
Create an array  of arrays that will contain the possible combinations of cells that will win the game.

The games is set up in functions. Each function has its version for the easy and hard difficulties. The functions are the same except the mextBestSpot functions.
Initialize the  game with startGameH() or startGameE().

startGame
Once the game is started the display of the div from line 13's display is set to none.
A for loop that clears all the contents of all cells and removes their background colours.
An event listener that takes you to the next functions.

turnCLick
If you click on one of the squares, takes you to function turn.

turn
If that play wins the game then go to gameOver.

checkWin
If any of the player or computers plays match any of the winning combinations from line 21, then the game has been won.

declareWinner
Checks who played the winning combo and sets the display of the div from line 11 to block.

gameOver
Using the declareWinner function, displays text for win and lose scenarios.

checkDraw
If there are no empty squares left then then displays the div from line 13 with a draw message.

emptySquares
Reurns the number of empty squares left.

nextBestSpot
for easy level, it randomises the next empty square for the computer to play In.
For hard level, it uses the minimax algorithm.
