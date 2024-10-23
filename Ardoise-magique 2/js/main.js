// **********************************************************************************
// ********************************* Code Principal *********************************
// **********************************************************************************

/*
 * Installation d'un gestionnaire d'évènement déclenché quand l'arbre DOM sera
 * totalement construit par le navigateur.
 *
 *.
 */
 document.addEventListener("DOMContentLoaded", function(){
     // Création puis démarrage de l'application. instanciation du program
     let program = new Program()
     //appel de la fonction de démarrage
     program.start()
 })