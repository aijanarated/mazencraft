let camera;

let player = {
    x: 0,
    y: 2,
    z: 10,
    speed: 0.15
};


let keys = {};

let pitch = 0;
let yaw = 0;

let velocityY = 0;

let onGround = true;



function createPlayer(gameCamera){

    camera = gameCamera;

    camera.position.set(
        player.x,
        player.y,
        player.z
    );

}





document.addEventListener(
"keydown",
(e)=>{

    keys[e.code] = true;

});


document.addEventListener(
"keyup",
(e)=>{

    keys[e.code] = false;

});





document.addEventListener(
"mousemove",
(e)=>{


    if(!camera)
        return;



    yaw -= e.movementX * 0.002;

    pitch -= e.movementY * 0.002;



    // stop flipping upside down

    pitch = Math.max(
        -1.4,
        Math.min(
            1.4,
            pitch
        )
    );


    camera.rotation.order = "YXZ";

    camera.rotation.y = yaw;

    camera.rotation.x = pitch;



});







document.addEventListener(
"keydown",
(e)=>{


    if(
        e.code === "Space" &&
        onGround
    ){

        velocityY = 0.25;

        onGround = false;

    }


});







function updatePlayer(){


    if(!camera)
        return;



    let direction = new THREE.Vector3();


    camera.getWorldDirection(direction);


    direction.y = 0;


    direction.normalize();



    let right = new THREE.Vector3();


    right.crossVectors(
        direction,
        camera.up
    );



    if(keys["KeyW"]){

        player.x += direction.x * player.speed;

        player.z += direction.z * player.speed;

    }



    if(keys["KeyS"]){

        player.x -= direction.x * player.speed;

        player.z -= direction.z * player.speed;

    }



    if(keys["KeyA"]){

        player.x -= right.x * player.speed;

        player.z -= right.z * player.speed;

    }



    if(keys["KeyD"]){

        player.x += right.x * player.speed;

        player.z += right.z * player.speed;

    }





    // Gravity

    velocityY -= 0.01;


    player.y += velocityY;



    if(player.y <= 2){


        player.y = 2;

        velocityY = 0;

        onGround = true;


    }





    camera.position.set(

        player.x,

        player.y,

        player.z

    );

}
