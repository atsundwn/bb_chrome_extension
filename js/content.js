function doTask()
{
    var commit_messages = $('.subject, .commit-message, .changeset');

    chrome.storage.sync.get(['useSSL', 'useHostname'], function(items) {

        commit_messages.each(function()
        {
            var $this = $(this);
            var text = $this.html();
            var hypertext = "http";

            if (items["useHostname"] == undefined ) 
            {
                throw new Error("Hostname is undefined, set a hostname!");
            }

            if (items["useSSL"] == true)
            {
                hypertext = "https";
            }

            var regex = new RegExp('([a-z]{2,}-\\d+)', 'ig');
            var text_found = text.search(regex);

            // Search returns -1 if text is not found
            if(text_found > -1)
            {
                replaceLink(regex, hypertext);
            }

            function replaceLink(regex, hypertext)
            {
                var tickets = text.match(regex);
                var host_string = items["useHostname"];
                for(var k=0,tl=tickets.length;k < tl; k++)
                {
                    text = text.replace(tickets[k], '<a href=' + hypertext + '://' + host_string + '/browse/' + tickets[k] + ' target="_blank">' + tickets[k] + '</a>');
                    $this.html(text);
                }
            }; //end replaceLink
        }); //end commit-msg loop
    }); //end chrome sync
}; //end doTask()

doTask();
