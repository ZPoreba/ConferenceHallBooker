import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './style.css';
import { Input, Button } from 'antd';
import { authService } from "./services/AuthService";

class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    componentDidMount() {
        if(authService.isAuthenticated()) {
            this.props.history.push('/authorized');
        }
    }

    loginHandler = async event => {
        event.preventDefault();

        if (!(this.state.email && this.state.password)) return;

        const response = await authService.login(this.state.email, this.state.password);
        if(response.token) {
            const user = {
                email: this.state.email,
                token: response.token
            };
            authService.authenticateUser(user);
            this.props.history.push('/authorized');
        } else {
            if(response.status === '404') {
                alert('Page not found');
            } else {
                alert('Wrong credentials');
            }
        }
    };

    render() {
        return (
            <div className="Login banner" style={{height: "100vh", paddingTop: '64px'}}>
                <div className="loginDiv">
                    <div className="loginInput">
                        <Input size="large" onChange={(e) => this.setState({email: e.target.value})} placeholder="email" style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
                        <Input.Password onChange={(e) => this.setState({password: e.target.value})} size="large" placeholder="password" style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
                    </div>
                    <Button size="large" onClick={this.loginHandler} className="button" style={{top: "65%", backgroundColor: "#0f2da0", border: "none", color: "white"}}>
                        Log in
                    </Button>
                </div>
            </div>);
    }

}

export default withRouter(LoginView);