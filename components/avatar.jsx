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
        return (
            <img src={this.props.imgUrl} height={this.props.size} width={this.props.size} className='rounded-img mr-3' />
        );
    }
}