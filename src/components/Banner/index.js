import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Carousel from 'antd/lib/carousel';  // 加载 JS
import './index.css'


export default class Banner extends PureComponent{
    componentDidMount(){

        const banner = ReactDOM.findDOMNode(this.refs.banner);
        const prevButton = banner.getElementsByClassName("slick-prev")[0];
        const nextButton = banner.getElementsByClassName("slick-next")[0];
        prevButton.innerHTML = '<div class="arrow-prev"></div>';
        nextButton.innerHTML = '<div class="arrow-next"></div>';
    }

    render(){
        return (
            <Carousel ref={"banner"} autoplay={true} infinite={true} arrows={true}>
                {
                    this.props.rankTypeData.rankList.map((item, index) => (
                        <a key={index} href={'/info/' + item.book.bookId}><img src={item.book.banner}  alt={item.book.bookName}/></a>
                    ))
                }                
            </Carousel>
        )
    }

}

