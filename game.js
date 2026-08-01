let gameScene;
let gameCamera;
let gameRenderer;

let gameStarted = false;


function startGame() {

    document.getElementById("mainMenu").classList.add("hidden");
    document.getElementById("passwordScreen").classList.add("hidden");
    document.getElementById("gameUI").classList.remove("hidden");

    createGame();

    createWorld(gameScene);

    createPlayer(gameCamera);

    gameStarted = true;

    animate();

}



function createGame() {

    gameScene = new THREE.Scene();

    gameScene.background = new THREE.Color(0x87ceeb);



    gameCamera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );


    gameCamera.position.set(
        0,
        2,
        10
    );



    gameRenderer = new THREE.WebGLRenderer();


    gameRenderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    document.body.appendChild(
        gameRenderer.domElement
    );


}



function animate() {

    requestAnimationFrame(
        animate
    );


    if(gameStarted){

        updatePlayer();

    }


    gameRenderer.render(
        gameScene,
        gameCamera
    );

}




window.addEventListener(
"DOMContentLoaded",
()=>{


const playBtn =
document.getElementById("playBtn");


const passwordBtn =
document.getElementById("passwordBtn");



playBtn.onclick = ()=>{


    document.getElementById("mainMenu")
    .classList.add("hidden");


    document.getElementById("passwordScreen")
    .classList.remove("hidden");


};




passwordBtn.onclick = ()=>{


    let password =
    document.getElementById("passwordInput").value;



    if(password === "1611"){

        startGame();

    }
    else{

        document.getElementById("passwordError")
        .innerText =
        "Wrong password!";

    }


};


});
