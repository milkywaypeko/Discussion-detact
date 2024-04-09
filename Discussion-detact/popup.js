document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleDetector');

    // 저장된 상태를 불러와서 버튼 초기 상태를 설정합니다.
    chrome.storage.local.get(['detectorEnabled'], function(result) {
        const isEnabled = result.detectorEnabled !== undefined ? result.detectorEnabled : false;
        updateButton(isEnabled);
    });

    toggleButton.addEventListener('click', function() {
        chrome.storage.local.get(['detectorEnabled'], function(result) {
            let isEnabled = !result.detectorEnabled;
            chrome.storage.local.set({detectorEnabled: isEnabled}, function() {
                updateButton(isEnabled);
                // background.js에 상태 변경 알림
                chrome.runtime.sendMessage({action: "toggle", state: isEnabled});
            });
        });
    });

    function updateButton(isEnabled) {
        if (isEnabled) {
            toggleButton.style.backgroundImage = "url('img/power_on.png')"; // 전원 켜짐 상태 이미지
        } else {
            toggleButton.style.backgroundImage = "url('img/power_off.png')"; // 전원 꺼짐 상태 이미지
        }
    }
});