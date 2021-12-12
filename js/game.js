let screen = document.getElementById("screen");
let ctx = screen.getContext('2d');
var egb = new FontFace('egb', 'url(./EGB.ttf)');
var estado = 4;
var morido = 0;

let d;
let game;

var imi=0;

//song

const ini = new Audio();
const gameover = new Audio();
const pk = new Audio();
const lv = new Audio();
const bomb = new Audio();
const ingame = new Audio();
const evol = new Audio();
const good = new Audio();
const yaevo = new Audio();
const inigb = new Audio();
ini.src = "./media/song.wav";
gameover.src = "./media/gameover.wav";
pk.src = "./media/pick.wav";
lv.src = "./media/levelup.wav";
bomb.src = "./media/golpe.wav";
ingame.src = "./media/game.wav";
evol.src = "./media/evo.wav";
good.src = "./media/win.wav";
yaevo.src = "./media/yaevo.wav";
inigb.src = "./media/inigb.wav";

//PJ
let box =25;
//Antonimouz
var ant = [];
ant[0] = {
    x: 3* box,
    y: 3* box
}
//Bayas
var nom = {
    x : Math.floor(Math.random()*18+1)*box,
    y : Math.floor(Math.random()*18+1)*box
};

let puntaje = 0;
let level = 5;

let baya = new Image();
baya.src = "./media/baya.png"; 

/*
ctx.drawImage(image,10,10,20,20);
ctx.fillStyle = "red";
ctx.fillRect(100,300,30,30);
*/
var aberx,abery;
    aberx = nom.x;
    abery = nom.y;
var nuevox,nuevoy;

let antX ,antY;

let match = 0;

function draw(){
   
    
    if(match == 9){
        match = 0;
        sub_draw();
    }else{
        match++;
    }
    
    
    ctx.fillStyle = "#415708";
    ctx.beginPath();
        switch(d){
                case "LEFT":
                ctx.moveTo(10+(box*9.5),20+(box*18.65));
                ctx.lineTo(30+(box*9.5),10+(box*18.65));
                ctx.lineTo(30+(box*9.5),30+(box*18.65));
            break;
            case "RIGHT":
                ctx.moveTo(10+(box*9.5),10+(box*18.65));
                ctx.lineTo(30+(box*9.5),20+(box*18.65));
                ctx.lineTo(10+(box*9.5),30+(box*18.65));
            break;
            case "UP":
                ctx.moveTo(20+(box*9.5),10+(box*18.65));
                ctx.lineTo(10+(box*9.5),30+(box*18.65));
                ctx.lineTo(30+(box*9.5),30+(box*18.65));
            break;
            case "DOWN":
                ctx.moveTo(10+(box*9.5),10+(box*18.65));
                ctx.lineTo(30+(box*9.5),10+(box*18.65));
                ctx.lineTo(20+(box*9.5),30+(box*18.65));
            break;
            default:
                ctx.arc(5+(box*10.1),20+(box*18.65),10, 0, 2*Math.PI);
            break;
    }

/*
    
    */

    ctx.fill();

}

