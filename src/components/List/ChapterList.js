import React, { PureComponent } from 'react';
import {List, Icon} from 'antd';
import './ChapterList.css';

export default class ChapterList extends PureComponent{

    render(){
        return(
            <List
            className="chapter-list"
            loading={this.props.loading}
            grid={{ gutter: 24, xs: 1, sm: 1, md: 3, lg: 3, xl: 3, xxl: 3 }}
            dataSource={this.props.dataSource}
            renderItem={item => (
                <List.Item>{<a href={`/Read/${item.chapterId}`}><span>{item.chapterName}</span>{item.free===1 ? <Icon type="lock" /> : null}</a>}</List.Item>
            )}
            />
        )
    }
}