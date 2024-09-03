
window.d3 = function () {
  document.getElementById('d3').innerHTML = 'The Dice Result: ' + Math.floor((Math.random() * 3) + 1);
}

window.d6 = function () {
  document.getElementById('d6').innerHTML = 'The Dice Result: ' + Math.floor((Math.random() * 6) + 1);
}

window.d8 = function () {
  document.getElementById('d8').innerHTML = 'The Dice Result: ' + Math.floor((Math.random() * 8) + 1);
}

window.d20 = function () {
  document.getElementById('d20').innerHTML = 'The Dice Result: ' + Math.floor((Math.random() * 20) + 1);
}

window.twod3 = function () {
  // Generate two independent dice rolls
  const die1 = Math.floor(Math.random() * 3) + 1;
  const die2 = Math.floor(Math.random() * 3) + 1;
  
  // Sum the results of the two dice
  const result = die1 + die2;
  
  // Display the result
  document.getElementById('2d3').innerHTML = 'The Dice Result: ' + result;
}

window.twod6 = function () {
  // Generate two independent dice rolls
  const die1 = Math.floor(Math.random() * 6) + 1;
  const die2 = Math.floor(Math.random() * 6) + 1;
  
  // Sum the results of the two dice
  const result = die1 + die2;
  
  // Display the result
  document.getElementById('2d6').innerHTML = 'The Dice Result: ' + result;
}

window.twod8 = function () {
  // Generate two independent dice rolls
  const die1 = Math.floor(Math.random() * 8) + 1;
  const die2 = Math.floor(Math.random() * 8) + 1;
  
  // Sum the results of the two dice
  const result = die1 + die2;
  
  // Display the result
  document.getElementById('2d8').innerHTML = 'The Dice Result: ' + result;
}

window.twod10 = function () {
  // Generate two independent dice rolls
  const die1 = Math.floor(Math.random() * 10) + 1;
  const die2 = Math.floor(Math.random() * 10) + 1;
  
  // Sum the results of the two dice
  const result = die1 + die2;
  
  // Display the result
  document.getElementById('2d10').innerHTML = 'The Dice Result: ' + result;
}