async function getCountries() {
	// Use public REST API
	var response = await fetch("https://restcountries.com/v3.1/all");
	var json = await response.json();
	return json; 
}

async function setCountry(countries) {
	// Get random country from the API
	var country = await getCountry(countries);	
	var capitalAnswer = country.capital[0];
	var capitalField = document.querySelector("#capital");
	var countryAnswer = country.name.common;
	var countryField = document.querySelector("#country");
	var inputField = document.querySelector("#input")
	var countryArrayGuess = Array(countryAnswer.length).fill("_ "); 
	var countryArray = countryAnswer.split('');
	var scoreField = document.querySelector("#score");
	
	// Init question
	document.querySelector("#capital").textContent = capitalAnswer;
	document.querySelector("#flag").src = country.flags.png;
	countryField.style.backgroundColor = "";
	inputField.removeAttribute("readonly");
	inputField.value = "";
	initBarProgress();

	// Guesser
	countryField.textContent = countryArrayGuess.join("").trimEnd();
	
	// Check typing from the user
	document.querySelector("#input").addEventListener("input", () => {
		console.log(1);
		var answerArray = inputField.value.split('');
	
		for (var i=0; i<countryArray.length; i++) {
			if (countryArray[i] === answerArray[i]) {
				countryArrayGuess[i] = answerArray[i];
			}
		}
		countryField.textContent = countryArrayGuess.join(" ");
		// Bingo
		if (inputField.value === countryAnswer) {
			countryField.style.backgroundColor = "lightgreen";
			inputField.setAttribute("readonly", "");
			scoreValue++;
			scoreField.textContent = scoreValue;
		}
	});
}

async function getCountry(countries) {
	// Get random country from the API
	var randomIndex = Math.floor(Math.random()*(countries.length))+1;
	return countries[randomIndex];	
}

// Bar progress
function initBarProgress() {
	var i = 0;
	var bar = document.querySelector("#bar");
	if (i == 0) {
		i = 1;
		var width = 100;
		var intervalId = setInterval(()=>{
			if (width<=0) {
				i = 0;
				clearInterval(intervalId);
			} else {
				width--;	
				bar.style.width = width + "%";	
			}
		}, 100);
	}
}

async function init() {
	document.addEventListener("click", async function a() {
		// First click on the modal
		if (initGame==0) {		
			initGame = 1;
			// Remove modal
			document.querySelector("#myModal").remove()
			// Get countries from the API
			var countries = await getCountries();
			setCountry(countries);
			// Start game
			intervalId = window.setInterval(() => setCountry(countries), 10000);
			window.setTimeout(()=> clearInterval(intervalId), 60000);
		}
	});
}

// Global variable for the flag of the modal, the intervalId, and the game value
var initGame = 0;
var intervalId;
var scoreValue = 0;

// Wait for correct loading of the DOM
document.addEventListener("DOMContentLoaded", init);
