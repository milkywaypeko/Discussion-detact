function extractAnswers() {
    const answers = [];
    // Github의 답변들은 일반적으로 특정 클래스를 가진 요소 내에 위치
    // 주의: Github의 html 구조가 변경될 수 있으므로, 필요에 따라 셀렉터를 업데이트
    //js-timeline-progressive-focus-container
    const answerElements = document.querySelectorAll(".js-timeline-item");
    var count = 0;
    answerElements.forEach(elem => {
        // 답변 내용을 추출합니다. 내용이 길 경우 더 많은 처리 필요
        const answerBody = elem.querySelectorAll(".js-comment-body");
        answerBodytext = answerBody.forEach(texts => {
            const answerstext = texts.querySelectorAll("p");
            answerST = answerstext.forEach(STs => {
                const answerSText = {
                    issueAnchor : 'IssueText' + count,
                    text : STs.innerText,
                };
                answers.push(answerSText);
                STs.setAttribute('href', 'IssueText' + count);
                count += 1;
            }); 
        });
    });
    return answers;
}

// 답변 데이터를 추출하고, console.log를 사용하여 출력
// 실제로는 이 데이터를 서버에서 처리
const answers = extractAnswers();
console.log(answers);

// background.js로 데이터를 보낼 때 사용
chrome.runtime.sendMessage({type : 'answers', data : answers}, (response) => {
    // 3. Got an asynchronous response with the data from the service worker
    console.log('received user data', response);
});