$(document).ready(function () {
    $("#form").submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: '/people',
            type: 'POST',
            dataType: 'json',
            data: $("#Form").serialize()
        })
    });
    $("#getForm").submit(function (event) {
        event.preventDeafult();
        $.ajax({
            url: '/getPerson',
            type: 'POST',
            data: {
                id: $("#id").val()
            }
        })
    });
});



