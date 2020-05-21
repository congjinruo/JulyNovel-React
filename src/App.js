import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { Layout, BackTop, Modal } from 'antd';
import PageHeader from './components/PageHeader';
import Home  from './routes/Home';
import Info from './routes/Info';
import Read from './routes/Read';
import Selection from './routes/Selection';
import Search from './routes/Search';
import './App.css';

const { Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
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
      return <h1>出错啦</h1>;
    }
    return (
      <Layout>
      <Route  component={PageHeader}/>
      <Content>
        <Layout>
          <Content style={{ minHeight: 280 }}>
            <Route exact path="/" component={Home}/>
            <Route path="/Info/:bookId" component={Info}/>
            <Route path="/Read/:chapterId" component={Read}/>
            <Route path="/Selection/:typeId" component={Selection}/>
            <Route path="/Search/:search" component={Search}/>
          </Content>
        </Layout>
      </Content>
      <BackTop />
      <Footer style={{ textAlign: 'center' }}>
        <p>July Novel ©2018 designed by Jiajin Kuai</p>
        <p><a href="http://www.beian.miit.gov.cn" target="_blank">浙ICP备17039940号</a></p>
      </Footer>
    </Layout>       
    );
  }
}

export default App;