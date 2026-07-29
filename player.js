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
        2,
        5
    );


    document.addEventListener(
        "click",
        function(){
            controls.lock();
        }
    );

}
