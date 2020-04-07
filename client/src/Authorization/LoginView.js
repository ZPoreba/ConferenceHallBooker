import React, { Component } from 'react';
import './style.css';
import { Input, Button } from 'antd';


class LoginView extends Component {

  render() {
  return (
    <div className="Login banner" style={{height: "100vh", paddingTop: '64px'}}>
        <div className="loginDiv">
          <div className="loginInput">
            <Input size="large" placeholder="email" style={{width: "65%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
            <Input.Password size="large" placeholder="password" style={{width: "65%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
          </div>
            <Button size="large" className="button" style={{top: "65%", backgroundColor: "#0f2da0", border: "none", color: "white"}}>
              Log in
            </Button>
        </div>
    </div>);
  }

}

export default LoginView;