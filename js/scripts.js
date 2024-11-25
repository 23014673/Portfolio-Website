/* Author: Hannah Bauer
Course: CGS2829.0M1
Date: 11/17/2024
Assignment: Final Project
*/

"use strict";

$(document).ready(() => {

    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

    $("#tabs").tabs();                                                              // jQuery UI Tabs

    $("#sourcesDialog").dialog({
        
        autoOpen: false
    });

    $("#openSourcesDialog").click(function() {
        
        $("#sourcesDialog").dialog("open");
    });

    $("#welcomeModal").dialog({
        autoOpen: true,
        
        modal: true,
        
        closeOnEscape: true,
        
        draggable: false,
        
        resizable: false,
        
        buttons: {

            "Close": function() {
                $(this).dialog("close");
            }
        }
    });


    function calculateNights() {                                                    // calculate / display dates
        
        const arrivalDate = $("#arrival_date").val();
        
        const departureDate = $("#departure_date").val();
        
        if (arrivalDate && departureDate) {
            const arrival = new Date(arrivalDate);
        
            const departure = new Date(departureDate);

            const timeDifference = departure - arrival;
            
            if (timeDifference < 0) {
                $("#departureDateError").text("Uh oh! Your departure date must be after the arrival date.").show();
                
                $("#nights").val('');
                
                return;
            }

            const daysDifference = timeDifference / (1000 * 3600 * 24);
            
            $("#nights").val(daysDifference);
            
            $("#departureDateError").hide();
        } 
        
        else {
            $("#nights").val('');
        }
    }

    $("#arrival_date, #departure_date").on("change", calculateNights);


    function setCookie(name, value, days) {                                         // create a cookie
        
        const date = new Date();
        
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        
        const expires = "expires=" + date.toUTCString();
        
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }


    function getCookie(name) {                                                       // use a cookie
        
        const nameEQ = name + "=";
        
        const ca = document.cookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            
            let c = ca[i];
        
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
        
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    const name = getCookie("name");
    
    const email = getCookie("email");
    
    const phone = getCookie("phone");


    if (name) {
        $("#name").val(name);
    }
    if (email) {
        $("#email").val(email);
    }
    if (phone) {
        $("#phone").val(phone);
    }

    
    $("#reservation_form").submit(function(event) {                                    // form validate and pattern check
        let isValid = true;
        
        const name = $("#name").val();
        
        const email = $("#email").val();
        
        const phone = $("#phone").val();
        
        const arrivalDate = $("#arrival_date").val();
        
        const departureDate = $("#departure_date").val();

        if (!name) {
            $("#name").next(".error").text("Uh oh! Please enter your name").show();
            isValid = false;
        } 
        
        else {
            $("#name").next(".error").hide();
        }

        if (!email || !emailPattern.test(email)) {
            $("#email").next(".error").text("Uh oh! Please enter a valid email address").show();
            
            isValid = false;
        } 
        
        else {
            $("#email").next(".error").hide();
        }

        if (!phone || phone.length !== 12 || !phone.match(/^(\d{3}-\d{3}-\d{4})$/)) {
            $("#phone").next(".error").text("Uh oh! Please enter a valid phone number").show();
            
            isValid = false;
        } 
        
        else {
            $("#phone").next(".error").hide();
        }

        if (!arrivalDate) {
            $("#arrivalDateError").text("Uh oh! Please select an arrival date").show();
            
            isValid = false;
        } 
        
        else {
            $("#arrivalDateError").hide();
        }

        if (!departureDate) {
            $("#departureDateError").text("Uh oh! Please select a departure date").show();
            
            isValid = false;
        } 
        
        else {
            $("#departureDateError").hide();
        }

        if (isValid) {
            setCookie("name", name, 7);

            setCookie("email", email, 7);
            
            setCookie("phone", phone, 7);
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
});