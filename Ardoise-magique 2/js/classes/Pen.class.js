// **********************************************************************************
// ********************************* Classe Pen *************************************
// **********************************************************************************
class Pen {
    constructor() {
        this.color = '#000000'; // Couleur par défaut (noir)
        this.size = 5; // Taille par défaut du crayon
        this.alpha = 1; // Opacité par défaut
    }

    configure(slateCanvasContext) {
        slateCanvasContext.strokeStyle = this.color;
        slateCanvasContext.lineWidth = this.size;
        slateCanvasContext.lineCap = 'round'; // Traits arrondis
    }

    setColor(color) {
        this.color = color;
    }

    setColorAsRgb(red, green, blue, alpha = 1) {
        this.color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }

    setAlpha(alpha) {
        this.alpha = alpha / 100; // Conversion de l'alpha en pourcentage
    }

    setSize(size) {
        this.size = size;
    }
}
