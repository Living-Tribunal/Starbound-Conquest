// Get the modal
let stat_modal = document.getElementById("ship-stat-modal");
let modal_rules = document.getElementById("rules-modal");


// Get the button that opens the modal
let btn = document.getElementById("open-ship-stat-modal");
let rules_btn = document.getElementById("open-rules");

// Get the <span> element that closes the modal
let span = document.getElementById("stat-close");
let rules_span = document.getElementById("rules-close");

rules_btn.onclick = function() {
  modal_rules.style.display = "block";
}

btn.onclick = function() {
  stat_modal.style.display = 'block';
}

span.onclick = function() {
  span.style.display = 'none';
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  stat_modal.style.display = "none";
}

rules_span.onclick = function() {
  modal_rules.style.display = "none";
}


