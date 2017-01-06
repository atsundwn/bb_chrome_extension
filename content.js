function doTask()
{
    var list_messages = $('.subject, .commit-message');

    list_messages.each(function()
    {
        var $this = $(this);
        var text = $this.text();
        var filter = [
                         ['(core\\-\\d\\d\\d\\d)', 9]
                        ,['(cs\\-\\d\\d\\d\\d)', 7]
                        ,['(bemob\\-\\d\\d\\d\\d)', 10]
                        ,['(bemob\\-\\d\\d\\d\\D)', 9]
                        ,['(temob\\-\\d\\d\\d\\d)', 10]
                        ,['(temob\\-\\d\\d\\d\\D)', 9]
                        ,['(maint\\-\\d\\d\\d\\d)', 10]
                        ,['(maint\\-\\d\\d\\d)', 9]
                        ,['(dep\\-\\d\\d\\d)', 7]
                        ,['(ps\\-\\d\\d\\d\\d)', 7]
                        ,['(ps\\-\\d\\d\\d\\D)', 6]
                     ];

        for(var i=0,l=filter.length; i < l; i++)
        {
            var regex = new RegExp(filter[i][0], 'i');
            var start = text.search(regex);

            if(start > -1)
            {
                replaceLink(start, filter[i][1]);
            }
        };

        $this.html(text);

        function replaceLink(start, length)
        {
            var ticket = text.substr(start, length);
            text = text.replace(ticket, '<a href=http://issues.buildingengines.com/browse/' + ticket + ' target="_blank">' + ticket + '</a>');
        };
    });
};

$(document).on('click', function()
{
    window.setTimeout(doTask(), 2000);


});
doTask();
