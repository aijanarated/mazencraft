let scene;
let camera;
let renderer;


function createBlock(x,y,z,color){

    let block = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshLambertMaterial({
            color: color
        })
    );

    block.position.set(x,y,z);

    scene.add(block);
}



function createWorld(){

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x87ceeb);


    camera = new THREE.PerspectiveCamera(
        70,
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


    let light = new THREE.DirectionalLight(
        0xffffff,
        2
    );

    light.position.set(
        10,
        20,
        10
    );

    scene.add(light);


    // ground

    for(let x=-10;x<=10;x++){

        for(let z=-10;z<=10;z++){

            createBlock(
                x,
                0,
                z,
                0x55aa33
            );

        }

    }


    // trees

    createTree(-4,-4);
    createTree(5,-5);



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


    animate();

}



function createTree(x,z){

    for(let y=1;y<=4;y++){

        createBlock(
            x,
            y,
            z,
            0x7a4a22
        );

    }


    for(let a=-1;a<=1;a++){

        for(let b=-1;b<=1;b++){

            createBlock(
                x+a,
                5,
                z+b,
                0x2f8f3a
            );

        }

    }

}



function animate(){

    requestAnimationFrame(animate);

    renderer.render(
        scene,
        camera
    );

}



createWorld();
