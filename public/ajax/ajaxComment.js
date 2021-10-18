$(document).ready(() =>{
    $('#ajaxComment').on('submit', e => {
        e.preventDefault();

        var formData = $('#ajaxComment').serializeArray();
        console.log(formData)
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

    // function formatDate(data) {
    //     let date = new Date(data);
    //     let day = date.getDate();
    //     let month = date.getMonth() + 1;
    //     let hour = date.getHours();
    //     let minute = date.getMinutes();
    //     let second = date.getSeconds();

    //     let longMonth = new Intl.DateTimeFormat('en-US', {
    //         month: 'long',
    //     }).format(date);

    //     if (day < 10) day = '0' + day;
    //     if (month < 10) month = '0' + month;
    //     if (hour < 10) hour = '0' + hour;
    //     if (minute < 10) minute = '0' + minute;

    //     let formatted_date =
    //         longMonth + ' ' + day + ', ' + date.getFullYear() + ' ' + hour + ':' + minute;
    //     return formatted_date;
    // }

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
        html+='<span class="meta">'+comment.author.timeCreated+'</span>';
        html+='</div>';
        html+='<p>';
        html+=''+comment.content+'';
        html+='</p>';
        html+='</li>';
        return html;
    }

})