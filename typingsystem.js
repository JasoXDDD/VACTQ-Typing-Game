//TO-DO: Get the phrases from the API immediately and save them
const phrases = ["System.out.println(a);","Test", "int i = 1;"];

const typingText = document.getElementById("typing-text");
const typingBox = document.getElementById("typing-box");
currentPhrase = "Loading...";

function nextPhrase() {
    randomIndex = Math.floor(Math.random() * phrases.length);
    currentPhrase = phrases[randomIndex];
    typingText.textContent = currentPhrase;
}

function checkTypingBox() {
    if(typingBox.value == currentPhrase) {
        //TO-DO: Update API pos
        typingBox.value = "";
        nextPhrase();
    }
}

typingBox.addEventListener("input", checkTypingBox);
nextPhrase(); //Choose first phrase to start