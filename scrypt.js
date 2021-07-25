// On charge les informations utiles 

const statut = document.querySelector("h2")
let jeuActif = true
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""]

const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

]

// messages

const gagne = () => `le joueur ${joueurActif} a gagné `
const egalite = () => `Egalité`
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`

// Joueur qui start  
statut.innerHTML = tourJoueur()


// mise en place des evenements du jeu 

document.querySelectorAll(".case").
forEach(cell =>
    cell.addEventListener("click", gestionClicCase))

document.querySelector("#reset").addEventListener("click", reset)


// Permet de gerer le click 
function gestionClicCase() {

    // On récupere l'index de la case cliquer 

    const indexCase = parseInt(this.dataset.index)


    // On check si la case et déjà joué ou si le jeu et terminée 

    if (etatJeu[indexCase] != "" || !jeuActif) {
        return
    }
    // On écrit le symbole du joueur dans le tableau 

    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif

    // on verifie qui gagne 
    verifWin()
}


// Fonction permettant de verifier le vainqueur 

function verifWin() {

    let tourWin = false

    for (let conditionVictoire of conditionsVictoire) {

        let val1 = etatJeu[conditionVictoire[0]]
        let val2 = etatJeu[conditionVictoire[1]]
        let val3 = etatJeu[conditionVictoire[2]]
        if (val1 === "" || val2 === "" || val3 === "") {
            continue
        }
        if (val1 == val2 && val2 === val3) {

            tourWin = true
            break
        }

    }
    if (tourWin) {
        statut.innerHTML = gagne()
        jeuActif = false
        return
    }

    if (!etatJeu.includes("")) {
        statut.innerHTML = egalite()
        jeuActif = false
        return
    }

    joueurActif = joueurActif === "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
}




function reset() {
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".case").
    forEach(cell => cell.innerHTML = "")
        // console.log(etatJeu)
}