function sub_draw(){
    
    //fondo #9ac601
    ctx.beginPath();
    ctx.fillStyle = "#9ac601";
    ctx.fillRect(0,0,500,500);
    for(let i=0 ;i< ant.length;i++){
        ctx.fillStyle = ( i === 0 ) ? "#415708":"#9ac601";
        ctx.strokeStyle = "#415708";
        ctx.fillRect(ant[i].x,ant[i].y,box,box);
        ctx.strokeStyle = "#415708";
        ctx.strokeRect(ant[i].x,ant[i].y,box,box);
        
    }
    ctx.drawImage(baya,nom.x,nom.y,box,box);

    /*let*/ antX = ant[0].x;
    /*let*/ antY = ant[0].y;
    
    // DIRECCIONES 
    
    if(d == "LEFT") antX -= box;
    if(d == "UP") antY -= box;
    if(d == "RIGHT") antX += box;
    if(d == "DOWN") antY += box;

   

    if(antX == nom.x && antY == nom.y){
        puntaje++;
        if(puntaje % 3 == 0){
            lv.play();
            level++;
        }else{
            pk.play();
        }
        if(level == 18){
            llega();
        }
        nuevox = Math.floor(Math.random()*19+1)*box;
        nuevoy = Math.floor(Math.random()*18+1)*box;
        nom = {
            x : nuevox,
            y : nuevoy
        }
    }else{
        ant.pop();
    }

    

    let cabeza = {
        x : antX,
        y : antY
    }
 
    // pom chocó

    if(
        antX < 0 ||
        antX > 19*box ||
        antY < 0 ||
        antY > 18*box ||
        colishionx(cabeza,ant)
    ){
        ingame.pause();
        ingame.currentTime = 0;
        bomb.play();
        setTimeout(function(){
            reset();
            gameover.play();
        },900);
        if(colishionx(cabeza,ant)){
        }else{
            morido = 2;
        }
        clearInterval(game);
    }
    

    ant.unshift(cabeza);

    //INFORMACION
    ctx.fillStyle = "#415708";
    ctx.fillRect(0,19*box,20*box,1);

    ctx.fillStyle = "#415708";
    ctx.font = "20px egb";
    ctx.fillText("BAYAS "+puntaje,1*box,19.7*box);

    ctx.fillStyle = "#415708";
    ctx.font = "20px egb";
    ctx.fillText("NIVEL "+level,13*box,19.7*box);

    ctx.fill();
    /*

    flechita

        ctx.beginPath();
        ctx.moveTo(20,20);
        ctx.lineTo(40,40);
        ctx.lineTo(20,60);
        ctx.closePath();
        ctx.fill();

    position

    

    */
    

}

//control de anton
// <-       37
// ->       39
// up       38
// down     40


document.addEventListener("keydown",flechitas);

function flechitas(event){
    if( event.keyCode == 37 /*|| event.keyCode == 65 */&& d != "RIGHT"){
        d="LEFT";
    }else if( event.keyCode == 38 /*|| event.keyCode == 87 */ && d != "DOWN"){
        d="UP";
    }else if( event.keyCode == 39 /*|| event.keyCode == 68 */ && d != "LEFT"){
        d="RIGHT";
    }else if( event.keyCode == 40 /*|| event.keyCode == 83*/  && d != "UP"){
        d="DOWN";
    }
}

function flechotas(abueno){
    if( abueno == "LEFT" /*|| event.keyCode == 65 */&& d != "RIGHT"){
        d="LEFT";
    }else if(  abueno == "UP" /*|| event.keyCode == 87 */ && d != "DOWN"){
        d="UP";
    }else if(  abueno == "RIGHT" /*|| event.keyCode == 68 */ && d != "LEFT"){
        d="RIGHT";
    }else if(  abueno == "DOWN" /*|| event.keyCode == 83*/  && d != "UP"){
        d="DOWN";
    }
    d = abueno;
}

function colishionx(head,snake){
    for(let i = 0; i < snake.length; i++){
        if(head.x == snake[i].x && head.y == snake[i].y ){
            if(i == 1){
                morido = 3;
            }else{
                morido = 1;
            }
            return true;
        }
    }
    return false;
}

// mover a la serpientita

// coliShionx
/*
function colishionx(,ant){

}
*/

//llega 
var llegaT;
function llega(){
    ingame.pause();
    ingame.currentTime = 0;
    clearInterval(game);
    setTimeout(evo(),750);
}


// good ending 

var evoT;

function evo(){
    ingame.pause();
    ingame.currentTime = 0;
    evol.currentTime = 0;
    evol.play();
    clearInterval(game);
    animacionInnecesariamenteLarga();
    men = 0;
    evoT = setInterval(function(){
        evolution();
    },10);
    
}

