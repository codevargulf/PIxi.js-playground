// let type = "WebGL"

// if(!PIXI.utils.isWebGLSupported()){
//     type = "canvas"
// }

// PIXI.utils.sayHello(type);

// Aliases
// let Application = PIXI.Application,
//     loader = PIXI.loader,
//     resources = PIXI.loader.resources,
//     Sprite = PIXI.Sprite;

// // Create a Pixi Application
// let app = new Application({ 
//     width: 256, 
//     height: 256,                       
//     antialias: true, 
//     transparent: false, 
//     resolution: 1
//   }
// );

// Create a Pixi Application
// let app = new PIXI.Application({ 
//     width: 256,         // default: 800
//     height: 256,        // default: 600
//     antialias: true,    // default: false, soften edges of fonts and graphic primitives (WebGL anti-aliasing isn’t available on all platforms -> test on your game’s target platform)
//     transparent: false, // default: false, Set the canvas background transparent
//     resolution: 1,       // default: 1, To work with displays of varying resolutions and pixel densities
//     // forceCanvas: true,  //  default: WebGL, Force the Canvas Drawing API rendering
// });

// // Add the canvas that Pixi automatically created for you to the HTML document
// document.body.appendChild(app.view);

// app.renderer.backgroundColor = 0x061639; // default: black

// app.renderer.autoDensity = true; 
// app.renderer.resize(512, 512);

// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
// app.renderer.autoDensity = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);

// // fit to window on resize
// window.addEventListener("resize", function(event){ 
//     scaleToWindow(app.renderer.view);
// });


//load an image and run the `setup` function when it's done
// loader
//   .add("image/animals.png")
//   .load()

// //This `setup` function will run when the image has loaded
// function setup() {

//   //Create the cat sprite
//   let sprite = new Sprite(resources["image/animal.png"].texture);

  //Change the sprite's position
//   cat.position.set(96, 96);

//   //Change the sprite's size
//   cat.width = 80;
//   cat.height = 120;

//   // Set scale
//   cat.scale.set(0.5, 0.5);

//   // Set rotation
//   cat.rotation = 0.5;

//   // Change rotation anchor
//   cat.anchor.set(0.5,0,5);

//   // Set origin point in px
// //   cat.pivot.set(32, 32)

//   //Add the cat to the stage
//   app.stage.addChild(cat);

// }

// function setup() {

//     //Create the `tileset` sprite from the texture
//     let texture = new Sprite(resources["image/animals.png"].texture);
  
//     //Create a rectangle object that defines the position and
//     //size of the sub-image you want to extract from the texture
//     //(`Rectangle` is an alias for `PIXI.Rectangle`)
//     let rectangle = new PIXI.Rectangle(192, 128, 64, 64);
  
//     //Tell the texture to use that rectangular section
//     texture.frame = rectangle;
  
//     //Create the sprite from the texture
//     let rocket = new Sprite(texture);
  
//     //Position the rocket sprite on the canvas
//     rocket.position.set(32,32);
  
//     //Add the rocket to the stage
//     app.stage.addChild(rocket);
    
//     //Render the stage   
//     app.renderer.render(app.stage);
//   }

// var mySpriteSheetImage  = PIXI.BaseTexture.fromImage("image/animals.png");

// var spriteTexture1 = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(0, 0, 78, 78));

// var spriteTexture2 = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(78, 0, 78, 78));

// var spriteTexture3 = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(0, 85, 78, 78));

// var mySprite = new PIXI.Sprite(spriteTexture1);
// mySprite.position.set(109,109);
// var mySprite2 = new PIXI.Sprite(spriteTexture2);
// mySprite.position.set(149,159);
// var mySprite3 = new PIXI.Sprite(spriteTexture3);
// mySprite3.position.set(209,209);

// app.stage.addChild(mySprite,mySprite2,mySprite3);
// let dungeon, explorer, treasure, id;

// loader
//   .add("image/treasurehunt.json")
//   .load(setup);

