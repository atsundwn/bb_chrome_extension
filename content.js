function doTask()
{
    var commit_messages = $('.subject, .commit-message');

    commit_messages.each(function()
    {
        var $this = $(this);
        var text = $this.text();
        var filter = [
                         ['core']
                        ,['cs']
                        ,['bemob']
                        ,['temob']
                        ,['maint']
                        ,['dep']
                        ,['ps']
                     ];

        for(var i=0,l=filter.length; i < l; i++)
        {
            var regex = new RegExp('(' + filter[i] + '-\\d+)', 'i');
            var text_found = text.search(regex);

            // Search returns -1 if text is not found
            if(text_found > -1)
            {
                replaceLink(regex);
            }
        };

        $this.html(text);

        function replaceLink(regex)
        {
            var ticket = text.match(regex);
            var host_string = "issues.buildingengines.com"
            text = text.replace(regex, '<a href=' + 'http://' + host_string + '/browse/' + ticket[0] + ' target="_blank">' + ticket[0] + '</a>');
        };
    });
};

$(document).on('click', function()
{
    window.setTimeout(doTask(), 2000);
});

doTask();
