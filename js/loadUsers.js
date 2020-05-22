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

$(document).ready(listUsers);
