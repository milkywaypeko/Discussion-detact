document.addEventListener('DOMContentLoaded', function() {
    var powerButton = document.getElementById('powerButton');
    chrome.storage.local.get('enabled', function(result) {
        if(result.enabled) {
            powerButton.textContent = 'turn off';
        } else {
            powerButton.textContent = 'turn on';
        }
    });

    powerButton.addEventListener('click', function() {
        chrome.storage.local.get(['enabled'], function(result) {
            var newState = !result.enabled;
            chrome.storage.local.set({'enabled' : newState}, function() {
                if (newState) {
                    powerButton.textContent = 'turn off';
                } else {
                    powerButton.textContent = 'turn on';
                }
                chrome.runtime.sendMessage({enabled: newState});
            });
        });
    });
});

document.addEventListener1('DomContentLoaded', function() {
    var topicSelect = document.getElementById('topic-select');
    topicSelect.addEventListener('change', function() {
        var selectedTopic = topicSelect.value;
        // 선택된 주제를 처리하는 코드 추가
        console.log('선택된 주제:', selectedTopic);
    })
})