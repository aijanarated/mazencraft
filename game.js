const canvas = document.getElementById("game");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);


// camera

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(
    0,
    5,
    10
);


// renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


// light

const sunlight = new THREE.DirectionalLight(
    0xffffff,
    2
);

sunlight.position.set(
    10,
    20,
    10
);

scene.add(sunlight);


// test block

createWorld();

// animation

function animate(){

    requestAnimationFrame(animate);

    renderer.render(
        scene,
        camera
    );

}

animate();
