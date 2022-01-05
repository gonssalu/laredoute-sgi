var T_WIDTH = 600;
var T_HEIGHT = 450;

var container = document.getElementById('containerThreeJS');
container.style="width: "+T_WIDTH+"px; height:"+T_HEIGHT+"px;";

// criar uma cena...
var cena = new THREE.Scene();

//cena.background = new THREE.Color( 0xffffff );

var clock = new THREE.Clock();
var misturador = new THREE.AnimationMixer(cena);

var carregador = new THREE.GLTFLoader();

/* Alguns Objetos */
var tampo, mesa;

var matWoodA, matWood2, matMarb;

// immediately use the texture for material creation

matWoodA = (new THREE.TextureLoader()).load('resources/wood.png');
matWood2 = (new THREE.TextureLoader()).load('resources/wood2.jpg');
matMarb = (new THREE.TextureLoader()).load('resources/marble.jpg');

//Luz
var corLuz = 0xf0f0f0;
var luzAmbiente = new THREE.AmbientLight( 0x404040 );
var luzPonto1 = new THREE.PointLight( corLuz );
var luzPonto2 = new THREE.PointLight( corLuz );
var luzPonto3 = new THREE.PointLight( corLuz );
var luzPonto4 = new THREE.PointLight( corLuz );
var luzPonto5 = new THREE.PointLight( corLuz );
var luzPonto6 = new THREE.PointLight( corLuz );

var luzesPontos = [luzPonto1, luzPonto2, luzPonto3, luzPonto4, luzPonto5, luzPonto6];

/* Algumas Animações */
var abrirPorta1, abrirPorta2, abrirExtensao1_1, abrirExtensao1_2;

carregador.load(
 'resources/cena.gltf',
 function ( gltf ) {
    gltf.scene.traverse(function(x) {
        if (x instanceof THREE.Light) x.visible = false
        });
        
    cena.add( gltf.scene );

    luzPonto1.position.set(8,2,0);
    luzPonto2.position.set(-9,3,0);
    luzPonto3.position.set(0,2,8);
    luzPonto4.position.set(0, 2 ,-8);
    luzPonto5.position.set(0,-12,0);
    luzPonto6.position.set(0,18,0);

    cena.add( luzAmbiente );
    luzAmbiente.intensity=4;
    
    luzesPontos.forEach(function(luz) {
        cena.add(luz);
    });

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
        if(elemento.name === 'stoneBench'){
            tampo = elemento;
        }else if(elemento.name === 'workBench'){
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
    luzesPontos.forEach(function(luz) {
        if(luz == null)
        return;
        luz.visible = state;
    });
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

function getMaterial(num){
    switch(num){
        case "1":
            return matWoodA;
        case "2":
            return matWood2;
        case "3":
            return matMarb;
        default:
            return matWoodA;
    }
}

function updateTampoMaterial(val){
    tampo.material.map = getMaterial(val);
}

function updateMesaMaterial(val){
    mesa.material.map = getMaterial(val);
}

function changeBgState(state){
    let color = (state?new THREE.Color( 0xffffff ):new THREE.Color( 0x000000 ))
    cena.background = color;
}