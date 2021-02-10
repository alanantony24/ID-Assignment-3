$(document).ready(function(){
    var username = localStorage.getItem('User');
    var $dropdown = $('div.dropdown').children().first();
    var avatarDiv = `<div style = "display:inline">${username}</div>  `;
    $dropdown.html(avatarDiv);
    var firstChar = username[0].toUpperCase();
    $dropdown.prepend(`<div>${firstChar}</div>`);
    $avatar = $dropdown.children().first(); 
    $avatar.addClass('avatar'); //styling the user avatar 
});
var logOutContent =  `
<div class ="row justify-content-center align-self-center">
<div class = "col-xs-10 col-md-4">
    <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_0fwl68.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player></div>
</div>
<div class ="row justify-content-center align-self-center">
<div class = "col-xs-10 col-md-4">
    Please wait while we log you out . . .
</div>
</div>`; //loading animation content
function logOutUser(logOutContent){
    $('section.ordino-dashboard').remove();
    $('body').prepend(logOutContent);
    setTimeout(redirectToHome,2500)
}
function redirectToHome(){
    window.location.replace("index.html");
}