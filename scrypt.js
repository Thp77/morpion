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


statut.innerHTML = tourJoueur()

document.querySelectorAll(".case").
forEach(cell =>
    cell.addEventListener("click", gestionClicCase))

document.querySelector("#restart").addEventListener("click", restart)

function gestionClicCase() {

    // On récupere l'index de la case cliquer 

    const indexCase = parseInt(this.dataset.index)
    if (etatJeu[indexCase] != "" || !jeuActif) {
        return
    }

    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif


    verifWin()

    function verifWin() {

        let tourWin = false

        for (let conditionVictoire of conditionsVictoire) {

            let val1 = etatJeu[conditionVictoire[0]]
            let val2 = etatJeu[conditionVictoire[1]]
            let val3 = etatJeu[conditionVictoire[3]]
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


}

function restart() {
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".case").
    forEach(cell => cell.innerHTML = "")
        // console.log(etatJeu)
}