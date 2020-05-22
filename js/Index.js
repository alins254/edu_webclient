/*$(document).ready(function()    {
    $("#request_temp").click(function(e)    {
        $.ajax({
            type: 'GET',
            //url: 'http://api.openweathermap.org/data/2.5/weather?q=Cluj-Napoca&appid=ea1863083f37f636a3d408f54bc64c79',
            url: 'http://localhost:8080/listAllUsers',
            dataType: 'json',
            success: function(data){
                //$("#temp").attr("placeholder", data.get);
                var str;
                $.each(data, function (i, user) {
                    str = str + user.name + ", "+i;
                })
                $("#temp").attr("placeholder", str);
                //$("#temp").attr("placeholder", data[0].id);
            },
            error: function(){
                $("#temp").html("error")
            }

        });
    });
});*/

$(document).ready(function()    {
    $("#login").click(function(e)    {
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            url: 'http://localhost:8080/attemptLogin',
            dataType: "json",
            data: JSON.stringify({
                username: $("#username").val(),
                password: $("#password").val()
            }),
            success: function(response){
                if(response.object == null)
                    $('#login_error').html("<p>" + response.message + "</p>");
                else
                {
                    $('#login_error').html("");
                   switch (response.message) {
                       case "T_TEACHER": window.location.href = "teach.html?name="+response.object.name+"&id="+response.object.id; break;
                       case "T_STUDENT": window.location.href = "student.html?name="+response.object.name+"&id="+response.object.id; break;
                       case "T_ADMIN": window.location.href = "admin.html?name="+response.object.name+"&id="+response.object.id; break;
                   }

                }
                console.log(response);
            },
            error: function(){
               console.log("error");
            }

        });
    });


});

/* $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "teach.html?name="+response.object.name,
                        dataType: "json",
                        data: { id: response.object.id }, // or the string: 'id=1'
                        complete:
                            function () {
                                window.location = "teach.html?name="+response.object.name;
                            }

                    });*/