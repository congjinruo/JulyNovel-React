import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { Layout, BackTop } from 'antd';
import PageHeader from './components/PageHeader';
import Home  from './routes/Home';
import Info from './routes/Info';
import Read from './routes/Read';
import Selection from './routes/Selection';
import Search from './routes/Search';
import './App.css';

const { Content, Footer } = Layout;

class App extends Component {

  render() {
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
        <p>July Novel ©2018 designed by React</p>
        <p>浙ICP备17039940号-1</p>
      </Footer>
    </Layout>       
    );
  }
}

export default App;