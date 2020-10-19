/*// JavaScript Document
var data1 = {
    action: 'is_user_logged_in'
};

jQuery.post(ajaxurl, data1, function (response) {
    if (response == 'yes') {
        window.location.replace("MainPage.html");
        document.getElementById("Error")
    }
});
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    window.location.replace("MainPage.html");
    document.getElementById('hello').insertAdjacentHTML = " " + profile.getGivenName();
}



*/