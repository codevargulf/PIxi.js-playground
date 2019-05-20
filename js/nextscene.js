// function init() {
//     // Create stage scene
//     stage = new PIXI.Container();
 
//     // Create scene render
//     renderer = PIXI.autoDetectRenderer(
//        512,
//        384,
//        {view: document.getElementById("game-canvas")}
//     );
 
//      // Define texture in far background
//     var farTexture = PIXI.Texture.fromImage("images/bg-far.png");	
//     far = new PIXI.extras.TilingSprite(farTexture, 512, 256);
//     far.position.x = 0;
//     far.position.y = 0;
//     far.tilePosition.x = 0;
//     far.tilePosition.y = 0;
//     stage.addChild(far);
 
 
//      // Define texture in mid background
//     var midTexture = PIXI.Texture.fromImage("images/bg-mid.png");
//     mid = new PIXI.extras.TilingSprite(midTexture, 512, 256);
//     mid.position.x = 0;
//     mid.position.y = 128;
//     mid.tilePosition.x = 0;
//     mid.tilePosition.y = 0;
//     stage.addChild(mid);
 
//     // Call update function
//     requestAnimationFrame(update);
//  }
 
//  function update() {
//     far.tilePosition.x -= 0.128;
//     mid.tilePosition.x -= 0.64;
    
//     renderer.render(stage);
 
//     requestAnimationFrame(update);
    
//  }
 
 