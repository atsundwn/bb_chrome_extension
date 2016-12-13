alert("Hello from your Chrome extension!");

var list_commit_messages = $('.subject, .commit-message');

console.log(list_commit_messages);
list_commit_messages.each(function()
{
    var $this = $(this);
    var text = $this.text();


    var start1 = text.search(/(CORE\-\d\d\d\d|core\-\d\d\d\d)/);
    var start2 = text.search(/(CS\-\d\d\d\d|cs\-\d\d\d\d)/);
    //var start3 = text.search(/(TEMOB\-\d\d\d|temob\-\d\d\d)/);
    var start3 = null;
    var start4 = text.search(/(BEMOB\-\d\d\d\d|bemob\-\d\d\d\d)/);
    var start5 = text.search(/(MAINT\-\d\d\d\d|maint\-\d\d\d\d)/);

    if(start1 > -1)
    {
        replaceLink(start1, 9);
        start3 = text.search(/(TEMOB\-\d\d\d|temob\-\d\d\d)/);
    }

    if(start2 > -1)
    {
        replaceLink(start2, 7);
    }


    console.log(start3);
    if(start3 > -1)
    {
        replaceLink(start3, 9);
    }

    if(start4 > -1)
    {
        replaceLink(start4, 10);
    }


    if(start4 > -1)
    {
        replaceLink(start4, 10);
    }

    $this.html(text);

    function replaceLink(start, length)
    {
        var ticket = text.substr(start, length);
        text = text.replace(ticket, '<a href=http://google.com>' + ticket + '</a>');
    }

});


