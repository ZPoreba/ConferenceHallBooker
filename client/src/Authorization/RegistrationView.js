import React, { Component } from 'react';
import './style.css';
import { Input, Button, DatePicker } from 'antd';


class RegistrationView extends Component {
  render() {
  return (
    <div className="Registration banner" style={{height: "100vh", paddingTop: '64px'}}>
        <div className="registrationDiv">
          <div className="registrationInput">
            <Input size="large" placeholder="email" style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
            <Input size="large" placeholder="first name" style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
            <Input size="large" placeholder="last name" style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
            <DatePicker size="large" placeholder="birth date" style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
            <Input.Password size="large" placeholder="password" style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
            <Input.Password size="large" placeholder="repeat password" style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
          </div>
            <Button className="button" style={{top: "85%", backgroundColor: "#0f2da0", border: "none", color: "white"}}>
              Sign up
            </Button>
        </div>
    </div>);
  }

}

export default RegistrationView;