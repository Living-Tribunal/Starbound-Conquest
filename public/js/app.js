let width = window.innerWidth;
let height = window.innerHeight;

let stage = new Konva.Stage({
    container:'container',
    width: width,
    height: height
});

const layer = new Konva.Layer();
stage.add(layer);

window.add_battleship = function() {
    let battleship_image = new Image();
    battleship_image.onload = function() {
        console.log("battleship loaded");
        var battleship = new Konva.Image ({
            x:50,
            y: 50,
            image: battleship_image,
            width: 181,
            height: 250,
        });
        layer.add(battleship);
    };
    battleship_image.src = '/images/DiableAvionics/diableavionics_hayle.png';
};

