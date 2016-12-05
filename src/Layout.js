import React, { Component } from 'react';
import {Link} from 'react-router';
import './App.css';
import './styles/layout.css';

class Layout extends Component {
    render() {
        return (
            <div className="App">
                <header className="appHeader">
                    <div className="title">{"Test your skills in this Questionary"}</div>
                    <Link to="/create_question">Create Question</Link>
                </header>
                <div className="mainContent">
                    {this.props.children}
                </div>
                <footer className="appFooter">
                    {"Made by Stefan"}
                </footer>
            </div>
        );
    }
}
export default Layout;