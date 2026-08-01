let scene;

let diamonds = [];

let diamondCount = 0;


function createWorld(gameScene) {

    scene = gameScene;


    // Lights

    const light = new THREE.DirectionalLight(
        0xffffff,
        1
    );

    light.position.set(
        20,
        40,
        20
    );

    scene.add(light);



    const ambient = new THREE.AmbientLight(
        0xffffff,
        0.5
    );

    scene.add(ambient);





    // Ground

    for (let x = -30; x <= 30; x++) {

        for (let z = -30; z <= 30; z++) {


            createBlock(
                x,
                -1,
                z,
                0x55aa33
            );


            createBlock(
                x,
                -2,
                z,
                0x8b5a2b
            );


            createBlock(
                x,
                -3,
                z,
                0x777777
            );


        }

    }






    // Trees

    createTree(-10,0,-8);

    createTree(5,0,-12);

    createTree(12,0,8);







    // Diamonds

    createDiamond(0,1,-5);

    createDiamond(8,1,4);

    createDiamond(-8,1,10);

    createDiamond(15,1,-3);

    createDiamond(-15,1,-5);

    createDiamond(5,1,15);

    createDiamond(-12,1,15);

    createDiamond(18,1,10);

    createDiamond(-18,1,5);

    createDiamond(0,1,20);



}






function createBlock(x,y,z,color){


    const geometry =
        new THREE.BoxGeometry(
            1,
            1,
            1
        );


    const material =
        new THREE.MeshLambertMaterial({
            color: color
        });



    const block =
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



    // trunk

    for(let i=0;i<3;i++){


        createBlock(
            x,
            y+i,
            z,
            0x8b5a2b
        );


    }





    // leaves

    for(let a=-1;a<=1;a++){

        for(let b=-1;b<=1;b++){


            createBlock(
                x+a,
                y+3,
                z+b,
                0x228B22
            );


        }

    }



}





function createDiamond(x,y,z){


    const geometry =
        new THREE.OctahedronGeometry(
            0.4
        );


    const material =
        new THREE.MeshLambertMaterial({

            color:0x00ffff

        });



    const diamond =
        new THREE.Mesh(
            geometry,
            material
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







function mineDiamond(diamond){


    scene.remove(diamond);


    diamonds =
        diamonds.filter(
            d=>d!==diamond
        );



    diamondCount++;


    updateDiamonds(
        diamondCount
    );



    if(diamondCount >= 10){

        finishMining();

    }


}







function finishMining(){


    showAchievement(
        "Diamond Hunter",
        "All diamonds collected!"
    );


    openFinalReward();


}
