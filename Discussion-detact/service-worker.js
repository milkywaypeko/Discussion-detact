chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({enabled: true}); // 기본값 설정
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'answers') {
        console.log("Received answers:", message.data);
        let result = [];
        
        const fetchPromises = message.data.map(SerTe => {
            console.log(SerTe.text);
            return fetch('http://selogic.seoultech.ac.kr:8000/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({sentence: SerTe.text}),
                credentials: "include",
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                result.push({issueAnchor : SerTe.issueAnchor , textType : data});
            })
            .catch((error) => {
                console.error('Error:', error);
                result.push({issueAnchor : SerTe.issueAnchor , textType : error});
            });
        });

        Promise.all(fetchPromises).then(() => {
            console.log(result);
            sendResponse(result);
        });

        return true;
    }
});