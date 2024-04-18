chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({enabled: true}); // 기본값 설정
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.enabled !== undefined) {
            chrome.storage.local.set({enabled: request.enabled});
            if (request.enabled) {
                // 확장 프로그램 활성화
                console.log("GitHub Discussion Detector Enabled");
            } else {
                // 확장 프로그램 비활성화
                console.log("GitHub Discussion Detector Disabled");
            }
        }
    }
);