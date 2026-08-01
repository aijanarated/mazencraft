let scene;

let textureLoader = new THREE.TextureLoader();

let textures = {};

let diamonds = [];


function loadTextures() {

    textures.grassTop =
        textureLoader.load("textures/grass_top.png");

    textures.grassSide =
        textureLoader.load("textures/grass_side.png");

    textures.dirt =
        textureLoader.load("textures/dirt.png");

    textures.stone =
        textureLoader.load("textures/stone.png");

    textures.wood =
        textureLoader.load("textures/wood.png");

    textures.leaves =
        textureLoader.load("textures/leaves.png");

    textures.diamond =
        textureLoader.load("textures/diamond.png");


    Object.values(textures).forEach(texture => {
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
    });

}



function createWorld(gameScene) {

    scene = gameScene;

    loadTextures();


    scene.add(
        new THREE.AmbientLight(
            0xffffff,
            0.7
        )
    );


    let sun = new THREE.DirectionalLight(
        0xffffff,
        1
    );

    sun.position.set(
        20,
        30,
        10
    );

    scene.add(sun);



    // Ground

    for(let x = -20; x <= 20; x++) {

        for(let z = -20; z <= 20; z++) {


            createGrassBlock(
                x,
                0,
                z
            );


            createBlock(
                x,
                -1,
                z,
                textures.dirt
            );


            for(let y = -2; y >= -8; y--) {

                createBlock(
                    x,
                    y,
                    z,
                    textures.stone
                );

            }

        }
    }



    // Trees

    createTree(-10,1,-8);

    createTree(10,1,-10);

    createTree(8,1,10);



    // Underground diamonds

    createDiamond(4,-5,6);

    createDiamond(-8,-6,2);

    createDiamond(12,-4,-7);

}






function createGrassBlock(x,y,z){


    let materials = [

        new THREE.MeshLambertMaterial({
            map:textures.grassSide
        }),

        new THREE.MeshLambertMaterial({
            map:textures.grassSide
        }),

        new THREE.MeshLambertMaterial({
            map:textures.grassTop
        }),

        new THREE.MeshLambertMaterial({
            map:textures.dirt
        }),

        new THREE.MeshLambertMaterial({
            map:textures.grassSide
        }),

        new THREE.MeshLambertMaterial({
            map:textures.grassSide
        })

    ];


    let block = new THREE.Mesh(

        new THREE.BoxGeometry(
            1,
            1,
            1
        ),

        materials

    );


    block.position.set(
        x,
        y,
        z
    );


    scene.add(block);

}







function createBlock(x,y,z,texture){


    let block = new THREE.Mesh(

        new THREE.BoxGeometry(
            1,
            1,
            1
        ),

        new THREE.MeshLambertMaterial({
            map:texture
        })

    );


    block.position.set(
        x,
        y,
        z
    );


    scene.add(block);

}







function createTree(x,y,z){


    for(let i=0;i<4;i++){

        createBlock(
            x,
            y+i,
            z,
            textures.wood
        );

    }


    for(let a=-2;a<=2;a++){

        for(let b=-2;b<=2;b++){

            createBlock(
                x+a,
                y+4,
                z+b,
                textures.leaves
            );

        }

    }

}







function createDiamond(x,y,z){


    let diamond = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.5,
            0.5,
            0.5
        ),

        new THREE.MeshLambertMaterial({
            map:textures.diamond
        })

    );


    diamond.position.set(
        x,
        y,
        z
    );


    diamond.userData.isDiamond = true;


    diamonds.push(diamond);

    scene.add(diamond);

}
