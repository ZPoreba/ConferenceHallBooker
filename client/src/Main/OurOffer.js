import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import './style.css';
import { OverPack } from 'rc-scroll-anim';
import PicturesModal from './components/PicturesModal';


class OurOffer extends Component{

  constructor(props) {
    super(props);
    
    this.modal = React.createRef();
  }

  setStyle() {
      setTimeout( ()=> {
          let modals = document.querySelectorAll(".ant-modal-content");

          modals.forEach(function (value, key, myArray) {
              let header = value.querySelector(".ant-modal-header");
              let title = value.querySelector(".ant-modal-title");
              let footer = value.querySelector(".ant-modal-footer");
              let close = value.querySelector(".ant-modal-close-x");

              value.className = 'custom-modal';
              header.className = 'custom-modal-header';
              title.className = 'custom-modal-title';
              footer.className = '';
              close.className = 'custom-modal-close';
          });
      }, 0);

    };

  render() {
    return (
    <OverPack style={{ overflow: 'hidden' }} playScale={0.4} >
            <QueueAnim style={{background: "transparent", paddingTop: "10%"}}>
                <div key="a" className="pageHeader" style={{color: "white", position: "relative"}}>Our offer</div>
                <div key="b" style={{display: "flex", justifyContent: "center"}}>

                  <div className="divWrapper">
                    <div
                        onClick={async () => {
                            await this.modal.current.display("Conference halls", "ConferenceHalls");
                            this.setStyle();
                        }}
                         className="transparent-div">
                      Conference halls
                    </div>
                    </div>

                    <div className="divWrapper">
                    <div
                        onClick={async () => {
                            await this.modal.current.display("Meeting rooms", "MeetingRooms");
                            this.setStyle();
                        }}
                        className="transparent-div">
                      Meeting rooms
                    </div>
                    </div>

                    <div className="divWrapper">
                    <div
                        onClick={async () => {
                            await this.modal.current.display("Studies", "Studies");
                            this.setStyle();
                        }}
                        className="transparent-div">
                      Studies
                    </div>
                    </div>
                    
                </div>
                < PicturesModal ref={this.modal} />
            </QueueAnim>
      </OverPack>
    
    );
  }
};

export default OurOffer;