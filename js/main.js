var API_KEY =localStorage.getItem("API_KEY");//global api-key modified in ajax for general use
$(document).ready(function(){
    $('.toast').toast('show');  //initialise bootstrap toast
    getUserPoints();            //initialise user points from restdb
    var userPoints = localStorage.getItem("APPoints");
    displayName() //load first when ready
    console.log("API-KEY is:" + API_KEY);
    /*===================================SIDE NAVBAR EVENT LISTENERS====================================================*/
    var $inboxTab = $('nav.nav1').children().children().eq(1).children().first();
    var clickCount = 0;  //click variable to make sure content doesn't append
    $inboxTab.on("focus",function(){
        clickCount += 1;
        if(clickCount == 1){
            getAllProjects(colorArray);
            getActiveTasks(API_KEY,taskList);//display active tasks in DOM            $('section#inbox h3').show(1000);
            $('section#inbox span a').attr("href","/comment-page");
            $('.dropdown.extra-options').detach().appendTo('.three-dots');
            var accordionLength = document.querySelectorAll('.accordion-item');
        }
    })
    $inboxTab.off("focus",function(){
        alert("Ufffffff!")
        clickCount = 0; //reset
    })
    var $leaderBoardTab = $('nav.nav1').children().children().eq(1).children().eq(3);
    $leaderBoardTab.on('click',function(){
        
        getAllGameRecords();
    });
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
    $('a:contains("View Comments")').on('click',function(){         //when user clicks on view comments
        var selectedTaskName = $('[aria-expanded=true]').text().trim()
        console.log(selectedTaskName);
        $('h5.taskNameinModal').text(selectedTaskName);
    
    });
    $('a:contains("Add Comments")').on('click',function(){          //when user clicks on add comments
        var selectedTaskName = $('[aria-expanded=true]').text().trim()
        console.log(selectedTaskName);
        $('h5#tasknameaddcomments').text(selectedTaskName);
    
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
var pList =[]   //stored from API responses
var taskList = []
//Function for getting the projects
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
        var color = "";
        for(let i =0;i<response.length;i++){
            // if(response[i].hasOwnProperty("color")){
            //     color = response[i].color;
            // }
            pList = response;
           
            content += `<div class="accordion-item">
              <h2 class="accordion-header" id="flush-heading${i+1}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapses${i+1}" aria-expanded="false" aria-controls="flush-collapse${i+1}">
                ${response[i].name}
                </button>
              </h2>
              <div id="flush-collapses${i+1}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i+1}" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                <span data-tooltip="Add comment"><button id="comment"><ion-icon name="chatbox-ellipses-outline"></ion-icon></button></span>
                <span data-tooltip="Edit"><button id="update"><ion-icon name="create-outline"></ion-icon></button></span>
                <span data-tooltip="Delete"><button onclick = "getallproj(pList,API_KEY)" id="delete"><ion-icon name="trash-outline"></ion-icon></button></span>
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
        var projectList = document.getElementById("getallproj");
        projectList.innerHTML = content;
    })  
};
//Function for creating a project
$('button#addprojbtn').on("click",function(e){
    e.preventDefault();
    var projectName = $('input#inputProjectName').val();
    createNewProject(projectName, API_KEY);
});
function createNewProject(pName,API_KEY){ //POST method
    var projectInfo = {
        "name":pName
    }
    var settings = {
        "url":"https://api.todoist.com/rest/v1/projects",
        "method":"POST",
        "headers":{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
            //"X-Request-Id":""
        },
        "data":JSON.stringify(projectInfo)
    };
    $.ajax(settings).done(function(response){
        console.log(response);
        hideModal();
        function hideModal(){
            $("#addProj").modal('toggle');
        }
    })
}
//deleting a project
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
//creating a task
$('button#addtask').on("click",function(e){
    e.preventDefault();
    var taskName = $('input#inputTaskName').val();
    createNewTask(taskName, API_KEY, dueDate);
});
var dueDate = ''
$('input#task_datetime').on('blur',function(){
    dueDate = $('input#task_datetime').val()
    console.log(dueDate);
    console.log(new Date(dueDate).toISOString());
});
function createNewTask(taskName,API_KEY, dueDate){
    if(dueDate === '' || dueDate === undefined){
        alert("Empty")
    }
    var taskInfo = {
        "content":taskName,
        "due_date": dueDate,
        //"due_string": "tomorrow at 12:00", 
        "due_lang": "en", 
        "priority": 4
    } 
    var settings = {
        "url":`https://api.todoist.com/rest/v1/tasks`,
        "method":"POST",
        "headers":{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        "data":JSON.stringify(taskInfo)
    }
    $.ajax(settings).done(function(response){
       
        hideModal();
        function hideModal(){
            $("#addTask").modal('toggle');
        }
    });
}
//get active Task
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
        
        taskList = response;
        for(let i =0;i<response.length;i++){
            
            tasks+=`<div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading${i+1}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i+1}" aria-expanded="false" aria-controls="flush-collapse${i+1}">
              ${response[i].content}
              </button>
            </h2>
            <div id="flush-collapse${i+1}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i+1}" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
              <span style="padding-right: 20px;"><a data-bs-toggle="modal" data-bs-target="#calendarModal"><ion-icon name="calendar-outline"></ion-icon>${new Date (response[i].due.date).toDateString()}</a></span>
              <span style="padding-right: 20px;"><a data-bs-toggle="modal" data-bs-target="#commentmodal"><ion-icon name="chatbox-outline"></ion-icon>Add Comments</a></span></span>
              <span><a data-bs-toggle="modal" data-bs-target="#viewcomments"><ion-icon name="eye-outline"></ion-icon>View Comments</a></span></span>
              </div>
            </div>
          </div>`
          tasks+='<span class = "three-dots"></span></div>'    //add the 'options' dots at the side using js later
          var projectList = document.getElementById("getalltasks");
          projectList.innerHTML = tasks;
          var startdate = new Date (response[i].due.date).toDateString();
          startingDate = new Date(startdate);
          var todaysDate = new Date() ;
          var timeDiff=  startingDate.getTime() - todaysDate.getTime();
          var dayDiff = timeDiff / (1000 * 3600 * 24);
          dayDiff = Math.ceil(dayDiff);
          $("#daydiff").html(dayDiff);
          $("#duedate").html(startdate)        
  
        }

    });
   
    var d = $("[aria-expanded=true]").parent().next().children().children().first().children().text();
  
    $('accordion-body').children('span').first().on('focus',function(){
        alert('a');
    });
    $('#calendarModal h6.duedate').text(d);
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
  localStorage.clear(); //to clear previous user data,credentials to being carried forward to subsequent user.
}
function redirectToHome(){
    window.location.replace("index.html");
}
function displayName(){
    $('h4.topbannertext').last().text(`Welcome, ${localStorage.getItem('User')}!`);
}
//Reschedule calendar javascript 
$('#picker').daterangepicker({
    //minDate:new Date(initialdueDate),           
    minYear:new Date().getFullYear(),                                                    
    maxYear:(new Date().getFullYear())+1,   
    changeMonth: true,
    ranges: {
        'Today': [moment(), moment()],
        'Next 7 Days': [moment().add(7, 'days'), moment()],
        'Next 30 Days': [moment().add(30, 'days'), moment()],
    },
    singleDatePicker:true,
    showDropdowns:true,
    opens:'left',
    drops:'down'
});                                                
// Calendar for usual Add task features
// $('#task_datetime').daterangepicker({
//     //minDate:new Date(initialdueDate),           
//     minYear:new Date().getFullYear(),                                                    
//     maxYear:(new Date().getFullYear())+1,   
//     changeMonth: true,
//     ranges: {
//         'Today': [moment(), moment()],
//         'Next 7 Days': [moment().add(7, 'days'), moment()],
//         'Next 30 Days': [moment().add(30, 'days'), moment()],
//     },
//     singleDatePicker:true,
//     showDropdowns:true,
//     opens:'left',
//     drops:'down'
// });
var reschedulebutton = document.getElementById("reschedulebtn");
reschedulebutton.addEventListener('click', function(){
    var rescheduleDate  =  $('input#picker').val();
    rescheduleDate = new Date(rescheduleDate).toISOString(); // convert to ISO format
})    
$("#picker").hide();
function showCalendar(){
    $("#picker").show(1000);
}
function hideSection(){
    $('#inbox h4').hide();
    $("#getallproj").hide();
    $("#getalltasks").hide();
}
function showSection(){
    var $projectsHeader = $('div#getallproj').prev();
    var $tasksHeader = $('div#getalltasks').prev();
    $tasksHeader.hide().show(1700);
    $projectsHeader.hide().show(1000);
    $("#getallproj").hide().show(1500);
    $("#getalltasks").hide().show(2000);
}
function hideLeaderBoard(){
    $('#leaderboard').hide();
}
var pointsList =[]//declare array to be used for sequential leaderboard display
function showLeaderBoard(){
    sortUserPoints(pointsList);
    $('#leaderboard').show(1000);
}
function hideStore(){
    $('#store').hide(1000);
}
function showStore(){
    $('#store').show(1000);
    $('div.user-points h5').text(`APPoints:${localStorage.getItem("APPoints")}`);
}
function getUserPoints(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ordinouserrecords-4526.restdb.io/rest/ordino-user-records",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "601fe54e3f9eb665a168922e",
          "cache-control": "no-cache"
        }
    }
      
    $.ajax(settings).done(function (response) {
        for(let i =0;i<response.length;i++){
            let user = response[i];
            userPoints = user.APPoints;
            var Tier = user.Tier;
            if(API_KEY == user.API_KEY){
                localStorage.setItem("APPoints",user.APPoints); //get the current user APPoints
                break;
            }
            
        }
    });
}
//code gotten from W3Schools
//Get the button
var mybutton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function TopFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
/*=====================================JAVASCRIPT FOR THE GAMIFICATION FEATURES======================================================== */

