import { tileSpec } from "./Specifications/tileSpec.js";
import { entitySpec } from "./Specifications/entitySpec.js";
import { level } from "./Specifications/levelSpec.js";

let DRAW_TILE = 1;

/**
 * Definining DOM objects
 */
let canvas = document.querySelector("canvas");
let tileDivision = document.querySelector(".tiles");
let tileContainer = document.querySelector(".tile-container");
let tileSelector = document.querySelector(".tile-selector");
let tileImage = document.querySelector("#tile-image");
let tileSelection = [0, 0];

let entityDivision = document.querySelector(".entities");
let entityContainer = document.querySelector(".entity-container");
let entitySelector = document.querySelector(".entity-selector");
let entityImage = document.querySelector("#entity-image");
let entitySelection = [0, 0];

let drawTile = document.querySelector(".draw-tile");
let drawEntity = document.querySelector(".draw-entity");

/**
 * Event listener for DrawTile Button
 */
drawTile.addEventListener("click", () => {
  DRAW_TILE = 1;
  tileDivision.style.display = "block";
  tileSelector.style.display = "block";
  entityDivision.style.display = "none";
  entitySelector.style.display = "none";
});

/**
 * Event Listener for DrawEntity
 */
drawEntity.addEventListener("click", () => {
  DRAW_TILE = 0;
  entityDivision.style.display = "block";
  entitySelector.style.display = "block";
  tileSelector.style.display = "none";
  tileDivision.style.display = "none";
});

/**
 * Get coordinates of the mouse pointer in a frid
 * @param {event} e - mousedown event
 * @param {number} size - size of the grid
 */
function getCoords(e, size) {
  const { x, y } = e.target.getBoundingClientRect();
  const mouseX = e.clientX - x;
  const mouseY = e.clientY - y;
  return [Math.floor(mouseX / size), Math.floor(mouseY / size)];
}

/**
 * Detects mousedown on the tilecontainer element to select a tile
 */
tileContainer.addEventListener("mousedown", (event) => {
  tileSelection = getCoords(event, 36);
  tileSelector.style.left = tileSelection[0] * 36 + "px";
  tileSelector.style.top = tileSelection[1] * 36 + "px";
});

/**
 * Detects mousedown on the entityContainer element to select an entity
 */
entityContainer.addEventListener("mousedown", (event) => {
  entitySelection = getCoords(event, 48);
  entitySelector.style.left = entitySelection[0] * 48 + "px";
  entitySelector.style.top = entitySelection[1] * 48 + "px";
});

/**
 * Draw function draws to the canvas
 */
function draw() {
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  level.backgrounds.forEach((background) => {
    tileSpec.tiles.forEach((tile) => {
      if (tile.name == background.tile) {
        background.ranges.forEach(
          ([positionX, positionXplusOne, positionY, positionYplusOne]) => {
            let [tileImageX, tileImageY] = tile.index;
            context.drawImage(
              tileImage,
              tileImageX * 12,
              tileImageY * 12,
              12,
              12,
              positionX * 24,
              positionY * 24,
              24,
              24
            );
          }
        );
      }
    });
  });
  level.entities.forEach((entity) => {
    entitySpec.entities.forEach((entitySp) => {
      if (entity.name == entitySp.name) {
        let entityImageX = entitySp.index[0];
        let entityImageY = entitySp.index[1];

        let entPositionX = entity.position[0] / 36;
        let entPositionY = entity.position[1] / 36;

        context.drawImage(
          entityImage,
          entityImageX * 24,
          entityImageY * 24,
          24,
          24,
          entPositionX * 24,
          entPositionY * 24,
          48,
          48
        );
      }
    });
  });
}

/**
 * Canvas event listener management
 */
let isMouseDown = false;
canvas.addEventListener("mousedown", () => {
  isMouseDown = true;
});
canvas.addEventListener("mouseup", () => {
  isMouseDown = false;
});
canvas.addEventListener("mouseleave", () => {
  //the mouse can keep registering down if the mouse leaves the canvas when mousedown
  isMouseDown = false;
});
canvas.addEventListener("mousedown", (event) => {
  if (isMouseDown) {
    if (DRAW_TILE == 1) {
      addTile(event);
    } else {
      addEntity(event);
    }
  }
});

canvas.addEventListener("mousemove", (event) => {
  if (isMouseDown) {
    if (DRAW_TILE == 1) {
      addTile(event);
    }
  }
});

/**
 * adding entity to the level object (for JSON export later)
 * @param {event} mouseEvent
 */
function addEntity(mouseEvent) {
  let [x1, y1] = getCoords(mouseEvent, 24);
  let position = [x1 * 36, y1 * 36];

  entitySpec.entities.forEach((entitySp) => {
    if (
      entitySp.index[0] == entitySelection[0] &&
      entitySp.index[1] == entitySelection[1]
    ) {
      level.entities.push({
        name: entitySp.name,
        position: position,
      });
    }
  });

  draw();
}

/**
 * Adding entities to the level object
 * @param {event} mouseEvent
 */
function addTile(mouseEvent) {
  let [x1, y1] = getCoords(mouseEvent, 24);
  let range = [x1, x1 + 1, y1, y1 + 1];

  tileSpec.tiles.forEach((tile) => {
    if (
      tile.index[0] == tileSelection[0] &&
      tile.index[1] == tileSelection[1]
    ) {
      level.backgrounds.forEach((background) => {
        if (background.tile == tile.name) {
          background.ranges.push(range);
        }
      });
    }
  });

  draw();
}

/**
 * Only draw to the canvas if the images are loaded
 */
tileImage.src = "images/tiles.png";
entityImage.src = "images/entities.png";
tileImage.onload = function () {
  entityImage.onload = function () {
    draw();
  };
};

/**
 * Downloading the level object as JSON
 */
let downloadJSON = document.getElementById("download-json");

downloadJSON.addEventListener("click", () => {
  let dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(level));
  downloadJSON.setAttribute("href", dataStr);
  downloadJSON.setAttribute("download", "level.json");
});

/**
 * Clear canvas by clearing level.json
 */
let clearCanvas = document.getElementById("clear-canvas");
clearCanvas.addEventListener("click", () => {
  level.backgrounds.forEach((background) => {
    background.ranges = [];
  });
  level.entities = [];
});

/**
 * Specify the number of rings and starting position of the ball
 */
let noRings = document.getElementById("rings");
let ballStartX = document.getElementById("starting-x");
let ballStartY = document.getElementById("starting-y");

noRings.addEventListener("change", () => {
  if (noRings.value === "") {
    level.rings = 0;
  } else {
    level.rings = noRings.value;
  }
});

ballStartX.addEventListener("change", () => {
  if (ballStartX.value === "") {
    level.startingPosition.x = 100;
  } else {
    level.startingPosition.x = ballStartX.value * 36;
  }
});

ballStartY.addEventListener("change", () => {
  if (ballStartY.value === "") {
    level.startingPosition.y = 100;
  } else {
    level.startingPosition.y = ballStartY.value * 36;
  }
});
