'use strict';

import './popup.css';

document.addEventListener('DOMContentLoaded', function () {
    var Set = document.getElementById("Set1");
    Set.addEventListener('click', function () {
        var ListActiononIssue = document.getElementById('ListActiononIssue');
        var ListBugReproduction = document.getElementById('ListBugReproduction');
        var ListContributionandCommitment = document.getElementById('ListContributionandCommitment');
        var ListExpectedBehaviour = document.getElementById('ListExpectedBehaviour');
        var ListInvestigationandExploration = document.getElementById('ListInvestigationandExploration');
        var ListMotivation = document.getElementById('ListMotivation');
        var ListObservedBugBehaviour = document.getElementById('ListObservedBugBehaviour');
        var ListPotentialNewIssuesandRequests = document.getElementById('ListPotentialNewIssuesandRequests');
        var ListSocialConversation = document.getElementById('ListSocialConversation');
        var ListSolutionDiscussion = document.getElementById('ListSolutionDiscussion');
        var ListSolutionUsage = document.getElementById('ListSolutionUsage');
        var ListTaskProgress = document.getElementById('ListTaskProgress');
        var ListWorkarounds = document.getElementById('ListWorkarounds');
    
        var CheckActiononIssue = document.getElementById('CheckActiononIssue');
        var CheckBugReproduction = document.getElementById('CheckBugReproduction');
        var CheckContributionandCommitment = document.getElementById('CheckContributionandCommitment');
        var CheckExpectedBehaviour = document.getElementById('CheckExpectedBehaviour');
        var CheckInvestigationandExploration = document.getElementById('CheckInvestigationandExploration');
        var CheckMotivation = document.getElementById('CheckMotivation');
        var CheckObservedBugBehaviour = document.getElementById('CheckObservedBugBehaviour');
        var CheckPotentialNewIssuesandRequests = document.getElementById('CheckPotentialNewIssuesandRequests');
        var CheckSocialConversation = document.getElementById('CheckSocialConversation');
        var CheckSolutionDiscussion = document.getElementById('CheckSolutionDiscussion');
        var CheckSolutionUsage = document.getElementById('CheckSolutionUsage');
        var CheckTaskProgress = document.getElementById('CheckTaskProgress');
        var CheckWorkarounds = document.getElementById('CheckWorkarounds');
        var condition = {
            'List': {
                'ListActiononIssue': ListActiononIssue.value,
                'ListBugReproduction': ListBugReproduction.value,
                'ListContributionandCommitment': ListContributionandCommitment.value,
                'ListExpectedBehaviour': ListExpectedBehaviour.value,
                'ListInvestigationandExploration': ListInvestigationandExploration.value,
                'ListMotivation': ListMotivation.value,
                'ListObservedBugBehaviour': ListObservedBugBehaviour.value,
                'ListPotentialNewIssuesandRequests': ListPotentialNewIssuesandRequests.value,
                'ListSocialConversation': ListSocialConversation.value,
                'ListSolutionDiscussion': ListSolutionDiscussion.value,
                'ListSolutionUsage': ListSolutionUsage.value,
                'ListTaskProgress': ListTaskProgress.value,
                'ListWorkarounds': ListWorkarounds.value,
            },
            'Check': {
                'CheckActiononIssue': String(CheckActiononIssue.checked),
                'CheckBugReproduction': String(CheckBugReproduction.checked),
                'CheckContributionandCommitment': String(CheckContributionandCommitment.checked),
                'CheckExpectedBehaviour': String(CheckExpectedBehaviour.checked),
                'CheckInvestigationandExploration': String(CheckInvestigationandExploration.checked),
                'CheckMotivation': String(CheckMotivation.checked),
                'CheckObservedBugBehaviour': String(CheckObservedBugBehaviour.checked),
                'CheckPotentialNewIssuesandRequests': String(CheckPotentialNewIssuesandRequests.checked),
                'CheckSocialConversation': String(CheckSocialConversation.checked),
                'CheckSolutionDiscussion': String(CheckSolutionDiscussion.checked),
                'CheckSolutionUsage': String(CheckSolutionUsage.checked),
                'CheckTaskProgress': String(CheckTaskProgress.checked),
                'CheckWorkarounds': String(CheckWorkarounds.checked),
            },
        }
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "Discussion", 'condition': condition }, function (response) {
                console.log(response.status);
            });
        });
    });
    
    var Change = document.getElementById("Change");
    Change.addEventListener('click', function () {
        var ListActiononIssue = document.getElementById('ListActiononIssue');
        var ListBugReproduction = document.getElementById('ListBugReproduction');
        var ListContributionandCommitment = document.getElementById('ListContributionandCommitment');
        var ListExpectedBehaviour = document.getElementById('ListExpectedBehaviour');
        var ListInvestigationandExploration = document.getElementById('ListInvestigationandExploration');
        var ListMotivation = document.getElementById('ListMotivation');
        var ListObservedBugBehaviour = document.getElementById('ListObservedBugBehaviour');
        var ListPotentialNewIssuesandRequests = document.getElementById('ListPotentialNewIssuesandRequests');
        var ListSocialConversation = document.getElementById('ListSocialConversation');
        var ListSolutionDiscussion = document.getElementById('ListSolutionDiscussion');
        var ListSolutionUsage = document.getElementById('ListSolutionUsage');
        var ListTaskProgress = document.getElementById('ListTaskProgress');
        var ListWorkarounds = document.getElementById('ListWorkarounds');
    
        var CheckActiononIssue = document.getElementById('CheckActiononIssue');
        var CheckBugReproduction = document.getElementById('CheckBugReproduction');
        var CheckContributionandCommitment = document.getElementById('CheckContributionandCommitment');
        var CheckExpectedBehaviour = document.getElementById('CheckExpectedBehaviour');
        var CheckInvestigationandExploration = document.getElementById('CheckInvestigationandExploration');
        var CheckMotivation = document.getElementById('CheckMotivation');
        var CheckObservedBugBehaviour = document.getElementById('CheckObservedBugBehaviour');
        var CheckPotentialNewIssuesandRequests = document.getElementById('CheckPotentialNewIssuesandRequests');
        var CheckSocialConversation = document.getElementById('CheckSocialConversation');
        var CheckSolutionDiscussion = document.getElementById('CheckSolutionDiscussion');
        var CheckSolutionUsage = document.getElementById('CheckSolutionUsage');
        var CheckTaskProgress = document.getElementById('CheckTaskProgress');
        var CheckWorkarounds = document.getElementById('CheckWorkarounds');
        var condition = {
            'List': {
                'ListActiononIssue': ListActiononIssue.value,
                'ListBugReproduction': ListBugReproduction.value,
                'ListContributionandCommitment': ListContributionandCommitment.value,
                'ListExpectedBehaviour': ListExpectedBehaviour.value,
                'ListInvestigationandExploration': ListInvestigationandExploration.value,
                'ListMotivation': ListMotivation.value,
                'ListObservedBugBehaviour': ListObservedBugBehaviour.value,
                'ListPotentialNewIssuesandRequests': ListPotentialNewIssuesandRequests.value,
                'ListSocialConversation': ListSocialConversation.value,
                'ListSolutionDiscussion': ListSolutionDiscussion.value,
                'ListSolutionUsage': ListSolutionUsage.value,
                'ListTaskProgress': ListTaskProgress.value,
                'ListWorkarounds': ListWorkarounds.value,
            },
            'Check': {
                'CheckActiononIssue': String(CheckActiononIssue.checked),
                'CheckBugReproduction': String(CheckBugReproduction.checked),
                'CheckContributionandCommitment': String(CheckContributionandCommitment.checked),
                'CheckExpectedBehaviour': String(CheckExpectedBehaviour.checked),
                'CheckInvestigationandExploration': String(CheckInvestigationandExploration.checked),
                'CheckMotivation': String(CheckMotivation.checked),
                'CheckObservedBugBehaviour': String(CheckObservedBugBehaviour.checked),
                'CheckPotentialNewIssuesandRequests': String(CheckPotentialNewIssuesandRequests.checked),
                'CheckSocialConversation': String(CheckSocialConversation.checked),
                'CheckSolutionDiscussion': String(CheckSolutionDiscussion.checked),
                'CheckSolutionUsage': String(CheckSolutionUsage.checked),
                'CheckTaskProgress': String(CheckTaskProgress.checked),
                'CheckWorkarounds': String(CheckWorkarounds.checked),
            },
        }
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "Change", 'condition': condition }, function (response) {
                console.log(response);
            });
        });
    });

});