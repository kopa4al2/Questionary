import $ from 'jquery';

const KinveyRequester = (function(){
    const baseUrl = "https://baas.kinvey.com/";
    const appKey = "kid_ryh1uUxXg";
    // const appSecret = "c9f90a921eb34fe692aa29ed3fd7311d";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " + btoa("admin:admin"),
    };

    function addQuestion(questionData) {
        return $.ajax({
            method:"POST",
            url:baseUrl + "appdata/" + appKey + "/questions",
            headers:kinveyAppAuthHeaders,
            data:questionData
        })
    }

    function addAnswers(answersData) {
        return $.ajax({
            method:"POST",
            url:baseUrl + "appdata/" + appKey + "/answers",
            headers:kinveyAppAuthHeaders,
            data:answersData
        })
    }

    function getAllQuestions() {
        return $.ajax({
            method:"GET",
            url:baseUrl + "appdata/" + appKey + "/questions",
            headers:kinveyAppAuthHeaders
        })
    }

    function getAnswersForQuestion(questionId) {
        return $.ajax({
            method:"GET",
            url:baseUrl + "appdata/" + appKey + "/answers/?query=" + JSON.stringify({postId:questionId}),
            headers:kinveyAppAuthHeaders
        })
    }

    function submitScore(data) {
        console.dir(data)
        return $.ajax({
            method:"POST",
            url:baseUrl + "appdata/" + appKey + "/scores",
            headers:kinveyAppAuthHeaders,
            data:data
        })
    }

    function getHighScores() {
        // innapropriate score parsing  url:baseUrl + "appdata/" + appKey + "/scores/?query={}&sort=" + JSON.stringify({"score": 1}), + "/?query={}&limit=5",
        return $.ajax({
           method:"GET",
            url:baseUrl + "appdata/" + appKey + "/scores",
            headers:kinveyAppAuthHeaders
        });
    }

    return {addQuestion, addAnswers, getAllQuestions, getAnswersForQuestion, submitScore, getHighScores}
}());

export default KinveyRequester;