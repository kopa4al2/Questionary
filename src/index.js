import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import CreateQuestionForm from './Components/CreateQuestionForm';
import Layout from './Layout';

import './index.css';


// ReactDOM.render(
//     <Router history={hashHistory}>
//         <Route path="/" component={Layout}>
//             <IndexRoute component={Main}></IndexRoute>
//             <Route path="forgot_password" component={ForgotPassword}></Route>
//             <Route path="login_route" component={LoginForm}></Route>
//             <Route path="register_route" component={RegisterForm}></Route>
//             <Route path="upload_route" component={ImageUploader}></Route>
//             <Route path="lol/:postId" component={PostPage}></Route>
//         </Route>
//     </Router>,
//     document.getElementById('root')
// );
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={App}/>
            <Route path="create_question" component={CreateQuestionForm}/>
        </Route>
  </Router>,
  document.getElementById('root')
);
