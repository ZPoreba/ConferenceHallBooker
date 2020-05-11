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

        document.getElementById('loginWrapper').addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
              document.getElementById('submitButton').click();
            }
          });
    }

    loginHandler = async event => {
        event.preventDefault();

        if (!(this.state.email && this.state.password)) { 
            alert('All fields have to be filled');
            return; 
        }

        const response = await authService.login(this.state.email, this.state.password);
        if(response.token) {
            let is_admin = response.user.is_admin === undefined ? false: response.user.is_admin;
            const user = {
                email: this.state.email,
                user_id: response.user.id,
                is_admin: is_admin,
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
                    <div id="loginWrapper" className="loginInput">
                        <Input size="large" onChange={(e) => this.setState({email: e.target.value})} placeholder="email" style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
                        <Input.Password onChange={(e) => this.setState({password: e.target.value})} size="large" placeholder="password" style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
                    </div>
                    <Button size="large" onClick={this.loginHandler} id="submitButton" className="button" style={{top: "65%", backgroundColor: "#0f2da0", border: "none", color: "white"}}>
                        Log in
                    </Button>
                </div>
            </div>);
    }

}

export default withRouter(LoginView);