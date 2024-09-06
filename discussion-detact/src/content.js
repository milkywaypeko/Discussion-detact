import { split } from "sentence-splitter";


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
        var answerBodytext;
        answerBodytext = answerBody.forEach(texts => {
            const answerstext = texts.querySelectorAll("p");
            var answerST;
            answerST = answerstext.forEach(STs => {
                const answerSText = {
                    issueAnchor : 'IssueText' + count,
                    text : STs.innerText,
                };
                answers.push(answerSText);
                STs.setAttribute('class', 'IssueText' + count);
                count += 1;
                console.log(split(STs.innerText));
            }); 
        });
    });
    return answers;
}

// 답변 데이터를 추출하고, console.log를 사용하여 출력
// 실제로는 이 데이터를 서버에서 처리
const answers = extractAnswers();
console.log(answers);

var classFy_answers;
classFy_answers = [];

// background.js로 데이터를 보낼 때 사용
chrome.runtime.sendMessage({type : 'answers', data : answers}, (response) => {
    // 3. Got an asynchronous response with the data from the service worker
    console.log('received user data', response);

    //그냥 이안에서 response 사용하시면 됩니다.
    for(let i = 0; i < response.length; i++) {
        if (response[i].textType.result === "Action on Issue")
        {
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'lightcoral';
        } 
        else if (response[i].textType.result === "Bug Reproduction")
        {
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'lime';
        }
        else if (response[i].textType.result === "Contribution and Commitment")
        {
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'olive';
        }
        else if (response[i].textType.result === "Expected Behaviour")
        {
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'coral';
        }
        else if (response[i].textType.result === "Investigation and Exploration")
        {
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'aliceblue';
        }
        else if (response[i].textType.result === "Motivation")
        {
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'aquamarine';
        }
        else if (response[i].textType.result === "Observed Bug Behaviour")
        {
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'burlywood';
        }
        else if (response[i].textType.result === "Potential New Issues and Requests")
        {
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'greenyellow';
        }
        else if (response[i].textType.result === "Social Conversation")
        {   
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'cyan';
        }
        else if (response[i].textType.result === "Solution Discussion")
        {
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'plum';
        }
        else if (response[i].textType.result === "Solution Usage")
        {
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'aqua';
        }
        else if (response[i].textType.result === "Task Progress")
        {
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'azure';
        }
        else if (response[i].textType.result === "Workarounds")
        {
            document.querySelector('.' + response[i].issueAnchor).style.backgroundColor = 'beige';
        };
    };
});