let controls;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;


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
        function(){
            controls.lock();
        }
    );


    document.addEventListener(
        "keydown",
        function(event){

            if(event.code === "KeyW")
                moveForward = true;

            if(event.code === "KeyS")
                moveBackward = true;

            if(event.code === "KeyA")
                moveLeft = true;

            if(event.code === "KeyD")
                moveRight = true;

        }
    );


    document.addEventListener(
        "keyup",
        function(event){

            if(event.code === "KeyW")
                moveForward = false;

            if(event.code === "KeyS")
                moveBackward = false;

            if(event.code === "KeyA")
                moveLeft = false;

            if(event.code === "KeyD")
                moveRight = false;

        }
    );

}
