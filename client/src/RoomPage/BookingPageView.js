import React, { Component } from 'react';
import { roomService } from "./services/RoomService";
import moment from "moment";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './style.css';
import { DateRange  } from 'react-date-range';
import { addDays } from 'date-fns';
import { Card, Affix, Button, Checkbox, Form, Input, Spin } from 'antd';
import { consts } from '../Consts';
import { withRouter } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

const CheckboxGroup = Checkbox.Group;

class BookingPageView extends Component {

    constructor(props) {
        super(props);

        let splitedPath = window.location.pathname.split("/");
        let roomId = 1;
        if(splitedPath.length == 3) roomId = parseInt(splitedPath[2]);

        let user = JSON.parse(localStorage.getItem('user'));
        this.bookingData = {
            room_id: roomId,
            user_id: user.user_id,
            from: " - ",
            to: " - ",
            price: 0,
            status: 'panding'
        };
        this.checkBoxOptions = [];
        this.totalDays = 0;
        this.form = React.createRef();

        this.state = {
            roomId: roomId,
            roomData: {},
            disabledDates: [],
            selection: {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
              },
            checkedList: [],
            indeterminate: true,
            checkAll: false,
            detailsInputDisabled: true,
            showError: false,
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

    setReservations() {
        let reservationIds = this.state.roomData.reservations;

        if (reservationIds.length > 0)
            roomService.getReservationsById(reservationIds).then((resp) => {
                resp = resp.map((reservation) => { return {
                                                        id: reservation.id, 
                                                        from: new Date(reservation.from), 
                                                        to: new Date(reservation.to) 
                                                        } 
                                                });
                
                let newRoomData = this.state.roomData;
                newRoomData.reservations = resp;
                this.setState({roomData: newRoomData}, () => {this.setDisabledDates()});
            })
        else 
            this.setState({loading: false});
    }

    setDisabledDates() {
        let disabledDates = [];
        
        this.state.roomData.reservations.map( reservation => {
            let disable = reservation.from
            while ( disable <= reservation.to ) {
                disabledDates.push(disable);
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
                                
        this.setState({ ...this.state, ...item, showError: false });
    }

    makeReservation() {
        roomService.createReservation(this.bookingData).then((resp) => {
            alert(`Reservation for room ${this.state.roomData.name} has been made`);
            this.props.history.push('/my_reservations');
        });
    }

    onFinish = values => {
        roomService.createProxyUser(values).then((resp) => {
            this.bookingData.user_id = resp.id;
            this.makeReservation();
        });
    };

    bookIt = (e) => {
        if (this.state.checkedList.length > 0) this.bookingData.additional_services = this.state.checkedList.map( value => value.split(" + ")[0] );

        if (this.bookingData.from === " - " || this.bookingData.to === " - ") {
            this.setState({showError: true});
            return;
        }

        if (!this.state.detailsInputDisabled)
            this.form.current.submit();
        else {
            this.form.current.resetFields();
            this.makeReservation();
        }
    }

    render() {
        this.calculateTotal();
        return (
            <Spin spinning={this.state.loading}>
            <div className="Booking Page" style={{height: "100vh", paddingTop: '64px'}}>
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
                            { this.state.showError ? <a style={{color: "red"}}>Date of booking have to be setted!</a>: null }
                            <Button type="primary" 
                                    htmlType="submit"
                                    onClick={this.bookIt}
                                    size="large"
                                    style={{backgroundColor: '#0f2da0', border: 'none'}} 
                                    className="bookItButton">Book it</Button>
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
                        <div className="detailsForm" > 
                            <h2>Booking details</h2>
                            <Checkbox
                                    onChange={(e) => { 
                                        this.setState({detailsInputDisabled: !e.target.checked});
                                        if(!e.target.checked) this.form.current.resetFields();
                                    }}
                                >
                                    Book on behalf of somebody
                            </Checkbox>
                            <br/>
                            <br/>
                            <Form
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                name="nest-messages" 
                                ref={this.form} 
                                onFinish={this.onFinish} 
                                validateMessages={validateMessages}>

                            <Form.Item name={'first_name'} label="First Name" rules={[{ required: true }]}>
                                <Input disabled={this.state.detailsInputDisabled} />
                            </Form.Item>
                            <Form.Item name={'last_name'} label="Last Name" rules={[{ required: true }]}>
                                <Input disabled={this.state.detailsInputDisabled} />
                            </Form.Item>
                            <Form.Item name={'email'} label="Email" rules={[{ type: 'email', required: true }]}>
                                <Input disabled={this.state.detailsInputDisabled} />
                            </Form.Item>
                            <Form.Item name={'phone'} label="Phone" rules={[{ required: true }]}>
                                <Input disabled={this.state.detailsInputDisabled} />
                            </Form.Item>
                            </Form>
                        </div>
                    </div>
            </div>
            </Spin>);
    }

}

export default withRouter(BookingPageView);