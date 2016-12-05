import React, {Component} from 'react';
import '../styles/create-question.css';
import KinveyRequester from '../scripts/Requester';

let _this;
class CreateQuestionForm extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            correct: null
        }
    }

    render() {
        return (<div className="createQuestionForm">
            <form onSubmit={this.submitQuestion}>
                <div>Question</div>
                <input type="text" className="questionInput" required="required" placeholder="Question" ref="question"/>
                <div className="answers" ref="answers">
                    <div>Answer one</div>
                    <input type="text" id="1" className="answerInput1" required="required" placeholder="answer"
                           ref="answer1"/>
                    <input type="radio" className="isCorrect" name="isCorrect"
                           onChange={() => this.setState({correct: 1})}/>
                    <div>Answer two</div>
                    <input type="text" id="2" className="answerInput2" required="required" placeholder="answer"
                           ref="answer2"/>
                    <input type="radio" className="isCorrect" name="isCorrect"
                           onChange={() => this.setState({correct: 2})}/>
                    <div>Answer three</div>
                    <input type="text" id="3" className="answerInput3" required="required" placeholder="answer"
                           ref="answer3"/>
                    <input type="radio" className="isCorrect" name="isCorrect"
                           onChange={() => this.setState({correct: 3})}/>
                    <div>Answer four</div>
                    <input type="text" id="4" className="answerInput4" required="required" placeholder="answer"
                           ref="answer4"/>
                    <input type="radio" className="isCorrect" name="isCorrect"
                           onChange={() => this.setState({correct: 4})}/>
                </div>
                <input type="submit" value="Submit question"/>
            </form>
        </div>)
    }

    submitQuestion(e) {
        if ( _this.state.correct == null )
            alert('choose the correct answer')
        else {


            KinveyRequester.addQuestion({content: _this.refs.question.value}).then(function (response) {
                for (var i = 1; i <= 4; i++) {
                    let ref = "answer" + i;  // reference to the input ref
                    let isCorrect;
                    if ( i == _this.state.correct )
                        isCorrect = true;
                    else {
                        isCorrect = false;
                    }
                    let answer = _this.refs[ ref ].value;
                    let answerData = {
                        postId: response._id,
                        content: answer,
                        isCorrect: isCorrect
                    }
                    KinveyRequester.addAnswers(answerData);
                } //END OF FOR CYCLE
            }, function (response) {
                console.dir(response);
                alert("Възникна грешка при качването на въпроса")
            })
        }

    }

}

export default CreateQuestionForm;