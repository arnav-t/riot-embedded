import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

/** 
 * React component for an avatar icon
 * 
 * @param   {string} imgUrl - The avatar URL
 * @param   {number} size - The height and width of avatar
 */
export default class Avatar extends PureComponent {
    static propTypes = {
        imgUrl: PropTypes.string, // The avatar URL
        size: PropTypes.number // The height and width of avatar
    };

    render() {
        // Placeholder image if imgUrl is falsy
        let imgUrl = this.props.imgUrl ?  this.props.imgUrl : 'https://via.placeholder.com/32';

        return (
            <img src={imgUrl} height={this.props.size} width={this.props.size} className='rounded-img mr-3' />
        );
    }
}
