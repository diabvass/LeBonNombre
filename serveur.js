const nombre = document.getElementById('nombre');
const message = document.getElementById('msg');
const pRecord = document.getElementById("record");
const pEspace = document.getElementById("espace");
const mesRecord = document.getElementById("mesRecord");
const ptop = document.getElementById("top");
// init
let secret = Math.floor(Math.random()*100)+1;
let essais = 0;
let recordActuel = localStorage.getItem('record');

pRecord.style.display = 'none';
ptop.innerHTML = recordActuel ? `Meilleur record : ${recordActuel} essais` : `Pas encore de record`;

// principal
function check(){
  mesRecord.innerText = "";
  let use = nombre.value;
  if(use === "") return message.textContent = "Entrez un nombre d'abord.";
  let valeur = Number(use);
  if(valeur > 100 || valeur < 1) return message.textContent = `${valeur} n'est pas pris en compte (1 à 100)`;
  
  essais++;
  anime(valeur, secret);
  
  let mes = valeur > secret ? 'grand' : 'petit';
  if(valeur !== secret){
    message.innerText = `${valeur} c'est trop ${mes} ! 
    Essais: ${essais}`;
    return;
  }
  message.innerText = `Gagné en ${essais} essais ! 
  Le nombre était ${secret}`;
  best(recordActuel, essais);
  nombre.value = "";
}
// abandonner - revenir à zéro
function abandonnez(){
  if(essais === 0) return message.textContent = 'Essayez au moins une fois';
  rejouer();
  message.textContent = `Devinez le nouveau nombre`;
}

// Gestion des couleurs
function anime(v,s){
  let color = v === s ? 'green' : 'red';
  pEspace.style.display = v === s ? "none" : "block";
  pRecord.style.display = v === s ? "block" : "none";
  message.style.color = color;
}

// reprendre le jeu
function rejouer(){
  essais = 0;
  nombre.value = "";
  secret = Math.floor(Math.random()*100)+1;
  mesRecord.innerText = "";
  message.style.color = 'black';
  pEspace.style.display = "block";
  pRecord.style.display = "none";
  message.textContent = "Bonne chance !";
}

// meileur score
function best(ancien, nouveau){
  if(!ancien || nouveau < ancien){
    localStorage.setItem('record', nouveau);
    recordActuel = nouveau;
    mesRecord.innerText = ` NOUVEAU RECORD !`;
    ptop.innerHTML = `Meilleur record : ${nouveau} essais`;
  } else {
    mesRecord.innerText = `Record à battre : ${ancien}`;
  }
}
