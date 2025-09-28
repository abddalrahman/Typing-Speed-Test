let typing_div = document.querySelector('.typing-test');
typing_div.style.display ='block';
const words = [
	"Hello",
	"Programming",
	"Code",
	"Javascript",
	"Town",
	"Country",
	"Testing",
	"Youtube",
	"Linkedin",
	"Twitter",
	"Github",
	"Leetcode",
	"Internet",
	"Python", 
	"Scala",
	"Destructuring",
	"Paradigm",
	"Styling",
	"Cascade",
	"Documentation",
	"Coding",
	"Funny",
	"Working",
	"Dependencies",
	"Task",
	"Runner",
	"Roles",
	"Test",
	"Rust",
	"Playing"
];

const lvls = {
	"Easy": 7,
	"Normal": 5,
	"Hard": 3
};
let select_level = document.querySelector('#level-select');
let select_val = select_level.value;
let defaultLevelName = select_val;
let defaultLevelSeconds = lvls[defaultLevelName];

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

input.onpaste = function () {
	return false;
}
let is_gmae_started = 0;
select_level.addEventListener('input',(e)=>{
	if(is_gmae_started == 0){
		defaultLevelName = e.target.value;
		defaultLevelSeconds =lvls[defaultLevelName];
		lvlNameSpan.innerHTML = defaultLevelName;
		secondsSpan.innerHTML = defaultLevelSeconds;
		timeLeftSpan.innerHTML = defaultLevelSeconds;
		scoreTotal.innerHTML = words.length;
	}
});
	
startButton.onclick = function () {
	this.remove();
	input.focus();
	is_gmae_started = 1;
	genWords();
}

function genWords() {
	let randomWord = words[Math.floor(Math.random() * words.length)];
	let wordIndex = words.indexOf(randomWord);
	words.splice(wordIndex, 1);
	theWord.innerHTML = randomWord;
	upcomingWords.innerHTML = '';
	for (let i = 0; i < words.length; i++) {
		let div = document.createElement("div");
		let txt = document.createTextNode(words[i]);
		div.appendChild(txt);
		upcomingWords.appendChild(div);
	}
	
	startPlay();
}

function startPlay() {
	timeLeftSpan.innerHTML = defaultLevelSeconds;
	let start = setInterval(() => {
		timeLeftSpan.innerHTML--;
		if (timeLeftSpan.innerHTML === "0") {
			clearInterval(start);
			if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
				input.value = '';
				scoreGot.innerHTML++;
				if (words.length > 0) {
					genWords();
				} else {
					let span = document.createElement("span");
					span.className = 'good';
					let spanText = document.createTextNode("Congratz");
					span.appendChild(spanText);
					finishMessage.appendChild(span);
					let link = document.createElement("a");
					link.setAttribute("href","index.html");
					let linkText = document.createTextNode("Play Again");
					link.appendChild(linkText);
					finishMessage.appendChild(link);
					upcomingWords.remove();
				}
			} else {
				let span = document.createElement("span");
				span.className = 'bad';
				let spanText = document.createTextNode("Game Over");
				span.appendChild(spanText);
				finishMessage.appendChild(span);
				let link = document.createElement("a");
				link.setAttribute("href","index.html");
				let linkText = document.createTextNode("Play Again");
				link.appendChild(linkText);
				finishMessage.appendChild(link);
			}
		}
	}, 1000);
}