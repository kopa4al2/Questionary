import React, {Component} from 'react';
import "../styles/question-form.css";
import KinveyRequester from '../scripts/Requester';
import Loader from '../Components/loading';
import $ from 'jquery';

var _this;

class QuestionForm extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            gameover:"",
            clicked: "", //FOR BUTTON CSS
            questionNumber: 1, //WILL GROW WITH EACH QUESTION
            questions: [],
            currentQuestion: "",
            answers: [],
        }
    }

    componentDidMount() {
        let questionsArr = this.state.questions;
        KinveyRequester.getAllQuestions().then(function (questions) {
            for (let question of questions) {
                let currentQuestion = {
                    id: question._id,
                    content: question.content
                };

                questionsArr.push(currentQuestion);
            }
            _this.setState({questions: questionsArr});
            let randomQuestion = _this.generateRandomQuestion();
            _this.setState({currentQuestion: randomQuestion});
            let answersArr = [];
            KinveyRequester.getAnswersForQuestion(_this.state.currentQuestion.id).then(function (answers) {
                answers.forEach(answer => answersArr.push(answer));
                _this.setState({answers: answersArr});
            }, function (error) {
                console.dir(error);
                alert('ne uspqh da vzema otgovorite')
            });

        }, function (response) {
            console.dir(response);
            alert('neshto ne stana')
        });

    }

    generateRandomQuestion() {
        return this.state.questions[ Math.floor(Math.random() * this.state.questions.length) ];
    }

    submitForm(e) {
        e.preventDefault();
        //TODO: VALIDATION IF USER CHECKED ANY ANSWER;
        this.setState({clicked: "-clicked"}); //FOR BUTTON CSS
        setTimeout(function () {
            _this.setState({clicked: ""});

            if ( document.getElementsByClassName('true')[ 0 ].checked ) {
                _this.setState({questionNumber: _this.state.questionNumber + 1});
                _this.generateNextQuestion();
                $(".answers").hide();
                $('.cs-loader').show();
            }
            else {
                // alert('Загуби');
                _this.handleGameOver();
            }
        }, 500);
    }

    generateNextQuestion() {
        let randomQuestion = this.generateRandomQuestion();
        this.setState({currentQuestion: randomQuestion});
        let answersArr = [];
        KinveyRequester.getAnswersForQuestion(randomQuestion.id).then(function (answers) {
            answers.forEach(answer => answersArr.push(answer));
            _this.setState({answers: answersArr});
            $(".answers").show();
            $('.cs-loader').hide();
            _this.forceUpdate();

        }, function (error) {
            console.dir(error);
            alert('ne uspqh da vzema otgovorite')
        });
    }

    handleGameOver() {
        sessionStorage.clear();
        sessionStorage['score'] = Number(this.state.questionNumber) * 1000;
        this.setState({questionNumber:1});
        $('.gameOver').attr('class', 'gameOver-shown');
        //OLD SCHOOL JQUERY APPROACH  he-he
        $('.answerQuestionForm').attr('class', 'answerQuestionForm-over')
        //this.setState({gameover:"-over"}); STUPID SHIT DOESNT UPDATE FORM
        this.forceUpdate();
    }

    render() {
        return (<div className={"answerQuestionForm" + this.state.gameover}>
            <form onSubmit={this.submitForm.bind(this)}>

                <header>
                    <span className="questionNumber">{this.state.questionNumber}</span>
                    <span className="questionContent">{this.state.currentQuestion.content}</span>
                </header>
                <Loader/>
                <div className="answers">
                    {
                        this.state.answers.map(answer =>
                                <span className="individualAnswer" key={answer._id + 100}>
                            <input key={answer._id} type="radio" name="answerRadio" className={answer.isCorrect}/>
                            <label key={answer._id + 1}>{answer.content}</label>
                        </span>
                        )}
                    <br/>
                    <input className={"answerQuestionButton" + this.state.clicked } type="submit" value="Answer"/>
                </div>
            </form>
        </div>)
    }
}
export default QuestionForm;