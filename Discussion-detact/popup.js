document.addEventListener('DOMContentLoaded', function() 
{
    var toggleButton = document.getElementById('toggleDetector');

    // 저장된 상태를 불러와서 버튼의 초기 텍스트를 설정합니다.
    chrome.storage.local.get(['detectorEnabled'], function(result) {
        if (result.detectorEnabled) {
            toggleButton.textContent = 'turn off';
        } 
        else {
            toggleButton.textContent = 'turn on';
        }
    });

    toggleButton.addEventListener('click', function() {
        chrome.storage.local.get(['detectorEnabled'], function(result) {
            let isEnabled = !result.detectorEnabled;
            chrome.storage.local.set({detectorEnabled: isEnabled}, function() {
                if (isEnabled) {
                    toggleButton.textContent = 'turn off';
                } 
                else {
                    toggleButton.textContent = 'turn on';
                }
                // background.js에 상태 변경 알림
                chrome.runtime.sendMessage({action: "toggle", state: isEnabled});
            });
        });
    });
});