import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginView from './Authorization/LoginView';
import MainView from './Main/MainView';
import RegistrationView from './Authorization/RegistrationView';
import AuthorizedMain from './AuthorizedMain/AuthorizedMain';
import FAQ from './Main/FAQ';


class FAQWrapper extends React.Component {
    render() {
        return(
            <div  ref="page2" className="page2"><FAQ /></div>
        );
    }
}

const BaseRouter = () => (
   <div>
       <Switch>
            <Route path="/register" component={RegistrationView} />
            <Route path="/login" component={LoginView} />
            <Route path="/authorized" component={AuthorizedMain} />
            <Route path="/help" component={FAQWrapper} />
            <Route path="/" component={MainView} />
       </Switch>
   </div>
);

export default BaseRouter;