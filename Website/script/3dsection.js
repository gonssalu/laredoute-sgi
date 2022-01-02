function toggle3D(){
    let sec = document.getElementById('3DSection');
    let btn = document.getElementById('btnToggle3D');
    if(sec.classList.contains('hide-sec')){
        sec.classList.remove('hide-sec');
        window.scrollTo(0, sec.offsetTop);
        btn.innerHTML = '<i class="bi-stop-circle-fill me-2 d-flex align-items-center"></i>Fechar 3D';
    }else{
        sec.classList.add('hide-sec');
        btn.innerHTML = '<i class="bi-play-circle-fill me-2 d-flex align-items-center"></i>Ver em 3D';
    }
}
function toggleLuz(){
    let classDisabled = 'btn-info';
    let classEnabled = 'btn-warning';
    let innerDisabled = '<i class="bi-lightbulb me-2 d-flex align-items-center"></i>Luz';
    let innerEnabled = '<i class="bi-lightbulb-fill me-2 d-flex align-items-center"></i>Luz';
    let btn = document.getElementById('btnToggleLuz');
    if(btn.classList.contains(classDisabled)){
        btn.classList.remove(classDisabled);
        btn.classList.add(classEnabled);
        btn.innerHTML = innerEnabled;
        changeLightState(true); //Ligar a luz no threejs
    }else{
        btn.classList.remove(classEnabled);
        btn.classList.add(classDisabled);
        btn.innerHTML = innerDisabled;
        changeLightState(false); //Desligar a luz no threejs
    }
};

var classDisabled = 'btn-fourth';
var classEnabled = 'btn-third';
function togglePorta(num){
    let innerDisabled = "<i class=\"bi-door-closed-fill me-2 d-flex align-items-center\"></i>Porta " + num;
    let innerEnabled = "<i class=\"bi-door-open me-2 d-flex align-items-center\"></i>Porta " + num;
    let btn = document.getElementById("btnTogglePorta" + num);
    if(btn.classList.contains(classDisabled)){
        btn.classList.remove(classDisabled);
        btn.classList.add(classEnabled);
        btn.innerHTML = innerEnabled;
        openDoor(num); //Executar animação no threeJS
    }else{
        btn.classList.remove(classEnabled);
        btn.classList.add(classDisabled);
        btn.innerHTML = innerDisabled;
        closeDoor(num); //Executar animação no threeJS
    }
};

function toggleExtensao(){
    let innerDisabled = '<i class="bi-arrows-angle-expand me-2 d-flex align-items-center"></i>Extensão';
    let innerEnabled = '<i class="bi-arrows-angle-contract me-2 d-flex align-items-center"></i>Extensão';
    let btn = document.getElementById('btnToggleExtensao');
    if(btn.classList.contains(classDisabled)){
        btn.classList.remove(classDisabled);
        btn.classList.add(classEnabled);
        btn.innerHTML = innerEnabled;
        openExtension(); //Executar animação no threeJS
    }else{
        btn.classList.remove(classEnabled);
        btn.classList.add(classDisabled);
        btn.innerHTML = innerDisabled;
        closeExtension(); //Executar animação no threeJS
    }
};