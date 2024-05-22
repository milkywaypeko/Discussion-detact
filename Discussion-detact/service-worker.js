chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({enabled: true}); // 기본값 설정
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'answers') {
        console.log("Received answers:", message.data);
        let resulut = [];
        
        const fetchPromises = message.data.map(SerTe => {
            return fetch('http://selogic.seoultech.ac.kr:8000/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({sentence: SerTe}),
                credentials: "include",
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                resulut.push(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                resulut.push(error);
            });
        });

        Promise.all(fetchPromises).then(() => {
            console.log(resulut);
            sendResponse(resulut);
        });

        return true;
    }
});