import React, {Component} from 'react';

export default class Avatar extends Component {
    render() {
        return (
            <img src={this.props.imgUrl} height={this.props.size} width={this.props.size} className='rounded-img mr-3' />
        );
    }
}