// TIERS points
var tier1 = 10000;
var tier2 = 6000;
var tier3 = 2000;

var monthlyQuest =[
    {}, 
    {},
    {}
];
//APPoints variable will be stored in restdb -default 100
// basic points
var createTask = 30;
var deleteTask = -10;
var rescheduleTask = -100;
var completedTask = 80;

var createProject = 400;
var deleteProject = -200;

var quest = 200;
var startingDate = new Date('17/02/2021'); //will be done on a certain date to start points system 

var currentDate = new Date() ;

var timeDiff= currentDate.getTime() - startingDate.getTime();

var dayDiff = timeDiff / (1000 * 3600 * 24);

if (dayDiff == 90)
{
	//reset points system
	dayDiff = 0;
	startingDate = new Date();
	//reset all users' APPoints to 0
}
//adding points for creating task
function createTaskAddPoints(userPoints){
    userPoints = userPoints + 30;
    console.log(userPoints);
}
var count = 0;
var addtaskbtn = document.getElementById("addtask");
addtaskbtn.addEventListener('click', function(){
    count = count + 1;
    if(count == 1){
        createTaskAddPoints(userPoints);
    }
})
//creating project
function createProjectAddPoints(userPoints){
    userPoints = userPoints + 400;
    console.log(userPoints);
}
var count = 0;
var addprojbtn = document.getElementById("addprojbtn");
addprojbtn.addEventListener('click', function(){
    count = count + 1;
    if(count == 1){
        createProjectAddPoints(userPoints);
    }
})
//we have tested all the vairable but for some reason it does not work. We honestly dont know why.
function deleteProj(pList, API_KEY){
    var pname = $("[class= accordion-button]").text().trim();
    console.log(pList)
    for(var i = 0; i < pList.length; i++){
        console.log(pname)
        console.log(typeof API_KEY)
        if(pList[i].name  == pname){
            alert("Successfull deletion");
            deleteProject(pList[i].id, API_KEY);
            console.log(pList[i].id);
            break;
        }
    }
}
//main sort function gotten from w3schools
function sortUserPoints(pointsList){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ordinouserrecords-4526.restdb.io/rest/ordino-user-records",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "601fe54e3f9eb665a168922e",
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        for(let i =0;i<response.length;i++){
            let points = response[i].APPoints
            pointsList.push(points);
        }
        console.log(pointsList);
      });

    pointsList = pointsList.sort(function(a, b){return b-a}); //w3schools
}
function getAllGameRecords(){ //for the leaderboard ranking
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ordinouserrecords-4526.restdb.io/rest/ordino-user-records",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "601fe54e3f9eb665a168922e",
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        var tableContent = "";
        for(let x =0 ;x<pointsList.length;x++){
            for(let i =0;i<response.length;i++){
                let user = response[i];
                var Tier = user.Tier;
                if (Tier == 0){
                    Tier = "NA"
                }    
                if(user.APPoints == pointsList[x]){
                    tableContent+=`<tr>
                    <th scope="row">${i+1}</th>
                    <td>${user.username}</td>
                    <td>${user.APPoints}</td>
                    <td>${Tier}</td>
                  </tr>`
        
                }
            }
        }
        $('#leaderboard table').children('tbody').html(tableContent);
      });

}
function updatePoints(calculatedPoints,API_KEY){
    var idReference = {
        "69240a14af7f11d150b64bc00c5558cba3741041":"6022a234e4ccd46b0001c90f",
        "9ffb6de49236f049524d53010b0fe7e1b55a9175":"60263ad8b0bc995a0001b52f",
        "091ba9ad13fb753c014adf401afbc0b3ce476db2":"60263bf6b0bc995a0001b549",
        "74829a769468751c27ce5dbf7c162c31c6972322":"6020a5d3e4ccd46b000050ee"
    };    
    var jsondata = {
        "APPoints":calculatedPoints       
    };
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://ordinouserrecords-4526.restdb.io/rest/ordino-user-records/${idReference[API_KEY]}`,
        "method": "PUT",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "601fe54e3f9eb665a168922e",
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
    };
      
    $.ajax(settings).done(function(response) {
        console.log(response);
    });
}
//js to cycle through the different month rewards

