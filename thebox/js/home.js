 


function mobile(){
    document.getElementById("gambiarra").style.display = "block";
}

function desktop(){
    // Config variable
    const ww = window.innerWidth;
    const canvasHeight = 650;

    // App canvas configuration
    let app = new PIXI.Application();
    let sprites = {};

    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(ww, canvasHeight);
    document.body.appendChild(app.view);

    let loader = PIXI.loader
        .add([
            {name:'title', url:'images/the-box-title.png', onComplete: (image)=> {addToStage(image)}},
            {name:'titleMask', url:'images/the-box-title-map.png', onComplete: (image)=> {addToStage(image)}},
            {name:'box', url:'images/box.png', onComplete: (image)=> {addToStage(image,190)}},
            {name:'boxMask', url:'images/box-mapv2.png', onComplete: (image)=> {addToStage(image,190)}},
        ])
        .on('progress', () => {console.log("loadiando")})
        .on('complete', (loader, res) => {applyMasks(), bindEvents()}).load()

    function addToStage(image, adjustHeight = false){
        let sprite = new PIXI.Sprite.from(image.url);
        sprite.position.x = (ww - sprite.width) / 2;

        if (adjustHeight)
            sprite.position.y = adjustHeight;
        
        app.stage.addChild(sprite);
        sprites[image.name] = sprite;
    }
    
    function applyMasks(){
        displacementFilter = new PIXI.filters.DisplacementFilter(sprites.titleMask);
        boxFilter = new PIXI.filters.DisplacementFilter(sprites.boxMask);
        app.stage.filters = [displacementFilter, boxFilter];
    }

    function bindEvents(){
        window.onmousemove = function(e) {
            app.stage.filters.forEach(element => {
                element.scale.x = (window.innerWidth / 2 - e.clientX) /20;
                element.scale.y = (window.innerHeight / 2 - e.clientY) /20;
            });
        };

        let background = new Audio('audio/bgtest.mp3');
        document.addEventListener('click' , function(){
            background.play();
        });
    }
}

function iniciarXurume(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        mobile();
    } else {
        desktop();
    }
}

iniciarXurume();