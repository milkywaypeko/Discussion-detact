chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "toggle") {
            if (request.state) {
                // 확장 프로그램이 활성화될 때의 동작
            } else {
                // 확장 프로그램이 비활성화될 때의 동작
            }
        }
    }
);