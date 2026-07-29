let controls;

function createPlayer(){

    controls = new THREE.PointerLockControls(
        camera,
        document.body
    );

    scene.add(
        controls.getObject()
    );

    controls.getObject().position.set(
        0,
        3,
        10
    );


    document.addEventListener(
        "click",
        () => {
            controls.lock();
        }
    );

}
