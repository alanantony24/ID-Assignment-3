var API_KEY =localStorage.getItem("API_KEY");//global api-key modified in ajax for general use
$(document).ready(function(){
    console.log("API-KEY is:" + API_KEY);
    var username = localStorage.getItem('User');
    var $dropdown = $('div.dropdown').children().first();
    var avatarDiv = `<div style = "display:inline">${username}</div>  `;
    $dropdown.html(avatarDiv);
    var firstChar = username[0].toUpperCase();
    $dropdown.prepend(`<div>${firstChar}</div>`);
    $avatar = $dropdown.children().first(); 
    $avatar.addClass('avatar'); //styling the user avatar 


    /*===================================SIDE NAVBAR EVENT LISTENERS====================================================*/
    // var $projectsTab = document.querySelector("#navmenu ul li:nth-child(3) a");
    // $projectsTab.addEventListener("hover",function(){
    //     alert("yoo");
    //     getAllProjects();
    // },false);
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
var navtab = document.getElementById("menuicon");
var navmenu = document.getElementById("navmenu");
navmenu.style.left = "-250px"
navtab.onclick = function(){
    if(navmenu.style.left == "-250px"){
        navmenu.style.left = "0";
    }
    else{
        navmenu.style.left = "-250px"
    }
}




/*===================================SIDE NAVBAR AJAX FUNCTIONS====================================================*/

var colorArray = 
    {
        30:"#b8256f",
        31:"#db4035",
        32:"#ff9933",
        33:"#fad000",
        34:"#afb83b",           
        35:"#7ecc49",
        36:"#299438",
        37:"#6accbc",
        38:"#158fad",
        39:"#14aaf5",
        40:"#96c3eb",
        41:"#4073ff",
        42:"#884dff",
        43:"#af38eb",
        44:"#eb96eb",
        45:"#e05194",
        46:"#ff8d85",
        47:"#808080",
        48:"#b8b8b8",
        49:"#ccac93"
    }
function getAllProjects(colorArray){
    var content = "";
    var settings = {
        "url":"https://api.todoist.com/rest/v1/projects",
        "method":"GET",
        "headers":{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
            
        }
        
    };
    $.ajax(settings).done(function(response){
        console.log(response);
        // for (let i = 30;i<50;i++){
        //     if(i == response[4].color){
        //         $('section.main div').attr("style",`background-color:${colorArray[i]};`);
        //     }
        // }
        var color = "";
        for(let i =0;i<response.length;i++){
            if(response[i].hasOwnProperty("color")){
                color = response[i].color;
            }
            content+=`<div class = "project-item"> <span>${response[i].name}</span>
            <span class = "project-color"></span></div>`;
            if(color !== ""){
                $('.project-color').css('background-color',`${colorArray[color]}`.toString());
                console.log(colorArray[color]);
            }
        }
        var projectList = $('section#projects');
        projectList.html(content);
    })
        
};