//Define variables that might be used in more 
//than one function

// var mySpriteSheetImage  = PIXI.BaseTexture.fromImage("image/animals.png");

// var spriteTexture1 = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(0, 0, 78, 78));

// var spriteTexture2 = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(78, 0, 78, 78));

// var spriteTexture3 = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(0, 85, 78, 78));


//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
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
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load a JSON file and run the `setup` function when it's done
loader
  .add("images/hunt.json")
  .load(setup);

//Define variables that might be used in more 
//than one function
let dungeon, explorer, treasure, door, id, blob, state;

function setup() {

  //There are 3 ways to make sprites from textures atlas frames

  //1. Access the `TextureCache` directly
  let dungeonTexture = TextureCache["dungeon.png"];
  dungeon = new Sprite(dungeonTexture);
  app.stage.addChild(dungeon);

  //2. Access the texture using throuhg the loader's `resources`:
  explorer = new Sprite(
    resources["images/hunt.json"].textures["explorer.png"]
  );
  explorer.x = 68;

  //Center the explorer vertically
  explorer.y = app.stage.height / 2 - explorer.height / 2;
  app.stage.addChild(explorer);

  let left = keyboard("ArrowLeft"),
      up = keyboard("ArrowUp"),
      right = keyboard("ArrowRight"),
      down = keyboard("ArrowDown");

  //Left arrow key `press` method
  left.press = () => {
    //Change the cat's velocity when the key is pressed
    explorer.vx = -5;
    explorer.vy = 0;
  };
  
  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  //Up
  up.press = () => {
    explorer.vy = -5;
    explorer.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  //Right
  right.press = () => {
    explorer.vx = 5;
    explorer.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  //Down
  down.press = () => {
    explorer.vy = 5;
    explorer.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };


  //3. Create an optional alias called `id` for all the texture atlas 
  //frame id textures.
  id = PIXI.loader.resources["images/hunt.json"].textures; 
  
  //Make the treasure box using the alias
  treasure = new Sprite(id["treasure.png"]);
  app.stage.addChild(treasure);

  //Position the treasure next to the right edge of the canvas
  treasure.x = app.stage.width - treasure.width - 48;
  treasure.y = app.stage.height / 2 - treasure.height / 2;
  app.stage.addChild(treasure);

  //Make the exit door
  door = new Sprite(id["door.png"]); 
  door.position.set(20, 0);
  app.stage.addChild(door);

  //Make the blobs
  let numberOfBlobs = 6,
    spacing = 48,
    xOffset = 150;
      
  //Make as many blobs as there are `numberOfBlobs`
  for (let i = 0; i < numberOfBlobs; i++) {
    //Make a blob
    let blob = new Sprite(id["blob.png"]);
    //Space each blob horizontally according to the `spacing` value.
    //`xOffset` determines the point from the left of the screen
    //at which the first blob should be added.
    let x = spacing * i + xOffset;
    //Give the blob a random y position
    //(`randomInt` is a custom function - see below)
    let y = randomInt(0, app.stage.height - blob.height);
    //Set the blob's position
    blob.x = x;
    blob.y = y;
    //Add the blob sprite to the stage
    app.stage.addChild(blob);

    
  //Set the game state
  state = play;

  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));

}


}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Start the loop
gameLoop(delta);

function gameLoop(delta){
  //Update the current game state:
  state(delta);
}

function play(delta) {

  //Move the cat 1 pixel to the right each frame
  explorer.x += explorer.vx;
  explorer.y += explorer.vy

}

function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  
  return key;
}



// let type = "WebGL"

// if(!PIXI.utils.isWebGLSupported()){
//     type = "canvas"
// }

// PIXI.utils.sayHello(type);

// Aliases
// let Application = PIXI.Application,
//     loader = PIXI.loader,
//     resources = PIXI.loader.resources,
//     Sprite = PIXI.Sprite;

