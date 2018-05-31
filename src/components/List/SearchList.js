import React, { Component } from 'react';
import {List, Card, Button, Spin} from 'antd';  // 加载 JS
import './SearchList.css'


const { Meta } = Card;

const SearchListQuery = `
query SearchListQuery($search: String, $first: Int = 10, $after: String){
  bookList(search: $search, first: $first, after: $after) {
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
export default class SearchList extends Component{
  constructor(props){
    super(props);
    this.state = {
        data: [],
        loadingMore: false,
        loading: true,
        hasNextPage: true,
        after: ""
    }
}
componentWillReceiveProps = (nextProps) =>{
  this.setState({
    data: [],
    loadingMore: false,
    loading: true,
    hasNextPage: true,
    after: ""   
  }, () =>{
    this.getData((json) => {
      this.setState({
        loading: false,
        data: json.data.bookList.edges,
        after: json.data.bookList.pageInfo.endCursor,
        hasNextPage:  json.data.bookList.pageInfo.hasNextPage
      });
    });   
  })
}
componentDidMount() {
  this.getData((json) => {
    this.setState({
      loading: false,
      data: json.data.bookList.edges,
      after: json.data.bookList.pageInfo.endCursor,
      hasNextPage:  json.data.bookList.pageInfo.hasNextPage
    });
  });
}
getData = (callback) => {
  fetch('https://www.qiyuexiaoshuo.com:8000/graphql', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: SearchListQuery,
      variables: {
        search: this.props.search,
        first: this.props.pageSize,
        after: this.state.after
      }
    }),
  }).then(response => {
    return response.json(); 
}).then((json) =>{
  callback(json);
}).catch(function(ex) {
    console.log('request failed', ex);  //异常处理
});
}
onLoadMore = () => {
  this.setState({
    loadingMore: true,
  });
  this.getData((json) => {
    const data = this.state.data.concat(json.data.bookList.edges);
    this.setState({
      data,
      loadingMore: false,
      after: json.data.bookList.pageInfo.endCursor,
      hasNextPage:  json.data.bookList.pageInfo.hasNextPage
    }, () => {
      window.dispatchEvent(new Event('resize'));
    });
  });
}
  render(){
    const { loadingMore, hasNextPage } = this.state;
    const loadMore = hasNextPage ? (
      <div style={{ textAlign: 'center', margin: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>加载更多</Button>}
      </div>
    ) : null;
    return(
      <List
      itemLayout="horizontal"
      loading={this.state.loading}
      loadMore={loadMore}
      dataSource={this.state.data}
      grid={{ gutter: 24, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}}
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
    )
  }

}

