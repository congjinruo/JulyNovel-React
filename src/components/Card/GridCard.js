import React, { PureComponent } from 'react';
import { Card, Col, Icon, Modal } from 'antd';
import PropTypes from 'prop-types';
import './GridCard.css';

const gridCardBookTypesQuery = `
query gridCardBookTypesQuery($rootId: Int=0, $totalCount: Int=12){
    bookTypeList(parentTypeId: $rootId){
      typeId
      typeName
      children(totalCount: $totalCount){
        typeId
        typeName
        parentTypeId
        bookCount
      }
    }
  }
`
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
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            value: tempData
        }
    }
    componentDidMount() {
        fetch('https://www.qiyuexiaoshuo.com:8000/graphql', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: gridCardBookTypesQuery,
              variables: {
                parentTypeId: this.props.typeId
              }
            }),
          }).then(response => {
            return response.json(); 
        }).then((json) => {
            this.setState({isLoading: false, value: json.data.bookTypeList});
        }).catch(function(ex) {
            console.log('request failed', ex);  //异常处理
            Modal.info({
                title: '您的网络似乎有问题',
                content: (
                  <div>
                    <p style={{marginTop: '20px'}}>抱歉</p>
                    <p>网络通信有点捉襟见肘，立即刷新试试！</p>
                  </div>
                ),
                onOk() {
                    window.location.href = '/';
                },
              });
        });
    }
  
    render(){
        return (
            <div>
                {
                    this.state.value.map((item, index) => (
                        <Col span={24} className={this.props.className} key={index}>
                            <Card loading={this.state.isLoading} title={<div style={{fontSize: 16, fontWeight: 400}}><Icon type={iconArray[index]} style={{ fontSize: 20,  marginRight: 10, color: '#1da57a'}} />{item.typeName}</div>}>
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
    typeId : 0
}

GridCard.protoTypes = {
    className: PropTypes.string
}