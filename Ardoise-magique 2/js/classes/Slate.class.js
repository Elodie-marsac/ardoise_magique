// **********************************************************************************
// ********************************* Classe Slate ***********************************
// **********************************************************************************

class Slate {
    constructor(pen) {
        this.canvas = document.querySelector('#slate'); // Récupération du canevas
        this.context = this.canvas.getContext('2d');
        this.mousePosition = null;
        this.isDrawing = false;
        this.pen = pen;

        // Installation des gestionnaires d'événements pour le dessin
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getMouseLocation(event) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    onMouseDown(event) {
        this.isDrawing = true;
        this.mousePosition = this.getMouseLocation(event);
    }

    onMouseLeave() {
        this.isDrawing = false;
    }

    onMouseMove(event) {
        const currentPosition = this.getMouseLocation(event);
        if (this.isDrawing && this.mousePosition) {
            this.pen.configure(this.context);
            this.context.beginPath();
            this.context.moveTo(this.mousePosition.x, this.mousePosition.y);
            this.context.lineTo(currentPosition.x, currentPosition.y);
            this.context.stroke();
            this.context.closePath();
            this.mousePosition = currentPosition;
        }
    }

    onMouseUp() {
        this.isDrawing = false;
        this.mousePosition = null;
    }
}
