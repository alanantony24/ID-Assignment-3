$(document).ready(function(){
 
    var targetId = "";
    $('input#Project-Id').focus(function(){
        targetId = $('input#Project-Id').val();
    })
    $('input#submit-Id').on("click",function(e){
        e.preventDefault();
        getOneProject(targetId);
    });
    $('input#create-task').on("click",function(e){
        e.preventDefault();
        var taskName = $('input#new-task').val();
        createNewTask(taskName);
    });

    $('input#create-project').on("click",function(e){
        e.preventDefault();
        var projectName = $('input#new-project').val();
        createNewProject(projectName);
        
    });

    $('input#delete-button').on("click",function(e){
        e.preventDefault();
        var deleteId = $('input#delete-Id').val();
        
        //deleteId.substr(deleteId.indexOf("%"),1);
        console.log(deleteId);
        deleteProject(deleteId);
        
    })
    var $updateBtn =$('.update-project').children('form').children(':submit');

    $updateBtn.on('click',function(e){
        e.preventDefault();
        var existingId = $('.update-project').children('form').children('input#update-id').val();
        var updatedName = $('.update-project').children('form').children('input#update-name').val();
        updateActiveProject(existingId,updatedName);

    });
    $('input#sign-up').on('click',function(e){
        e.preventDefault();
        var newUsername = $('input#newUsername').val();
        var newPassword = $('input#newPassword').val();
        userSignUp(newUsername,newPassword);
    });

    $loginBtn = $('.test-login input:submit#login');
    $loginBtn.on('click',function(e){
        let $loginUsername = $('.test-login input:text#username').val();
        let $loginPassword = $('.test-login input:password#password').val()    
        e.preventDefault();
        userLogin($loginUsername, $loginPassword);
    });
    /*================================================================NEW EVENT LISTENERS FOR TASKS API ==========================================*/
    $("input#search-task").on("click",function(e){
        e.preventDefault();
        let $targetTask = $("input#task-id").val();
        deleteTask($targetTask);
    });
    $('input#update-button').on("click",function(e){
        e.preventDefault();
        let updatingTaskId = $('input#update-task-id').val();
        let updatedContent = $('input#new-content').val();
        updateTask(updatingTaskId,updatedContent);
    });
    $('input#complete-button').on("click",function(e){
        e.preventDefault();
        let completedTask = $('input#completing-task-id').val();
        closeTask(completedTask);
    });
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
    })
}

function getAllProjects(){
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


    })
        
};

function getOneProject(targetId,API_KEY){
    
   
    var settings =
    {
        "url":`https://api.todoist.com/rest/v1/projects/${targetId}`,
        "method":"GET",
        "headers":{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        }

    }
    $.ajax(settings).done(function(response){
        console.log(response);
    });

}

function createNewTask(taskName,API_KEY){
    var taskInfo = {
        "content":taskName,
        
        //"due_date":'2021-05-29',
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
        console.log(response);
    });
}



function updateActiveProject(pId,updatedName,API_KEY){
    updatedInfo = {
        "name":updatedName
    }
    var settings = {
        "url":`https://api.todoist.com/rest/v1/projects/${pId}`,
        "method":"POST",
        "headers":{
            "Content-Type": "application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        
        "data":JSON.stringify(updatedInfo)
    }
    $.ajax(settings).done(function(response){
        console.log(response);

    });
}




/*============  NEW FUNCTIONS FOR TASKS REST API ADDED BELOW==========================*/

function getOneTask(activeTask,API_KEY){          //get tasks only works for ACTIVE tasks
    var settings={
        "url":`https://api.todoist.com/rest/v1/tasks/${activeTask}`,
        "method":"GET",
        "headers":{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        }
    }
    $.ajax(settings).done(function(response){
        console.log(response);
    });
}

function deleteTask(deletingTask,API_KEY){          //get tasks only works for ACTIVE tasks
    var settings={
        "url":`https://api.todoist.com/rest/v1/tasks/${deletingTask}`,
        "method":"DELETE",
        "statusCode":{
            204:function(){
                alert(`Task Id:${deletingTask} has been deleted!`);
            }
        },
        "headers":{
            
            "Authorization":`Bearer ${API_KEY}`
        }
    }
    $.ajax(settings).done(function(response){
        console.log(response);
       
    });
}

function updateTask(updatingTaskId,updatedContent,API_KEY){
    var updatedInfo ={
        "content":updatedContent
    }
    var settings = {
        "url":`https://api.todoist.com/rest/v1/tasks/${updatingTaskId}`,
        "method":"POST",
        "statusCode":{
            204:function(){
                alert(`Task:${updatingTaskId} updated successfully!`);
            }
        },
        "headers":{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        "data":JSON.stringify(updatedInfo)
    }
    $.ajax(settings).done(function(response){
        
    });
}

function closeTask(closingTaskId){
    var settings = {
        "url":`https://api.todoist.com/rest/v1/tasks/${closingTaskId}/close`,
        "method":"POST",
        "statusCode":{
            204:function(){
                alert(`Task Id :${closingTaskId} has been successfully closed!`);
            }
        },
        "headers":{
            "Authorization":`Bearer ${API_KEY}`
        }
    }
    $.ajax(settings).done(function(response){

    });
}
function createSection(sectionName,projectID,API_KEY){
    var sectionInfo = {
        "project_id":`${projectID}`,
        "name":`${sectionName}`
    }
    var settings = {

        "url":'https://api.todoist.com/rest/v1/sections',
        "method":"POST",
        "headers":{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        "data":JSON.stringify(sectionInfo)
    }
    $.ajax(settings).done(function(){

    });
}

function deleteSection(sectionId,API_KEY){
    var settings = {
        "url":`https://api.todoist.com/rest/v1/sections/${sectionId}`,
        "method":"DELETE",
        "headers":{
            "Authorization": `Bearer ${API_KEY}`
        }
    }
    $.ajax(settings).done(function(){

    });
}
function updateSection(sectionID,newSectionName,API_KEY){
    var updateInfo = {
        "name":`${sectionName}`
    }
    var settings = {

        "url":`https://api.todoist.com/rest/v1/sections/${sectionID}`,
        "method":"POST",
        "headers":{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        "data":JSON.stringify(updateInfo)
    }
    $.ajax(settings).done(function(){

    });
}