// perdon, me dio estres en una sola noche
function animacionInnecesariamenteLarga(){
    imi = 0;
    let tm = 1200

//fase 0
    setTimeout(function(){imi=0},tm);
    tm += 800;
    setTimeout(function(){imi=1},tm);
    tm += 100;
    setTimeout(function(){imi=0},tm);
    tm += 800;
    setTimeout(function(){imi=1},tm);
    tm += 100;

    // fase 1
    setTimeout(function(){imi=0},tm);
    tm += 400;
    setTimeout(function(){imi=1},tm);
    tm += 100;
    setTimeout(function(){imi=0},tm);
    tm += 400;
    setTimeout(function(){imi=1},tm);
    tm += 100;
    setTimeout(function(){imi=0},tm);
    tm += 400;
    setTimeout(function(){imi=1},tm);
    tm += 100;
    setTimeout(function(){imi=0},tm);
    tm += 400;
    setTimeout(function(){imi=1},tm);
    tm += 100;
    setTimeout(function(){imi=0},tm);
    tm += 400;
    // fase 2
    setTimeout(function(){imi=1},tm);
    tm += 50;
    setTimeout(function(){imi=0},tm);
    tm += 200;
    setTimeout(function(){imi=1},tm);
    tm += 50;
    setTimeout(function(){imi=0},tm);
    tm += 200;
    setTimeout(function(){imi=1},tm);
    tm += 50;
    setTimeout(function(){imi=0},tm);
    tm += 200;
    setTimeout(function(){imi=1},tm);
    tm += 50;
    setTimeout(function(){imi=0},tm);
    tm += 200;
    setTimeout(function(){imi=1},tm);
    tm += 50;
    setTimeout(function(){imi=0},tm);
    //fase 3
    tm += 25;
    setTimeout(function(){imi=1},tm);
    tm += 100;
    setTimeout(function(){imi=0},tm);
    tm += 25;
    setTimeout(function(){imi=1},tm);
    tm += 100;
    setTimeout(function(){imi=0},tm);
    tm += 25;
    setTimeout(function(){imi=1},tm);
    tm += 100;
    setTimeout(function(){imi=0},tm);
    tm += 25;
    setTimeout(function(){imi=1},tm);
    tm += 100;
    setTimeout(function(){imi=0},tm);
    tm += 25;
    setTimeout(function(){imi=1},tm);
    tm += 100;
    setTimeout(function(){imi=0},tm);
    tm += 25;
    setTimeout(function(){imi=1},tm);
    tm += 100;
    setTimeout(function(){imi=0},tm);
 
    //fase 4
    tm += 50;
    setTimeout(function(){imi=1},tm);
    tm += 200;
    setTimeout(function(){imi=0},tm);
    tm += 50;
    setTimeout(function(){imi=1},tm);
    tm += 200;
    setTimeout(function(){imi=0},tm);
    tm += 50;
    setTimeout(function(){imi=1},tm);
    tm += 200;
    setTimeout(function(){imi=0},tm);
    tm += 50;
    setTimeout(function(){imi=1},tm);
    tm += 200;
    setTimeout(function(){imi=0},tm);
    tm += 50;
    setTimeout(function(){imi=1},tm);
    tm += 200;
    setTimeout(function(){imi=0},tm);
    tm += 50;
    setTimeout(function(){imi=1},tm);
    //fase 5
    tm += 400;
    setTimeout(function(){imi=1},tm);
    tm += 75;
    setTimeout(function(){imi=0},tm);
    tm += 400;
    setTimeout(function(){imi=1},tm);
    tm += 75;
    setTimeout(function(){imi=0},tm);
    tm += 400;
    setTimeout(function(){imi=1},tm);

    setTimeout(function(){
        men = 1;
        evol.pause();
        evol.currentTime = 0;
    },tm+500);
    setTimeout(function(){
        yaevo.play();
    },tm+750);
    setTimeout(function(){
        trueEnd();
    },tm+5000);

}

//end
var trueEndT;
var sopla = true;
function trueEnd(){
    clearInterval(evoT); 
    estado = 3;
    let endImg = new Image();
    good.currentTime = 0;
    good.play();
    good.loop = true;
    trueEndT = setInterval(function(){
        if(sopla==true){
            endImg.src = "./media/goodend1.png";
        }else{
            endImg.src = "./media/goodend2.png";
        }
        sopla = !sopla;
        ctx.drawImage(endImg,0,0,500,500);
    },250);
}

