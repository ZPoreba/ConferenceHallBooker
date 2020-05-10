import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginView from './Authorization/LoginView';
import MainView from './Main/MainView';
import RegistrationView from './Authorization/RegistrationView';
import AuthorizedMainView from './AuthorizedMain/AuthorizedMainView';
import FAQ from './Main/FAQ';
import BookingPageView from './RoomPage/BookingPageView';
import RoomPageView from './RoomPage/RoomPageView';
import MyReservationsView from './MyReservations/MyReservationsView';
import EditPageView from './RoomPage/EditPageView';


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
            <Route path="/authorized" component={AuthorizedMainView} />
            <Route path="/help" component={FAQWrapper} />
            <Route path="/my_reservations" component={MyReservationsView} />
            <Route path="/booking" component={BookingPageView} />
            <Route path="/edit" component={EditPageView} />
            <Route path="/room" component={RoomPageView} />
            <Route path="/" component={MainView} />
       </Switch>
   </div>
);

export default BaseRouter;