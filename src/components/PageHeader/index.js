import React, { Component } from 'react';
import logo from '../../assets/logo.png';

import { Layout, Input, Menu, Divider, notification  } from 'antd';
import './index.css';
import {
    Link
  } from 'react-router-dom'
const  Search = Input.Search;
const {Header} = Layout;

const login = () =>{
    notification.open({
        message: '功能暂未开通',
        description: '少侠别着急，我们正在对用户体系进行维护中，请耐心等待，感谢您对七月小说网的支持。',
      });
}

export default class  PageHeader extends Component{

    state={
        defaultSelectedKeys: ['1'],
    }
    componentWillReceiveProps = (nextProps) =>{

    }
    componentWillMount(){
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
                        enterButton={true}
                        onSearch={value => {
                            if(value === undefined ||  value === null || value.replace(/(^\s*)|(\s*$)/g, "") === ""){
                                this.props.history.push(`/Search/凡人修仙之仙界篇`);
                                return;
                            }
                            this.props.history.push(`/Search/${value}`); 
                        }}
                        />
                        <a className={"login-btn"}  onClick={login}  >登录</a>
                        <Divider type="vertical" style={{margin: "auto 8px"}}/>
                        <a className={"login-btn"} style={{marginRight: "12px"}} onClick={login}  >注册</a>
                    </div>
                </div>
          </Header>            
        )
    }
}