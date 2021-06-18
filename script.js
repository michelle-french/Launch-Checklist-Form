// Write your JavaScript code here!

// const button = document.getElementById("formSubmit");

function init () {

    const submitButton = document.getElementById("formSubmit");

    submitButton.addEventListener("click", function(event) {

      event.preventDefault();
       
      let pilotInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuelInput = document.querySelector("input[name=fuelLevel]");
      let cargoInput = document.querySelector("input[name=cargoMass]");

      let status = document.getElementById("launchStatus"); 
      let cargoLevel = document.getElementById("cargoStatus");
      let faultyItems = document.getElementById("faultyItems");
      let fuelLevel = document.getElementById("fuelStatus");
      let pilotName = document.getElementById("pilotStatus")
      let copilotName = document.getElementById("copilotStatus")

      let letters = /^[A-Za-z]+$/;

      if (pilotInput.value === "" || copilotInput.value === "" || fuelInput.value === "" || cargoInput.value === "") {
         alert("All fields required!!");
      }else if(isNaN(cargoInput.value) || isNaN(fuelInput.value) || !(pilotInput.value.match(letters)) || !(copilotInput.value.match(letters))){
         alert("Make sure to enter valid information for each field!");
      }else if(fuelInput.value < 10000) {
         faultyItems.style.visibility='visible';
         fuelLevel.innerHTML = (`Not enough fuel for this journey`);
         status.innerHTML = (`Shuttle not ready for launch`);
         status.style.color = "red";
      }else if(cargoInput.value > 10000) {
         faultyItems.style.visibility='visible';
         cargoLevel.innerHTML = (`Too much mass for the shuttle to launch`);
         status.innerHTML = (`Shuttle not ready for launch`);
         status.style.color = "red";
      }else{
         faultyItems.style.visibility=`visible`;
         pilotName.innerHTML = (`Pilot ${pilotInput.value} is ready for launch`);
         copilotName.innerHTML = (`Co-pilot ${copilotInput.value} is ready for launch`);
         status.innerHTML = (`Shuttle is ready for launch`);
         status.style.color = "green";
      }         
   })

   let json = [];
   this.fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
       response.json().then( function(json){
           let target = document.getElementById("missionTarget");
           target.innerHTML =`
           <h2>Mission Destination</h2>
           <ol>
               <li>Name: ${json[5].name}</li>
               <li>Diameter: ${json[5].diameter}</li>
               <li>Star: ${json[5].star}</li>
               <li>Distance from Earth: ${json[5].distance}</li>
               <li>Number of Moons: ${json[5].moons}</li>
           </ol>
           <img src="${json[5].image}"></img>`
       })
   })
}

// With validation, update a list of what is currently ready or not ready for the shuttle launch


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener("load", init)
