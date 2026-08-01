let scene;

let diamonds = [];

let diamondCount = 0;



function createWorld(gameScene) {

    scene = gameScene;


    // Lighting

    const sun = new THREE.DirectionalLight(
        0xffffff,
        1.2
    );

    sun.position.set(
        20,
        30,
        10
    );

    scene.add(sun);



    scene.add(
        new THREE.AmbientLight(
            0xffffff,
            0.5
        )
    );




    // Terrain

    const size = 40;


    for(let x = -size; x <= size; x++){

        for(let z = -size; z <= size; z++){


            let height =
            Math.floor(
                Math.sin(x * 0.15) *
                Math.cos(z * 0.15) *
                2
            );


            createBlock(
                x,
                height,
                z,
                0x55aa33
            );


            createBlock(
                x,
                height - 1,
                z,
                0x8b5a2b
            );


            createBlock(
                x,
                height - 2,
                z,
                0x777777
            );


        }

    }




    // Trees

    createTree(-12,1,-10);

    createTree(8,1,-14);

    createTree(15,1,8);






    // Diamonds

    createDiamond(0,3,0);

    createDiamond(10,2,5);

    createDiamond(-10,2,8);

    createDiamond(15,3,-5);

    createDiamond(-15,3,-10);

    createDiamond(5,2,15);

    createDiamond(-5,3,18);

    createDiamond(20,2,0);

    createDiamond(-20,2,5);

    createDiamond(0,4,20);


}







function createBlock(x,y,z,color){


    let geometry =
    new THREE.BoxGeometry(
        1,
        1,
        1
    );


    let material =
    new THREE.MeshLambertMaterial({

        color:color

    });


    let block =
    new THREE.Mesh(
        geometry,
        material
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
            0x8b5a2b
        );


    }



    for(let a=-2;a<=2;a++){

        for(let b=-2;b<=2;b++){


            createBlock(
                x+a,
                y+4,
                z+b,
                0x228B22
            );


        }

    }


}








function createDiamond(x,y,z){


    let geo =
    new THREE.OctahedronGeometry(
        0.4
    );


    let mat =
    new THREE.MeshLambertMaterial({

        color:0x00ffff

    });



    let d =
    new THREE.Mesh(
        geo,
        mat
    );


    d.position.set(
        x,
        y,
        z
    );


    d.userData.isDiamond=true;


    diamonds.push(d);


    scene.add(d);


}
