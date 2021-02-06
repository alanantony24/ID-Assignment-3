$(document).ready(function(){
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
});

function createNewProject(pName){ //POST method
    var projectInfo = {
        "name":pName
    }
    var settings = {
        "url":"https://api.todoist.com/rest/v1/projects",
        "method":"POST",
        "headers":{
            "Content-Type":"application/json",
            "Authorization":"Bearer 8b98c0d21ae1549ee1f64ae938064219c3c10a22"
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
            "Authorization":"Bearer 8b98c0d21ae1549ee1f64ae938064219c3c10a22"
            
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

function getOneProject(targetId){
    
   
    var settings =
    {
        "url":`https://api.todoist.com/rest/v1/projects/${targetId}`,
        "method":"GET",
        "headers":{
            "Content-Type":"application/json",
            "Authorization":"Bearer 8b98c0d21ae1549ee1f64ae938064219c3c10a22"
        }

    }
    $.ajax(settings).done(function(response){
        console.log(response);
    });

}


function createNewTask(taskName){
    var taskInfo = {
        "content":taskName,
        
        "due_string": "tomorrow at 12:00", 
        "due_lang": "en", 
        "priority": 4
    } 
    var settings = {
        "url":`https://api.todoist.com/rest/v1/tasks`,
        "method":"POST",
        "headers":{
            "Content-Type":"application/json",
            "Authorization":"Bearer 8b98c0d21ae1549ee1f64ae938064219c3c10a22"
        },
        "data":JSON.stringify(taskInfo)
    }
    $.ajax(settings).done(function(response){
        console.log(response);
    });
}
function deleteProject(deleteId){
    var settings = {
        "url":`https://api.todoist.com/rest/v1/projects/${deleteId}`,
        "method":"DELETE",
        "headers":{
            "Authorization":"Bearer 8b98c0d21ae1549ee1f64ae938064219c3c10a22"
        }
    }
    $.ajax(settings).done(function(response){
        console.log(response);
        if(response  === undefined){
            alert(`Project ID:${deleteId} has been deleted successfully.`);
        }
    });
}
function updateActiveProject(pId,updatedName){
    updatedInfo = {
        "name":updatedName
    }
    var settings = {
        "url":`https://api.todoist.com/rest/v1/projects/${pId}`,
        "method":"POST",
        "headers":{
            "Content-Type": "application/json",
            "Authorization":"Bearer 8b98c0d21ae1549ee1f64ae938064219c3c10a22"
        },
        
        "data":JSON.stringify(updatedInfo)
    }
    $.ajax(settings).done(function(response){
        console.log(response);

    });
}