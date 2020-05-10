import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import './style.css';
import ContactUsImg from '../pictures/ContactUs_img.png';
import { OverPack } from 'rc-scroll-anim';
import { FacebookOutlined, TwitterOutlined, SkypeOutlined, InstagramOutlined } from '@ant-design/icons';


class ContactUs extends Component{

  socialmediaIcons = () => {
    return ([
      <FacebookOutlined key={1} style={{fontSize: "35px", margin: "10px"}}/>,
      <TwitterOutlined key={2} style={{fontSize: "35px",  margin: "10px"}}/>,
      <SkypeOutlined key={3} style={{fontSize: "35px",  margin: "10px"}}/>,
      <InstagramOutlined key={4} style={{fontSize: "35px",  margin: "10px"}}/>
    ]);
  }

  componentDidMount() {
  }

  render() {
    return (
        <OverPack style={{ overflow: 'hidden' }} playScale={0.2} >
            <QueueAnim style={{background: "transparent"}}>
                <div key="a" className="pageHeader" style={{color: "#002692", paddingTop: "5%"}}>
                    Contact us
                </div>
                <div key="b" className="pageContent">
                    <div className="pageText" style={{margin: "unset", marginTop: "5%"}} >
                        If you have any questions or problems with using our platform please contact us
                        <br />
                        <br />
                        Phone: XXX-XXX-XXX
                        <br />
                        Email: xxx@email.com
                        <br />
                        <br />
                        <this.socialmediaIcons />
                    </div>
                    <img alt='intro' src={ContactUsImg} style={{float: "right", width: "20%", height: "20%"}}/>
                </div>
            </QueueAnim>
      </OverPack>
    );
  }
};

export default ContactUs;