import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

/** 
 * React component for an avatar icon
 * 
 * @param   {string} imgUrl - The avatar URL
 * @param   {number} size - The height and width of avatar
 * @param   {string} name - String to get initial letter from
 */
export default class Avatar extends PureComponent {
    static propTypes = {
        imgUrl: PropTypes.string, // The avatar URL
        size: PropTypes.number, // The height and width of avatar
        name: PropTypes.string, // String to get initial letter from
    };

    /** Get first letter of name */
    getInitialLetter() {
        let idx = 0;
        if (['@', '#', '+'].includes(this.props.name[0]) && this.props.name[1]) idx++;
        let char = String.fromCharCode(this.props.name.codePointAt(idx));
        return char.toUpperCase();
    }

    /** Hash function for names */
    cyrb53(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ h1>>>16, 2246822507) ^ Math.imul(h2 ^ h2>>>13, 3266489909);
        h2 = Math.imul(h2 ^ h2>>>16, 2246822507) ^ Math.imul(h1 ^ h1>>>13, 3266489909);
        return 4294967296 * (2097151 & h2) + (h1>>>0);
    }

    /** Generate HSL color from name */
    generateHsl() {
        let h = this.cyrb53(this.props.name)%360;
        return `hsl(${h}, 100%, 30%)`;
    }

    render() {
        let imgUrl = this.props.imgUrl;

        // Placeholder avatar if imgUrl is falsy
        if (!this.props.imgUrl) return (
            <div className='rounded-container' style={{
                height: this.props.size,
                width: this.props.size,
                minHeight: this.props.size,
                minWidth: this.props.size,
                backgroundColor: this.generateHsl()
            }}>
                <b>{this.getInitialLetter()}</b>
            </div>
        );
        return (
            <img src={imgUrl} 
                height={this.props.size} 
                width={this.props.size} 
                className='rounded-img'
                style={{
                    minHeight: this.props.size,
                    minWidth: this.props.size,
                }} />
        );
    }
}
