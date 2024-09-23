'use strict';

import './popup.css';

document.addEventListener('DOMContentLoaded', function(){
    var Set = document.getElementById("Set1");
    Set.addEventListener('click', function(){
        const ListActiononIssue = document.getElementById('ListActiononIssue').value;
        const ListBugReproduction = document.getElementById('ListBugReproduction').value;
        const ListContributionandCommitment = document.getElementById('ListContributionandCommitment').value;
        const ListExpectedBehaviour = document.getElementById('ListExpectedBehaviour').value;
        const ListInvestigationandExploration = document.getElementById('ListInvestigationandExploration').value;
        const ListMotivation = document.getElementById('ListMotivation').value;
        const ListObservedBugBehaviour = document.getElementById('ListObservedBugBehaviour').value;
        const ListPotentialNewIssuesandRequests = document.getElementById('ListPotentialNewIssuesandRequests').value;
        const ListSocialConversation = document.getElementById('ListSocialConversation').value;
        const ListSolutionDiscussion = document.getElementById('ListSolutionDiscussion').value;
        const ListSolutionUsage = document.getElementById('ListSolutionUsage').value;
        const ListTaskProgress = document.getElementById('ListTaskProgress').value;
        const ListWorkarounds = document.getElementById('ListWorkarounds').value;

        var condition = {
            'List' : {
                'ListActiononIssue' : ListActiononIssue,
                'ListBugReproduction' : ListBugReproduction,
                'ListContributionandCommitment' : ListContributionandCommitment,
                'ListExpectedBehaviour' : ListExpectedBehaviour,
                'ListInvestigationandExploration' : ListInvestigationandExploration,
                'ListMotivation' : ListMotivation,
                'ListObservedBugBehaviour' : ListObservedBugBehaviour,
                'ListPotentialNewIssuesandRequests' : ListPotentialNewIssuesandRequests,
                'ListSocialConversation' : ListSocialConversation,
                'ListSolutionDiscussion' : ListSolutionDiscussion,
                'ListSolutionUsage' : ListSolutionUsage,
                'ListTaskProgress' : ListTaskProgress,
                'ListWorkarounds' : ListWorkarounds,
            }
            
        }

        /*
        console.log('Actionon Issue :' + ActiononIssue);
        console.log('Bug Reproduction :' + BugReproduction);
        console.log('Contributionand Commitment :' + ContributionandCommitment);
        console.log('Expected Behaviour :' + ExpectedBehaviour);
        console.log('Investigationand Exploration :' + InvestigationandExploration);
        console.log('Motivation :' + Motivation);
        console.log('Observed Bug Behaviour :' + ObservedBugBehaviour);
        console.log('Potential New Issuesand Requests :' + PotentialNewIssuesandRequests);
        console.log('Social Conversation :' + SocialConversation);
        console.log('Solution Discussion :' + SolutionDiscussion);
        console.log('SolutionUsage :' + SolutionUsage);
        console.log('Task Progress :' + TaskProgress);
        console.log('Workarounds :' + Workarounds);
        */


        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "Discussion", 'condition':condition}, function(response) {
                console.log(response.status);
            });
        });
    });
});