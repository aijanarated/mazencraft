let scene;
let camera;
let renderer;

let gameStarted = false;



function startGame(){


    document.getElementById("mainMenu")
        .classList.add("hidden");


    document.getElementById("passwordScreen")
        .classList.add("hidden");


    document.getElementById("gameUI")
        .classList.remove("hidden");



    createScene();


    createWorld(scene);


    createPlayer(camera);


    animate();


}






function createScene(){


    scene = new THREE.Scene();



    scene.background =
        new THREE.Color(
            0x87ceeb
        );



    camera =
        new THREE.PerspectiveCamera(

            75,

            window.innerWidth /
            window.innerHeight,

            0.1,

            1000

        );





    renderer =
        new THREE.WebGLRenderer();



    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );



    document.body.appendChild(
        renderer.domElement
    );



}






function animate(){


    requestAnimationFrame(
        animate
    );


    if(gameStarted){

        updatePlayer();

    }


    renderer.render(
        scene,
        camera
    );


}








window.addEventListener(
"DOMContentLoaded",
()=>{


const playButton =
document.getElementById(
    "playBtn"
);



const passwordScreen =
document.getElementById(
    "passwordScreen"
);



playButton.onclick = ()=>{


    document.getElementById(
        "mainMenu"
    )
    .classList.add("hidden");


    passwordScreen
    .classList.remove("hidden");


};





document.getElementById(
"passwordBtn"
)
.onclick = ()=>{


    const input =
    document.getElementById(
        "passwordInput"
    ).value;



    if(input === "1611"){


        gameStarted = true;


        startGame();


    }

    else{


        document.getElementById(
            "passwordError"
        ).innerText =
        "Wrong password!";


    }



};



});
