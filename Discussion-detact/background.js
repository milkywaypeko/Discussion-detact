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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "answers") {
        console.log("Received answers:", message.data);
        // 서버에 데이터 전송
        fetch('http://selogic.seoultech.ac.kr:8000/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({answers: message.data}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});