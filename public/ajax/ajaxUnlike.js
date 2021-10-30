$(document).ready(() => {
    $("#ajaxunLike").on("submit", (e) => {
        e.preventDefault();

        var formData = $("#ajaxunLike").serializeArray();
        console.log(formData);
        var data = {};

        $.each(formData, function (i, v) {
            data["" + v.name + ""] = v.value;
        });

        unlikePost(data);
    });

    function unlikePost(data) {
        $.ajax({
            url: "/user/unlikePost",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json",
        })
            .done(function (res) {
                ajaxGet();
            })
            .fail(function (res) {
                console.log("Fail");
            });
    }

    var likeId = $("#likeId").val();
    function ajaxGet() {
        $.ajax({
            url: `/api/users/getBlogData/${likeId}`,
            method: "get",
            dataType: "json",
        }).done(function (res) {
            arrayComment(res);
        });
    }

    function arrayComment(data) {
        var res = "";
        res += getData(data);
        $("#like").html(res);
    }

    function getData(unlike) {
        var html = "";
       
        html +='<form id="ajaxLike" method="POST">';
        html +='<input type="hidden" id="blogId" name="_id" value=' + unlike._id +'>';
        html +='<button type="submit" style="font-size: 18px; border: 0;background: white;">';
        html +='<img style="width: 20px;" src="/assets/images/like.png"> Like</button>';
        html +='<strong>' +unlike.Like+'</strong> ';
        html +='</form>';
        
        
        // html +='<form action="/user/unlikePost method="POST">';
        // html +='<input type="hidden" id="blogId" name="_id" value=' + like._id +'>';
        // html +='<button type="submit" style="font-size: 18px; border: 0;background: white; color: blue;">';
        // html +='<img style="width: 20px;" src="/assets/images/like-blue.png"> Like</button>  ';
        // html +=' <strong>' +like+'</strong>';
        // html +='</form>';
        return html;
    }
});
