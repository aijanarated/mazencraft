const textureLoader = new THREE.TextureLoader();

const grassTexture = textureLoader.load("textures/grass.png");
const dirtTexture = textureLoader.load("textures/dirt.png");
const stoneTexture = textureLoader.load("textures/stone.png");


function createBlock(x, y, z, texture){

    const block = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshLambertMaterial({
            map: texture
        })
    );

    block.position.set(
        x,
        y,
        z
    );

    scene.add(block);

}



function createWorld(){


    for(let x = -10; x <= 10; x++){

        for(let z = -10; z <= 10; z++){


            let height = 0;


            if(
                x > -3 && x < 3 &&
                z > -3 && z < 3
            ){

                height = 3;

            }



            for(let y = -2; y <= height; y++){


                if(y === height){

                    createBlock(
                        x,
                        y,
                        z,
                        grassTexture
                    );

                }
                else if(y >= -1){

                    createBlock(
                        x,
                        y,
                        z,
                        dirtTexture
                    );

                }
                else{

                    createBlock(
                        x,
                        y,
                        z,
                        stoneTexture
                    );

                }

            }

        }

    }


    createTree(-5,-5);
    createTree(5,3);
    createTree(0,-7);

}
