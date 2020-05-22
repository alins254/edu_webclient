var adminName;
var adminId;

function listUsers()
{
    $.ajax({
        type: 'GET',
        contentType: "application/json",
        url: 'http://localhost:8080/listAllUsers',
        dataType: "json",
        success: function (data) {
            var str = "";
            $.each(data, function (i, user) {
                str = str + "<tr class=\"row100 body\">" +
                    "<td class=\"cell100 column2\">" + (i + 1) + ".</td>" +
                    "<td class=\"cell100 column2\">" + user.username + "</th>" +
                    "<td class=\"cell100 column2\">" + user.name + "</th>" +
                    "<td class=\"cell100 column2\">" + user.accountType + "</th>" +
                    "</tr>"
            });
            $("#userList").html(str);
        },
        error: function () {
            $("#temp").html("error")
        }
    });
}

$(document).ready(function()    {
    let params = new URLSearchParams(location.search);
    adminName = params.get('name');
    adminId = params.get('id');
    if(adminName != null)
        $("#welcome").html("Welcome "+adminName);
    else
        window.location.href = "login.html";
});

$(document).ready(function()    {
    $("#enroll").click(function(e)    {
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            url: 'http://localhost:8080/enrollStudent',
            dataType: "json",
            data: JSON.stringify({
                studentId: studentId,
                courseId: $("#registerId").val(),
                coursePassword: $("#registerPsw").val()
            }),
            success: function(data){
                if(data.object == null)
                    $('#confMessage').html(data.message);
                else
                    $('#confMessage').html("You have successfully enrolled to "+data.object.name);
                console.log(data.message);
            },
            error: function(){
                $("#temp").html("error")
            }
        });
    });
});

$(document).ready(function()    {
    $("#addUserMenu").click(function(e)    {
        window.location.href = "addUser.html?name="+adminName+"&id="+adminId;
    });
});

$(document).ready(function()    {
    $("#removeUserMenu").click(function(e)    {
        window.location.href = "removeUser.html?name="+adminName+"&id="+adminId;
    });
});

$(document).ready(function()    {
    $("#listAllUsersMenu").click(function(e)    {
        window.location.href = "listAllUsers.html?name="+adminName+"&id="+adminId;
    });
});

$(document).ready(function()    {
    $("#addUser").click(function(e)   {
        var userType;
        if(document.getElementById('admin').checked)
            userType = "T_ADMIN";
        if(document.getElementById('teacher').checked)
            userType = "T_TEACHER";
        if(document.getElementById('student').checked)
            userType = "T_STUDENT";
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            url: 'http://localhost:8080/addUser',
            dataType: "json",
            data: JSON.stringify({
                username: $("#username").val(),
                password: $("#password").val(),
                name: $("#name").val(),
                dateOfBirth: $("#dateOfBirth").val(),
                type: userType
            }),
            success: function(data){
                if(data.object == null)
                    $('#confMessage').html(data.message);
                else
                    $('#confMessage').html("You have successfully added "+data.object.name+"'s account");
                console.log(data.message);
            },
            error: function(){
                $("#temp").html("error")
            }
        });
    });
});

$(document).ready(function()    {
    $("#removeUser").click(function(e)   {
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            url: 'http://localhost:8080/removeUser',
            dataType: "json",
            data: $("#usernameRem").val(),
            success: function(data){
                $('#confMessage').html(data);
                if(!data.message.localeCompare("SUCCESS"))
                    listUsers();
                console.log(data.message);
            },
            error: function(){
                $("#temp").html("error")
            }
        });
    });
});