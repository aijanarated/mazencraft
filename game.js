let scene;
let camera;
let renderer;


function createWorld(){

scene = new THREE.Scene();


// cinematic sky
scene.background = new THREE.Color(0xff8c66);


camera = new THREE.PerspectiveCamera(
70,
window.innerWidth / window.innerHeight,
0.1,
1000
);


renderer = new THREE.WebGLRenderer({
canvas: document.getElementById("world"),
antialias:true
});


renderer.setSize(
window.innerWidth,
window.innerHeight
);


// lighting

let light = new THREE.DirectionalLight(
0xffddaa,
2
);

light.position.set(5,10,5);

scene.add(light);



// terrain

let ground = new THREE.Mesh(

new THREE.BoxGeometry(
40,
2,
40
),

new THREE.MeshLambertMaterial({
color:0x355c2a
})

);


ground.position.y=-2;

scene.add(ground);



// mountains

for(let i=0;i<5;i++){

let mountain = new THREE.Mesh(

new THREE.ConeGeometry(
5,
12,
6
),

new THREE.MeshLambertMaterial({
color:0x303c35
})

);


mountain.position.set(
(i-2)*8,
3,
-15
);


scene.add(mountain);

}



camera.position.set(
0,
5,
12
);



animate();

}



function animate(){

requestAnimationFrame(animate);

renderer.render(
scene,
camera
);

}



createWorld();
