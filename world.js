function createBlock(x, y, z, color){

    const block = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshLambertMaterial({
            color: color
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

            createBlock(
                x,
                0,
                z,
                0x55aa33
            );


            createBlock(
                x,
                -1,
                z,
                0x8b5a2b
            );


            createBlock(
                x,
                -2,
                z,
                0x777777
            );

        }

    }


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
