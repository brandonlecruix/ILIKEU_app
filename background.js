chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.webRequest.onCompleted.addListener(
	   	function tab_request() {
			chrome.tabs.executeScript(null, {file: "js/injector.js"});	
			setTimeout(()=>{
				chrome.webRequest.onCompleted.removeListener(tab_request); 
			}, 3500);			 
	    }, 

	    {
	    	urls: [
	    		"https://*.instagram.com/"
	    	]
	    }
    );
    chrome.tabs.executeScript(null, {code: "document.location.href = 'https://www.instagram.com';"});
});