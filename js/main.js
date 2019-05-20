// Setup Pixi and load the texture atlas files - call the `setup`
// function when they've loaded
let type = "WebGL";

if(!PIXI.utils.isWebGLSupported()){
  type = "canvas";
}

// Fit to window on resize
// window.addEventListener("resize", function(event){ 
//   scaleToWindow(app.renderer.view);
// });

//Aliases
let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.Loader.shared,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle;

//Create a Pixi Application
let app = new Application({ 
  width: 512, 
  height: 512,                       
  antialias: true, 
  transparent: false, 
  resolution: 1
});

var hero = document.querySelector(`.hero`);
// Add the canvas to the HTML document
hero.appendChild(app.view);

// Load json file and image scene
loader
  .add("images/hunt1.json")
  .load(setup);

// Define variables
let dungeon, explorer, treasure, door, id, blob, blobs, state, message, explorerHit, explorerHit1, style, elixir;

// Load image scene
function setup() {
  // Create the gameScene group
  gameScene = new Container();
  app.stage.addChild(gameScene);

  // Create the nextScene group
  nextScene = new Container();
  app.stage.addChild(nextScene);
  nextScene.visible = false;

  // Create the gameOverScene group
  gameOverScene = new Container();
  app.stage.addChild(gameOverScene);
  gameOverScene.visible = false;

  // Create an optional alias called `id` for all the texture atlas 
  //frame id textures.
  id = resources["images/hunt1.json"].textures; 

  // Create dungeon
  dungeon = new Sprite(id["dungeon.png"]);
  gameScene.addChild(dungeon);
  
  // Create treasure
  treasure = new Sprite(id["treasure.png"]);
  treasure.x = gameScene.width - treasure.width - 48;
  treasure.y = gameScene.height / 2 - treasure.height / 2;
  gameScene.addChild(treasure);

  // Create door
  door = new Sprite(id["door.png"]);
  door.position.set(32, 0);
  gameScene.addChild(door);

  // Create elixir
  elixir = new Sprite(id["images.png"]);
  elixir.position.set(80,450)
  gameScene.addChild(elixir);

  // Create explorer
  explorer = new Sprite(id["explorer.png"]);
  explorer.x = 68;
  explorer.vx = 37;
  explorer.y = app.stage.height / 2 - explorer.height / 2;
  explorer.vy = 0;
  gameScene.addChild(explorer);

  // Create blobs
  let numberOfBlobs = 6,
    spacing = 48, // Set blob space
    xOffset = 150; // Set offset for blob 
    speed = 2, 
    direction = 1;
    // Create array of blobs
    blobs = [];
      
  // Create blobs in amount of numberOfBlobs
  for (let i = 0; i < numberOfBlobs; i++) {
    //Make a one blob
    let blob = new Sprite(id["blob.png"]);
    //Space each blob horizontally according to the `spacing` value. `xOffset` determines the point from the left of the screen at which the first blob should be added.
    let x = spacing * i + xOffset;
    //Give the blob a random y position
    let y = randomInt(0, app.stage.height - blob.height);
    //Set the blob's position
    blob.x = x;
    blob.y = y;

    // Multiply `direction` by `speed` to determine the blob's vertical direction
    blob.vy = speed * direction;

    // Reverse the direction for the next blob
    direction *= -1;

    // Add blob to all the blobs
    blobs.push(blob);

    // Add the blob sprite to the gamescene
    gameScene.addChild(blob);

  }

  // Keybord movements for explorer
  //Capture the keyboard arrow keys
  let left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight"),
    down = keyboard("ArrowDown");

  //Left
  left.press = () => {
    //Change the explorer's velocity when key is pressed
    explorer.vx += -10;
  };
  //Up
  up.press = () => {
    explorer.vy += -10;
  };
  //Right
  right.press = () => {
    explorer.vx += 10;
  };
  //Down
  down.press = () => {
    explorer.vy += 10;
  };

  // Create the health bar
  healthBar = new PIXI.Container();
  healthBar.position.set(app.stage.width - 170, 4)
  gameScene.addChild(healthBar);

  // Create the black background rectangle
  let innerBar = new PIXI.Graphics();
  innerBar.beginFill(0x000000);
  innerBar.drawRect(0, 0, 128, 8);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  // Create the front red rectangle
  let outerBar = new PIXI.Graphics();
  outerBar.beginFill(0xFF3300);
  outerBar.drawRect(0, 0, 128, 8);
  outerBar.endFill();
  healthBar.addChild(outerBar);
  healthBar.outer = outerBar;
  healthBar.outer.width = 30;

  // Set style for message
  let style = new PIXI.TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: "white"
  });
  
  // Create end message
  message = new PIXI.Text("The End!", style);
  message.x = 120;
  message.y = app.stage.height / 2 - 32;
  gameOverScene.addChild(message);

  // Set the game state
  state = play;

  // Start the game loop 
  app.ticker.add(delta => gameLoop(delta));

} 

function gameLoop(delta){
  // Update current game state
  state(delta);
}

function play() {

  // Move explorer by changing velocity
  explorer.x = explorer.vx;
  explorer.y = explorer.vy;

  // Set container
  contain(explorer, {x: 28, y: 10, width: 488, height: 480});

  blobs.forEach(function(blob) {

    //Move the blob
    blob.y += blob.vy;
  
    //Check the blob's screen boundaries
    let blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 480});
  
    //If the blob hits the top or bottom of the stage, reverse direction
    if (blobHitsWall === "top" || blobHitsWall === "bottom") {
      blob.vy *= -1;
    }
  
    //Test for a collision. If any of the enemies are touching the explorer, set `explorerHit` to `true`
    if(hitTestRectangle(explorer, blob)) {
      explorerHit = true;
    }
  });

  if(hitTestRectangle(explorer, blobs)) {
    explorerHit = true;
  }

  if(hitTestRectangle(explorer, elixir)) {
    explorerHit1 = true;
  }

  if (explorerHit1) {
    explorer.scale.x = 1.5;
    explorer.scale.y = 1.5;

    gameScene.removeChild(elixir);
    
  }

  if(explorerHit) {

    // Make the explorer semi-transparent
    explorer.alpha = 0.5;
  
    // Reduce the width of the health bar's inner rectangle
    healthBar.outer.width -= 0.05;
  
  } else {
  
    // Set the explorer fully opaque (non-transparent) if it hasn't been hit
    explorer.alpha = 1;

  }

  if (hitTestRectangle(explorer, treasure)) {
    treasure.x = explorer.x + 8;
    treasure.y = explorer.y + 8;
  }

  if (hitTestRectangle(treasure, door)) {
    state = end;
    message.text = "you won!";
  }

  if (healthBar.outer.width < 0) {
    state = end;
    message.text = "you lost!";
  }

}

function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
}

//The game's helper functions:
//`keyboard`, `hitTestRectangle`, `contain` and `randomInt`