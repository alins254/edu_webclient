var studentName;
var studentId;
$(document).ready(function()    {
    let params = new URLSearchParams(location.search);
    studentName = params.get('name');
    studentId = params.get('id');
    if(studentName != null)
        $("#welcome").html("Welcome "+studentName);
    else
        window.location.href = "login.html";
    console.log(studentId);
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