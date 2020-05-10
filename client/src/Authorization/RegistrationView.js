import React, { Component } from 'react';
import './style.css';
import { Input, Button, DatePicker } from 'antd';
import { authService } from "./services/AuthService";


class RegistrationView extends Component {

  constructor(props) {
      super(props);
      this.state = {
          nickname: "",
          email: "",
          first_name: "",
          last_name: "",
          birth_date: "",
          password: "",
          repeatPassword: ""
      };
  }

  componentDidMount() {
    if(authService.isAuthenticated()) {
        this.props.history.push('/authorized');
    }
}

  registerHandler = async event => {
      event.preventDefault();

      if (!(this.state.nickname 
        && this.state.email 
        && this.state.first_name 
        && this.state.last_name 
        && this.state.birth_date 
        && this.state.password 
        && this.state.repeatPassword)) { 
          alert('All fields have to be filled');
          return; 
        }

      const response = await authService.register(this.state.nickname, this.state.email, this.state.first_name, 
        this.state.last_name, this.state.birth_date, this.state.password, this.state.repeatPassword);

      console.log(response);  
      console.log(response.body);

      if(response.token) {
          const user = {
              email: this.state.email,
              user_id: response.user.id,
              token: response.token
          };
          authService.authenticateUser(user);
          this.props.history.push('/authorized');
      } else {
          if(response.status === '404') {
            alert('Page not found');
          } else if(response.status === '409') {
            alert('User with given nickname or email already exists');
          }
          else {
            alert('Password and repeated password have to equal');
          }
      }
  };

  setValue = (key, e) => {
    if (key === "birth_date") this.setState({[key]: e});
    else this.setState({[key]: e.target.value})
  }

  render() {
    return (
      <div className="Registration banner" style={{height: "100vh", paddingTop: '64px'}}>
          <div className="registrationDiv">
            <div className="registrationInput">
              <Input size="large" placeholder="nickname" onChange={(e) => this.setValue('nickname', e)} style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
              <Input size="large" placeholder="email" onChange={(e) => this.setValue('email', e)} style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
              <Input size="large" placeholder="first name" onChange={(e) => this.setValue('first_name', e)}  style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
              <Input size="large" placeholder="last name" onChange={(e) => this.setValue('last_name', e)}  style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
              <DatePicker size="large" placeholder="birth date" format={'YYYY-MM-DD'} onChange={(date, dateString) => this.setValue('birth_date', dateString)}  style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
              <Input.Password size="large" placeholder="password" onChange={(e) => this.setValue('password', e)}  style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
              <Input.Password size="large" placeholder="repeat password" onChange={(e) => this.setValue('repeatPassword', e)}  style={{width: "85%", backgroundColor: "#0f2da0", color: "white", border: "none"}} />
            </div>
              <Button className="button" onClick={this.registerHandler} style={{top: "85%", backgroundColor: "#0f2da0", border: "none", color: "white"}}>
                Sign up
              </Button>
          </div>
      </div>);
  }

}

export default RegistrationView;