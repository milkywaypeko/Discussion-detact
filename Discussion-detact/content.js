if (window.location.href.includes('/issues')) {
    chrome.runtime.sendMessage({message: "discussionDetected"});
  }