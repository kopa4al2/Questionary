import React, {Component} from 'react';
import KinveyRequester from '../scripts/Requester';
import '../styles/game-over.css';
import $ from 'jquery';


let _this
class GameOver extends Component {


    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            user:""
        }
    }

    inputUser() {

        this.setState({user:_this.refs.user.value});
    }

    submitScoreAndStartNewGame() {
        let data ={
            user:this.state.user,
            score:Number(sessionStorage['score'])
        };
        console.dir(data);
        KinveyRequester.submitScore(data).then(function() {
            sessionStorage.clear();
            _this.hideForm();
        }, function(r) {
            alert('Ne uspqh da submitna score')
            console.dir(r);
        })
    }

    hideForm(e) {
        if (e)
            e.preventDefault();
        $('.gameOver-shown').attr('class', 'gameOver');
        $('.answerQuestionForm-over').attr('class', 'answerQuestionForm')
    }

    startNewGame() {
        this.hideForm();
    }

    render() {
        return (<div className="gameOver">
            <div className="header">Congratulations, you have lost!</div>
            <label>Your score is: </label>
            <div id="score">{sessionStorage[ 'score' ]}</div>
            <label>You survived until: </label>
            <div id="questionLost">{sessionStorage[ 'score' ] / 1000 + "th question"}</div>
            <form onSubmit={this.submitScoreAndStartNewGame.bind(this)} className="submitToHighScore">
                <span className="willSubmit">
               <input type="text" ref="user" onChange={this.inputUser.bind(this)} required="required"/>
                <input type="submit" value="Submit to high score"/>
                </span>
                <br/>
                <span className="willNotSubmit">
                    <button type="button" onClick={this.startNewGame.bind(this)}>I rather not, let me play again</button>
                </span>
            </form>
        </div>)
    }
}

export default GameOver;