import React, { Component } from 'react';
import './style.css';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import { mainService } from "./services/MainService";
import { Link } from 'react-router-dom';
import { List, Form, InputNumber, Button, Checkbox } from "antd";
import { consts } from '../Consts';


const API_URL = process.env.REACT_APP_API_URL;

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

class AuthorizedMain extends Component {

    constructor(props) {
        super(props);

        this.filterArguments = {}
    
        this.state = {
            listData: undefined,
            orginalData: undefined,
            loading: true,
            checkedList: [],
            indeterminate: true,
            checkAll: false,
        }
        this.checkBoxOptions = Object.keys(consts.additionalServicesPrices);
        this.form = React.createRef();

        mainService.getAllRooms().then((resp) => {
            this.parseDate(resp);
        })
      }

    componentDidMount() {
        this.setState({loading: false});
    }  

    parseDate(data) {
        let newData = [];
        for (let index in data){
            let element = data[index];
            newData.push({
              id: element.id,   
              title: element.name,
              description: "Price: " + element.price + " zł/day, "
                            + "Capacity: " + element.capacity + " people, "
                            + "Area: " + element.area + " square meters",
              content: element.details
            });
        }
        this.setState({listData: newData, orginalData: newData});
    }

    onFinish = (values) => {
        this.setState({loading: true});

        if (values.price.from === undefined || values.price.from === null) values.price.from = 0;
        if (values.capacity.from === undefined || values.capacity.from === null) values.capacity.from = 0;
        if (values.area.from === undefined || values.area.from === null) values.area.from = 0;

        if (values.price.to === undefined || values.price.to === null) values.price.to = 1000000000;
        if (values.capacity.to === undefined || values.capacity.to === null) values.capacity.to = 1000000000;
        if (values.area.to === undefined || values.area.to === null) values.area.to = 1000000000;

        this.filterArguments.price = [values.price.from, values.price.to];
        this.filterArguments.capacity = [values.capacity.from, values.capacity.to];
        this.filterArguments.area = [values.area.from, values.area.to];

        if (this.state.checkedList.length !== 0) this.filterArguments.additional_services = this.state.checkedList;
        else delete this.filterArguments.additional_services;

        mainService.filterRooms(this.filterArguments).then((resp) => {
            this.parseDate(resp);
            this.setState({loading: false});
        });

    };

    onChange = (checkedList) => {
        this.setState({
          checkedList,
          indeterminate: !!checkedList.length && checkedList.length < this.checkBoxOptions.length,
          checkAll: checkedList.length === this.checkBoxOptions.length,
        });
    };

    onCheckAllChange = (e) => {  
        this.setState({
          checkedList: e.target.checked ? this.checkBoxOptions : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
    };

    render() {
    return (
        <div className="Authorized" style={{height: "100vh", paddingTop: '64px'}}>
            <div className="authorizedDiv">
                <h1 style={{marginTop: "4%", paddingTop: '64px', marginBottom: "10%"}}>Filters</h1>
                <Form
                    name="validate_other"
                    labelCol={{
                        span: 4
                    }}
                    wrapperCol={{
                        span: 20
                    }}
                    onFinish={this.onFinish}
                    ref={this.form}
                    >
                    <Form.Item label="Price" style= {{marginTop: "15%"}} >
                        <Form.Item name={["price", "from"]} noStyle>
                        <InputNumber step={10} min={0} />
                        </Form.Item>
                        <span> - </span>
                        <Form.Item name={["price", "to"]} noStyle>
                        <InputNumber step={10} min={0} />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Capacity">
                        <Form.Item name={["capacity", "from"]} noStyle>
                        <InputNumber step={10} min={0} />
                        </Form.Item>
                        <span> - </span>
                        <Form.Item name={["capacity", "to"]} noStyle>
                        <InputNumber step={10} min={0} />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Area">
                        <Form.Item name={["area", "from"]} noStyle>
                        <InputNumber step={10} min={0} />
                        </Form.Item>
                        <span> - </span>
                        <Form.Item name={["area", "to"]} noStyle>
                        <InputNumber step={10} min={0} />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item style= {{marginTop: "15%"}}>
                        <span> Available additional services: </span>
                        <br />
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
                        <Checkbox.Group 
                            options={this.checkBoxOptions} 
                            value={this.state.checkedList}
                            onChange={this.onChange}
                        />
                    </Form.Item>

                    <Form.Item style= {{marginTop: "15%"}}>
                        <Button type="primary" 
                                style={{backgroundColor: '#0f2da0', border: 'none', float: 'left'}} 
                                onClick={() => { 
                                    this.form.current.resetFields();
                                    this.setState({checkedList: [], indeterminate: true, checkAll: false})
                                }}>
                            Clean
                        </Button>
                        <Button type="primary" style={{backgroundColor: '#0f2da0', border: 'none', float: 'right'}} htmlType="submit">
                            Filter
                        </Button>
                    </Form.Item>
                </Form>
            </div>
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
                    locale={{ emptyText: 'No rooms with such requirements' }}
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
                        <Link to={`/room/${item.id}`}>
                            <List.Item
                            key={item.title}
                            actions={[
                                <IconText
                                icon={StarOutlined}
                                text="156"
                                key="list-vertical-star-o"
                                />,
                                <IconText
                                icon={LikeOutlined}
                                text="156"
                                key="list-vertical-like-o"
                                />,
                                <IconText
                                icon={MessageOutlined}
                                text="2"
                                key="list-vertical-message"
                                />
                            ]}
                            extra={
                                <img
                                width={200}
                                alt="logo"
                                src={`${API_URL}/pictures/rooms/${item.id}/1.jpg`}
                                />
                            }
                            >
                            <List.Item.Meta title={item.title} description={item.description} />
                            {item.content}
                            </List.Item>
                        </Link>
                    )}
                />
                </InfiniteScroll>
            </div>
        </div>);
    }

}

export default AuthorizedMain;