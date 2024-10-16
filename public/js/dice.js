
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

window.d4 = function () {
  let result = '';
  for(let number = 0; number < value; number++) {
    let roll = Math.floor((Math.random() * 4) + 1);
    result += roll + ' ';  
    //page break every so numbers
    if ((number + 1) % 5 === 0){
      result += '<br>';  
    }
    
    document.getElementById('d4rolls').innerHTML = result;
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

window.d10 = function () {
  let result = '';
  for(let number = 0; number < value; number++) {
    let roll = Math.floor((Math.random() * 10) + 1);
    result += roll + ' ';  
    //page break every so numbers
    if ((number + 1) % 5 === 0){
      result += '<br>';  
    }
    
    document.getElementById('d10rolls').innerHTML = result;
    console.log(value);
}
}

window.d12 = function () {
  let result = '';
  for(let number = 0; number < value; number++) {
    let roll = Math.floor((Math.random() * 12) + 1);
    result += roll + ' ';  
    //page break every so numbers
    if ((number + 1) % 5 === 0){
      result += '<br>';  
    }
    
    document.getElementById('d12rolls').innerHTML = result;
    console.log(value);
}
}
