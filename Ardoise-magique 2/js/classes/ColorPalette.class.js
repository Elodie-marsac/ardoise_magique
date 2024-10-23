// **********************************************************************************
// ********************************* Classe ColorPalette ****************************
// **********************************************************************************

class ColorPalette {
    constructor() {
        // Récupération du <canvas>
        this.canvas = document.querySelector('#color-palette');
        
        // Récupération du contexte du canvas
        this.context = this.canvas.getContext('2d');
        
        // Initialisation d'un objet pour la couleur rgb (pickedColor)
        this.pickedColor = { r: 0, g: 0, b: 0 };

        // Installation des gestionnaires d'évènements de la palette de couleurs
        this.canvas.addEventListener('click', this.onClick.bind(this)); // Bind pour garder le bon contexte
        
        // Dessine la palette de couleurs possibles.
        this.build();
    }
    
    // Méthode de construction graphique de la palette de couleurs
    build() {
        // Création d'un dégradé horizontal
        let gradientH = this.context.createLinearGradient(0, 0, this.canvas.width, 0);
        
        // Dégradé rouge -> vert -> bleu horizontal.
        gradientH.addColorStop(0, 'rgb(255, 0, 0)'); // Rouge
        gradientH.addColorStop(0.17, 'rgb(255, 255, 0)'); // Jaune
        gradientH.addColorStop(0.34, 'rgb(0, 255, 0)'); // Vert
        gradientH.addColorStop(0.51, 'rgb(0, 255, 255)'); // Cyan
        gradientH.addColorStop(0.68, 'rgb(0, 0, 255)'); // Bleu
        gradientH.addColorStop(0.85, 'rgb(255, 0, 255)'); // Magenta
        gradientH.addColorStop(1, 'rgb(255, 0, 0)'); // Rouge (fin)

        // On applique le dégradé horizontal
        this.context.fillStyle = gradientH;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Création d'un dégradé vertical pour l'intensité (blanc -> transparent -> noir)
        let gradientV = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        
        // Dégradé blanc -> transparent -> noir vertical.
        gradientV.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Blanc en haut
        gradientV.addColorStop(0.5, 'rgba(255, 255, 255, 0)'); // Transparent au milieu
        gradientV.addColorStop(1, 'rgba(0, 0, 0, 1)'); // Noir en bas

        // On applique le dégradé vertical
        this.context.fillStyle = gradientV;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Méthode de récupération de la couleur sur laquelle l'utilisateur a cliqué
    getPickedColor(x, y) {
        // Récupérer les données du pixel sur lequel l'utilisateur a cliqué
        const imageData = this.context.getImageData(x, y, 1, 1).data;

        // Mise à jour des valeurs RGB
        this.pickedColor = {
            r: imageData[0],
            g: imageData[1],
            b: imageData[2]
        };

        return this.pickedColor;
    }
    
    // Gestionnaire d'évènement de clic sur un pixel de couleur de la palette
    onClick(event) {
        // Récupération des coordonnées de la souris au moment du clic
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Récupération de la couleur sélectionnée
        const color = this.getPickedColor(x, y);
        
        // Affichage de la couleur choisie dans la console (pour tester)
        console.log(`Couleur choisie: rgb(${color.r}, ${color.g}, ${color.b})`);
        
        // Déclenchement d'un événement personnalisé pour notifier la sélection de couleur
        const colorEvent = new CustomEvent('colorPicked', { detail: color });
        this.canvas.dispatchEvent(colorEvent); // Lancer l'événement pour qu'une autre classe l'écoute
    }
}
