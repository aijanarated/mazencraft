function createBlock(x, y, z, color){

    const block = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshLambertMaterial({
            color: color
        })
    );

    block.position.set(x,y,z);

    scene.add(block);

}



function getHeight(x,z){

    if(
        x > -3 && x < 3 &&
        z > -3 && z < 3
    ){

        return 3;

    }

    return 0;

}



function createWorld(){


    for(let x = -10; x <= 10; x++){

        for(let z = -10; z <= 10; z++){


            let height = getHeight(x,z);


            let isWater =
                x > 6 &&
                x < 10 &&
                z > -3 &&
                z < 3;



            if(isWater){

                createBlock(
                    x,
                    0,
                    z,
                    0x3399ff
                );

                continue;

            }



            for(let y = -2; y <= height; y++){


                if(y === height){

                    createBlock(
                        x,
                        y,
                        z,
                        0x55aa33
                    );

                }
                else if(y >= -1){

                    createBlock(
                        x,
                        y,
                        z,
                        0x8b5a2b
                    );

                }
                else{

                    createBlock(
                        x,
                        y,
                        z,
                        0x777777
                    );

                }

            }

        }

    }



    // curved adventure path

    let path = [

        [-5,-8],
        [-4,-7],
        [-3,-6],
        [-2,-5],
        [-1,-4],
        [0,-3],
        [2,-2],
        [4,-2],
        [5,-1],
        [6,0]

    ];



    path.forEach(point => {

        let x = point[0];
        let z = point[1];

        createBlock(
            x,
            getHeight(x,z)+1,
            z,
            0xc2b280
        );

    });



    createTree(-5,-5);
    createTree(5,3);
    createTree(0,-7);

}



function createTree(x,z){

    for(let y = 1; y <= 3; y++){

        createBlock(
            x,
            y,
            z,
            0x8b5a2b
        );

    }



    for(let y = 3; y <= 5; y++){

        for(let a = -1; a <= 1; a++){

            for(let b = -1; b <= 1; b++){

                createBlock(
                    x+a,
                    y,
                    z+b,
                    0x2f8f3a
                );

            }

        }

    }

}
