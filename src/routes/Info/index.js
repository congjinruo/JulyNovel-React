import React, {PureComponent} from 'react';
import {Row, Col, Card, Button, Tag, Tabs, Breadcrumb, List, Spin, Modal, Popover} from 'antd'
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../services/environment';
import ChapterList from '../../components/List/ChapterList'
import RecommendCard from '../../components/Card/RecommendCard'
import qrcode from '../../assets/qrcode.png'
import {
    Link
  } from 'react-router-dom'
import './index.css';
const TabPane = Tabs.TabPane;
const {Meta} = Card;

const env = environment;

const InfoQuery = graphql`
query InfoQuery($bookId: ID){
    book(bookId: $bookId) {
        bookName
        bookId
        bookTypeId
        summary
        author
        status
        cover
        lastupdate
        clickTimes
        wordNumbers
        bookType {
          typeId
          summary
          typeName
          recommends(bookId: $bookId){
            cover
            bookId
            bookName
            author
          }
        }
        chapterList {
          chapterId
          sort
          free
          wordNumbers
          updatetime
          chapterName
        }
      }

      rankType(rankTypeId: 12) {
        typeName
        rankList {
          sort
          book {
            bookId
            bookName
            author
            cover
            bookType {
              typeName
            }
          }
        }
      }
}
`;

const  RecentChapters = (props) =>{
    const items = [];
    const count = props.chapters.length;
    const convertTime = (time) =>{
        let t = '';  
        t = time.replace(/T/g,' ').substring(0, time.lastIndexOf(':'));
        return t;
    }
    items.push(
        <li key={count - 1}>
            <label>最近更新：</label>
            <a href={`/Read/${props.chapters[count - 1].chapterId}`}>{props.chapters[count - 1].chapterName}</a>&emsp;
            <em>&emsp;{`${convertTime(props.chapters[count - 1].updatetime)}`}</em>
        </li>
    )   
    for(let  i = count - 2; i >= count - 3 && i >=0; i--){
        items.push(
            <li key={i}>
                <label>&emsp;&emsp;&emsp;&emsp;&emsp;</label>
                <a href={`/Read/${props.chapters[i].chapterId}`}>{props.chapters[i].chapterName}</a>&emsp;
                <em>&emsp;{`${convertTime(props.chapters[i].updatetime)}`}</em>
            </li>
        )
    }
    return (
        <ul className={"info-ul"}>{items}</ul>
    )
}

const Info = ({ match }) =>{
    return(
        <QueryRenderer
        environment={env}
        query={InfoQuery}
        variables={{
            bookId: match.params.bookId
        }}
        render={({error, props}) => {
          if (error) {
            console.log(error)
          }
          
          if (!props) {
            return (<Spin className="info-spin"  spinning={true} size="large"/>)
          }

          return (<InfoComponent  book={props.book} rank={props.rankType} loading={false}/>)
        }}
        />
    )
}

const qrcodeContent = (
    <div>
        <img style={{height: '180px', width: '180px'}} alt="qrcode"  src={qrcode}/>
    </div>
  );

