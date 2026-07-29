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

        }

    }

}
