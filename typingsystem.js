//TO-DO: Get the phrases from the API immediately and save them
const phrases = ["public class HelloWorld {",
    "public static void main(String[] args) {",
    "System.out.println(\"Hello, World!\");",
    "int num1 = 10, num2 = 20, sum;",
    "sum = num1 + num2;",
    "System.out.println(\"Sum of these numbers: \" + sum);",
    "double num = -10.5;",
    "double result;",
    "result = Math.abs(num);",
    "System.out.println(\"The absolute value of \" + num + \" is: \" + result);",
    "int[] numbers = new int[10];",
    "for (int i = 0; i < numbers.length; i++) {",
    "numbers[i] = i + 1;",
    "System.out.println(numbers[i]);",
    "String str1 = \"Java\", str2 = \"Programming\";",
    "String str3 = str1.concat(str2);",
    "public class HelloWorld {",
    "public static void main(String[] args) {",
    "System.out.println(\"Hello, World!\");",
    "int num1 = 10, num2 = 20, sum;",
    "sum = num1 + num2;",
    "System.out.println(\"Sum of these numbers: \" + sum);",
    "int[] arr = new int[10];",
    "for(int i = 0; i < arr.length; i++) {",
    "arr[i] = i * 2;",
    "System.out.println(arr[i]);",
    "}",
    "String str = \"Hello World\";",
    "str = str.toUpperCase();",
    "System.out.println(str);",
    "try {",
    "File file = new File(\"file.txt\");",
    "Scanner scanner = new Scanner(file);",
    "} catch (FileNotFoundException e) {",
    "e.printStackTrace();",
    "public class HelloWorld {",
    "public static void main(String[] args) {",
    "System.out.println(\"Hello, World!\");",
    "int num1 = 10;",
    "double num2 = 15.5;",
    "char myChar = 'a';",
    "boolean myBoolean = true;",
    "String myString = \"Hello\";",
    "int[] myArray = new int[10];",
    "myArray[0] = 5;",
    "for (int i = 0; i < 10; i++) {",
    "System.out.println(i);",
    "if (num1 > num2) {",
    "System.out.println(\"num1 is larger\");",
    "} else {",
    "System.out.println(\"num2 is larger\");",
    "ArrayList<String> myList = new ArrayList<String>();",
    "myList.add(\"Hello\");",
    "myList.add(\"World\");",
    "for (String str : myList) {",
    "System.out.println(str);",
    "try {",
    "int result = num1 / 0;",
    "} catch (ArithmeticException e) {",
    "e.printStackTrace();",
    "} finally {",
    "System.out.println(\"Done\");",
    "public void myMethod() {",
    "System.out.println(\"My Method\");",
    "return;"] // All possible phrases that can be generated
const typingText = document.getElementById("typing-text"); // The text the players are supposed to type
const typingBox = document.getElementById("typing-box"); // The textbox that the players type in
currentPhrase = "Loading..."; // The current phrase that is in the typingText
const url = "localhost:8085"; // the URL that the backend refers to
currentCar = 4; // The car that we are supposed to be controlling
localPos = 100; // The position of the car

//positions = getAPIData();
async function getAPIData() { // Function to get the players
    try {
        const response = await fetch(url+'/api/ptest/'); // getting the positions of the players from the backend
        console.log(response);
        const data = await response.json();

        // Extract positions and store in a list
        const positions = data.map(item => item.pos);

        return positions;
    } catch (error) {
        console.error('Error:', error);
    }
}

//Figure out which car to be. First one to be vacant should be chosen
async function chooseCar() {
    positions = await getAPIData(); // calls getAPIData to get the positions of the cares
    for(i = 0; i < 4; i++) {
        if(positions[i] == -1) { // if there's a car that's available, then the user takes control of that car (currentCar is set to the index of the available car)
            currentCar = i;
            console.log(currentCar);
            break;
        }
    }
}
chooseCar();

async function getAPIData2() { //function for extracting the phrases from backend
    try {
        const response = await fetch(url+'/api/phrases/');
        console.log(response);
        const data = await response.json();

        // Extract phrases and return it
        const phrases = data.map(item => item.joke);

        return phrases;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getPhrases() {// set the phrases to the newly fetched phrases from backend
    phrases = await getAPIData2();
}

getPhrases();

function nextPhrase() { //function for getting a new typingText
    randomIndex = Math.floor(Math.random() * phrases.length);
    typingText.textContent = phrases[randomIndex];
}

async function updatePosition(index, pos) { // function for updating the position of the players
    try {
        const response = await fetch(url+`/api/ptest/move/${index}/${pos}/`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


function checkTypingBox() { //funtion for checking typingBox with typingText
    if(typingBox.value == typingText.textContent) { // if they are equal, reset the typingBox and generate a new phrase.
        typingBox.value = "";
        nextPhrase();

        //Update pos in api
        localPos += 100;
        updatePosition(currentPosition, localPos)
    }
}

typingBox.addEventListener("input", checkTypingBox); // set checkTypingBox to run every time an input is made in the typingBox
nextPhrase(); //Choose first phrase to start