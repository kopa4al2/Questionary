import React, {Component} from 'react';
import KinveyRequester from '../scripts/Requester';
import '../styles/highscores.css';

const HIGH_SCORES_SHOWN = 5;
var _this;
class HighScores extends Component {

    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            isShown: "",
            scores:[]
        };
    }

    showHideForm() {
        if ( this.state.isShown === "" ) {
            KinveyRequester.getHighScores().then(function (scores) {
                let scoresObj = [];
                scores.forEach(function (score) {
                    let obj = {};
                    obj[ 'username' ] = score.user;
                    obj[ 'score' ] = score.score;
                    obj['id'] = score._id;
                    scoresObj.push(obj);
                });
                scoresObj.sort(function(playera,playerb) {
                    return playerb.score-playera.score;
                });
                scoresObj = scoresObj.slice(0, HIGH_SCORES_SHOWN + 1);
                _this.setState({scores:scoresObj});

            }, function (er) {
                alert('fail');
                console.dir(er)
            })
        }
        _this.state.isShown === "" ? _this.setState({isShown: "shown"}) : _this.setState({isShown: ""});
    }

    render() {
        return (<div id={"highScores" + this.state.isShown} onClick={this.showHideForm.bind(this)}>
            <div className="title">High Scores</div>
            <ul>
                {this.state.scores.map(playerScore =>
                <span key={playerScore.id}>
                <li>{playerScore.username}</li>
                    <li>{playerScore.score}</li>
                </span>
                )}

            </ul>
        </div>)
    }
}

export default HighScores;