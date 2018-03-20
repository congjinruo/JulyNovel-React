import React, {PureComponent} from 'react'
import { Row, Col, Card, Button, Tag, Tabs, Breadcrumb, List, Spin, Icon, Divider, notification } from 'antd'
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../services/environment';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

  import './index.css';
const env = environment;
const ReadQuery = graphql`
query ReadQuery($chapterId: ID){
    chapter(chapterId: $chapterId){
        chapterId
        bookId
        chapterName
        prevChapterId
        nextChapterId
        updatetime
        createtime
        sort
        free
        wordNumbers
        book {
          bookId
          xbookId
          author
          cover
          bookName
          bookType {
            typeId
            typeName
          }
        }
        content {
          contentId
          chapterId
          text
          bookId
        }
    }
  }
`

const login = () =>{
    notification.open({
        message: '功能暂未开通',
        description: '少侠别着急，我们正在对用户登录功能进行维护中，请耐心等待，感谢您对七月小说网的支持。',
      });
}



class VipHandle extends PureComponent{
    constructor(props){
        super(props);
    }
    
    jumpToQidian(xbookId, e){    //事件对象e要放在最后
        window.open(`https://book.qidian.com/info/${xbookId}`);
    }
    
    render(){
        if(this.props.free==1){
            return null
        }
        return (
            <div style={{marginTop: '50px'}}>
            <Divider>这是VIP章节&emsp;请前往起点阅读</Divider>
            <p style={{textAlign: 'center', marginTop: '30px'}}>
                <Button onClick={login}  size="large">登录账号</Button>&emsp;
                <Button size="large"  type="primary" onClick={(e) => this.jumpToQidian(this.props.xbookId, e)}>前往起点</Button>
            </p>
        </div>
        );
    }
}

const  Read = ({match}) => {
    return(
        <QueryRenderer
        environment={env}
        query={ReadQuery}
        variables={{
            chapterId: match.params.chapterId
        }}
        render={({error, props}) => {
          if (error) {
            console.log(error)
          }
          
          if (!props) {
            return (<Spin className="read-spin"  spinning={true} size="large"/>)
          }
          return (<ReadComponent  chapter={props.chapter}  loading={false}/>)
        }}
        />
    )
}

class ReadComponent extends PureComponent{
    constructor(props){
        super(props)
    }


    render(){
        return(
            <div>
                <div className="read-float">
                </div>
                <div className={"read-breadcrumb"} >
                    <Breadcrumb separator=">">
                    <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={`/Selection/${this.props.chapter.book.bookType.typeId}`}>{this.props.chapter.book.bookType.typeName}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={`/Info/${this.props.chapter.book.bookId}`}>{this.props.chapter.book.bookName}</Link></Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="read-content">
                    <h2>{this.props.chapter.chapterName}</h2>
                    <div className="read-info">
                        <span><Icon type="book"/>&nbsp;{this.props.chapter.book.bookName}</span>
                        <span><Icon type="edit" />&nbsp;{this.props.chapter.book.author}</span>
                        <span><Icon type="line-chart" />&nbsp;{this.props.chapter.wordNumbers}</span>
                        <span><Icon type="clock-circle-o" />&nbsp;{this.props.chapter.updatetime}</span>
                    </div>
                    <div className="read-text" dangerouslySetInnerHTML={{__html: this.props.chapter.content.text}}></div>
                    {<VipHandle free={this.props.chapter.free}  xbookId={this.props.chapter.book.xbookId}/>}
                </div>
                <div className="read-footer">
                    <a href={`/Read/${this.props.chapter.prevChapterId}`} disabled={this.props.chapter.prevChapterId ? false : true}>上一章</a>
                    <a href={`/Info/${this.props.chapter.bookId}`}>目录</a>
                    <a href={`/Read/${this.props.chapter.nextChapterId}`} disabled={this.props.chapter.nextChapterId ? false : true}>下一章</a>
                </div>
            </div>
        )
    }
}

export default Read;