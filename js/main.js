var API_KEY =localStorage.getItem("API_KEY");//global api-key modified in ajax for general use
$(document).ready(function(){
    displayName() //load first when ready
    console.log("API-KEY is:" + API_KEY);
    /*===================================SIDE NAVBAR EVENT LISTENERS====================================================*/
    var $inboxTab = $('nav.nav1').children().children().eq(1).children().first();
    var clickCount = 0;  //click variable to make sure content doesn't append
    $inboxTab.on("focus",function(){
        clickCount += 1;
        if(clickCount == 1){
            getAllProjects(colorArray);
            getActiveTasks(API_KEY);//display active tasks in DOM
            $('section#inbox h3').show(1000);
            $('section#inbox span a').attr("href","/comment-page");
        }
        
    })
    $inboxTab.off("focus",function(){
        
        clickCount = 0; //reset
    })
    /*==========================================INBOX TAB EVENT LISTENERS============================================*/
    var $deleteIcon = document.querySelectorAll('div.accordion-body button#delete');
/*     $deleteIcon.addEventListener('focus',function(){
        alert("hello");
        // deleteProject(,API_KEY);
        // getAllProjects(colorArray);//call function again to reset the project List in DOM 
    },false);       
 */ var $editIcon = $('div.accordion-body button#update');
    $editIcon.on("click",function(e){
        e.preventDefault();
        alert('sup')
    });
});
/*===================================SIDE NAVBAR & AJAX FUNCTIONS====================================================*/
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
//Function for getting the colour
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
            <h2 class="accordion-header" id="flush-heading${i+1}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i+1}" aria-expanded="false" aria-controls="flush-collapse${i+1}">
              ${response[i].name}
              </button>
            </h2>
            <div id="flush-collapse${i+1}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i+1}" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
              <span data-tooltip="Add comment"><button id="comment"><ion-icon name="chatbox-ellipses-outline"></ion-icon></button></span>
              <span data-tooltip="Edit"><button id="update"><ion-icon name="create-outline"></ion-icon></button></span>
              <span data-tooltip="Delete"><button id="delete"><ion-icon name="trash-outline"></ion-icon></button></span>
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
        
        
        var projectList = $('body').children('section').children().eq(3).children('div#projects');
        projectList.append(content);
    })  
};


function deleteProject(deleteId,API_KEY){
    var settings = {
        "url":`https://api.todoist.com/rest/v1/projects/${deleteId}`,
        "method":"DELETE",
        "statusCode":{
            204:function(){
                alert(`Project Id:${deleteId} has been deleted!`);
            }
        },
        "headers":{
            "Authorization":`Bearer ${API_KEY}`
        }
    }
    $.ajax(settings).done(function(response){
        console.log(response);
        if(response  === undefined){
            alert(`Project ID:${deleteId} has been deleted successfully.`);
        }
    });
}


function getActiveTasks(API_KEY){
    var tasks ='';
    var settings = {
        "url":`https://api.todoist.com/rest/v1/tasks`,
        "method":"GET",
        "headers":{
            "Authorization":`Bearer ${API_KEY}`
        }
    }
    $.ajax(settings).done(function(response){
        console.log(response);
        for(let i =0;i<response.length;i++){
            tasks+=`<div class = "task-box"><div>
            <h4>${response[i].content}</h4></div><span>
            <div class="dropup">
        <a href="#" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"><span id ="due-date-string"><ion-icon name="calendar-outline"></ion-icon>${response[i].due.string}</span></a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
            <span><a><ion-icon name="chatbox-outline"></ion-icon>Comments</a></span></span>`

            tasks+='<span class = "three-dots"></span></div>'    //add the 'options' dots at the side using js later
            var dueDate = new Date(response[i].due.date).getTime()
            var currentDate = new Date().getTime()
            var datesLeft = Math.ceil((dueDate-currentDate)/ (1000 * 3600 * 24));
            console.log(datesLeft);
        }
        $('div#tasks').append(tasks);
        $('.dropdown.extra-options').detach().insertAfter('.three-dots');
        $('span.dropdown button').css("opacity","1");//show hidden dropdown shape from html after shifting over
        // $('span#due-date-string').prepend(``);
        // $('span#due-date-string div').append(``);
    });
    $('div.task-box').children().eq(1).children().eq(1).children('a').attr("href","#comments");
}
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
//Giving blue colour to active link
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
var logOutContent = `<section>
<div class="container">
    <div class="row align-items-center justify-content-center">
        <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_0fwl68.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
        <h6 class="text-center">Logging you out......Adios :)</h6>
    </div>
</div>
</section>`; //loading animation content
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
