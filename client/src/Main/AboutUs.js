import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import './style.css';
import AboutUsImg from '../pictures/AboutUs_img.png';
import { OverPack } from 'rc-scroll-anim';


class AboutUs extends Component{

  componentDidMount() {
  }

  render() {
    return (
        <OverPack style={{ overflow: 'hidden' }} playScale={0.3} >
            <QueueAnim style={{background: "transparent", paddingTop: "3%"}}>
                <div key="a" className="pageHeader" style={{color: "#002692"}}>
                    About us
                </div>
                <div key="b" className="pageContent">
                <div className="pageText" >
                    Conference Hall Booker has been created to let our customers easily book any kind of conference rooms.
                    Our offer is really wide, from cosy meeting rooms up to huge conference halls. What is more we do not only
                    focus on letting rooms, we also provide many additional services.
                    <br />
                    <br />
                    If you want to book room easily use our platform. You can search for offer that is the most interesting for you.
                    You will be informed up to date about any changes 'in your order. Conference Hall Booker is easy and pleasant way
                    to deal with all your requirements and make whole process of booking faster.
                    <br />
                    <br />
                    Don't waste your time, choose Conference Hall Booker
                </div>
                <img alt='intro' src={AboutUsImg} style={{float: "right", width: "23%", height: "23%"}}/>
                </div>
            </QueueAnim>
      </OverPack>
    );
  }
};

export default AboutUs;