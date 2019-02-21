import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazy-load';
import {List, Card, Icon} from 'antd';  // 加载 JS
import './CoverCard.css'

const { Meta } = Card;

const getIcon = (typeId) =>{
    if(typeId === 3){
      return "book";
    }
    if(typeId%2 === 0){
      return "man";
    }else{
      return "woman";
    }
  }

export default class CoverCard extends PureComponent{

    static defaultProps = {
      grid: { gutter: 24, xs: 2, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4}
    }
  

    render(){
        return (
            <Card  title={<div style={{fontSize: 16, fontWeight: 400}}>
            <Icon type={getIcon(this.props.rankTypeData.typeId)} style={{ fontSize: 20,  marginRight: 10, color: '#1da57a' }} />
            {this.props.rankTypeData.typeName}</div>}>
                <List
                grid={this.props.grid}
                loading={this.props.loading}
                dataSource={this.props.rankTypeData.rankList}
                renderItem={item=> (
                  <List.Item>
                    <a href={`/info/${item.book.bookId}`}>
                      <Card className={'simple-book-list'}
                    hoverable={true}
                    cover={ 
                    <LazyLoad   height={120}  offsetVertical={100} once>
                      <img alt={item.book.bookName} style={{height: '120px'}} src={item.book.cover} />
                    </LazyLoad>}>
                      <Meta
                        title={item.book.bookName} 
                        description={item.book.author} 
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