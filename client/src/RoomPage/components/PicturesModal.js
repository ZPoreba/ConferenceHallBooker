import { Modal, Carousel } from 'antd';
import React, { Component } from 'react';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import './PicturesModal.css';

function importAll(r) {
    return r.keys().map(r);
}

const ConferenceHalls = importAll(require.context('../../pictures/ConferenceHalls/', false, /\.(png|jpg|svg)$/));
const MeetingRooms = importAll(require.context('../../pictures/MeetingRooms/', false, /\.(png|jpg|svg)$/));
const Studies = importAll(require.context('../../pictures/Studies/', false, /\.(png|jpg|svg)$/));

class PicturesModal extends Component{

    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            title: 'Conference halls',
            images: {},
            ready: false,
        }

        this.carousel = React.createRef();


    }

    componentDidMount() {
        this.setState({images: {'Conference halls': ConferenceHalls, 'Meeting rooms': MeetingRooms, 'Studies': Studies}}, () => {
            this.setState({ready: true}, () => {});
        });
    }

    display = (title) => {
        this.setState({ visible: true, title: title });
    }
    
    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleNext = () => {
        this.carousel.current.next();
    }

    handlePrev = () => {
        this.carousel.current.prev();
    }

    getImage = () => {
        return require(`${this.state.path}`)
    }

    render() {
        console.log(this.state.images);
        return (
        <Modal 
        className="custom-modal"
        visible={this.state.visible} 
        title={this.state.title} 
        footer={[]}
        onCancel={this.handleCancel}>
            <Carousel className="custom-carousel" ref={this.carousel}>
                <div>
                    <div className="imageWrapper" >
                        { this.state.ready && this.state.title ? <img src={this.state.images[this.state.title][0]} alt={this.state.title} /> : null }
                    </div>
                </div>
                <div>
                    <div className="imageWrapper" >
                        { this.state.ready && this.state.title ? <img src={this.state.images[this.state.title][1]} alt={this.state.title} /> : null }
                    </div>
                </div>
                <div>
                    <div className="imageWrapper" >
                        { this.state.ready && this.state.title ? <img src={this.state.images[this.state.title][2]} alt={this.state.title} /> : null }
                    </div>
                </div>
            </Carousel>
            <div style={{overflow: "hidden"}}>
                <LeftCircleOutlined className="arrow-icon" style={{float: "left"}} onClick={this.handlePrev} />
                <RightCircleOutlined className="arrow-icon" style={{float: "right"}} onClick={this.handleNext} />
            </div>
        </Modal>
        );
    }

};

export default PicturesModal;