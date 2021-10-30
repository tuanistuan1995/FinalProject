$(document).ready(() => {
    // $("#ajaxLike").on("click", (e) => {
    //     e.preventDefault();

    //     var formData = $("#ajaxLike").serializeArray();
    //     console.log(formData);
    //     var data = {};

    //     $.each(formData, function (i, v) {
    //         data["" + v.name + ""] = v.value;
    //     });

    //     likePost(data);
    // });

    $(document).on('click', '.setLike', function () {
        var id = $(this).attr('id');
        setLikePost(id);  

    });

    $(document).on('click', '.setUnlike', function () {
        var id = $(this).attr('id');
        setUnLikePost(id);  
             
    });
    function setLikePost(id) {
        $.ajax({
            url: `/user/likePost/${id}`,
            method: "put",
            contentType: "application/json",
            dataType: "json",
        })
            .done(function (res) {
                ajaxGet();
            })
            .fail(function (res) {
                console.log("Fail");
            });
    }
    
    
    function setUnLikePost(id) {
        $.ajax({
            url: `/user/unlikePost/${id}`,
            method: "put",
            contentType: "application/json",
            dataType: "json",
        })
            .done(function (res) {
                ajaxGet();
            })
            .fail(function (res) {
                console.log("Fail");
            });
    }

    var blogId = $("#blogId").val();
    function ajaxGet() {
        $.ajax({
            url: `/api/users/getBlogData/${blogId}`,
            method: "get",
            dataType: "json",
        }).done(function (res) {
            arrayLike(res);
        });
    }

    function arrayLike(data) {
        var res = "";
        res += getData(data);
        $("#like").html(res);
    }

    var session_Id = $("#session_id").val();

    function getData(data) {
        var html = "";
        //if
        html +='<form id="ajaxLike" method="POST">';
        html +='<input type="hidden" id="blogId" name="_id" value=' + data._id +'>';
        html +='<button type="submit" style="font-size: 18px; border: 0;background: white;">';
        html +='<img style="width: 20px;" src="/assets/images/like.png"> Like</button>';
        html +='<strong>' +data.Like+'</strong> ';
        html +='</form>';
        //else
        html +='<form id="ajaxunLike" method="POST">';
        html +='<input type="hidden" id="likeId" name="_id" value=' + data._id +'>';
        html +='<button type="submit" style="font-size: 18px; border: 0;background: white; color: blue;">';
        html +='<img style="width: 20px;" src="/assets/images/like-blue.png"> Like</button>  ';
        html +=' <strong style="color: blue;">'+data.Like+'</strong>';
        html +='</form>';
        
        return html;
    }
});
