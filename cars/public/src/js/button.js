'use strict'

window.onload = () => {
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