if (currentDate.getMonth() >= 1 && currentDate.getMonth() <= 3){                     //cycle 1
    hideCycle2();
    hideCycle3();
}
else if(currentDate.getMonth() >= 5 && currentDate.getMonth() <= 7){                //cycle 2
    hideCycle1();
    hideCycle3();
}
else if (currentDate.getMonth() >=9 && currentDate.getMonth()<=11){                  //cycle 3
    hideCycle1();
    hideCycle2();
}
else{
    //break months no quests or rewards i.e April,August,December
}
function hideCycle1(){
    $('div#store').children('.row').eq(1).css("display","none");
    $('div#store').children('.row').eq(2).css("display","none");
}
function hideCycle2(){
    $('div#store').children('.row').eq(2).css("display","none");
    $('div#store').children('.row').eq(3).css("display","none");

}
function hideCycle3(){
    $('div#store').children('.row').eq(4).css("display","none");
    $('div#store').children('.row').eq(5).css("display","none");
}
function displayAwardTips(){
    $('.toast-body button').hide(900);
    var tips = '<ol><li>You have to gain more points by completing more tasks.</li><li>Aim for a higher tier</li><li>Less is More,do lesser tasks each day.</li><li>Remember,consistency is key!</li><li>Lastly,Earn your reward!</li></ol>'
    $('div.toast-body').append(tips);
}
$('.flip-card').on("focus",function(){
    $thatPrice
    if(user.APPoints>= $thatPrice & user.Tier == $thatTier){
        //purchase success
    }
    else{
        $('.toast-container').show();
    }
});
for(var i = 0; i < $('.cardbg').length; i++){
    $('.user-points').next().next().children().eq(i).on('click', function(){
        $(this).hide(1000);
        $(this).children().eq(0).css('display','block');
        $(this).children().eq(4).addClass("d-grid gap-2 col-6 mx-auto");
        $(this).show(1000);
    })
}


