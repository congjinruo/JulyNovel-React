import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../../assets/logo.png';
import SignIn from '../SignIn'
import '../../utils/queryString'

import { Layout, Input, Menu, Divider, Modal, Dropdown, Icon, Button, Avatar  } from 'antd';

import {
    Link
  } from 'react-router-dom'
import queryString from '../../utils/queryString';

import './index.css';

const  Search = Input.Search;
const {Header} = Layout;

const login = () =>{
    SignIn.show({
        title: ''
    })
}

const menu = (
    <Menu>
      <Menu.Item key="1"  style={{padding: '8px 16px'}}><Icon type="layout"  style={{marginRight: '8px'}}/>我的书架</Menu.Item>
      <Menu.Item key="2" style={{padding: '8px 16px'}}><Icon type="profile" style={{marginRight: '8px'}}/>个性推荐</Menu.Item>
      <Menu.Item key="3"  style={{padding: '8px 16px'}}><Icon type="user" style={{marginRight: '8px'}}/>个人中心</Menu.Item>
      <Menu.Divider />
    <Menu.Item key="4"  style={{padding: '8px 16px'}}><Icon type="logout" style={{marginRight: '8px'}}/>退出登陆</Menu.Item>
    </Menu>
  );
  

export default class  PageHeader extends Component{

    state={
        defaultSelectedKeys: ['1'],
        hasSignIn: false,
        user: {}
    }


    setUserInfo = (userInfo) =>{
        this.setState({
            hasSignIn: true,
            user: userInfo
        })
    }

    signInWithGitHub = (code) => {
        fetch('https://api.kuaijiajin.club:4433/login/github?code=' + code)
        .then(response => response.json())
        .then(data => {  
          this.setUserInfo(data)        
        });
    }

    componentWillReceiveProps = (nextProps) =>{

    }
    componentWillMount(){

        console.log(this.props.location.search)

        let code = queryString(this.props.location.search, 'code')
        console.log(code)
        if(typeof code === 'string'){
            this.signInWithGitHub(code)
        }


        if(this.props.location === undefined){
            this.setState({defaultSelectedKeys: ['4']});
            return;
        }
        if(this.props.location.pathname === '/'){
            this.setState({defaultSelectedKeys: ['1']});
        }else if(this.props.location.pathname.indexOf("/Selection") > -1){
            this.setState({defaultSelectedKeys: ['2']});
        }else if(this.props.location.pathname.indexOf("/Info") > -1){
            this.setState({defaultSelectedKeys:['4']});
        }else{
            this.setState({defaultSelectedKeys: ['4']});           
        }
    }


    render(){
        return(
            <Header className="page-header">
                <div className="header-box">
                    <a className="header-logo" href="/">
                    <img src={logo} alt="logo"/>
                    <span>七月小说</span>
                    </a>
                    <Menu
                    theme="light"
                    className="header-menu"
                    mode="horizontal"
                    defaultSelectedKeys={this.state.defaultSelectedKeys}
                    style={{ lineHeight: '62px' }}
                    >
                    <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/Selection/4">分类</Link></Menu.Item> 
                    </Menu>
                    <div className={"header-right"}>
                        <Search
                        className={"header-search"}
                        placeholder="凡人修仙之仙界篇"
                        onSearch={value => {
                            if(value === undefined ||  value === null || value.replace(/(^\s*)|(\s*$)/g, "") === ""){
                                this.props.history.push(`/Search/凡人修仙之仙界篇`);
                                return;
                            }
                            this.props.history.push(`/Search/${value}`); 
                        }}
                        />

                        {
                            this.state.hasSignIn ? 
                            <Dropdown overlay={menu}>
                            <Button style={{ height: '52px', border: 'none' }}>
                                <Avatar src={this.state.user.avatar_url} />&nbsp;&nbsp;{this.state.user.name}
                            </Button>
                            </Dropdown>
                            :
                            <a className={"login-btn"}  onClick={login}  >登录</a>
                        }
    
                    </div>
                </div>
          </Header>            
        )
    }
}