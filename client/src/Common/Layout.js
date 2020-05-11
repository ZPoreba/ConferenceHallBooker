import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import logo from '../pictures/Common_logo.png';
import littleBaner from '../pictures/up_baner_little.png';
import './style.css';
import { authService } from '../Authorization/services/AuthService'


const { Header, Content } = Layout;

class CustomLayout extends React.Component{

    constructor (props) {
        super(props);
        this.menuType = undefined;
        this.setMenu();
        this.iconPath = '/';

    }

    setMenu() {
        let type = window.location.pathname === "/" ? "nonAuthorized": "";
        type = window.location.pathname === "/login" ? "onLoginNregister": type;
        type = window.location.pathname === "/register" ? "onLoginNregister": type;
        type = window.location.pathname === "/authorized" 
            || window.location.pathname === "/help"
            || window.location.pathname === "/my_reservations" 
            || window.location.pathname === "/all_reservations"
            || window.location.pathname.startsWith("/room/")
            || window.location.pathname.startsWith("/booking/")
            || window.location.pathname.startsWith("/edit/")
            || window.location.pathname === "/profile" ? "onAuthorized": type;

        if (type === "onAuthorized") this.iconPath = '/authorized';
        else this.iconPath = '/';

        this.menuType = type;
    }

    onLogoClick = () => {
        document.querySelector('body').scrollIntoView();
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
                    <Link style={{color: "white"}} to="/register" >SIGN UP</Link>
                </Menu.Item>
                <Menu.Item
                    key="login"
                    style={{float: 'right'}}>
                    <Link style={{color: "white"}} to="/login" >LOG IN</Link>
                </Menu.Item>
                <Menu.Item
                    key="about_us"
                    style={{float: 'center'}}>
                    <Link style={{color: "white"}} to="/" onClick={this.onPageClick.bind(this, 0)} >About us</Link>
                </Menu.Item>
                <Menu.Item
                    key="our_offer"
                    style={{float: 'center'}}>
                    <Link style={{color: "white"}} to="/" onClick={this.onPageClick.bind(this, 1)} >Our offer</Link>
                </Menu.Item>
                <Menu.Item
                    key="faq"
                    style={{float: 'center'}}>
                    <Link style={{color: "white"}} to="/" onClick={this.onPageClick.bind(this, 2)} >FAQ</Link>
                </Menu.Item>
                <Menu.Item
                    key="contact_us"
                    style={{float: 'center'}}>
                    <Link style={{color: "white"}} to="/" onClick={this.onPageClick.bind(this, 3)} >Contact us</Link>
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

    onAuthorizedMenu = () => {
        this.is_admin = JSON.parse(localStorage.getItem('user')).is_admin;
        return (
            <Menu
            theme="light"
            mode="horizontal" >
                <Menu.Item
                    key="logout"
                    style={{float: 'right'}}>
                    <Link style={{color: "white"}} to="/" onClick={authService.logout}>LOG OUT</Link>
                </Menu.Item>
                { 
                    this.is_admin ? 
                        <Menu.Item
                            key="admin_text"
                            style={{float: 'left'}}>
                            <a style={{color: "yellow"}}>ADMIN</a>
                        </Menu.Item>: null
                }
                <Menu.Item
                    key="search"
                    style={{float: 'center'}}>
                    <Link style={{color: "white"}} to="/authorized" >Search</Link>
                </Menu.Item>
                <Menu.Item
                    key="profile"
                    style={{float: 'center'}}>
                    <Link style={{color: "white"}} to="/profile" >Profile</Link>
                </Menu.Item>
                { 
                    !this.is_admin ? 
                        <Menu.Item
                            key="my_reservations"
                            style={{float: 'center'}}>
                            <Link style={{color: "white"}} to="/my_reservations" >My reservations</Link>
                        </Menu.Item>: null
                 }
                { 
                    !this.is_admin ? 
                        <Menu.Item
                            key="help"
                            style={{float: 'center'}}>
                            <Link style={{color: "white"}} to="/help" >Help</Link>
                        </Menu.Item>: null 
                }
                { 
                    this.is_admin ? 
                        <Menu.Item
                            key="admin"
                            style={{float: 'center'}}>
                            <Link style={{color: "white"}} to="/all_reservations" >All reservations</Link>
                        </Menu.Item>: null
                }
            </Menu>
        );
    }

    renderMenu = () => {
        if ( this.menuType === "nonAuthorized" ) return <this.nonAuthorizedMenu />;
        if ( this.menuType === "onLoginNregister" ) return <this.loginNregisterMenu />;
        if ( this.menuType === "onAuthorized" ) return <this.onAuthorizedMenu />;
        return <div />
    }

    render(){
        this.setMenu();
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
                    <Link style={{color: "white", fontFamily: "Times New Roman"}} to={this.iconPath} onClick={this.onLogoClick} >  Conference Hall Booker </Link>
                </div>
                <this.renderMenu />
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