prizeList = {
"Cable Car Voucher":{"path":"assets/CableCar.gif","price":"8000"},
"FairPrice Voucher $35":{"path":"assets/shopping_cart.jpg","price":"4500"},
"Bubble Tea Voucher ($5)":{"path":'<lottie-player src="https://assets1.lottiefiles.com/packages/lf20_NiUhhS.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>'
,"price":"900"},
"Jewel lounge Entry For 1":{"path":"assets/Jewel-lounge.jpg","price":"8000"},
"Pastamania Voucher":{"path":"assets/pasta-image.jpg","price":"3000"},
" McDonalds Coupon ($7)":{"path":'<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_cXVf2b.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>',"price":"1000"},
" Singapore Zoo tickets for 2":{"path":'<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_lb6Gsk.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>'
,"price":"7000"},
"Andes By Astons Voucher($20)":{"path":"assets/andes_by_astons.jpg","price":"2500"},
"7-11 Voucher($5)":{"path":"assets/7-eleven_logo.svg.png","price":"800"}
}

// $(btn).on('click',function(prizeList,userPoints){
//     getName;
//     for(let i in prizeList){
//         if(prizeList[i] == getName){
//             var voucherCost = prizeList[i].price;
//             if(userPoints >= voucherCost){
//                 userPoints -= voucherCost;
//             }
//             else{
//                 //display alert toast
//             }
//         }
//     }
// });

