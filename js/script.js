$(document).ready(function(){
    let myData ={
        "name":"My first project!"
    }
    var settings = {
        "url":"https://api.todoist.com/rest/v1/projects",
        "method":"POST",
        "headers":{
            "Content-Type":"application/json",
            "Authorization":"Bearer 8b98c0d21ae1549ee1f64ae938064219c3c10a22"
            //"X-Request-Id":""
        },
        "data":JSON.stringify(myData)
    };
    $.ajax(settings).done(function(response){
        console.log(response);
    });
});