/* Author: Hannah Bauer
Course: CGS2829.0M1
Date: 11/17/2024
Assignment: Final Project

localStorage: tab #5 will save and load user input using localStorage

*/

document.getElementById("saveTrip").addEventListener("click", function () {
    const trip = document.getElementById("trip").value;
    
    const savedTripMessage = document.getElementById("savedTripMessage");
        
    if (trip.trim() !== "") {
        localStorage.setItem("favoriteTrip", trip);
        
        savedTripMessage.textContent = "Saved!";
    } 
    
    else {
        savedTripMessage.textContent = "ERROR: Please enter a valid input.";
    }

    document.getElementById("savedTripBox").classList.add("show");
});
        
document.getElementById("loadTrip").addEventListener("click", function () {
    const savedTrip = localStorage.getItem("favoriteTrip");
    
    const savedTripMessage = document.getElementById("savedTripMessage");
        
    if (savedTrip) {
        savedTripMessage.textContent = `Your favorite trip: ${savedTrip}`;
    } 
    
    else {
        savedTripMessage.textContent = "ERROR: No trip saved.";
    }
        
    document.getElementById("savedTripBox").classList.add("show");
});