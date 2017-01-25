function doTask()
{
    var commit_messages = $('.subject, .commit-message, .changeset');

    chrome.storage.sync.get(['useAutodetect', 'useHostname'], function(items) {

        commit_messages.each(function()
        {
            var $this = $(this);
            var text = $this.html();

            if (items["useAutodetect"] == true)
            {
                var regex = new RegExp('([a-z]{2,}-\\d+)', 'ig');
                var text_found = text.search(regex);

                // Search returns -1 if text is not found
                if(text_found > -1)
                {
                    replaceLink(regex);
                }
            } else if (items["useAutodetect"] == false) {
                // TODO: Remove placeholder code
                // var filter = [
                //                  ['core']
                //                 ,['cs']
                //                 ,['bemob']
                //                 ,['temob']
                //                 ,['maint']
                //                 ,['dep']
                //                 ,['ps']
                //              ];

                // for(var i=0,l=filter.length; i < l; i++)
                // {
                //     var regex = new RegExp('(' + filter[i] + '-\\d+)', 'ig');
                //     var text_found = text.search(regex);

                //     // Search returns -1 if text is not found
                //     if(text_found > -1)
                //     {
                //         replaceLink(regex);
                //     }
                // };
            } else {
                console.log(items["useAutodetect"]);
                throw new Error("Something went terribly wrong!");
            }

            function replaceLink(regex)
            {
                var tickets = text.match(regex);
                var host_string = items["useHostname"];
                for(var k=0,tl=tickets.length;k < tl; k++)
                {
                    text = text.replace(tickets[k], '<a href=' + 'http://' + host_string + '/browse/' + tickets[k] + ' target="_blank">' + tickets[k] + '</a>');
                    $this.html(text);
                }
            }; //end replaceLink
        }); //end commit-msg loop
    }); //end chrome sync
}; //end doTask()

doTask();
