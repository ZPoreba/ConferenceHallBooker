import React, { Component } from 'react';
import { Card, Input, DatePicker } from 'antd';
import { profileService } from "./services/ProfileService";
import { UserOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons';
import moment from "moment";
import './style.css';


class Profile extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: {}
        };
        this.setUserData();
        
    }

    setUserData () {
        profileService.getUserProfile().then((resp) => {
            this.setState({user: resp[0]});
        });
    }

    render() {
        console.log(this.state)
        return (
            <div className="ProfilePage" style={{height: "100vh", paddingTop: '64px'}} >
                <Card title={`${this.state.user.first_name} ${this.state.user.last_name}`} bordered={false} style={{ width: "30%" }}>
                    <div className="userDiv">
                        <Input className="userInput" size="large" placeholder="First Name" value={this.state.user.first_name} disabled={true} prefix={<UserOutlined />}/>
                        <Input className="userInput" size="large" placeholder="Last Name" value={this.state.user.last_name} disabled={true} prefix={<UserOutlined />} />
                        <Input className="userInput" size="large" placeholder="Email" value={this.state.user.email} disabled={true} prefix={<MailOutlined />} />
                        { this.state.user.birth_date ? <DatePicker size="large" placeholder="Birth Date" defaultValue={ moment(this.state.user.birth_date.split('T')[0], 'YYYY-MM-DD')}  format={'YYYY-MM-DD'} disabled={true} style={{marginBottom: "20px"}} />: null }
                        <Input className="userInput" size="large" placeholder="password" value={'********'} disabled={true} prefix={<KeyOutlined />} />
                    </div>
                </Card>
            </div>
        );
    }
}

export default Profile;