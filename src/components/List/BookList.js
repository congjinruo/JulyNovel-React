import React, { PureComponent } from 'react';
import {List, Card, Pagination, Spin} from 'antd';  // 加载 JS
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../services/environment';
import './BookList.css'

const env = environment;

const { Meta } = Card;

const BookListQuery = graphql`
query BookListQuery($bookTypeId: ID, $first: Int = 20, $last: Int = 20){
  bookType(typeId: $bookTypeId) {
    typeId
    totalBookCount
  }
  bookList(bookTypeId: $bookTypeId, first: $first, last: $last) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          bookId
          bookName
          summary
          clickTimes
          wordNumbers
          cover
          banner
          author
          xbookId
        }
      }
    }
  }
`

export default class BookList extends PureComponent{
  state = {
    pageIndex: 1,
    totalCount: this.props.pageSize,
  };
  componentWillReceiveProps = (nextProps) =>{
    this.setState({pageIndex: 1});   
  }
  handlePageChange = (page, pageSize) =>{
    this.setState({pageIndex: page});
  }
  render(){
    const flag = Math.ceil(this.state.totalCount/this.props.pageSize) === this.state.pageIndex && this.props.pageSize*this.state.pageIndex !== this.props.totalCount;
    return(
      <QueryRenderer
      environment={env}
      query={BookListQuery}
      variables={{
        bookTypeId: this.props.typeId,
        first: this.props.pageSize*this.state.pageIndex,
        last:  flag ? this.state.totalCount%this.props.pageSize : this.props.pageSize 
      }}
      render={({error, props}) => {
      if (error) {
          console.log(error)
      }

      if (!props) {
          return (<Spin   className={"selection-spin"} size={'large'}/>)
      }
      setTimeout(() =>{
        this.setState({totalCount: props.bookType.totalBookCount});
      }, 0);
      return (
        <div>
          <List
          grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2}}
          dataSource={props.bookList.edges}
          renderItem={item=> (
            <List.Item>
            <a href={`/info/${item.node.bookId}`}>
            <Card 
            hoverable
            bordered={false}
            className={"book-list" }
            cover={<img alt={item.node.bookName} src={item.node.cover} />}>
              <Meta
                title={item.node.bookName} 
                description={
                  <div>
                    <div className="book-list-summary" >{item.node.summary.replace(/<br>/g, '        ')}</div>
                    <div className="book-list-info"><span>{item.node.author}</span><span className="split">|</span><span style={{color: 'red'}}>{item.node.clickTimes}</span>&nbsp;点击</div>
                  </div>
                }
              />     
            </Card>
            </a>
          </List.Item>
          )}
          />
          {props.bookList.edges.length > 0 ? <Pagination onChange={this.handlePageChange} defaultCurrent={1} current={this.state.pageIndex} total={this.state.totalCount}  style={{textAlign: 'center'}} defaultPageSize={this.props.pageSize}/> : null}       
      </div>
      )
      }}
      />
    )
  }
}