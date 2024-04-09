document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleDetector');
    var detectorIcon = document.getElementById('detectorIcon');

    // 저장된 상태를 불러와서 아이콘 초기 상태를 설정합니다.
    chrome.storage.local.get(['detectorEnabled'], function(result) {
        updateIcon(result.detectorEnabled);
    });

    toggleButton.addEventListener('click', function() {
        chrome.storage.local.get(['detectorEnabled'], function(result) {
            let isEnabled = !result.detectorEnabled;
            chrome.storage.local.set({detectorEnabled: isEnabled}, function() {
                updateIcon(isEnabled);
                // background.js에 상태 변경 알림
                chrome.runtime.sendMessage({action: "toggle", state: isEnabled});
            });
        });
    });

    function updateIcon(isEnabled) {
        if (isEnabled) {
            detectorIcon.className = 'fas fa-eye';
            detectorIcon.style.color = 'green';
        } else {
            detectorIcon.className = 'fas fa-eye-slash';
            detectorIcon.style.color = 'grey';
        }
    }
});