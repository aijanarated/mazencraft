let scene;
let camera;
let renderer;


function start(){

scene = new THREE.Scene();

scene.background = new THREE.Color(0xff9966);


camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);


renderer = new THREE.WebGLRenderer({
canvas: document.getElementById("world")
});


renderer.setSize(
window.innerWidth,
window.innerHeight
);



let light = new THREE.AmbientLight(
0xffffff,
1
);

scene.add(light);



let ground = new THREE.Mesh(
new THREE.BoxGeometry(20,1,20),
new THREE.MeshBasicMaterial({
color:0x4caf50
})
);


ground.position.y = -1;

scene.add(ground);



camera.position.set(
0,
3,
8
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


start();
