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

    getMethod(colorArray);

});

function POSTmethod(){ //POST method
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
}

function getMethod(colorArray){
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



