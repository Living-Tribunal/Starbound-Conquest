// Get the modal
const load_modal = document.getElementById("myLoadModal");

// Get the <span> element that closes the modal
const span = document.getElementById("load-close");
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  load_modal.style.display = "none";
}

