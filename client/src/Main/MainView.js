import React, { Component } from 'react';
import logo from '../pictures/MainView_logo.png';
import { DownOutlined, FacebookOutlined, TwitterOutlined, SkypeOutlined, InstagramOutlined } from '@ant-design/icons'
import './style.css';
import Animate from 'rc-animate';
import AboutUs from './AboutUs';
import OurOffer from './OurOffer';
import FAQ from './FAQ';
import ContactUs from './ContactUs';


const Div = (props) => {
  const childrenProps = { ...props };
  delete childrenProps.show;
  return <div {...childrenProps} />;
};

class MainView extends Component{

  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    this.setState({
      show: true
    });
  };

  socialmediaIcons = () => {
    return (
      <div className="social-div" >
        <FacebookOutlined key={1} className="social-icon" />
        <TwitterOutlined key={2} className="social-icon" />
        <SkypeOutlined key={3} className="social-icon" />
        <InstagramOutlined key={4} className="social-icon" />
      </div>
    );
  };

  render() {
    return (
        [
        <div key={1} className="banner" >
                <div style={{height: "85vh", backgroundColor: "transparent"}}>
                <Animate
                    showProp="show"
                    transitionName="fade"
                    delay={400}>
                          <Div show={this.state.show}  style={{animationDuration: "1.5s"}} key="a">
                            <img src={logo} className="logo-img" alt='logo' />
                          </Div>
                  </Animate>
                  <DownOutlined className="down-icon"/>
                  <this.socialmediaIcons />
                </div>
        </div>,
         <div key={2}  ref="page0" className="page0">
           <AboutUs/>
         </div>,
        <div key={3}  ref="page1" className="page1">
          <OurOffer/>
        </div>,
        <div key={4}  ref="page2" className="page2">
          <FAQ/>
        </div>,
        <div key={5}  ref="page3" className="page3">
          <ContactUs/>
        </div>]
    );
  }
};

export default MainView;