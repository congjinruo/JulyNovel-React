import React, { PureComponent } from 'react';
import { Card, Col, Row, Layout , Tabs  } from 'antd';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../services/environment';
import Banner from '../../components/Banner';
import GridCard from '../../components/Card/GridCard';
import RankCard from '../../components/Card/RankCard';
import CoverCard from '../../components/Card/CoverCard';
import IntroCard from '../../components/Card/IntroCard';
import coverDefault from '../../assets/book_default.png'
import bannerDefault from '../../assets/banner_default.png'
import './index.css';

const env = environment;

const mock = (count) =>{
  const datas = [];
  for(let i = 0; i < count; i++){
    const tempBook = {
      rankId: "0",
      book: {
        index: i,
        bookId: i,
        banner: bannerDefault,
        bookName: "七月小说",
        summary: "七月小说      专注阅读      在微信上关注我：ruoxu    在cnBlog上关注我：http://www.cnblogs.com/jiajin    在Github上关注我：https://github.com/congjinruo",
        cover: coverDefault,
        clickTimes: 0,
        author: "七月小说"
      }
    };
    datas.push(tempBook)
  }
  const rank = {
    typeName: "七月小说",
    rankList: datas
  }
  return rank;
}

const mockData = [];
mockData.push(mock(4));
mockData.push(mock(4));
mockData.push(mock(6));
mockData.push(mock(3));
mockData.push(mock(3));
mockData.push(mock(4));
mockData.push(mock(4));
mockData.push(mock(4));
mockData.push(mock(4));
mockData.push(mock(3));
mockData.push(mock(10));

const HomeQuery = graphql`
query HomeQuery{
  homeRankList{
    typeId
    typeName
    rankList{
      rankId
      sort
      book{
        bookId
        bookName
        summary
        banner
        author
        clickTimes
        cover
      }
    }
  }
}
`;
const Home = () =>{
  return (
    <QueryRenderer
    environment={env}
    query={HomeQuery}
    render={({error, props}) => {
      if (error) {
        console.log(error)
      }
      if (!props) {
        return (<HomeComponent data={mockData} loading={true}/>)
      }
      return (<HomeComponent  data={props.homeRankList} loading={false}/>)
    }}
    />
  )
}

class HomeComponent extends PureComponent{
  constructor(props){
    super(props)
  }

  render(){
      return (
          <div className="App-content">
          <Row gutter={24} >
              <Col xs={24} sm={24} md={6} lg={5} xl={5}>
                <Row gutter={24} className="home-slide">
                  <GridCard />
                  <Col span={24}  className="book-type" >
                    <RankCard  loading={this.props.loading} rankTypeData={this.props.data[10]} />
                  </Col>
                </Row> 
              </Col>
              <Col xs={24} sm={24} md={18} lg={19} xl={19}>
                <Row gutter={24} style={{marginBottom: 15}}>          
                  <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                    <Banner loading={this.props.loading} rankTypeData={this.props.data[0]}/>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Card title="大家都在搜" className="hot-search">
                      <a href="/Info/283">飞剑问道</a>
                      <a href="/Info/284">凡人修仙传之仙界篇</a>
                      <a href="/Info/290">太初</a>
                      <a href="/Info/281">斗战狂潮</a>
                      <a href="/Info/255">圣墟</a>
                    </Card>
                  </Col>
                </Row>
                {/* 站长力推*/}
                <Row gutter={24} style={{marginBottom: 15, backgroundColor: '#fff'}}>          
                  <Col span={24}>
                    <IntroCard grid ={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2}}
                      loading={this.props.loading} rankTypeData={this.props.data[1]}/> 
                  </Col>
                </Row>  
                 {/*出版精选*/}           
                <Row gutter={24} style={{marginBottom: 15, backgroundColor: '#fff'}}>          
                  <Col span={24}>
                  <CoverCard grid ={{ gutter: 16, xs: 3, sm: 3, md: 6, lg: 6, xl: 6, xxl: 6}}
                      loading={this.props.loading} rankTypeData={this.props.data[2]}/> 
                  </Col>
                </Row>
                 {/* 男生精选*/}
                <Row gutter={24} style={{marginBottom: 15}}>          
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <IntroCard grid ={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}}
                      loading={this.props.loading} rankTypeData={this.props.data[3]}/> 
                  </Col>
                   {/* 女生精选*/}
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <IntroCard grid ={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}}
                      loading={this.props.loading} rankTypeData={this.props.data[4]}/> 
                  </Col>                    
                </Row>                                     
              </Col>
            </Row>
            <Row gutter={24} style={{margin: '10px -12px'}}>
            {
              this.props.data[9].rankList.map(item => (
                <Col key={item.book.bookId} xs={24} sm={24} md={8} lg={8} xl={8} style={{margin: '8px 0px'}}>
                  <a href={`/Info/${item.book.bookId}`}>
                    <Card hoverable={true} cover={<img style={{width: '100%'}}  alt={item.book.bookName} src={item.book.banner} />}></Card>              
                  </a>
                </Col>
              ))
            }
            </Row> 
            <Row gutter={24} style={{margin: '0px -12px'}}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{marginTop: '12px'}}>
              <CoverCard  loading={this.props.loading} rankTypeData={this.props.data[5]}  grid={ { gutter: 24, xs: 2, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4}}/> 
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{marginTop: '12px'}}>
              <CoverCard  loading={this.props.loading} rankTypeData={this.props.data[6]} grid={ { gutter: 24, xs: 2, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4}}/> 
              </Col>
            </Row>
            <Row gutter={24} style={{margin: '0px -12px'}}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{marginTop: '12px'}}>
              <CoverCard  loading={this.props.loading} rankTypeData={this.props.data[7]}  grid={ { gutter: 24, xs: 2, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4}}/> 
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{marginTop: '12px'}}>
              <CoverCard  loading={this.props.loading} rankTypeData={this.props.data[8]}  grid={ { gutter: 24, xs: 2, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4}}/> 
              </Col>
            </Row>                                                         
          </div>                     
        )
    }
}

export default Home;