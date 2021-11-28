$(document).ready(() =>{
    $('#ajaxComment').on('submit', e => {
        e.preventDefault();

        var formData = $('#ajaxComment').serializeArray();
        // console.log(formData)
        var data = {};

        $.each(formData, function (i, v) {
            data['' + v.name + ''] = v.value;
        });

        doComment(data);
        
    });

    function doComment(data) {
        $.ajax({
            url: '/user/doComment',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json',
        }).done(function (res) {
            ajaxGet();
        }).fail(function (res) {
            console.log("Fail")
        })
    }

    var blogId = $('#blogId').val();
    function ajaxGet() {
        $.ajax({
            url: `/api/users/getBlogData/${blogId}`,
            method: 'get',
            dataType: 'json',
        }).done(function (res) {
            arrayComment(res.Comment_id);         
        });
    }

    function arrayComment(data) {
        var res = '';
        if (data.length > 0) {
            data.forEach(el => (res += getData(el)));
        }
        $('#listComment').html(res);
    }

    function getData(comment) {
        var html = '';
        html+='<li class="comment"> ';
        html+='<div class="vcard">';
        html+='  <img src="/uploads/'+comment.author.Avatar+'" alt="Avartar">';
        html+='</div>';
        html+='<div class="comment-body">';
        html+='<div class="post-info">';
        html+='<h3 class="name">'+comment.author.name+'</h3>';
        html+='<span class="meta">'+comment.timeCreated+'</span>';
        html+='</div>';
        html+='<p>';
        html+=''+comment.content+'';
        html+='</p>';
        html+='</li>';
        return html;
    }

})