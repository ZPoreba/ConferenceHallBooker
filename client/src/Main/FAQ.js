import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import './style.css';
import { OverPack } from 'rc-scroll-anim';
import { List, Input, Button } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { pageService } from './services/pageService';


const IconText = ({ icon, text }) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  );

  const { Search } = Input;

class FAQ extends Component{

  constructor(props) {
    super(props);

    this.state = {
        listData: undefined,
        orginalData: undefined
    }
    
    this.modal = React.createRef();

    pageService.getFAQ().then((resp) => {
        this.parseDate(resp);
    })
  }

  parseDate(data) {
      let newData = [];
      for (let index in data){
          let element = data[index];
          newData.push({
            title: element.question,
            content: element.answer
          });
      }
      this.setState({listData: newData, orginalData: newData});
  }

  searchPhrase(phrase) {

      var newData = [];
      var upperCasePhrase = phrase.toUpperCase();
      var data = this.state.orginalData;

      for (let index in data){
        let element = data[index];
        
        let upperCaseTitle = element.title.toUpperCase();
        let upperCaseContent = element.content.toUpperCase();

        upperCaseTitle = upperCaseTitle.includes(upperCasePhrase);
        upperCaseContent = upperCaseContent.includes(upperCasePhrase);

        if (upperCaseTitle || upperCaseContent) {
            newData.push({
                title: element.title,
                content: element.content,
              });
        }

        this.setState({listData: newData});
      }
    }

  render() {
    return (

    <OverPack style={{ overflow: 'hidden' }} playScale={0.4} >
        { this.state.listData ? <QueueAnim style={{background: "transparent"}}>
                                    <div key="a" className="faqDiv">                                      
                                        <Search
                                            placeholder="Search"
                                            size="large"
                                            onSearch={value => this.searchPhrase(value)}
                                            style={{width: "80%", marginTop: "2%", background: "transparent", color: "white"}}
                                        />                                           
                                        <List
                                            itemLayout="vertical"
                                            size="large"
                                            pagination={{
                                                size: "small",
                                                onChange: page => {
                                                    console.log(page);
                                                },
                                                pageSize: 3,
                                            }}
                                            dataSource={this.state.listData}
                                            header={
                                            <div className="pageHeader" style={{fontSize: "110%", color: "#0f2da0"}}>
                                                <b>FAQ</b>
                                            </div>
                                            }
                                            style={{padding: "2% 3%", color: "white"}}
                                            renderItem={item => (
                                            <List.Item
                                                key={item.title}
                                                actions={[
                                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                                ]}
                                            >
                                                <List.Item.Meta
                                                title={<a>{item.title}</a>}
                                                />
                                                {item.content}
                                            </List.Item>
                                            )}
                                        />
                                    </div>
                                </QueueAnim>: null } 
      </OverPack>
    
    );
  }
};

export default FAQ;