// Get the modal
var dice_modal = document.getElementById("dice-modal");

// Get the button that opens the modal
var btn = document.getElementById("side-panel-btn");

// Get the <span> element that closes the modal
var span = document.getElementById("dice-close");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  dice_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  dice_modal.style.display = "none";
}