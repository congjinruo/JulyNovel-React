import React, { PureComponent } from 'react';
import {Card, Icon, List, Badge } from 'antd'
import PropTypes from 'prop-types';

export default class RankCard extends PureComponent{
    render(){
        return(
            <Card  title={<div style={{fontSize: 16, fontWeight: 400}}><Icon type="rocket" style={{ fontSize: 20,  marginRight: 10, color: '#1da57a'  }} />热门排行</div>}>
            <List
              bordered={false}
              loading={this.props.loading}
              itemLayout="horizontal"
              dataSource={this.props.hotBookList}
              renderItem={(item, index) => (

            <List.Item>
                <List.Item.Meta
                    avatar={<Badge  count={index + 1} style={{ backgroundColor: '#fff', color: '#999' }} />}
                    title={<a href={`/Info/${item.bookId}`}>{item.bookName}</a>}
                    description={<div>{item.clickTimes}<span>&nbsp;点击</span></div>}
                />
                </List.Item>
              )}
            />
            </Card>                
        )
    }

}

RankCard.defaultProps = {
    hotBookList: []
}
RankCard.protoTypes = {
    hotBookList: PropTypes.array
}