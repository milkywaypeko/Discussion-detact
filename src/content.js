import { split } from "sentence-splitter";

// 답변 데이터를 추출하고, console.log를 사용하여 출력
// 실제로는 이 데이터를 서버에서 처리


//var classFy_answers;
//classFy_answers = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "Discussion") {

        console.log(request.condition);

        var elementStratEnd = [];

        function extractAnswers() {
            const answers = [];
            // Github의 답변들은 일반적으로 특정 클래스를 가진 요소 내에 위치
            // 주의: Github의 html 구조가 변경될 수 있으므로, 필요에 따라 셀렉터를 업데이트
            //js-timeline-progressive-focus-container
            const answerElements = document.querySelectorAll(".js-timeline-item");
            var count = 0;
            var stringcount = 0;
            var timelineCount = 0;
            answerElements.forEach(elem => {
                // 답변 내용을 추출합니다. 내용이 길 경우 더 많은 처리 필요
                const answerBody = elem.querySelectorAll(".js-comment-body");
                var answerBodytext;
                answerBodytext = answerBody.forEach(texts => {
                    var start = stringcount;
                    const answerstext = texts.querySelectorAll("p");
                    var answerST;
                    answerST = answerstext.forEach(STs => {
                        STs.setAttribute('class', 'IssueText' + count);
                        count += 1;
                        var splited_text = split(STs.innerText)
                        var splited_text_object = [];
                        for (var sp_t in splited_text) {
                            if (splited_text[sp_t].type === 'Sentence') {
                                splited_text_object.push(splited_text[sp_t].raw);
                            }
                        }
                        var SPTOstring = "";
                        for (var spto in splited_text_object) {
                            SPTOstring = SPTOstring + '<span class = "IssueTextST IssueSPTOText' + stringcount + '" >' + splited_text_object[spto] + '</span>';
                            const answerSText = {
                                issueObjectAnchor: 'IssueSPTOText' + stringcount,
                                text: splited_text_object[spto],
                            };
                            answers.push(answerSText);
                            stringcount += 1;

                        }
                        STs.innerHTML = SPTOstring;
                    });
                    var end = stringcount;
                    elementStratEnd.push(
                        {
                            "timelineCount": timelineCount,
                            "start": start,
                            "end": end,
                            "ActiononIssue": 0,
                            "BugReproduction": 0,
                            "ContributionandCommitment": 0,
                            "ExpectedBehaviour": 0,
                            "InvestigationandExploration": 0,
                            "Motivation": 0,
                            "ObservedBugBehaviour": 0,
                            "PotentialNewIssuesandRequests": 0,
                            "SocialConversation": 0,
                            "SolutionDiscussion": 0,
                            "SolutionUsage": 0,
                            "TaskProgress": 0,
                            "Workarounds": 0,
                        }
                    );
                    timelineCount += 1;
                });
            });
            return answers;
        }

        const answers = extractAnswers();


        // background.js로 데이터를 보낼 때 사용
        chrome.runtime.sendMessage({ type: 'answers', data: answers }, (response) => {
            //그냥 이안에서 response 사용하시면 됩니다.
            for (let i = 0; i < response.length; i++) {
                if (response[i].textType.result === "Action on Issue") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'lightcoral';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                } else if (response[i].textType.result === "Bug Reproduction") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'lime';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                } else if (response[i].textType.result === "Contribution and Commitment") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'olive';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                } else if (response[i].textType.result === "Expected Behaviour") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'coral';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                } else if (response[i].textType.result === "Investigation and Exploration") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'aliceblue';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                } else if (response[i].textType.result === "Motivation") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'aquamarine';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                } else if (response[i].textType.result === "Observed Bug Behaviour") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'burlywood';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                } else if (response[i].textType.result === "Potential New Issues and Requests") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'greenyellow';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                } else if (response[i].textType.result === "Social Conversation") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'cyan';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                } else if (response[i].textType.result === "Solution Discussion") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'plum';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                } else if (response[i].textType.result === "Solution Usage") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'aqua';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                } else if (response[i].textType.result === "Task Progress") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'azure';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                } else if (response[i].textType.result === "Workarounds") {
                    document.querySelector('.' + response[i].issueObjectAnchor).style.backgroundColor = 'beige';
                    document.querySelector('.' + response[i].issueObjectAnchor).style.color = 'black';
                };
            };

            for (var el in elementStratEnd) {
                var start = elementStratEnd[el].start;
                var end = elementStratEnd[el].end;
                for (var elsint = start; elsint < end; elsint++) {
                    if (response[elsint].textType.result === "Action on Issue") {
                        elementStratEnd[el].ActiononIssue += 1;
                    } else if (response[elsint].textType.result === "Bug Reproduction") {
                        elementStratEnd[el].BugReproduction += 1;
                    } else if (response[elsint].textType.result === "Contribution and Commitment") {
                        elementStratEnd[el].ContributionandCommitment += 1;
                    } else if (response[elsint].textType.result === "Expected Behaviour") {
                        elementStratEnd[el].ExpectedBehaviour + 1;
                    } else if (response[elsint].textType.result === "Investigation and Exploration") {
                        elementStratEnd[el].InvestigationandExploration += 1;
                    } else if (response[elsint].textType.result === "Motivation") {
                        elementStratEnd[el].Motivation += 1;
                    } else if (response[elsint].textType.result === "Observed Bug Behaviour") {
                        elementStratEnd[el].ObservedBugBehaviour += 1;
                    } else if (response[elsint].textType.result === "Potential New Issues and Requests") {
                        elementStratEnd[el].PotentialNewIssuesandRequests += 1;
                    } else if (response[elsint].textType.result === "Social Conversation") {
                        elementStratEnd[el].SocialConversation += 1;
                    } else if (response[elsint].textType.result === "Solution Discussion") {
                        elementStratEnd[el].SolutionDiscussion += 1;
                    } else if (response[elsint].textType.result === "Solution Usage") {
                        elementStratEnd[el].SolutionUsage += 1;
                    } else if (response[elsint].textType.result === "Task Progress") {
                        elementStratEnd[el].TaskProgress += 1;
                    } else if (response[elsint].textType.result === "Workarounds") {
                        elementStratEnd[el].Workarounds += 1;
                    };
                }
            }

            console.log(elementStratEnd);
        });
        sendResponse({ status: "changed" });
    }
});

