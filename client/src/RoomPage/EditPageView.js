import React, { Component } from 'react';
import { roomService } from "./services/RoomService";
import moment from "moment";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './style.css';
import { DateRange  } from 'react-date-range';
import { addDays } from 'date-fns';
import { Card, Affix, Button, Checkbox, Spin } from 'antd';
import { consts } from '../Consts';
import { withRouter } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const CheckboxGroup = Checkbox.Group;

class BookingPageView extends Component {

    constructor(props) {
        super(props);

        let splitedPath = window.location.pathname.split("/");
        let roomId = 1;
        let reservationId = 1;

        if(splitedPath.length == 4) {
            roomId = parseInt(splitedPath[2]);
            reservationId = parseInt(splitedPath[3]);
        } 

        this.bookingData = {
            room_id: roomId,
            from: " - ",
            to: " - ",
            price: 0,
            status: 'panding'
        };
        this.checkBoxOptions = [];
        this.totalDays = 0;
        this.editing_reservation = {};

        this.state = {
            roomId: roomId,
            reservation_id: reservationId,
            roomData: {},
            disabledDates: [],
            selection: {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
              },
            checkedList: [],
            loading: true
        }

        this.setData();
    }

    setData() {
        roomService.getRoomById(this.state.roomId).then((resp) => {
            this.setState({roomData: resp[0]}, () => {
                this.checkBoxOptions = this.state.roomData.additional_services.map( as => { return as + " + " + consts.additionalServicesPrices[as] });
                this.setReservations();
            });
        })
    }

    setCurrentReservation () {

        let from = this.editing_reservation.from;
        let to = this.editing_reservation.to;

        if(this.editing_reservation.additional_services !== undefined) {
            let newAdditionalServices = this.editing_reservation.additional_services.map( as => { return as + " + " + consts.additionalServicesPrices[as] });
            this.setState({checkedList: newAdditionalServices});
        }
    
        this.onDateChange({ selection: { startDate: new Date(from), endDate: new Date(to), key: 'selection' } });

    }

    setReservations() {
        let reservationIds = this.state.roomData.reservations;

        if (reservationIds.length > 0)
            roomService.getReservationsById(reservationIds).then((resp) => {
                resp = resp.map((reservation) => { 

                    if(reservation.id === this.state.reservation_id) {
                        this.editing_reservation = reservation;
                        this.setCurrentReservation();
                    }

                    return {
                        id: reservation.id, 
                        from: new Date(reservation.from), 
                        to: new Date(reservation.to) 
                    } 
                });
                
                let newRoomData = this.state.roomData;
                newRoomData.reservations = resp;
                this.setState({roomData: newRoomData}, () => {this.setDisabledDates()} );
            })
        else 
            this.setState({loading: false});
    }

    setDisabledDates() {
        let disabledDates = [];
        
        this.state.roomData.reservations.map( reservation => {
            let disable = reservation.from
            while ( disable <= reservation.to ) {
                if (disable < this.state.selection.startDate || disable > this.state.selection.endDate ) {
                    disabledDates.push(disable);
                }
                disable = addDays(disable, 1);
            }
        });

        this.setState({disabledDates: disabledDates, loading: false});
    }

    onChange = checkedList => {
        this.setState({
          checkedList,
          indeterminate: !!checkedList.length && checkedList.length < this.checkBoxOptions.length,
          checkAll: checkedList.length === this.checkBoxOptions.length,
        });
      };
    
