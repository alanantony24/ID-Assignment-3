var API_KEY =localStorage.getItem("API_KEY");//global api-key modified in ajax for general use
$(document).ready(function(){
    displayName() //load first when ready
    console.log("API-KEY is:" + API_KEY);
    var username = localStorage.getItem('User');
    var $dropdown = $('div.dropdown').children().first();
    var avatarDiv = `<div style = "display:inline">${username}</div>  `;
    $dropdown.html(avatarDiv);
    var firstChar = username[0].toUpperCase();
    $dropdown.prepend(`<div>${firstChar}</div>`);
    $avatar = $dropdown.children().first(); 
    $avatar.addClass('avatar'); //styling the user avatar 

    1
    /*===================================SIDE NAVBAR EVENT LISTENERS====================================================*/
    // var $projectsTab = document.querySelector("#navmenu ul li:nth-child(3) a");
    // $projectsTab.addEventListener("hover",function(){
    //     alert("yoo");
    //     getAllProjects();
    // },false);
    var $inboxTab = $('nav.nav1').children().children().eq(1).children().first();
    var clickCount = 0;  //click variable to make sure content doesn't append
    $inboxTab.on("focus",function(){
        clickCount += 1;
        if(clickCount == 1){
            getAllProjects(colorArray);
        }
        
    })
    $inboxTab.off("focus",function(){
        
        clickCount = 0; //reset
    })
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
    var content = '<div class="accordion accordion-flush" id="accordionFlushExample"></div>';
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
            content += `<div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              ${response[i].name}
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
              <ion-icon name="chatbox-ellipses-outline"></ion-icon>
              <ion-icon name="create-outline"></ion-icon>
              <ion-icon name="trash-outline"></ion-icon>
              </div>
            </div>
          </div>`
            // content+=`<div class = "project-item"> <span><h4>${response[i].name}</h4></span>
            // <span class = "project-color"></span></div>`;
            if(color !== ""){
                $('.project-color').css('background-color',`${colorArray[color]}`.toString());
                console.log(colorArray[color]);
            }
        }
        

        var projectList = $('body').children('section').children().eq(3);
        projectList.append(content);
        if($('div.accordion-body').children().eq(1).attr('name')==="create-outline"){
            alert("raaaar");
        }
    })  
};
//Side Anvigation and Banner
const showMenu = (toggleId, navbarId, bodyId)=>{
    const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId);
    if(toggle && navbar){
        toggle.addEventListener('click', ()=>{
            navbar.classList.toggle('expander')
            bodypadding.classList.toggle('body-pd')
        })
    }
}
showMenu('nav-toggle', 'navbar', 'body-pd')
const linkcolor = document.querySelectorAll('.nav__link');
function colorLink(){
    linkcolor.forEach(l => l.classList.remove('active'))
    this.classList.add('active')
}
linkcolor.forEach(l => l.addEventListener('click', colorLink))
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})
//Log OUt
var logOutContent =  `
<div class ="row justify-content-center">
<div class = "col-xs-10 col-md-4">
    <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_0fwl68.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player></div>
</div>
<div class ="row justify-content-center">
<div class = "col-xs-10 col-md-4">
    Please wait while we log you out . . .
</div>
</div>`; //loading animation content
function logOutUser(logOutContent){
  let $mainPage =$('body#body-pd').children().first(); 
  $mainPage.remove();
  $('body').prepend(logOutContent);
  setTimeout(redirectToHome,2500);
}
function redirectToHome(){
    window.location.replace("index.html");
}
function displayName(){
    $('h4.topbannertext').last().text(`Welcome, ${localStorage.getItem('User')}!`);
}

