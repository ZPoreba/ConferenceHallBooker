import React, { Component } from 'react';
import './style.css';
import { List } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';


const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    title: `ant design part ${i}`,
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

class AuthorizedMain extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            listData: undefined,
            orginalData: undefined
        }
    
        // pageService.getFAQ().then((resp) => {
        //     this.parseDate(resp);
        // })
      }


    render() {
    return (
        <div className="Authorized" style={{height: "100vh", paddingTop: '64px'}}>
            <div className="authorizedDiv">
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
                    pagination={{
                        size: "small",
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={listData}
                    style={{
                        padding: "0% 3%",
                        height: "300px"
                    }}
                    renderItem={item => (
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
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
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
        </div>);
    }

}

export default AuthorizedMain;