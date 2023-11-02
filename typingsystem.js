//TO-DO: Get the phrases from the API immediately and save them
const phrases = ["public class HelloWorld {","public static void main(String[] args) {","System.out.println(\"Hello, World!\");","int num1 = 10, num2 = 20, sum;","sum = num1 + num2;","System.out.println(\"Sum of these numbers: \" + sum);","double num = -10.5;","double result;","result = Math.abs(num);","System.out.println(\"The absolute value of \" + num + \" is: \" + result);","int[] numbers = new int[10];","for (int i = 0; i < numbers.length; i++) {","numbers[i] = i + 1;","System.out.println(numbers[i]);","String str1 = \"Java\", str2 = \"Programming\";","String str3 = str1.concat(str2);","public class HelloWorld {","public static void main(String[] args) {","System.out.println(\"Hello, World!\");","int num1 = 10, num2 = 20, sum;","sum = num1 + num2;","System.out.println(\"Sum of these numbers: \" + sum);","int[] arr = new int[10];","for(int i = 0; i < arr.length; i++) {","arr[i] = i * 2;","System.out.println(arr[i]);","}","String str = \"Hello World\";","str = str.toUpperCase();","System.out.println(str);","try {","File file = new File(\"file.txt\");","Scanner scanner = new Scanner(file);","} catch (FileNotFoundException e) {","e.printStackTrace();","public class HelloWorld {","public static void main(String[] args) {","System.out.println(\"Hello, World!\");","int num1 = 10;","double num2 = 15.5;","char myChar = 'a';","boolean myBoolean = true;","String myString = \"Hello\";","int[] myArray = new int[10];","myArray[0] = 5;","for (int i = 0; i < 10; i++) {","System.out.println(i);","if (num1 > num2) {","System.out.println(\"num1 is larger\");","} else {","System.out.println(\"num2 is larger\");","ArrayList<String> myList = new ArrayList<String>();","myList.add(\"Hello\");","myList.add(\"World\");","for (String str : myList) {","System.out.println(str);","try {","int result = num1 / 0;","} catch (ArithmeticException e) {","e.printStackTrace();","} finally {","System.out.println(\"Done\");","public void myMethod() {","System.out.println(\"My Method\");","return;"]
const typingText = document.getElementById("typing-text");
const typingBox = document.getElementById("typing-box");
currentPhrase = "Loading...";

//Figure out which car to be. First one to be vacant should be chosen
currentPosition = 4;
//positions = getAPIData();
async function getAPIData() {
    try {
        const response = await fetch('http://localhost:8085/api/ptest/');
        console.log(response);
        const data = await response.json();

        // Extract positions and store in a list
        const positions = data.map(item => item.pos);

        return positions;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function chooseCar() {
    positions = await getAPIData();
    for(i = 0; i < 4; i++) {
        if(positions[i] == -1) {
            currentPosition = i;
            console.log(currentPosition);
            break;
        }
    }
}
chooseCar();
localPos = 100;

async function getAPIData2() {
    try {
        const response = await fetch('http://localhost:8085/api/jokes/');
        console.log(response);
        const data = await response.json();

        // Extract positions and store in a list
        const positions = data.map(item => item.pos);

        return positions;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getPhrases() {
    phrases = await getAPIData2();
}

getPhrases();

function nextPhrase() {
    randomIndex = Math.floor(Math.random() * phrases.length);
    currentPhrase = phrases[randomIndex];
    typingText.textContent = currentPhrase;
}

async function updatePosition(index, pos) {
    const url = `http://localhost:8085/api/ptest/move/${index}/${pos}/`;
    try {
        const response = await fetch(url, {
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


function checkTypingBox() {
    if(typingBox.value == currentPhrase) {
        typingBox.value = "";
        nextPhrase();

        //Update pos in api
        localPos += 100;
        updatePosition(currentPosition + 55, localPos)
    }
}

typingBox.addEventListener("input", checkTypingBox);
nextPhrase(); //Choose first phrase to start