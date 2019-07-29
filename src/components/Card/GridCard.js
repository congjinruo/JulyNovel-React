import React, { PureComponent } from 'react';
import { Card, Col, Icon } from 'antd';
import PropTypes from 'prop-types';
import './GridCard.css';

const { Meta } = Card;

const gridStyle = {
    width: '33.33%',
    padding: '8px',
    textAlign: 'center',
  };

const tempData = [
    {
        typeName: "男生",
        children: []
    },
    {
        typeName: "女生",
        children: []
    },
    {
        typeName: "出版",
        children: []
    }
]
const iconArray = ["github", "dingding", "amazon"]



export default class GridCard extends PureComponent{

    render(){
        return (
            <div>
                {
                    this.props.gridTypeList.map((item, index) => (
                        <Col span={24} className={this.props.className} key={index}>
                            <Card loading={item.length===0} title={<div style={{fontSize: 16, fontWeight: 400}}><Icon type={iconArray[index]} style={{ fontSize: 20,  marginRight: 10, color: '#1da57a'}} />{item.typeName}</div>}>
                                {item.children.map((xitem) => (
                                <a href={`/Selection/${xitem.typeId}`}  key={xitem.typeId} >
                                    <Card.Grid style={gridStyle} >
                                    <Meta title={xitem.typeName} description={xitem.bookCount + ''}/></Card.Grid>
                                </a>
                                ))}
                            </Card>
                        </Col>
                    ))
                }
            </div>
        )
    }

}

GridCard.defaultProps = {
    className: 'book-type',
    typeId : 0,
    gridTypeList: tempData
}

GridCard.protoTypes = {
    className: PropTypes.string,
    gridTypeList: PropTypes.array
}