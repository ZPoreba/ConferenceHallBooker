import React, { Component } from 'react';
import './style.css';
import { roomService } from "./services/RoomService";
import littleBaner from '../pictures/room_baner_little.png';
import { Layout, Card, Button, Carousel } from 'antd';
import PicturesModal from './components/PicturesModal';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';


const API_URL = process.env.REACT_APP_API_URL;
const { Header, Content } = Layout;

class RoomPageView extends Component {

    constructor(props) {
        super(props);

        let splitedPath = window.location.pathname.split("/");
        let roomId = 1;
        if(splitedPath.length == 3) roomId = parseInt(splitedPath[2]);

        this.state = {
            roomId: roomId,
            roomData: {},
            picturesNames: []
        }

        this.carousel = React.createRef();
        this.setData();
        this.setPictures();
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

    setData() {
        roomService.getRoomById(this.state.roomId).then((resp) => {
            this.setState({roomData: resp[0]});
        });
    }

    setPictures() {
        roomService.getPicturesNames(this.state.roomId).then((resp) => {
            this.setState({picturesNames: resp});
        });
    }

    render() { 
        console.log(this.state)
        return (
            <div className="Room Page" style={{height: "100vh", paddingTop: '64px'}}>
                 <Header style={{
                        position: "fixed",
                        zIndex: 1000,
                        width: "100vw",
                        background: `url(${littleBaner}) no-repeat`
                    }}>
                        <h1 style={{color: "white", float: "left", marginLeft: "2%"}}>{this.state.roomData.name}</h1>
                    </Header>
                    <Content style={{paddingTop: '64px', display: 'flex'}}>
                        <Card title={<h2>Details</h2>} bordered={false} style={{ width: "25vw", textAlign: "left", marginLeft: "3%", marginTop: "3%", marginRight: "13%"}}>
                             <p>{this.state.roomData.details}</p>
                             <br />
                             <p> 
                                <b>Capacity: </b>{this.state.roomData.capacity} people 
                                <br />
                                <b>Area: </b>{this.state.roomData.area} square meters 
                             </p>
                             <br />
                            
                            Additional services available for this room:
                            <ul>
                            {
                                this.state.roomData.additional_services ? 
                                this.state.roomData.additional_services.map((as, index) => {return (<li key={index}>{as}</li>)}): null
                            }
                            </ul>
                            <h2 style={{bottom: '6%', position: 'absolute', textAlign: "left"}}>Price: {this.state.roomData.price} zł/day</h2>
                            <Button type="primary" 
                                    size="large"
                                    onClick={() => this.props.history.push(`/booking/${this.state.roomId}`)}
                                    style={{backgroundColor: '#0f2da0', border: 'none', bottom: '6%', right: '3%', position: 'absolute'}} 
                                    className="bookItButton">Book it</Button>
                             
                        </Card>
                        <div className='carouselDiv' >
                                <Carousel style={{marginBottom: "3%"}} ref={this.carousel}>
                                    {
                                    this.state.picturesNames.map((picture, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="imageWrapper" style={{display: 'flex', justifyContent: 'center'}}>
                                                    <img src={`${API_URL}/pictures/rooms/${this.state.roomId}/${picture}`} alt={'carousel picture'} />
                                                </div>
                                            </div>
                                            )
                                    })
                                    }
                                </Carousel>
                                <div>
                                    <LeftCircleOutlined style={{float: "left", fontSize: "200%", color: "rgb(0, 38, 146)"}} onClick={this.handlePrev} />
                                    <RightCircleOutlined style={{float: "right", fontSize: "200%", color: "rgb(0, 38, 146)"}} onClick={this.handleNext} />
                                </div>
                        </div>
                    </Content>
            </div>
        );
    }
}

export default withRouter(RoomPageView);