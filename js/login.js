$(document).ready(function(){
    $('input#create-user-button').on('click',function(e){
        e.preventDefault();
        var $newUsername = $('form.sign-up-form').children().first().children('input#newUsername').val();
        var $newPassword = $('form.sign-up-form').children().eq(1).children('input#newPassword').val();
      
        userSignUp($newUsername,$newPassword);
    });

    $loginBtn = $('form.login-form').children().eq(2).children('input#login-button');
    $loginBtn.on("click",function(e){
        e.preventDefault();
        let $loginUsername = $('form.login-form').children().first().children('input:text#username').val();
        let $loginPassword = $('form.login-form').children().eq(1).children('input:password#password').val();
        userLogin($loginUsername, $loginPassword);
    });
});

function userSignUp(newUsername,newPassword){
    var userdata={
        "username":newUsername,
        "password":newPassword,
    }   
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ordinouserrecords-4526.restdb.io/rest/ordino-user-records",
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "601fe54e3f9eb665a168922e",
          "cache-control": "no-cache"
        },
        "data":JSON.stringify(userdata)
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
}

function userLogin($loginUsername,$loginPassword){
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
      
    $.ajax(settings).done(function(response){
        console.log(response);
        console.log(response.length);
        let userFound = 0;
        for(var i = 0;i<response.length;i++){
            let user = response[i];
            if(user.username ===$loginUsername  && user.password===$loginPassword){
                alert("login successful!");
                userFound += 1; //value becomes zero after user is found
                break;              
            }
            else if(userFound !== 1 && i === response.length - 1) {      //to avoid for loop repitition for each un-matching record
                alert("username or password is incorrect!Please check again!");
            }    

        }
    })
};