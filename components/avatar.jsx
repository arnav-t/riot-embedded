/**
 * @fileoverview    React component for an avatar
 * 
 * @requires        NPM:react
 */

import React, {Component} from 'react';

/** 
 * React component for an avatar icon
 * 
 * @param   {string} imgUrl - The avatar URL
 * @param   {number} size - The height and width of avatar
 */
export default class Avatar extends Component {
    render() {
        console.log(this.props.imgUrl);
        let imgUrl = this.props.imgUrl ?  this.props.imgUrl : 'https://via.placeholder.com/32';
        return (
            <img src={imgUrl} height={this.props.size} width={this.props.size} className='rounded-img mr-3' />
        );
    }
}