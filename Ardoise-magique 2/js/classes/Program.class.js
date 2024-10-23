// **********************************************************************************
// ********************************* Classe Program *********************************
// **********************************************************************************

class Program {
    constructor() {
        // Instanciation des classes
        this.pen = new Pen();
        this.slate = new Slate(this.pen);
        this.colorPalette = new ColorPalette();
    }

    onClickColorPicker() {
        document.querySelector('#color-palette').classList.toggle('hide'); // Affiche la palette
    }

    onClickPenColor(penColor) {
        this.pen.setColor(penColor);
    }

    onClickPenSize(penSize) {
        this.pen.setSize(penSize);
    }

    onPickColor(event) {
        const pickedColor = event.detail; // Récupère la couleur depuis l'événement personnalisé
        this.pen.setColor(`rgb(${pickedColor.r}, ${pickedColor.g}, ${pickedColor.b})`);
    }

    start() {
        // Gestionnaire pour effacer
        document.querySelector('#tool-clear-canvas').addEventListener('click', () => {
            this.slate.clear();
        });

        // Gestionnaire pour la pipette
        document.querySelector('#tool-color-picker').addEventListener('click', () => {
            this.onClickColorPicker();
        });

        // Gestionnaire pour les couleurs prédéfinies
        document.querySelectorAll('.pen-color').forEach(button => {
            button.addEventListener('click', () => {
                const penColor = button.dataset.color;
                this.onClickPenColor(penColor);
            });
        });

        // Gestionnaire pour les tailles prédéfinies
        document.querySelectorAll('.pen-size').forEach(button => {
            button.addEventListener('click', () => {
                const penSize = parseInt(button.dataset.size, 10);
                this.onClickPenSize(penSize);
            });
        });

        // Gestionnaire pour l'événement personnalisé de sélection de couleur
        document.querySelector('#color-palette').addEventListener('colorPicked', (event) => {
            this.onPickColor(event);
        });
    }
}
