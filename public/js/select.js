window.handle_dropdown_selection = function () {
  const select_element = document.getElementById("ship-faction");
  const select_value = select_element.value;

  switch (select_value) {
    case "1":
      add_fighter_da();
      break;
    case "2":
      add_fighter_ge();
      break;
    case "3":
      add_fighter_ne();
      break;
    case "4":
      add_fighter_vo();
      break;
    case "5":
      add_fighter_gr();
      break;
    case "6":
      add_fighter_ms();
      break;
    case "7":
      add_destroyer_da();
      break;
    case "8":
      add_destroyer_ge();
      break;
    case "9":
      add_destroyer_ne();
      break;
    case "10":
      add_destroyer_vo();
      break;
    case "11":
      add_destroyer_gr();
      break;
    case "12":
      add_destroyer_ms();
      break;
    case "13":
      add_cruiser_da();
      break;
    case "14":
      add_cruiser_ge();
      break;
    case "15":
      add_cruiser_ne();
      break;
    case "16":
      add_cruiser_vo();
      break;
    case "17":
      add_cruiser_gr();
      break;
    case "18":
      add_cruiser_ms();
      break;
    case "19":
      add_carrier_da();
      break;
    case "20":
      add_carrier_ge();
      break;
    case "21":
      add_carrier_ne();
      break;
    case "22":
      add_carrier_vo();
      break;
    case "23":
      add_carrier_gr();
      break;
    case "24":
      add_carrier_ms();
      break;
    case "25":
      add_dreadnought_da();
      break;
    case "26":
      add_dreadnought_ge();
      break;
    case "27":
      add_dreadnought_ne();
      break;
    case "28":
      add_dreadnought_vo();
      break;
    case "29":
      add_dreadnought_gr();
      break;
    case "30":
      add_dreadnought_ms();
      break;
  }
};

window.hande_planets_dropdown = function () {
  const select_element = document.getElementById("add-planets");
  const select_planet_value = select_element.value;

  switch (select_planet_value) {
    case "1":
      add_planet_azura();
      break;
    case "2":
      add_planet_crysalon();
      break;
    case "3":
      add_planet_eldoria();
      break;
    case "4":
      add_planet_hesperia();
      break;
    case "5":
      add_planet_pyraxis();
      break;
    case "6":
      add_planet_moon();
      break;
    case "7":
      add_asteroid();
      break;
    case "8":
      add_asteroid_field();
      break;
  }
};
