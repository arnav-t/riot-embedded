/**
 * @fileoverview    React component for an avatar
 * 
 * @requires        NPM:react
 * @requires        NPM:prop-types
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

/** 
 * React component for an avatar icon
 * 
 * @param   {string} imgUrl - The avatar URL
 * @param   {number} size - The height and width of avatar
 */
class Avatar extends Component {
    render() {
        let imgUrl = this.props.imgUrl ?  this.props.imgUrl : 'https://via.placeholder.com/32';
        return (
            <img src={imgUrl} height={this.props.size} width={this.props.size} className='rounded-img mr-3' />
        );
    }
}

Avatar.propTypes = {
    imgUrl: PropTypes.string, // The avatar URL
    size: PropTypes.number // The height and width of avatar
};

export default Avatar;