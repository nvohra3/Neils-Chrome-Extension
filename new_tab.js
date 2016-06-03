chrome.commands.onCommand.addListener(function(command) {
    if (command === "open-tab-to-right")
    {
        // Current tab
        var currentTabQueryInfo = {
            active: true,
            currentWindow: true
        };

        // Get current tab info create a new tab to the right of it
        chrome.tabs.query(currentTabQueryInfo, function(currentTab) {
            console.log(currentTab[0].index);
            chrome.tabs.create({index: currentTab[0].index + 1});
        });
    }
});