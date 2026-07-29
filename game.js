let scene;
let camera;
let renderer;
let controls;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let blocks = [];


function createBlock(x,y,z,texture){

    let material = new THREE.MeshLambertMaterial({
        color: texture
    });


    let cube = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        material
    );


    cube.position.set(
        x,
        y,
        z
    );


    scene.add(cube);

    blocks.push(cube);

}



// create minecraft-style terrain

function createTerrain(){

    for(let x=-12;x<=12;x++){

        for(let z=-12;z<=12;z++){

            let height =
            Math.floor(
                Math.sin(x*0.5) +
                Math.cos(z*0.5) +
                2
            );


            for(let y=0;y<=height;y++){

                createBlock(
                    x,
                    y,
                    z,
                    y===height
                    ? 0x55aa33
                    : 0x8b5a2b
                );

            }

        }

    }

}


// trees

function createTree(x,z){

    // trunk
    for(let y=0;y<4;y++){

        createBlock(
            x,
            y,
            z,
            0x7a4a22
        );

    }


    // lower leaves
    for(let a=-2;a<=2;a++){

        for(let b=-2;b<=2;b++){

            if(
                Math.abs(a)+Math.abs(b)<4
            ){

                createBlock(
                    x+a,
                    4,
                    z+b,
                    0x2f8f3a
                );

            }

        }

    }


    // upper leaves
    for(let a=-1;a<=1;a++){

        for(let b=-1;b<=1;b++){

            createBlock(
                x+a,
                5,
                z+b,
                0x3aa34a
            );

        }

    }


    // top leaf

    createBlock(
        x,
        6,
        z,
        0x3aa34a
    );

}


    // leaves

    for(let a=-1;a<=1;a++){

        for(let b=-1;b<=1;b++){

            createBlock(
                x+a,
                7,
                z+b,
                0x2f8f3a
            );

        }

    }


}



function createWorld(){


scene = new THREE.Scene();


// Minecraft-like sky

scene.background =
new THREE.Color(
0x87ceeb
);



camera =
new THREE.PerspectiveCamera(
70,
window.innerWidth/window.innerHeight,
0.1,
1000
);



camera.position.set(
0,
6,
12
);

camera.lookAt(
0,
0,
0
);


renderer =
new THREE.WebGLRenderer({
canvas:
document.getElementById("world")
});


renderer.setSize(
window.innerWidth,
window.innerHeight
);



// light

let sun =
new THREE.DirectionalLight(
0xffffff,
2
);

sun.position.set(
10,
20,
10
);

scene.add(sun);



createTerrain();

createTree(-5,-3);
createTree(5,-5);
createTree(0,4);



camera.position.set(
0,
6,
12
);

camera.lookAt(
0,
0,
0
);


document.addEventListener(
"keydown",
function(event){

if(event.code==="KeyW")
moveForward=true;

if(event.code==="KeyS")
moveBackward=true;

if(event.code==="KeyA")
moveLeft=true;

if(event.code==="KeyD")
moveRight=true;

});


document.addEventListener(
"keyup",
function(event){

if(event.code==="KeyW")
moveForward=false;

if(event.code==="KeyS")
moveBackward=false;

if(event.code==="KeyA")
moveLeft=false;

if(event.code==="KeyD")
moveRight=false;

});
animate();

}



function animate(){

requestAnimationFrame(animate);


let speed = 0.15;


if(controls){

    if(moveForward)
        controls.moveForward(speed);

    if(moveBackward)
        controls.moveForward(-speed);

    if(moveLeft)
        controls.moveRight(-speed);

    if(moveRight)
        controls.moveRight(speed);

}


renderer.render(
scene,
camera
);

}


createWorld();
