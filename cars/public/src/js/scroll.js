'use strict'

window.onload = () => {
  // récupération la div associer au scroll
  const divScroll = document.getElementsByTagName('div')[4];
  // déclaration d'une constante qui contiendra le SetInterval pour un effet de défilement
  let autoScroll;
  // déclaration d'une constante pour la limite d'action du scroll
  let deskSize = 810;
  // x = vitesse du scroll
  let x = -1.5;
  // y = avancement du scroll
  let y = 0;

  // fonction qui effectue le scroll
  // ajoute la valeur de x à y, puis affecte cette valeur au margin de la div ciblée
  const scroll = () => {
    y= y + x;
    // si y est inférieur à 5200px alors, remise à zero
    if(y <= -5200){
      y = 600;
    }
    divScroll.style.marginTop = `${y}px`;
  };

  // lancement du scroll, si la taille de l'écran est supérieur à 810px
  if(window.innerWidth > deskSize){
    autoScroll = window.setInterval(scroll, 20);
  }

  // récupération de l'event resize pour stopper le scroll en fonction de la taille
  window.addEventListener('resize', () => {
    console.log(window.innerWidth)
    if(window.innerWidth > deskSize){
      if(autoScroll === ''){
        autoScroll = window.setInterval(scroll, 20);
      }
    } else {
      if(window.innerWidth < deskSize){
        clearInterval(autoScroll);
        autoScroll = '';
        divScroll.style.marginTop = `0`;
      }
    }
  });
  // arrêt de la fonction si la souris est survole la div
  divScroll.addEventListener('mouseover', () => {
      clearInterval(autoScroll);
  });
  // reprise de la fonction si la souris ne survole plus la div
  divScroll.addEventListener('mouseout', () => {
    if(window.innerWidth > deskSize){
      autoScroll = window.setInterval(scroll, 20);
    }
  });
  // récupération des deux boutons en relation avec le menu caché
  const buttonUn = document.querySelector('button');
  const buttonDeux = document.querySelectorAll('button')[1];
  // récupération du menu caché
  const menu = document.getElementsByClassName('hiddenMenu')[0];
  // event click sur le premier bouton, fait apparaitre le menu caché
  buttonUn.addEventListener('click', () => {
    menu.style.right = '0px';
  });
  // event click sur le deuxième bouton, fait disparaitre le menu caché
  buttonDeux.addEventListener('click', () => {
    menu.style.right = '-400px';
  });
};