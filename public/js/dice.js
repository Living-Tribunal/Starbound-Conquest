
let value = 1;

window.increment_dice = function (labelId) {
  const element = document.getElementById(labelId);
  let dice_count = parseInt(element.innerHTML);
  dice_count++;

  value = dice_count;
  element.innerHTML = dice_count;
};

window.decrement_dice = function (labelId) {
  const element = document.getElementById(labelId);
  let dice_count = parseInt(element.innerHTML);
  dice_count--;
  if(dice_count <= 1){
    dice_count = 1;
  }
  value = dice_count;
  element.innerHTML = dice_count;
};

window.d20 = function () {
  let result = '';
  for(let number = 0; number < value; number++) {
    let roll = Math.floor((Math.random() * 20) + 1);
    result += roll + ' ';  
    //page break every so numbers
    if ((number + 1) % 5 === 0){
      result += '<br>';  
    }
    
    document.getElementById('d20rolls').innerHTML = result;
    console.log(value);
}
}

window.d3 = function () {
  let result = '';
  for(let number = 0; number < value; number++) {
    let roll = Math.floor((Math.random() * 3) + 1);
    result += roll + ' ';  
    //page break every so numbers
    if ((number + 1) % 5 === 0){
      result += '<br>';  
    }
    
    document.getElementById('d3rolls').innerHTML = result;
    console.log(value);
}
}


window.d6 = function () {
  let result = '';
  for(let number = 0; number < value; number++) {
    let roll = Math.floor((Math.random() * 6) + 1);
    result += roll + ' ';  
    //page break every so numbers
    if ((number + 1) % 5 === 0){
      result += '<br>';  
    }
    
    document.getElementById('d6rolls').innerHTML = result;
    console.log(value);
}
}

window.d8 = function () {
  let result = '';
  for(let number = 0; number < value; number++) {
    let roll = Math.floor((Math.random() * 8) + 1);
    result += roll + ' ';  
    //page break every so numbers
    if ((number + 1) % 5 === 0){
      result += '<br>';  
    }
    
    document.getElementById('d8rolls').innerHTML = result;
    console.log(value);
}
}

/* window.twod3 = function () {
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
} */