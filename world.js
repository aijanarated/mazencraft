
let scene;

let textureLoader = new THREE.TextureLoader();

let textures = {};

let blocks = {};

let diamonds = [];

let terrain = {};

const WORLD_SIZE = 100;



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
            0.7
        )
    );


    let sun =
        new THREE.DirectionalLight(
            0xffffff,
            1
        );


    sun.position.set(
        30,
        50,
        20
    );


    scene.add(sun);



    generateTerrain();


    generateTrees();


    generateCaves();


    generateDiamonds();

}







function getHeight(x,z){

    let height =

        Math.sin(x * 0.08) * 5 +

        Math.cos(z * 0.08) * 5 +

        Math.sin((x+z) * 0.04) * 3;


    return Math.floor(height);

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
                getHeight(x,z);


            terrain[`${x},${z}`] = height;



            addGrass(
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
                y >= height-12;
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







function addGrass(x,y,z){


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


    blocks[`${x},${y},${z}`] = block;


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


    blocks[`${x},${y},${z}`] = block;


    scene.add(block);

}








function generateTrees(){


    for(let x = -45; x < 45; x += 3){

        for(let z = -45; z < 45; z += 3){


            if(Math.random() > 0.82){


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


    let trunkHeight =
        4 + Math.floor(Math.random()*3);



    for(let i=0; i<trunkHeight; i++){


        addBlock(
            x,
            y+i,
            z,
            "wood"
        );

    }



    let leafLayers = [

        {y:5,r:1},

        {y:4,r:2},

        {y:3,r:3},

        {y:2,r:2}

    ];



    leafLayers.forEach(layer=>{


        for(let a=-layer.r; a<=layer.r; a++){


            for(let b=-layer.r; b<=layer.r; b++){


                if(Math.random()>0.15){


                    let key =
                    ${x+a},${y+layer.y},${z+b};


                    if(!blocks[key]){


                        addBlock(

                            x+a,

                            y+layer.y,

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


    for(let i=0; i<60; i++){


        let x =
            Math.floor(
                Math.random()*80
            )-40;


        let z =
            Math.floor(
                Math.random()*80
            )-40;



        let height =
            terrain[`${x},${z}`];



        if(height !== undefined){


            let y =
                height -
                (5 + Math.floor(Math.random()*6));



            carveCave(
                x,
                y,
                z
            );

        }


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


    for(let i=0; i<30; i++){


        let x =
            Math.floor(
                Math.random()*80
            )-40;


        let z =
            Math.floor(
                Math.random()*80
            )-40;



        let height =
            terrain[`${x},${z}`];



        if(height !== undefined){
