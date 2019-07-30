import React, {PureComponent} from 'react'
import { Menu, Layout, Icon} from 'antd'
import {QueryRenderer} from 'react-relay';
import environment from '../../services/environment';
import BookList from '../../components/List/BookList';

  import './index.css';

  const graphql = require('babel-plugin-relay/macro');
  
  const env = environment;
  const { SubMenu } = Menu;
  const { Content, Sider } = Layout;

const SelectionBookTypeQuery = graphql`
query SelectionBookTypeQuery($parentTypeId: Int = 0){
    bookTypeList(parentTypeId: $parentTypeId) {
        typeId
        typeName
        parentTypeId
        children {
          typeId
          typeName
          parentTypeId
          summary
        }
      }
    }
`

export default class Selection extends PureComponent{
    render(){
        return(
            <QueryRenderer
            environment={env}
            query={SelectionBookTypeQuery}
            variables={{parentTypeId: 0}}
            cacheConfig={true}
            render={({error, props}) => {
              if (error) {
                console.log(error)
              }
              
              if (!props) {
                return null
              }
              let  openKey = "1";
              const rootSubmenuKeys = [];
              if(props.bookTypeList.length !== undefined){
                props.bookTypeList.forEach(bookType => {
                    if(bookType.children.length === undefined){
                        return;
                    }
                    bookType.children.forEach(item =>{
                          if(item.typeId===this.props.match.params.typeId){
                              openKey = bookType.typeId;
                          }
                    });
                    rootSubmenuKeys.push(bookType.typeId)
                });
              }


              const openKeys = [];
              openKeys.push(openKey);
              const selectedKeys = [];
              selectedKeys.push(this.props.match.params.typeId);
              return (<SelectionComponent rootSubmenuKeys={rootSubmenuKeys}  bookTypeList={props.bookTypeList} openKeys={openKeys} selectedKeys={selectedKeys}/>)
            }}
            />

        )
    }
}

class SelectionComponent extends PureComponent{
    state = {
        typeId: this.props.selectedKeys[0],
        openKeys: this.props.openKeys,
      };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.props.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      }
    handleSelect = (e) =>{
        this.setState({typeId: e.key});
    }
    render(){
        return(
            <div>
                <div>                          
                    <div className="info-background" style={{backgroundImage: `url("https://congjinruo.oss-cn-shanghai.aliyuncs.com/img_background_${this.state.typeId}")`}}></div>              
                </div>
                <div className="selection-content">
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            onOpenChange={this.onOpenChange}
                            openKeys={this.state.openKeys}
                            defaultSelectedKeys={this.props.selectedKeys}
                            defaultOpenKeys={this.props.openKeys}
                            onClick={this.handleSelect}
                            style={{ height: '100%' }}
                        >
                            {
                                this.props.bookTypeList.map(bookType =>{
                                    return(
                                        <SubMenu key={bookType.typeId} title={<span><Icon type="user" />{bookType.typeName}</span>}>
                                            {
                                                bookType.children.map(item =>{
                                                    return(
                                                        <Menu.Item key={item.typeId}>{item.typeName}</Menu.Item>
                                                    )
                                                })
                                            }
                                    </SubMenu>
                                    )
                                })
                            }
                        </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280, overflow: 'hidden' }}>
                            <BookList  typeId={this.state.typeId} pageSize={12}/>
                        </Content>
                </Layout>      
                </div>
            </div>
        )
    }
}