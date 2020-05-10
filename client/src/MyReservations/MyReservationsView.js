
import React, { Component } from 'react';
import { List } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { myReservationsService } from "./services/MyReservationsService";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';


const API_URL = process.env.REACT_APP_API_URL;

class MyReservationsView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listData: undefined,
            orginalData: undefined,
            loading: true,
            userReservations: [],
            roomsDetails: {}
        }

        this.getUserReservations();
    }

    getUserReservations () {
        let user = JSON.parse(localStorage.getItem('user'));
        let user_id = user.user_id;

        myReservationsService.getReservationsForUser(user_id).then((resp) => {
            this.setState({userReservations: resp});
            this.getRooms();
        });
    }

    getRooms () {
        let reservationsIds = this.state.userReservations.map((reservation) => { return reservation.room_id });
        myReservationsService.getRoomsByIds(reservationsIds).then((resp) => {

            let newRoomDetails = {};
            for (let r of resp) {
                newRoomDetails[r.id] = r;
            }

            this.setState({roomsDetails: newRoomDetails}, () => {
               this.parseDate(); 
               this.setState({loading: false});
            });
            
        });
    }

    parseDate() {
        let newData = [];
        for (let reservation of this.state.userReservations){
            let room = this.state.roomsDetails[reservation.room_id];

            newData.push({
              id: reservation.id,   
              room_id: reservation.room_id,
              title: room.name,
              description: "Price: " + room.price + " zł/day, "
                            + "Capacity: " + room.capacity + " people, "
                            + "Area: " + room.area + " square meters",
              content: "Total: " + reservation.price + " zł, "
                        + "From " + reservation.from.split("T")[0] + " to " + reservation.to.split("T")[0] + ", "
                        + "Status: " + reservation.status
            });
        }
        this.setState({listData: newData, orginalData: newData});
    }

    deleteReservation = (id) => {

        if (window.confirm(`Are you sure that you want to delete reservation number ${id} ?`)) {
            myReservationsService.deleteReservation(id).then((resp) => {
                let newUserReservations = this.state.userReservations.filter((value) => {
                    return value.id != id;
                });
                this.setState({userReservations: newUserReservations}, () => { 
                    this.parseDate(); 
                    alert(`Reservation number ${id} has been deleted`);
                } );
            });
        } 

    };

    render () {
        return (
        <div className="MyReservations" style={{height: "100vh", paddingTop: '64px'}}> 
             <div className="demo-infinite-container">
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                hasMore={false}
                useWindow={false}
                loadMore={() => {}}
                >
                <List
                    itemLayout="vertical"
                    size="large"
                    locale={{ emptyText: 'No reservations' }}
                    loading={this.state.loading}
                    pagination={{
                        size: "small",
                        pageSize: 5,
                    }}
                    dataSource={this.state.listData}
                    style={{
                        height: "300px"
                    }}
                    renderItem={item => (
                            <List.Item
                            key={item.title}
                            actions={[
                                <EditOutlined style={{color: "#0f2da0", fontSize: "x-large"}} onClick={(e) => {this.props.history.push(`/edit/${item.room_id}/${item.id}`)}} />,
                                <DeleteOutlined style={{color: "red", fontSize: "x-large"}} onClick={(e) => {this.deleteReservation(item.id)}} />,
                              ]}
                            extra={
                                <img
                                width={200}
                                alt="logo"
                                src={`${API_URL}/pictures/rooms/${item.room_id}/1.jpg`}
                                />
                            }
                            >
                            <List.Item.Meta title={item.title} description={item.description} />
                            {item.content}
                            </List.Item>
                    )}
                />
                </InfiniteScroll>
            </div>
        </div>)
    }
}

export default withRouter(MyReservationsView);