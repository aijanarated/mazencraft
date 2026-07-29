let scene, camera, renderer;


function createBlock(x, y, z, color, size=1){

    let block = new THREE.Mesh(
        new THREE.BoxGeometry(size,size,size),
        new THREE.MeshLambertMaterial({
            color: color
        })
    );

    block.position.set(x,y,z);
    scene.add(block);

    return block;
}


function createTree(x,z){

    // trunk
    for(let y=0;y<3;y++){
        createBlock(
            x,
            y,
            z,
            0x7a4b22
        );
    }


    // leaves
    for(let a=-1;a<=1;a++){
        for(let b=-1;b<=1;b++){

            createBlock(
                x+a,
                3,
                z+b,
                0x2f8f3a
            );

        }
    }

    createBlock(
        x,
        4,
        z,
        0x2f8f3a
    );
}



function createWorld(){

scene = new THREE.Scene();


// sky
scene.background = new THREE.Color(
    0xffb36b
);


// camera
camera = new THREE.PerspectiveCamera(
70,
window.innerWidth/window.innerHeight,
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


// light

let sun = new THREE.DirectionalLight(
0xffe0aa,
2
);

sun.position.set(
10,
20,
5
);

scene.add(sun);


// ground blocks

for(let x=-10;x<=10;x++){

    for(let z=-10;z<=10;z++){

        createBlock(
            x,
            -1,
            z,
            0x4f8f32
        );

    }
}


// trees

createTree(-5,-4);
createTree(5,-5);
createTree(-7,3);
createTree(7,4);



camera.position.set(
0,
3,
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
