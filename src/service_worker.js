'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({enabled: true}); // 기본값 설정
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'answers') {
        //console.log("Received answers:", message.data);
        let result = [];
        
        const fetchPromises = message.data.map(SerTe => {
            //console.log(SerTe.text);
            return fetch('http://127.0.0.1:5000/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({sentence: SerTe.text}),
                credentials: "include",
            })
            .then(response => response.json())
            .then(data => {
                //console.log('Success:', data);
                result.push({issueObjectAnchor : SerTe.issueObjectAnchor , textType : data});
            })
            .catch((error) => {
                //console.error('Error:', error);
                result.push({issueObjectAnchor : SerTe.issueObjectAnchor , textType : error});
            });
        });

        Promise.all(fetchPromises).then(() => {
            //console.log(result);
            sendResponse(result);
        });

        return true;
    }
});