
// ------- INICIO DA INTERAÇÃO COM O DINO
const dino = document.querySelector(".dino");
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let score=0;

function handleKeyUp(event){
    if (event.keyCode === 32){   // Verificar se foi a tecla espaço
        if(!isJumping){  //Verifica se o estado é não pulando
            jump();   //Executar a função de pular
            
        }
    }
}

function jump() {
    isJumping = true;  //Inicia o Pulo
    
    let upInterval = setInterval(() => { 
        if(position >= 150){    //Valor maximo que ele sobe
            clearInterval(upInterval); //Interromper a Subida 
            //Descendo
            let dowInterval = setInterval(() => { 
                if(position <=0){    //Valor maximo que ele desce
                    clearInterval(dowInterval);   //Interrompe a Descida
                    isJumping = false;  //Termina o Pulo
                } else{   //Iniciar a Descida
                    position -= 20;   //Valor do intervalo
                    dino.style.bottom = position + "px";
                }
            }, 20);
        }else{   //Iniciar a Subida
            //Subindo
            position += 20;   //valor do intervalo 
            dino.style.bottom = position + "px";
        }
    }, 20);
}
// ------- FIM DA INTERAÇÃO COM O DINO



// ------- INICIO DA INTERAÇÃO COM O CACTO
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000; //POSIÇÃO INICIAL DO CACTO
    let randomTime = Math.random() * 6000;  //TEMPO DE GERAÇÃO DE NOVOS CACTOS
    

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);
    
    let leftInterval = setInterval(() => {
        if(cactusPosition < -60){ //REMOVENDO CACTO DA TELA
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){ //VERIFICANDO SE ELE BATEU NO CACTO OU SE ELE PULOU POR CIMA
            //GAME OVER

            clearInterval(leftInterval); //INTERROMPENDO O MOVIMENTO DO CACTO
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        }else{ //INICIANDO MOVIMENTO DO CACTO
        cactusPosition -= 10; // VELOCIDADE DO CACTO
            cactus.style.left = cactusPosition + 'px';
        
        }
    }, 20);

    setTimeout(createCactus, randomTime); //GERANDO MAIS CACTOS 
}



// ------- FIM DA INTERAÇÃO COM O CACTO



createCactus();
document.addEventListener('keyup', handleKeyUp);   //Escutar tecla pressionada
