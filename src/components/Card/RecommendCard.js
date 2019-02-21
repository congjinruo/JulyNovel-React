import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazy-load';
import {List, Card, Icon} from 'antd';  // 加载 JS
import './RecommendCard.css'

const { Meta } = Card;


export default class CoverCard extends PureComponent{

    static defaultProps = {
      grid: { gutter: 24, xs: 2, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4}
    }
  
    render(){
        return (
            <Card  title={<div style={{fontSize: 16, fontWeight: 400}}><Icon type={"api"} style={{ fontSize: 20,  marginRight: 10, color: '#1da57a' }} />猜你喜欢</div>}>
                <List
                grid={this.props.grid}
                loading={this.props.loading}
                dataSource={this.props.dataSource}
                renderItem={item=> (
                  <List.Item>
                      <a href={`/info/${item.bookId}`}>
                        <Card className={'simple-book-list'}
                        hoverable={true}
                        cover={
                          <LazyLoad>
                            <img alt={item.bookName} style={{height: '120px'}} src={item.cover} />
                          </LazyLoad>
                        }>
                        <Meta
                        title={item.bookName} 
                        description={item.author} 
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