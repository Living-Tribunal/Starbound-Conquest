// Get the modal
var dice_modal = document.querySelector("#dice-modal");

// Get the button that opens the modal
var btn = document.querySelector(".side-panel-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-dice")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  dice_modal.style.display = "grid";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  dice_modal.style.display = "none";
}