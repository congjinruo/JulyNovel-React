import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazy-load';
import {List, Card, Icon} from 'antd';  // 加载 JS
import './IntroCard.css'

const { Meta } = Card;

const getIcon = (typeId) =>{
  if(typeId === 2){
    return "like";
  }

  if(typeId%2 === 0){
    return "man";
  }else{
    return "woman";
  }
}

export default class IntroCard extends PureComponent{
    componentWillMount(){

    }
    static defaultProps = {
      grid: { gutter: 24, xs: 1, sm: 1, md: 4, lg: 4, xl: 4, xxl: 4}
    }
  
    render(){
        return (
            <Card  title={<div style={{fontSize: 16, fontWeight: 400}}><Icon type={getIcon(this.props.rankTypeData.typeId)} style={{ fontSize: 20,  marginRight: 10, color: '#1da57a' }} />{this.props.rankTypeData.typeName}</div>}
            >
                <List
                grid={this.props.grid}
                loading={this.props.loading}
                dataSource={this.props.rankTypeData.rankList}
                renderItem={item=> (
                  <List.Item>
                  <a href={`/info/${item.book.bookId}`}>
                  <Card 
                  hoverable
                  bordered={false}
                  className={"intro-card" }
                  cover={
                    <LazyLoad   offsetVertical={100} once>
                        <img alt={item.book.bookName} src={item.book.cover} />
                    </LazyLoad>
                  }>
                    <Meta
                      title={item.book.bookName} 
                      description={
                        <div>
                          <div className="intro-card-summary" >{item.book.summary.replace(/<br>/g, '        ')}</div>
                          <div className="intro-card-info"><span>{item.book.author}</span><span className="split">|</span><span style={{color: 'red'}}>{item.book.clickTimes}</span>&nbsp;点击</div>
                        </div>
                      }
                    />     
                  </Card>
                  </a>
                </List.Item>
                )}
                /> 
        </Card>
        )
    }

}
