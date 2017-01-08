function doTask()
{
    var list_messages = $('.subject, .commit-message');

    list_messages.each(function()
    {
        var $this = $(this);
        var text = $this.text();
        var filter = [
                         ['(core-\\d+)']
                        ,['(cs-\\d+)']
                        ,['(bemob-\\d+)']
                        ,['(temob-\\d+)']
                        ,['(maint-\\d+)']
                        ,['(dep-\\d+)']
                        ,['(ps-\\d+)']
                     ];

        for(var i=0,l=filter.length; i < l; i++)
        {
            var regex = new RegExp(filter[i][0], 'i');
            var text_found = text.search(regex);

            // Search returns -1 if text is not found
            if(text_found > -1)
            {
                replaceLink(text_found, regex);
            }
        };

        $this.html(text);

        function replaceLink(start,regex)
        {
            var ticket = text.match(regex);
            text = text.replace(regex, '<a href=http://issues.buildingengines.com/browse/' + ticket[0] + ' target="_blank">' + ticket[0] + '</a>');
        };
    });
};

$(document).on('click', function()
{
    window.setTimeout(doTask(), 2000);


});
doTask();