    onCheckAllChange = e => {  
        this.setState({
          checkedList: e.target.checked ? this.checkBoxOptions : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
    };

    calculateTotal() {
        let additional_services = this.state.checkedList.map( as => { 
            let key = as.split("+")[0];
            let value = as.split("+")[1].split("zł")[0];

            return { [key]: parseInt(value) } 
        });

   
        additional_services = additional_services.map( (element) => {
            let key = Object.keys(element)[0];
            let value = element[key];

            if (key === "refreshments") value = value * this.state.roomData.capacity;

            return value * this.totalDays;
        }); 
        
        if(additional_services.length !== 0) 
            additional_services = additional_services.reduce( (total, value) => {
                return total + value;
            });
        else
            additional_services = 0;
  
        let total = 0;
        if(this.state.roomData.price) total = this.totalDays * this.state.roomData.price;
        this.bookingData.price = total + additional_services;
    }

    onDateChange = (item) => {

        const oneDay = 24 * 60 * 60 * 1000;
        let diffDays = Math.round(Math.abs((item.selection.endDate - item.selection.startDate) / oneDay));
        this.totalDays = diffDays + 1;

        this.bookingData.from = moment(item.selection.startDate).format().slice(0,10);
        this.bookingData.to = moment(item.selection.endDate).format().slice(0,10);
                                
        this.setState({ ...this.state, ...item });
    }

    makeReservation() {
        roomService.editReservation(this.bookingData).then((resp) => {
            alert(`Reservation for room ${this.state.roomData.name} has been edited`);

            let is_admin = JSON.parse(localStorage.getItem('user')).is_admin;
            if (is_admin) this.props.history.push('/all_reservations');
            else this.props.history.push('/my_reservations');
        });
    }

    bookIt = (e) => {
        this.bookingData.id = this.state.reservation_id;
        if (this.state.checkedList.length > 0) this.bookingData.additional_services = this.state.checkedList.map( value => value.split(" + ")[0] );
        this.makeReservation();
    }

    render() {
        this.calculateTotal();
        return (
            <Spin spinning={this.state.loading}>
            <div className="EditPage" style={{height: "100vh", paddingTop: '64px'}}>
                <div className="row1">
                    <div className="dataRange" >    
                        <DateRange
                            onChange={item => this.onDateChange(item)}
                            months={2}
                            direction="horizontal"
                            minDate={moment().toDate()}
                            ranges={[this.state.selection]}
                            rangeColors={['#0f2da0']}
                            disabledDates={this.state.disabledDates}
                            daySize={50}
                            style={{
                                width: "30vw",
                                background: "transparent"
                            }}
                            />
                    </div>
                    <Affix offsetTop={64}>
                        <div className="card">
                            <Card 
                                bordered={false} 
                                cover={<img alt="room_img" src={`${API_URL}/pictures/rooms/${this.bookingData.room_id}/1.jpg`} />}
                                style={{ width: '33vw' }}>
                            <h1>{this.state.roomData.name}</h1>        
                            <h3><u>Details</u></h3>
                            <p>{this.state.roomData.details}</p>

                            <b>Price per day: </b>{this.state.roomData.price} zł
                            <br/>
                            <b>Capacity: </b>{this.state.roomData.capacity} people 
                            <br/>
                            <b>Area: </b>{this.state.roomData.area} square meters 
                            <br />
                            <br />

                            <h3><u>Additional services</u></h3>
                            <ul>
                            {this.state.checkedList.map((as, index) => {
                                let as_value = parseInt(as.split("+")[1].split("zł")[0]);
                            return (<li key={index}>{as} * {this.totalDays} day(s) <b style= {{float: "right"}}>{as_value * this.totalDays} zł</b></li>)
                            })}
                            </ul>

                            <b>From: </b>{this.bookingData.from} 
                            <br />
                            <b>To: </b> {this.bookingData.to}
                            <br />
                            <br/>
                            <h2 style={{bottom: '6%', position: 'absolute'}}>Total: {this.bookingData.price} zł</h2>
                            <Button type="primary" 
                                    htmlType="submit"
                                    onClick={this.bookIt}
                                    size="large"
                                    style={{backgroundColor: '#0f2da0', border: 'none'}} 
                                    className="bookItButton">Save</Button>
                            </Card>
                        </div>
                    </Affix>
                    </div>
                    <div className="row2" >
                        <div className="bookingOptions" >  
                            <h2>Additional services</h2>
                            <div>
                                <Checkbox
                                    indeterminate={this.state.indeterminate}
                                    onChange={this.onCheckAllChange}
                                    checked={this.state.checkAll}
                                >
                                    Check all
                                </Checkbox>
                                </div>
                                <br />
                                <CheckboxGroup
                                options={this.checkBoxOptions}
                                value={this.state.checkedList}
                                onChange={this.onChange}
                                />
                        </div>
                    </div>
            </div>
            </Spin>);
    }

}

export default withRouter(BookingPageView);