var men = 0;
function evolution(){
    let imiI = new Image();
    if(imi == 0){
        imiI.src = "./media/evo1.png"; 
    }else{
        imiI.src = "./media/evo2.png"; 
    }
    ctx.drawImage(imiI,0,0,500,500);
    ctx.fillStyle = "#415708";
    ctx.font = "30px egb";
    if(men == 0){
        ctx.fillText("¡ANDA, ANTONIMOUZ ",1*box,15*box);
        ctx.fillText("VA A EVOLUCIONAR! ",1*box,17*box);
    }else{
        ctx.fillText("¡ ANTONIMOUZ HA ",2*box,15*box);
        ctx.fillText("EVOLUCIONADO ! ",2*box,17*box);
    }
}

//reset

var resetT;

function reset(){
    resetT = setInterval(function(){
        let reseteo = new Image();
        if(morido == 1){
            reseteo.src = "./media/gomordida.png"; 
        }else if(morido == 2){
            reseteo.src = "./media/gochoque.png"; 
        }else if(morido == 3){
            reseteo.src = "./media/gocrack.png"; 
        }
        ctx.drawImage(reseteo,0,0,500,500);
    },100);
    setTimeout(again,4000);
}

function again(){
    clearInterval(resetT);
    iniGame();
    estado = 0;
}

//game

function despuesDeLaPantallaDeJuego(){
    ini.pause();
    ini.currentTime = 0;
    ingame.loop = true;
    ingame.volume = 0.5;
    ingame.play();
    game = setInterval(draw,25);

}

// 1
let iniT;

function inicioG(){
    let inicio = new Image();
    inicio.src = "./media/inicio.png"; 
    ctx.drawImage(inicio,0,0,500,500);
}

//2

let insT;

function inst(){
    let inicio = new Image();
    inicio.src = "./media/instrucciones.png"; 
    ctx.drawImage(inicio,0,0,500,500);
}

// INI

function iniGame(){
    estado = 0;
    iniT = setInterval(inicioG,1);
    ini.play();
}


function iniciarTodo(){
    var pan = document.getElementById("ini");
    pan.style.animationName = "inicio";
    pan.style.animationDuration = "1.5s";
    document.getElementById("solounavez").onclick = "";
    setTimeout(chinxboy,1500);
}

// 

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    //console.log("x: " + x + " y: " + y)
   if(estado == 0){
        clearInterval(iniT);
        estado = 1;
        insT = setInterval(inst,1);
   }else if(estado == 1){
       clearInterval(insT);
       estado = 2;
       valoresInicio();
       despuesDeLaPantallaDeJuego();
   }else if(estado == 3){
    clearInterval(trueEndT);
        good.pause();
        again();
   }
}


// valores de inicio
function valoresInicio(){
    ant = [];
    ant[0] = {
        x: 3* box,
        y: 3* box
    }
    nom = {
        x : Math.floor(Math.random()*18+1)*box,
        y : Math.floor(Math.random()*18+1)*box
    };
    cabeza = {
        x : ant[0].x,
        y : ant[0].y
    };
    puntaje = 0;
    level = 5;
    d = "";
}

// chinx boy logo

var chinxboyT;

function chinxboy(){
    let ef= 0;
    document.getElementById("ini").style.display = "none";
    chinxboyT = setInterval(function(){
        //fondo #9ac601
        ctx.fillStyle = "#9ac601";
        ctx.fillRect(0,0,500,500);
        ctx.fillStyle = "#415708";
        ctx.font = "35px egb";
        ctx.fillText("Chinxtendo®",2.5*box,ef);
        if(ef< 270){
            ef++;
        }else{
            destello();
        }
    }, 3);
}

function destello(){
    clearInterval(chinxboyT);
    inigb.volume = 0.4;
    inigb.play();
    setTimeout(function(){
        iniGame();
    }, 1600);
}

screen.addEventListener('mousedown', function(e) {
    getCursorPosition(screen, e)
})