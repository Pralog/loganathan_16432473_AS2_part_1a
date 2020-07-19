/* Todo List */
window.onload = function () { 
    //variables 
    let form = document.getElementById("form");
    let input = document.getElementById("input");
    let btn = document.getElementById("btn");
    let list = document.getElementById("list");
    let btnClr = document.getElementById("btnClr");
    let id = 1;
    // listItem = {item: "todo item", checked: false}
    let liItem = "";
    let todoList = [];
    //button event listener
    btn.addEventListener("click", addTodoItem);
    
    //list event listener
    list.addEventListener("click", boxChecked);
    
    //event listener for clear list
    btnClr.addEventListener("click", clearList);

    // input.addEventListener("keydown", addTodoItem);
    

    
    if (localStorage.length < 0) {
    btnClr.style.display = "none"; //hide clear btn	
        console.log("button");
        }
    
        //checking localStorage has data
        if(localStorage.length <= 0) {
            btnClr.style.display = "none"; //hide clear btn	

        }
    
        //add todo item to list
	function addTodoItem() {
		if(input.value === "") {
			alert("You must enter some value!");
		}
		else {
			if(list.style.borderTop === "") {
				console.log("here!")
				list.style.borderTop = "2px solid white";
				btnClr.style.display = "inline";
			}
			let text = input.value;	
			let item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;				
			list.insertAdjacentHTML('beforeend', item);	
			liItem = {item: text, checked: false};
			todoList.push(liItem);		
			id++;
			addToLocalStorage();
			form.reset();
		}
	}    
        //adding string through style to list item
        function boxChecked(event) {
            const element = event.target;
            if (element.type === "checkbox") {
                element.parentNode.style.textDecoration = "line-through";
                todoList = JSON.parse(localStorage.getItem("todoList"));
                todoList[element.id.split('-')[1] - 1].checked = element.checked.toString();
                localStorage.setItem("todoList", JSON.stringify(todoList));
            }
        }

        //adding data to local storage
        function addToLocalStorage() {
            if (typeof (Storage) !== "undefined") {
                localStorage.setItem("todoList", JSON.stringify(todoList));
            } else {
                alert("browser doesn't support local storage!");
            }
        }
    
        //display all todo list
        function displayList() {
            list.style.borderTop = "2px solid white";
            todoList = JSON.parse(localStorage.getItem("todoList"));
            todoList.forEach(function (element) {
                console.log(element.item)
                let text = element.item;
                let item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;
                list.insertAdjacentHTML("beforeend", item);
                
                //if there is a checked box, then style
                if (element.checked) {
                    let li = document.getElementById("li-" + id);
                    li.style.textDecoration = "line-through";
                    li.childNodes[1].checked = element.checked;
                }
                id++;
            });
        }
    
        //clear list event listener
        function clearList() {
            todoList = [];
            localStorage.clear();
            list.innerHTML = "";
            btnClr.style.display = "none";
            list.style.borderTop = "";
        }
    }

  
//quote
    function genQuote() {
        let randNum = Math.floor(Math.random() * 8) + 1;
        document.getElementById('quote').innerHTML = quotes[randNum];
        let tweetQuote = quotes[randNum].split(' ').join('%20');
        tweetQuote = tweetQuote.split('<br>').join('');
        tweetQuote = "https://twitter.com/intent/tweet?text=" + tweetQuote.split('"').join('')
        $('.twitter-share-button').attr('href', tweetQuote);
    }
      
      let quotes = ["The Greatest Teacher, Failure is" - "Yoda", "\"Fear leads to self-doubt which is the worst enemy of creativity.\" - David Ogilvy",  "\"Only those who dare to fail greatly can ever achieve greatly.\"- Robert F. Kennedy", "\"All our dreams can come true, if we have the courage to pursue them.\"- Walt Disney", "\"Imitation is not just the sincerest form of flattery - it's the sincerest form of learning.\"- George Bernard Shaw", "\"There are no facts, only interpretations.\"-  Friedrich Wilhelm Nietzsche", "\"If you always put limit on everything you do, physical or anything else. It will spread into your work and into your life. There are no limits. There are only plateaus, and you must not stay there, you must go beyond them.\"- Bruce Lee", "\"In the midst of movement and chaos, keep stillness inside of you.\" - Deepak Chopra", ];

//weather
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

const weather = {};
weather.temperature = {
    unit : "celsius"
}
const KELVIN = 273;

const key = "41678f5c317ac16c4e60e08efcbbf2f8";


if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}


function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
    iconElement.innerHTML = `<img src="symbols/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } 
    
    else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

