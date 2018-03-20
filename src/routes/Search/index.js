import React, {Component} from 'react'
import { Row, Col, Input } from 'antd'
import SearchList from '../../components/List/SearchList';
import './index.css';

const SearchInput = Input.Search;

export default class Search extends Component{
    render(){
        const searchText = this.props.match.params.search;
        return(
            <div className="search-content">
                <div className="box-input">
                    <SearchInput className={"search-input"} defaultValue={searchText} placeholder={"凡人修仙之仙界篇"} enterButton="搜索" size="large"
                    onSearch={value => {
                        if(value == undefined ||  value == null || value.replace(/(^\s*)|(\s*$)/g, "") == ""){
                            this.props.history.push(`/Search/凡人修仙之仙界篇`);
                            return;
                        }
                        this.props.history.push(`/Search/${value}`); 
                    }}
                    />
                </div>
                <div className="info-content" style={{padding: '20px 0px'}}>
                    <Row>
                        <Col>
                            <SearchList  search={searchText}  pageSize={5}/>    
                        </Col>
                        <Col>
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }
}