class InfoComponent extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            bookTypeId: this.props.book.bookTypeId
        }
    }
    componentWillReceiveProps(){

    }
    componentDidMount(){


    }

    handleRead(){
        window.location.href = `/Read/${this.props.book.chapterList[0].chapterId}`
    }

    handleAddToShelf(){
        Modal.info({
            title: '加入书架功能尚未开放',
            content: (
              <div>
                <p style={{marginTop: '20px'}}>少侠别着急</p>
                <p>我们正在对加入书架功能进行维护中，请耐心等待，感谢您对七月小说网的支持。</p>
              </div>
            ),
            onOk() {},
          });
    }
    handleAd(){
        Modal.info({
            title: '七月小说网广告位招租',
            content: (
              <div>
                <p style={{marginTop: '20px'}}>请联系congjinruo@outlook.com</p>
                <p>网站首页、横幅、底栏广告招租。</p>
              </div>
            ),
            onOk() {},
          });        
    }
    render(){
        return(
            <div>
                <div className={"info-breadcrumb"} >
                    <Breadcrumb separator=">">
                    <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={`/Selection/${this.props.book.bookType.typeId}`}>{this.props.book.bookType.typeName}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.book.bookName}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>              
                <div>                          
                    <div className="info-background" style={{backgroundImage: `url("https://congjinruo.oss-cn-shanghai.aliyuncs.com/img_background_${this.props.book.bookTypeId}")`}}></div>              
                </div>
                <div className="info-content">
                    <Row gutter={24} >
                        <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Card className={"info-book"}
                            cover={<img alt={this.props.book.bookName} src={this.props.book.cover} />}>
                                <Meta 
                                title={<div className={"info-book-title"}>{this.props.book.bookName}<span className="info-book-author">&emsp;&emsp;{this.props.book.author}&nbsp;&nbsp;著</span></div>}
                                description={
                                    <div>
                                        <div className={"info-book-tag"}><Tag color="blue">免费</Tag><Tag color="blue">{this.props.book.status===1 ? "完结" : "连载"}</Tag><Tag color="blue">{this.props.book.bookType.typeName}</Tag></div>
                                        <div className={"info-type-summary"}>{this.props.book.bookType.summary}</div>
                                        <div className={"info-book-description"}><em>{this.props.book.wordNumbers/10000}</em>&nbsp;&nbsp;万字<span className="split">|</span><em>{this.props.book.clickTimes}</em>&nbsp;&nbsp;点击</div>
                                        <div className={"info-book-buttons"}>
                                            <Button type="primary" onClick={this.handleRead.bind(this)}>即刻阅读</Button>
                                            <span className="split"></span>
                                            <Button onClick={this.handleAddToShelf}>加入书架</Button>
                                            <span className="split"></span>
                                            <Popover placement="bottom" content={qrcodeContent} title="扫码下载七月小说手机客户端">
                                                <Button icon="mobile" className={"info-button-mobile"}>手机看书</Button>
                                            </Popover>
                                        </div>
                                    </div>
                                }
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row  gutter={24}>
                        <Col   xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Tabs defaultActiveKey="chapter_1" style={{padding: '12px 24px'}}>
                                <TabPane  tab={<span style={{fontSize: '20px'}}>作品信息</span>} key="chapter_1">
                                    <Row gutter={24}>
                                        <Col   xs={24} sm={24} md={18} lg={18} xl={18}>
                                            <p className="info-book-summary" dangerouslySetInnerHTML={{__html: this.props.book.summary.split(" ").join("<br />")}}></p>

                                            <RecentChapters  chapters={this.props.book.chapterList}/>

                                            <div  className={'info-ad'} onClick={this.handleAd}><img src="https://qidian.qpic.cn/qidian_common/349573/949cf57a41427571f3fa151fbdeef12a/0"  alt="广告"/></div>

                                            <RecommendCard   loading={this.props.loading} dataSource={this.props.book.bookType.recommends}  grid={ { gutter: 24, xs: 3, sm: 3, md: 6, lg: 6, xl: 6, xxl: 6}}/> 

                                        </Col>
                                        <Col  xs={24} sm={24} md={6} lg={6} xl={6}>
                                            <div className={'info-ad'} onClick={this.handleAd}><img  src="https://qidian.qpic.cn/qidian_common/349573/0757b9260e7c015ad6cfae322f08a385/0" alt="广告"/></div>
                                            <List
                                            className={'info-hot'}
                                            header={<h3><strong>{this.props.rank.typeName}</strong></h3>}
                                            loading={this.props.loading} 
                                            dataSource={this.props.rank.rankList}
                                            renderItem={item => (
                                            <List.Item>
                                                <a href={`/info/${item.book.bookId}`}><span>{`[${item.book.bookType.typeName}]`}</span>&nbsp;{item.book.bookName}</a>
                                            </List.Item>
                                            )}
                                            />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane forceRender={true} tab={<div><span style={{fontSize: '20px'}}>目录</span>（{this.props.book.chapterList.length}章）</div>} key="chapter_2">
                                    <ChapterList dataSource={this.props.book.chapterList} loading={this.props.loading}/>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </div>

        )
    }
}


export default Info;