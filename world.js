let scene;

let textureLoader = new THREE.TextureLoader();

let textures = {};

let blocks = {};

let diamonds = [];

const WORLD_SIZE = 70;


function loadTextures(){

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


    Object.values(textures).forEach(texture=>{
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
    });

}



function createWorld(gameScene){

    scene = gameScene;

    loadTextures();


    scene.add(
        new THREE.AmbientLight(
            0xffffff,
            0.8
        )
    );


    let sun = new THREE.DirectionalLight(
        0xffffff,
        1
    );

    sun.position.set(
        20,
        40,
        20
    );

    scene.add(sun);



    generateTerrain();

    generateTrees();

    generateCaves();

    generateDiamonds();

}





function getTerrainHeight(x,z){

    return Math.floor(

        Math.sin(x * 0.12) * 2 +

        Math.cos(z * 0.12) * 2 +

        Math.sin((x+z) * 0.05) * 3

    );

}





function generateTerrain(){


    for(
        let x = -WORLD_SIZE/2;
        x < WORLD_SIZE/2;
        x++
    ){

        for(
            let z = -WORLD_SIZE/2;
            z < WORLD_SIZE/2;
            z++
        ){


            let height =
                getTerrainHeight(x,z);


            addGrassBlock(
                x,
                height,
                z
            );


            addBlock(
                x,
                height-1,
                z,
                "dirt"
            );



            for(
                let y = height-2;
                y >= height-10;
                y--
            ){

                addBlock(
                    x,
                    y,
                    z,
                    "stone"
                );

            }

        }

    }

}





function addGrassBlock(x,y,z){


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


    let block =
        new THREE.Mesh(

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


    blocks[
        ${x},${y},${z}
    ] = block;


    scene.add(block);

}





function addBlock(x,y,z,type){


    let block =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1,
                1,
                1
            ),

            new THREE.MeshLambertMaterial({

                map:textures[type]

            })

        );


    block.position.set(
        x,
        y,
        z
    );


    block.userData.type = type;


    blocks[
        ${x},${y},${z}
    ] = block;


    scene.add(block);

}





function generateTrees(){


    for(let x = -30; x <= 30; x += 4){

        for(let z = -30; z <= 30; z += 4){


            if(Math.random() > 0.75){


                let y =
                    getTerrainHeight(x,z);


                createTree(
                    x,
                    y + 1,
                    z
                );


            }

        }

    }

}







function createTree(x,y,z){


    let height =
        4 + Math.floor(Math.random()*2);



    // wood trunk

    for(let i = 0; i < height; i++){


        addBlock(
            x,
            y+i,
            z,
            "wood"
        );

    }



    // leaves

    let leafShapes = [

        {level:5, radius:1},

        {level:4, radius:2},

        {level:3, radius:2},

        {level:2, radius:1}

    ];



    leafShapes.forEach(shape=>{


        for(
            let a=-shape.radius;
            a<=shape.radius;
            a++
        ){


            for(
                let b=-shape.radius;
                b<=shape.radius;
                b++
            ){


                if(Math.random()>0.1){


                    let key =
                    ${x+a},${y+shape.level},${z+b};


                    if(!blocks[key]){


                        addBlock(

                            x+a,

                            y+shape.level,

                            z+b,

                            "leaves"

                        );

                    }

                }

            }

        }

    });


}








function generateCaves(){


    for(let i=0; i<50; i++){


        let x =
            Math.floor(Math.random()*60)-30;


        let z =
            Math.floor(Math.random()*60)-30;



        let y =
            getTerrainHeight(x,z)-5;



        carveCave(
            x,
            y,
            z
        );


    }

}







function carveCave(x,y,z){


    for(let a=-2; a<=2; a++){


        for(let b=-2; b<=2; b++){


            for(let c=-2; c<=2; c++){


                let key =
                ${x+a},${y+b},${z+c};



                if(blocks[key]){


                    scene.remove(
                        blocks[key]
                    );


                    delete blocks[key];


                }

            }

        }

    }

}





function generateDiamonds(){


    for(let i = 0; i < 25; i++){


        let x =
            Math.floor(
                Math.random() * 60
            ) - 30;


        let z =
            Math.floor(
                Math.random() * 60
            ) - 30;



        let y =
            getTerrainHeight(x,z)
            - (5 + Math.floor(Math.random()*5));



        createDiamond(
            x,
            y,
            z
        );


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



    diamonds.push(
        diamond
    );



    scene.add(
        diamond
    );


}
