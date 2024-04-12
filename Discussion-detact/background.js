chrome.runtime.onInstalled.addListener(function() {
    // 설치 또는 업데이트 시 기본적으로 감지기를 활성화 상태로 설정합니다.
    chrome.storage.local.set({detectorEnabled: true});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggle") {
        if (request.state === true) {
            console.log("감지기가 활성화되었습니다.");
            // 감지기 활성화 관련 코드
        } else {
            console.log("감지기가 비활성화되었습니다.");
            // 감지기 비활성화 관련 코드
        }
    }
});