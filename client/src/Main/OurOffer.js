import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import './style.css';
import { OverPack } from 'rc-scroll-anim';


class OurOffer extends Component{

  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
 
    <OverPack style={{ overflow: 'hidden' }} playScale={0.4} >
            <QueueAnim style={{background: "transparent", paddingTop: "10%"}}>
                <div key="a" className="pageHeader" style={{color: "white", position: "relative"}}>Our offer</div>
                <div key="b" style={{display: "flex", justifyContent: "center"}}>

                  <div className="divWrapper">
                    <div className="transparent-div">
                      Conference halls
                    </div>
                    </div>

                    <div className="divWrapper">
                    <div className="transparent-div">
                      Meeting rooms
                    </div>
                    </div>

                    <div className="divWrapper">
                    <div className="transparent-div">
                      Studies
                    </div>
                    </div>
                    
                </div>
            </QueueAnim>
      </OverPack>
    
    );
  }
};

export default OurOffer;