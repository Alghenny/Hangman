var words = ["torpedo", "rabia", "apartamento", "prueba", "surrealista", "analista", "fragmento", "fantasmal",
     "engañar", "faraon", "castillo", "alianza", "pasajero", "Puma", "extremista", "desmembrar", "cazar", "flotar",
      "convertible", "camaleon", "carro", "genetico", "inflar", "angel", "contraste", "diente", "quemar", "soledad", "guerra",
      "justicia", "verdugo", "arquero", "fusible", "jefe", "federacion", "robot", "sonriendo", "confidencial",
      "falsificador", "garra", "espada", "raqueta", "arcano", "astuto", "oscuro", "hornear", "navaja", "destruccion", "dimension", "panda"];
console.log(words.length);

var answer = '';
var maxMistakes = 5;
var mistakes = 0;
var guessed = [];
var wordStatus = null;
var victory = "You Won!!!";
var lose = "You Lose!!!"

function randomWord(){

    answer = words[Math.floor(Math.random() * words.length)];

}

function generateLetters() {
    let buttonsHTML = 'abcdefghijklmnñopqrstuvwxyz'.split('').map(letters =>
      `
        <button
          class="btn btn-lg btn-primary m-2"
          id='` + letters + `'
          onClick="handleGuess('` + letters + `')"
        >
          ` + letters + `
        </button>
      `).join('');
  
    document.getElementById('keyboard').innerHTML = buttonsHTML;
  }

function handleGuess(chosenLetter){
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled',true);

    if(answer.indexOf(chosenLetter) >= 0 ){
        guessedWord();
        checkIfGameWon();
    } else if(answer.indexOf(chosenLetter) === -1){
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangman();
    }
}

function checkIfGameWon(){

    if(wordStatus === answer){
        document.getElementById('keyboard').innerHTML = victory;
    }

}

function checkIfGameLost(){

    if(mistakes === maxMistakes){
        document.getElementById('wordSpotlight').innerHTML = "The answer was "+ answer;
        document.getElementById('keyboard').innerHTML = lose;
    }

}

function guessedWord(){
    wordStatus = answer.split('').map(letters => (guessed.indexOf(letters) >= 0 ? letters : " _ ")).join('');


    document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

function updateMistakes(){

    document.getElementById("mistakes").innerHTML = mistakes;

}

function resetGame(){

    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPics').src = './resources/0.jpg';
    
    randomWord();
    guessedWord();
    generateLetters();
    updateMistakes();

}

function updateHangman(){

    document.getElementById('hangmanPics').src = './resources/'+mistakes+'.jpg';

}

document.getElementById("maxMistakes").innerHTML = maxMistakes;


randomWord();
generateLetters();
guessedWord();