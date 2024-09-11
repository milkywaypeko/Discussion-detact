'use strict';

import './popup.css';

document.addEventListener('DOMContentLoaded', function(){
    var Set = document.getElementById("Set1");
    Set.addEventListener('click', function(){
        const ActiononIssue = document.getElementById('ActiononIssue').value;
        const BugReproduction = document.getElementById('BugReproduction').value;
        const ContributionandCommitment = document.getElementById('ContributionandCommitment').value;
        const ExpectedBehaviour = document.getElementById('ExpectedBehaviour').value;
        const InvestigationandExploration = document.getElementById('InvestigationandExploration').value;
        const Motivation = document.getElementById('Motivation').value;
        const ObservedBugBehaviour = document.getElementById('ObservedBugBehaviour').value;
        const PotentialNewIssuesandRequests = document.getElementById('PotentialNewIssuesandRequests').value;
        const SocialConversation = document.getElementById('SocialConversation').value;
        const SolutionDiscussion = document.getElementById('SolutionDiscussion').value;
        const SolutionUsage = document.getElementById('SolutionUsage').value;
        const TaskProgress = document.getElementById('TaskProgress').value;
        const Workarounds = document.getElementById('Workarounds').value;

        var condition = {
            'ActiononIssue' : ActiononIssue,
            'BugReproduction' : BugReproduction,
            'ContributionandCommitment' : ContributionandCommitment,
            'ExpectedBehaviour' : ExpectedBehaviour,
            'InvestigationandExploration' : InvestigationandExploration,
            'Motivation' : Motivation,
            'ObservedBugBehaviour' : ObservedBugBehaviour,
            'PotentialNewIssuesandRequests' : PotentialNewIssuesandRequests,
            'SocialConversation' : SocialConversation,
            'SolutionDiscussion' : SolutionDiscussion,
            'SolutionUsage' : SolutionUsage,
            'TaskProgress' : TaskProgress,
            'Workarounds' : Workarounds,
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