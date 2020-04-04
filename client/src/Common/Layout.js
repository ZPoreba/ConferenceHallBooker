import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import logo from '../pictures/Common_logo.png';
import littleBaner from '../pictures/up_baner_little.png';
import './style.css';


const { Header, Content } = Layout;

class CustomLayout extends React.Component{

    constructor () {
        super();
        this.state = {
            menuType: "nonAuthorized"
        }
    }
    
    componentDidMount() {
        this.props.history.push('/main');
    }

    onLoginNregisterClick = () => {
        this.setState({menuType: "onLoginNregister"});
    }

    onLogoClick = () => {
        document.querySelector('body').scrollIntoView();
        this.setState({menuType: "nonAuthorized"});
    }

    onPageClick = (id) => {
        document.querySelector('.page' + id.toString()).scrollIntoView();
    }

    nonAuthorizedMenu = () => {
        return(
            <Menu
            theme="light"
            mode="horizontal" >
                <Menu.Item
                    key="register"
                    style={{float: 'right'}}>
                    <Link style={{color: "white"}} to="/register" onClick={this.onLoginNregisterClick} >SIGN UP</Link>
                </Menu.Item>
                <Menu.Item
                    key="login"
                    style={{float: 'right'}}>
                    <Link style={{color: "white"}} to="/login" onClick={this.onLoginNregisterClick} >LOG IN</Link>
                </Menu.Item>
                <Menu.Item
                    key="about_us"
                    style={{float: 'center'}}>
                    <Link style={{color: "white"}} to="/main" onClick={this.onPageClick.bind(this, 0)} >About us</Link>
                </Menu.Item>
                <Menu.Item
                    key="our_offer"
                    style={{float: 'center'}}>
                    <Link style={{color: "white"}} to="/main" onClick={this.onPageClick.bind(this, 1)} >Our offer</Link>
                </Menu.Item>
                <Menu.Item
                    key="faq"
                    style={{float: 'center'}}>
                    <Link style={{color: "white"}} to="/main" onClick={this.onPageClick.bind(this, 2)} >FAQ</Link>
                </Menu.Item>
                <Menu.Item
                    key="contact_us"
                    style={{float: 'center'}}>
                    <Link style={{color: "white"}} to="/main" onClick={this.onPageClick.bind(this, 3)} >Contact us</Link>
                </Menu.Item>
            </Menu>
        );
    }

    loginNregisterMenu = () => {
        return(
            <Menu
            theme="light"
            mode="horizontal" >
                <Menu.Item
                    key="register"
                    style={{float: 'right'}}>
                    <Link style={{color: "white"}} to="/register">SIGN UP</Link>
                </Menu.Item>
                <Menu.Item
                    key="login"
                    style={{float: 'right'}}>
                    <Link style={{color: "white"}} to="/login">LOG IN</Link>
                </Menu.Item>
            </Menu>
        );
    }

    render(){
        return (
        <Layout className="layout">
            <Header style={{
                        position: "fixed",
                        zIndex: 1000,
                        width: "100%",
                        background: `url(${littleBaner})`
                    }}>
                <div style={{color: "white", float: "left", width: "200px"}}>
                    <img src={logo} alt='logo'/>
                    <Link style={{color: "white", fontFamily: "Times New Roman"}} to="/main" onClick={this.onLogoClick} >  Conference Hall Booker </Link>
                </div>
                { this.state.menuType === "nonAuthorized" ? <this.nonAuthorizedMenu /> : <this.loginNregisterMenu /> }
            </Header>
            <Content style={{ padding: '0 0px', background: 'none', height: "100%" }}>
                <div>
                {this.props.children}
                </div>
            </Content>
        </Layout>
    );
    }
}

export default withRouter(CustomLayout);