// Get the modal
var load_modal = document.getElementById("myLoadModal");

// Get the button that opens the modal
var btn = document.getElementById("loadButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("loadclose")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  load_modal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  load_modal.style.display = "none";
}
