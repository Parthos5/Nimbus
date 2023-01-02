/*fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=Mumbai&appid=104062d89c3cf3aee67a746f02c7b0e7`
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));*/

/*Current Weather data link:
 https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=
 */

/*Weather forecast for 5 days
 https://api.openweathermap.org/data/2.5/forecast?lat=18.9387711&lon=72.8353355 
 */
let data;
let i = 0;

function store() {
  let search = document.getElementById("entercity");
  console.log(search.value);
  let a = search.value;
  console.log(a);

  //fetching data from the api
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${a}&appid=104062d89c3cf3aee67a746f02c7b0e7`
  )
    .then((response) => response.json())
    .then((data) => {
      let forecast = document.getElementById("daysdiv")
    //let weather = document.getElementById("newdiv");
      let info = document.getElementById("data");
      let city = document.getElementById("location");
      let test = data;


      //Claculating current time and date according to api format
      var currentTime = new Date();
      var currentHour = currentTime.getHours();  
      var currentDate = currentTime.toISOString().slice(0, 10);  //converting date to ISOs format
     
     /* const currentlime = new Date();
      const nextDate = new Date(currentlime);
      nextDate.setDate(currentlime.getDate() + 31);
      console.log("next date = ",nextDate);*/

      
      console.log("Hour =" + currentHour);
      console.log("date = "+currentDate);
      let ptime = time(currentHour);  //calling calculating time function giving final date
      console.log("api time ="+ptime);
      console.log(test);
      let pdate = find(ptime,currentDate,data.list); //finding our date in the list array of objects
      console.log("final dt-time = " + pdate);

      //converting data into std units received from api
      let output = toTitleCase(data.list[i].weather[0].description); //Description
      console.log(output);
      let temp = ktoc(data.list[i].main.temp).toFixed(1);
      let desc = ktoc(data.list[i].main.feels_like).toFixed(1);

      //inserting data into html
      info.innerHTML = `<div id="climate" class="climate">
                        <img class="climateimg" src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="" />
                        <h3 class="head">${output}</h3>
                      </div>
                      <h1 id="temp" class="temp">${temp}°C</h1>
                      <p class="desc">Feels like ${desc}°C</p>
                      `;
      city.innerHTML = `${data.city.name},${data.city.country}`;
      
     // forecast(data.list);
      forecast.innerHTML = `
      <div class="days">
          <p>Today</p>
          <img class="icon" src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="../imgs/clear-sky.png">
          <p class="prevtemp">${Math.round(temp)}°C</p>
        </div>

        <div class="days">
          <p>Wed 28</p>
          <img class="icon" src="https://openweathermap.org/img/wn/${data.list[i+8].weather[0].icon}@2x.png" alt="">
          <p class="prevtemp">${Math.round(ktoc(data.list[i+8].main.temp).toFixed(0))}°C</p>
        </div>

        <div class="days">
          <p>Wed 28</p>
          <img class="icon" src="https://openweathermap.org/img/wn/${data.list[i+16].weather[0].icon}@2x.png" alt="">
          <p class="prevtemp">${Math.round(ktoc(data.list[i+16].main.temp).toFixed(0))}°C</p>
        </div>

        <div class="days">
          <p>Wed 28</p>
          <img class="icon" src="https://openweathermap.org/img/wn/${data.list[i+24].weather[0].icon}@2x.png" alt="">
          <p class="prevtemp">${Math.round(ktoc(data.list[i+24].main.temp).toFixed(0))}°C</p>
        </div>

        <div class="days">
          <p>Wed 28</p>
          <img class="icon" src="https://openweathermap.org/img/wn/${data.list[i+32].weather[0].icon}@2x.png" alt="">
          <p class="prevtemp">${Math.round(ktoc(data.list[i+32].main.temp).toFixed(0))}°C</p>
        </div>
      `;
    })
    .catch((error) => console.log(error));
  /*if()
  data.list[1].main.temp
  {
  weather.setAttribute("style","background: linear-gradient(75deg,lightblue,lightgreen);")
  }
  else{
    weather.setAttribute("style","background: linear-gradient(75deg,lightblue,lightgreen);")
  }*/
}

//scrolling down automatically by clicking search button
document.getElementById("searchbtn").addEventListener("click", function () {
  document.getElementById("newdiv").scrollIntoView({
    behavior: "smooth",
    easing: "ease-out",
  });
});
//scrolling function ends

//FUNCTIONS NECESSARY FOR CONVERTING API VALUES

//1. converting words to titlecase
function toTitleCase(phrase) {
  // Split the phrase into an array of words
  let words = phrase.split(" ");
  // Iterate through each word
  for (let i = 0; i < words.length; i++) {
    // Get the current word
    let word = words[i];
    // Change the first letter to uppercase
    word = word.charAt(0).toUpperCase() + word.slice(1);
    // Replace the current word in the array with the modified word
    words[i] = word;
  }
  // Join the array of words back into a single phrase and return it
  return words.join(" ");
}
//titlecase function ends

//Kelvin to celsius conversion begins
function ktoc(kelvin) {
  return kelvin - 273.15;
}
//Kelvin to celsius conversion ends

//time conversion for temp starts
function time(time) {
  let rem = time % 3;
  if (rem === 0) {
    return time;
  } else if (rem === 1) {
    return time - 1;
  } else if (rem === 2) {
    return time + 1;
  }
}
//time conversion for temp ends

//finding the specific time in list starts
function find(time,date,listdate)
{
  //2022-12-30 21:00:00
  let newdate = date + " " + time +":00:00"
  console.log(newdate);
  for(i=0;i<40;i++)
  {
    if(newdate === listdate[i].dt_txt)
    {
      break;
    }
  }
}
//finding the specific time in list ends

//function to get date for upcoming forecast days starts
function forecast(data){
      let forecast = document.getElementById("daysdiv");
      const currentlime = new Date();
      const nextDate = new Date(currentlime);
      for(let l = 1;l<5;l++)
      {
      nextDate.setDate(currentlime.getDate() + l);
      console.log("next date = ",nextDate);
      }
}
//function to get date for upcoming forecast days ends


//more details function begins
const button = document.querySelector("#details");
const details = document.querySelector("#moredetails");

button.addEventListener("click", function() {
  console.log("heloovkmosvnom")
  details.classList.toggle("slide-in");
});

//more details function ends
