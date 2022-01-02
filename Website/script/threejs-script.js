var T_WIDTH = 600;
var T_HEIGHT = 450;

var container = document.getElementById('containerThreeJS');
container.style="border: 1px solid #000;width: "+T_WIDTH+"px; height:"+T_HEIGHT+"px;";

// criar uma cena...
var cena = new THREE.Scene();
cena.background = new THREE.Color( 0xffffff );

var clock = new THREE.Clock();
var misturador = new THREE.AnimationMixer(cena);

var carregador = new THREE.GLTFLoader();

/* Alguns Objetos */
var tampo, mesa;

//Luz
var luzPonto1 = new THREE.AmbientLight( 0x404040 );

/* Algumas Animações */
var abrirPorta1, abrirPorta2, abrirExtensao1_1, abrirExtensao1_2;

carregador.load(
 'resources/cena.gltf',
 function ( gltf ) {
    gltf.scene.traverse(function(x) {
        if (x instanceof THREE.Light) x.visible = false
        });
        
    cena.add( gltf.scene );

    luzPonto1.intensity = 8;
    cena.add( luzPonto1 );

    let clipe = THREE.AnimationClip.findByName( gltf.animations, 'abrirExtensao1_1' );
    abrirExtensao1_1 = misturador.clipAction( clipe );
    clipe = THREE.AnimationClip.findByName( gltf.animations, 'abrirExtensao1_2' );
    abrirExtensao1_2 = misturador.clipAction( clipe );
    clipe = THREE.AnimationClip.findByName( gltf.animations, 'abrirPorta1' );
    abrirPorta1 = misturador.clipAction( clipe );
    clipe = THREE.AnimationClip.findByName( gltf.animations, 'abrirPorta2' );
    abrirPorta2 = misturador.clipAction( clipe );

    abrirPorta1.setLoop(THREE.LoopOnce);
    abrirPorta2.setLoop(THREE.LoopOnce);
    abrirExtensao1_1.setLoop(THREE.LoopOnce);
    abrirExtensao1_2.setLoop(THREE.LoopOnce);
    abrirPorta1.clampWhenFinished = true;
    abrirPorta2.clampWhenFinished = true;
    abrirExtensao1_1.clampWhenFinished = true;
    abrirExtensao1_2.clampWhenFinished = true;

    cena.traverse( function (elemento) {
        if(elemento.isMesh){
            elemento.receiveShadow = true;
            elemento.castShadow = true;
        }
        if(elemento.name == 'stoneBench'){
            tampo = elemento;
        }else if(elemento.name == 'workBench'){
            mesa = elemento;
        }
    });

 }
);

var renderer = new THREE.WebGLRenderer( { canvas: container } );
renderer.shadowMap.enabled = true;
renderer.setSize( T_WIDTH, T_HEIGHT );

// criar uma camara...
var camara = new THREE.PerspectiveCamera( 70, T_WIDTH / T_HEIGHT, 0.01, 1000 );

camara.position.set(-6.49686528345465, 8.514624784432947, 10.319751867981491);
camara.lookAt(0,0,0);

// iniciar animação..

const controls = new THREE.OrbitControls( camara, renderer.domElement );
controls.update();


animar();
function animar() {
    requestAnimationFrame( animar );

    controls.update();

    misturador.update( clock.getDelta() );

    renderer.render( cena, camara );
}

function changeLightState(state){
    if(luzPonto1 == null)
        return;
    luzPonto1.visible = state;
}

function runAnimation(animation, scale){
    animation.timeScale = scale;

    if(animation.paused)
        animation.paused=false;

    if(!animation.isRunning())
        animation.play();
}

function openDoor(door){
    if(door==1)
        runAnimation(abrirPorta1, 1);
    else
        runAnimation(abrirPorta2, 1);
}

function closeDoor(door){
    if(door==1)
        runAnimation(abrirPorta1, -1);
    else
        runAnimation(abrirPorta2, -1);
}

function openExtension(){
    if(!(abrirExtensao1_2.isRunning() && !abrirExtensao1_2.paused) || abrirExtensao1_2.isRunning())
        runAnimation(abrirExtensao1_1, 1);
    runAnimation(abrirExtensao1_2, 1);
}

function closeExtension(){
    if(!(abrirExtensao1_1.isRunning() && !abrirExtensao1_1.paused) || abrirExtensao1_1.isRunning())
        runAnimation(abrirExtensao1_2, -1);
    runAnimation(abrirExtensao1_1, -1);
}


