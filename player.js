let camera;
let player;

let keys = {};

let velocityY = 0;

let canJump = true;


function createPlayer(gameCamera){


    camera = gameCamera;


    player = {

        x:0,
        y:2,
        z:10,

        speed:0.12

    };


    camera.position.set(
        player.x,
        player.y,
        player.z
    );



}




// Keyboard


document.addEventListener(
    "keydown",
    (event)=>{

        keys[event.code]=true;


        if(
            event.code==="Space" &&
            canJump
        ){

            velocityY = 0.25;

            canJump=false;

        }


    }

);



document.addEventListener(
    "keyup",
    (event)=>{

        keys[event.code]=false;

    }

);






function updatePlayer(){



    if(!player)
        return;




    let moveX=0;

    let moveZ=0;



    if(keys["KeyW"])
        moveZ-=player.speed;


    if(keys["KeyS"])
        moveZ+=player.speed;



    if(keys["KeyA"])
        moveX-=player.speed;



    if(keys["KeyD"])
        moveX+=player.speed;





    player.x += moveX;

    player.z += moveZ;






    // gravity


    velocityY -=0.01;


    player.y += velocityY;



    if(player.y <=2){


        player.y=2;


        velocityY=0;


        canJump=true;


    }







    camera.position.set(

        player.x,

        player.y,

        player.z

    );



}







// Mouse look


let mouseX=0;
let mouseY=0;


document.addEventListener(
"mousemove",
(event)=>{


    mouseX -= event.movementX*0.002;


    mouseY -= event.movementY*0.002;



    mouseY=Math.max(
        -1.5,
        Math.min(
            1.5,
            mouseY
        )
    );



    if(camera){


        camera.rotation.y = mouseX;


        camera.rotation.x = mouseY;


    }


});
