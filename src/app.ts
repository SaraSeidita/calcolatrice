type Operator = '+' | '-' | '*' | '/'; // definisco gli operatori della calcolatrice 

// definisco la classe Calcolatrice 

class Calcolatrice {
    private inputCorrente : string = ''; // numero corrente digitato
    private inputPrecedente : string = ''; // numero precedente digitato
    private operatore : Operator | null = null; // operatore digitato

    public appendNumero(number: string): void {

        if (this.inputCorrente === '0' && number !== '.') {
            this.inputCorrente = number;

        } else if (number === '.' && !this.inputCorrente.includes('.')) {
            this.inputCorrente += number;

        } else {
            this.inputCorrente += number;
        }
        this.aggiornaDisplay();
    }

    public scegliOperatore(operatore: Operator): void {
        if (this.inputCorrente === '') return;

        if (this.inputPrecedente !== '') {
            this.calcola();
        }
        this.operatore = operatore; 
        this.inputPrecedente = this.inputCorrente; 
        this.inputCorrente = '';
    }

    public calcola(): void {
        let calcolatore : number; 
        const prev = parseFloat(this.inputPrecedente);
        const corr = parseFloat(this.inputCorrente);

        if (isNaN(prev) || isNaN(corr)) return; // se non è digitato nulla 

        switch(this.operatore) {
            // matematica 
            case '+': // addizione 
                calcolatore = prev + corr
                break;
            case '-': // sottrazione 
                calcolatore = prev - corr 
                break;
            case '*': // moltiplicazione 
                calcolatore = prev * corr 
                break;
            case '/': // divisione 
                calcolatore = prev / corr 
                break;
            default:
                return;
        }

        this.inputCorrente = calcolatore.toString();
        this.operatore = null;
        this.inputPrecedente = '';
        this.aggiornaDisplay();
    }

    public aggiornaDisplay(): void {
        // vedere la calcolatrice 
        const display = document.getElementById('display') as HTMLInputElement; // prendo gli input dei bottoni 
        display.value = this.inputCorrente;
    }

    public cancellaCalcolo(): void {
        this.inputCorrente = '';
        this.inputPrecedente = '';
        this.operatore = null;
        this.aggiornaDisplay();
    }
}

// evento click e calcolatrice

const azioneCalcola = new Calcolatrice();
document.getElementById('buttons')!.addEventListener('click', (e) => {
    const target = e.target as HTMLElement; 

    // se clicca un numero
    if(target.classList.contains('number')) {
        azioneCalcola.appendNumero(target.innerText);
    } else if (target.classList.contains('operator')) {
        azioneCalcola.scegliOperatore(target.innerText as Operator)
    } else if (target.classList.contains('equals')) {
        azioneCalcola.calcola();
    } else if (target.classList.contains('clear')){
        azioneCalcola.cancellaCalcolo();
    }
});