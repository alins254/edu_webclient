var teacherName;
var teacherId;
$(document).ready(function()    {
    let params = new URLSearchParams(location.search);
    teacherName = params.get('name');
    teacherId = params.get('id');
    if(teacherName != null)
        $("#welcome").html("Welcome "+teacherName);
    else
        window.location.href = "login.html";
    //teacherId = "<?php echo $_POST['id']; ?>";
    console.log(teacherId);
});

$(document).ready(function()    {
    $("#addCourse").click(function(e)    {
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            url: 'http://localhost:8080/addCourse',
            dataType: "json",
            data: JSON.stringify({
                teacher: {
                    id: teacherId,
                    name: teacherName,
                },
                registerID: $("#registerId").val(),
                registerPassword: $("#registerPsw").val(),
                name: $("#courseName").val(),
                startDate: $("#startDate").val(),
                endDate: $("#endDate").val()
            }),
            success: function(data){
                //$("#temp").attr("placeholder", data.get);
                $("#confMessage").html(data.message);
                console.log(data.message);
                //$("#temp").attr("placeholder", data[0].id);
            },
            error: function(){
                $("#temp").html("error")
            }

        });
    });
});