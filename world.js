let scene;

let textureLoader = new THREE.TextureLoader();

let textures = {};

let diamonds = [];

let terrain = {};



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
        textureLoader.load("textures/wood1.png");

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



    generateTerrain();


    generateTrees();


    generateDiamonds();

}






function generateTerrain(){


    for(let x = -25; x <= 25; x++){


        for(let z = -25; z <= 25; z++){



            let height =
                Math.floor(
                    Math.sin(x * 0.15) * 3 +
                    Math.cos(z * 0.15) * 3
                );



            terrain[`${x},${z}`] = height;



            createGrassBlock(
                x,
                height,
                z
            );



            createBlock(
                x,
                height - 1,
                z,
                textures.dirt
            );



            for(
                let y = height - 2;
                y >= height - 8;
                y--
            ){

                createBlock(
                    x,
                    y,
                    z,
                    textures.stone
                );

            }


        }

    }


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




function generateTrees(){

    for(let x = -20; x <= 20; x += 5){

        for(let z = -20; z <= 20; z += 5){


            if(Math.random() > 0.65){

                let height =
                    terrain[`${x},${z}`];


                if(height !== undefined){

                    createTree(
                        x,
                        height + 1,
                        z
                    );

                }

            }

        }

    }

}






function createTree(x,y,z){


    // trunk

    let trunkHeight =
        4 + Math.floor(Math.random()*2);



    for(let i = 0; i < trunkHeight; i++){

        createBlock(
            x,
            y+i,
            z,
            textures.wood
        );

    }



    // layered leaves

    let layers = [

        {level:5, size:1},

        {level:4, size:2},

        {level:3, size:3},

        {level:2, size:2}

    ];



    layers.forEach(layer => {


        for(
            let a = -layer.size;
            a <= layer.size;
            a++
        ){

            for(
                let b = -layer.size;
                b <= layer.size;
                b++
            ){


                if(
                    Math.random() > 0.15
                ){

                    createBlock(

                        x+a,

                        y+layer.level,

                        z+b,

                        textures.leaves

                    );

                }

            }

        }


    });


}








function generateDiamonds(){


    for(let i = 0; i < 12; i++){


        let x =
            Math.floor(
                Math.random()*35
            ) - 17;


        let z =
            Math.floor(
                Math.random()*35
            ) - 17;



        let ground =
            terrain[`${x},${z}`];



        if(ground !== undefined){


            let y =
                ground - 
                (3 + Math.floor(Math.random()*4));



            createDiamond(
                x,
                y,
                z
            );


        }


    }

}








function createDiamond(x,y,z){


    let diamond =
    new THREE.Mesh(


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
