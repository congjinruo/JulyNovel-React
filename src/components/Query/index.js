import React, {PureComponent} from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../../services/environment';

const env = environment;

export default class Query extends PureComponent{
    render(){
        return(
            <div>Kuai</div>
        )
    }
}