// // Create a Pixi Application
// let app = new Application({ 
//     width: 256, 
//     height: 256,                       
//     antialias: true, 
//     transparent: false, 
//     resolution: 1
//   }
// );

// Create a Pixi Application
// let app = new PIXI.Application({ 
//     width: 256,         // default: 800
//     height: 256,        // default: 600
//     antialias: true,    // default: false, soften edges of fonts and graphic primitives (WebGL anti-aliasing isn’t available on all platforms -> test on your game’s target platform)
//     transparent: false, // default: false, Set the canvas background transparent
//     resolution: 1,       // default: 1, To work with displays of varying resolutions and pixel densities
//     // forceCanvas: true,  //  default: WebGL, Force the Canvas Drawing API rendering
// });

// // Add the canvas that Pixi automatically created for you to the HTML document
// document.body.appendChild(app.view);

// app.renderer.backgroundColor = 0x061639; // default: black

// app.renderer.autoDensity = true; 
// app.renderer.resize(512, 512);

// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
// app.renderer.autoDensity = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);

// // fit to window on resize
// window.addEventListener("resize", function(event){ 
//     scaleToWindow(app.renderer.view);
// });


//load an image and run the `setup` function when it's done
// loader
//   .add("image/animals.png")
//   .load()

// //This `setup` function will run when the image has loaded
// function setup() {

//   //Create the cat sprite
//   let sprite = new Sprite(resources["image/animal.png"].texture);

  //Change the sprite's position
//   cat.position.set(96, 96);

//   //Change the sprite's size
//   cat.width = 80;
//   cat.height = 120;

//   // Set scale
//   cat.scale.set(0.5, 0.5);

//   // Set rotation
//   cat.rotation = 0.5;

//   // Change rotation anchor
//   cat.anchor.set(0.5,0,5);

//   // Set origin point in px
// //   cat.pivot.set(32, 32)

//   //Add the cat to the stage
//   app.stage.addChild(cat);

// }

// function setup() {

//     //Create the `tileset` sprite from the texture
//     let texture = new Sprite(resources["image/animals.png"].texture);
  
//     //Create a rectangle object that defines the position and
//     //size of the sub-image you want to extract from the texture
//     //(`Rectangle` is an alias for `PIXI.Rectangle`)
//     let rectangle = new PIXI.Rectangle(192, 128, 64, 64);
  
//     //Tell the texture to use that rectangular section
//     texture.frame = rectangle;
  
//     //Create the sprite from the texture
//     let rocket = new Sprite(texture);
  
//     //Position the rocket sprite on the canvas
//     rocket.position.set(32,32);
  
//     //Add the rocket to the stage
//     app.stage.addChild(rocket);
    
//     //Render the stage   
//     app.renderer.render(app.stage);
//   }

// var mySpriteSheetImage  = PIXI.BaseTexture.fromImage("image/animals.png");

// var spriteTexture1 = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(0, 0, 78, 78));

// var spriteTexture2 = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(78, 0, 78, 78));

// var spriteTexture3 = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(0, 85, 78, 78));

// var mySprite = new PIXI.Sprite(spriteTexture1);
// mySprite.position.set(109,109);
// var mySprite2 = new PIXI.Sprite(spriteTexture2);
// mySprite.position.set(149,159);
// var mySprite3 = new PIXI.Sprite(spriteTexture3);
// mySprite3.position.set(209,209);

// app.stage.addChild(mySprite,mySprite2,mySprite3);
// let dungeon, explorer, treasure, id;

// loader
//   .add("image/treasurehunt.json")
//   .load(setup);

//Define variables that might be used in more 
//than one function

// var mySpriteSheetImage  = PIXI.BaseTexture.fromImage("image/animals.png");

// var spriteTexture1 = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(0, 0, 78, 78));

// var spriteTexture2 = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(78, 0, 78, 78));

// var spriteTexture3 = new PIXI.Texture(mySpriteSheetImage, new PIXI.Rectangle(0, 85, 78, 78));
