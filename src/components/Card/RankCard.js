import React, { PureComponent } from 'react';
import {Card, Icon, List, Badge } from 'antd'

//倒序
const sortList = (list) => {
    const nList = [];
    for(let i = list.length - 1; i >= 0; i--){
        nList.push(list[i]);
    }
    return nList;
}

export default class RankCard extends PureComponent{

    render(){
        return(
            <Card  title={<div style={{fontSize: 16, fontWeight: 400}}><Icon type="rocket" style={{ fontSize: 20,  marginRight: 10, color: '#1da57a'  }} />{this.props.rankTypeData.typeName}</div>}>
            <List
              bordered={false}
              loading={this.props.loading}
              itemLayout="horizontal"
              dataSource={sortList(this.props.rankTypeData.rankList)}
              renderItem={item => (

            <List.Item>
                <List.Item.Meta
                    avatar={<Badge  count={item.sort} style={{ backgroundColor: '#fff', color: '#999' }} />}
                    title={<a href={`/Info/${item.book.bookId}`}>{item.book.bookName}</a>}
                    description={<div>{item.book.clickTimes}<span>&nbsp;点击</span></div>}
                />
                </List.Item>
              )}
            />
            </Card>                
        )
    }

}