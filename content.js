function doTask()
{
    var list_messages = $('.subject, .commit-message');

    list_messages.each(function()
    {
        var $this = $(this);
        var text = $this.text();
        var filter = [
                         ['(CORE\\-\\d\\d\\d\\d|core\\-\\d\\d\\d\\d)', 9]
                        ,['(CS\\-\\d\\d\\d\\d|cs\\-\\d\\d\\d\\d)', 7]
                        ,['(BEMOB\\-\\d\\d\\d\\d|bemob\\-\\d\\d\\d\\d)', 10]
                        ,['(BEMOB\\-\\d\\d\\d\\D|bemob\\-\\d\\d\\d\\D)', 9]
                        ,['(TEMOB\\-\\d\\d\\d\\d|temob\\-\\d\\d\\d\\d)', 10]
                        ,['(TEMOB\\-\\d\\d\\d\\D|temob\\-\\d\\d\\d\\D)', 9]
                        ,['(MAINT\\-\\d\\d\\d\\d|maint\\-\\d\\d\\d\\d)', 10]
                        ,['(MAINT\\-\\d\\d\\d[\\D\\S]|maint\\-\\d\\d\\d)', 9]
                        ,['(DEP\\-\\d\\d\\d|dep\\-\\d\\d\\d)', 7]
                     ];

        for(var i=0,l=filter.length; i < l; i++)
        {
            var regex = new RegExp(filter[i][0]);
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
            text = text.replace(ticket, '<a href=http://issues.buildingengines.com/browse/' + ticket + '>' + ticket + '</a>');
        };
    });
};

$(document).on('click', function()
{
    window.setTimeout(doTask(), 2000);


});
doTask();
