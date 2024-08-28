// Get the modal
var save_modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

var text = document.getElementById("hidden-text");

var savebtn = document.getElementById("saveButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  save_modal.style.display = "flex";
}

savebtn.onclick = function() {
  text.style.color = "gold";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  save_modal.style.display = "none";
  text.style.display = "none";
}

