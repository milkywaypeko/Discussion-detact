function extractAnswers() {
    const answers = [];
    // Github의 답변들은 일반적으로 특정 클래스를 가진 요소 내에 위치
    // 주의: Github의 html 구조가 변경될 수 있으므로, 필요에 따라 셀렉터를 업데이트
    const answerElements = document.querySelectorAll('.js-timeline-item');
    answerElements.forEach(elem => {
        // 답변 내용을 추출합니다. 내용이 길 경우 더 많은 처리 필요
        const answerBody = elem.querySelector('.comment-body').innerText;
        answers.push(answerBody);
    });
    return answers;
}

const answers = extractAnswers();
console.log(answers);

chrome.runtime.sendMessage({type: "answers", data: answers});