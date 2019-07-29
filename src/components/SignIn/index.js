import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Button, Input, Icon } from 'antd';
import PropTypes from 'prop-types';
import './index.css'

export default {
    dom: null, //被append的元素
    section: null,
    showSignInWithAllOptions(){
        return (
            <section className="flexColumn">
            <Button  icon="close" className="button-close" onClick={() => {
                this.onCancel()
            }}/>
            <h1 className="signH1">欢迎&nbsp;回来</h1>
            <h5 className="signH5">现在登陆，即刻获得加入书架、个性化推荐、推送至Kindle<br/>等最新功能，不容错过</h5>
            <div className="sign-buttons">
                <Button className="sign-button"  icon="github" onClick={this.signInWithGitHub}>使用&nbsp;GitHub&nbsp;登陆</Button>
                <Button className="sign-button"   icon="wechat" disabled>使用&nbsp;微信&nbsp;登陆</Button>
                <Button className="sign-button"  icon="qq" disabled>使用&nbsp;QQ&nbsp;登陆</Button>
                <Button  className="sign-button" icon="mail" onClick={ () =>{
                    this.update({view: 'signInWithMail'})
                }}>使用&nbsp;邮箱&nbsp;登陆</Button>                           
            </div>
            <div className="sign-tips">
                <span>还没有账号？</span><Button style={{ border: 'none', color: '#1DA57A'}} size="small" onClick={() => {
                    this.update({view: 'signUpWithMail'})
                }}>立即创建</Button>
                <p>
                本站所有小说均由网友上传，仅供交流学习。并且未通过任何收费方式获取利益，是非盈利性的免费小说阅读网站。如果版权所有人认为在本站放置你的作品会损害你的利益，请指出，本站在确认后会立即删除。
                </p>
            </div>
        </section>)
    },
    showSignInWithMail(){
        return (
            <section className="flexColumn">
            <Button  icon="close" className="button-close" onClick={() => {
                this.onCancel()
            }}/>
            <h1 className="signH1">邮箱&nbsp;登陆</h1>
            <h5 className="signH5">现在登陆，即刻获得加入书架、个性化推荐、推送至Kindle<br/>等最新功能，不容错过</h5>
            <div  className="sign-tips"><span>你的邮箱</span></div>
            <div className="signIn-inputs">
                <Input />                     
            </div>
            <div className="sign-tips">
                <Button type="primary" onClick={() => {
                    this.update({view: 'enterYourPassword'})
                }}>继续</Button>
            </div>
            <div className="sign-tips">
                <Button style={{ border: 'none', color: '#1DA57A', margin: '15px 0'}} size="small"icon="arrow-left" onClick={ () =>{
                    this.update({view: ''})
                }}>所有登陆选项</Button>
            </div>
        </section>)
    },
    enterYourPassword(){
        return (
            <section className="flexColumn">
            <Button  icon="close" className="button-close" onClick={() => {
                this.onCancel()
            }}/>
            <h1 className="signH1">一步&nbsp;之遥</h1>
            <h5 className="signH5">现在登陆，即刻获得加入书架、个性化推荐、推送至Kindle<br/>等最新功能，不容错过</h5>
            <div  className="sign-tips"><span>你的密码</span></div>
            <div className="signIn-inputs">
                <Input />                     
            </div>
            <div className="sign-tips">
                <Button type="primary" onClick={() => {
                    
                }}>确定</Button>
            </div>
            <div className="sign-tips">
                <Button style={{ border: 'none', color: '#1DA57A', margin: '15px 0'}} size="small"icon="arrow-left" onClick={ () =>{
                    this.update({view: 'signInWithMail'})
                }}>换个邮箱</Button>
            </div>
            <div className="sign-tips">
                <Button style={{ border: 'none', color: '#1DA57A'}} size="small"icon="rollback" onClick={ () =>{
                    this.update({view: ''})
                }}>所有登陆选项</Button>
            </div>
        </section>)
    },
    signUpWithMail(){

        return (
            <section className="flexColumn">
            <Button  icon="close" className="button-close" onClick={() => {
                this.onCancel()
            }}/>
            <h1 className="signH1">立即加入&nbsp;七月小说</h1>
            <h5 className="signH5">现在注册，即刻获得加入书架、个性化推荐、推送至Kindle<br/>等最新功能，不容错过</h5>
            <div  className="sign-tips"><span>初始化您的账号和密码</span></div>
            <div className="signUp-inputs">
                <Input  prefix={<Icon type="mail" />} placeholder="请输入你的邮箱"  style={{ color: 'rgba(0,0,0,.25)' }} />
                <Input prefix={<Icon type="lock"/>}  placeholder="请输入您的密码"/>
                <Input  prefix={<Icon type="lock"  />} placeholder="请再次确认密码"/>             
            </div>
            <div className="sign-tips">
                <Button type="primary" onClick={() => {
                    
                }} style={{marginTop: '15px'}}>注册</Button>
            </div>
            <div className="sign-tips">
                <Button style={{ border: 'none', color: '#1DA57A', marginTop: '15px'}} size="small"icon="arrow-left" onClick={ () =>{
                    this.update({view: ''})
                }}>已有账号？</Button>
            </div>
        </section>)

    },
    showSignInView(options){

        if(options.view === 'signInWithMail'){
            return this.showSignInWithMail()

        }else if(options.view === 'enterYourPassword'){
            return this.enterYourPassword()
        }else if(options.view === 'signUpWithMail'){
            return this.signUpWithMail()
        }else{
            return this.showSignInWithAllOptions()
        }

    },
    show({options}) {
        this.close();
 
        this.dom = document.createElement('div');
        this.section = document.createElement('section')

        document.body.setAttribute('style', 'overflow:hidden');

        // JSX代码
        const JSXdom = (
            <div className="overlay" id="signInBox">
                <div className="overlay-dialog">
                    <div className="overlay-content">

                    </div>
                </div>
            </div>
        );
 
        ReactDOM.render(JSXdom, this.dom);
        document.body.appendChild(this.dom);
        this.update({view : ''})
    },

    update(options){
        this.section = document.createElement('section')
        this.section.setAttribute('id', 'overlay-section')
        if(options.view == 'signInWithMail'){
            
            ReactDOM.render(this.showSignInWithMail(), this.section)

        }else if(options.view == 'enterYourPassword'){

            ReactDOM.render(this.enterYourPassword(), this.section)

        }else if(options.view == 'signUpWithMail'){

            ReactDOM.render(this.signUpWithMail(), this.section)

        }else{

            ReactDOM.render(this.showSignInWithAllOptions(), this.section)

        }

        let overlay = document.body.getElementsByClassName('overlay-content')[0]

        let oldSection = document.getElementById('overlay-section')
        console.log(oldSection)
        if(oldSection === null){
            overlay.appendChild(this.section)
        }else{
            overlay.replaceChild(this.section, document.getElementById('overlay-section'))
        }



    },
    
    signInWithGitHub(){
        window.location.href = "https://github.com/login/oauth/authorize?client_id=484ad829f3a9d3081aa5&scope=user:email&redirect_uri=" + window.location.href
    },

    onCancel(onCancel) {
        (onCancel instanceof Function) && onCancel();
        this.close();
    },
 
    onOk(onOk) {
        (onOk instanceof Function) && onOk();
        this.close();
    },
 
    close() {
        this.dom && this.dom.remove();
        document.body.setAttribute('style', 'overflow: auto');
    },
}