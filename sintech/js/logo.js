// App canvas configuration
let app = new PIXI.Application();
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, 650);
document.body.appendChild(app.view);

// the box title
let title = new PIXI.Sprite.from("images/the-box-title.png");
title.anchor.x = 0;
title.anchor.y = 0;
title.position.x = (window.innerWidth - 587) / 2;
app.stage.addChild(title);

// title mask
let titleMask = new PIXI.Sprite.from("images/the-box-title-map.png");
titleMask.position.x = (window.innerWidth - 587) / 2;
app.stage.addChild(titleMask);

//box image
let box = new PIXI.Sprite.from("images/box.png");
box.position.x = (window.innerWidth - 506) / 2;
box.position.y = 190;
app.stage.addChild(box);

// box image mask
let boxMask = new PIXI.Sprite.from("images/box-mapv2.png");
boxMask.position.x = (window.innerWidth - 506) / 2;
boxMask.position.y = 190;
app.stage.addChild(boxMask);



// masks
displacementFilter = new PIXI.filters.DisplacementFilter(titleMask);
boxFilter = new PIXI.filters.DisplacementFilter(boxMask);
app.stage.filters = [displacementFilter, boxFilter];

window.onmousemove = function(e) {
    displacementFilter.scale.x = (window.innerWidth / 2 - e.clientX) /20;
    displacementFilter.scale.y = (window.innerHeight / 2 - e.clientY) /20;

    boxFilter.scale.x = (window.innerWidth / 2 - e.clientX) /20;
    boxFilter.scale.y = (window.innerHeight / 2 - e.clientY) /20;
};