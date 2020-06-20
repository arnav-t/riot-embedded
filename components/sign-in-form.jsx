import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

/**
 * React component for sign in form
 * 
 * @param   {object} client - Client object
 */
export default class SignInForm extends PureComponent {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    static propTypes = {
        client: PropTypes.object.isRequired
    }

    onSubmit(event) {
        // Get credentials from event
        let formData = new FormData(document.forms['sign-in']);
        let user = formData.get('uname');
        let passwd = formData.get('passwd');
        this.props.client.loginWithPassword(user, passwd);

        // Sign in logic goes here
        //signIn()

        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        return (
            <form className='form' onSubmit={this.onSubmit} id='sign-in'>
                <div className='form-element'>
                    <h4 className='form-label'>Username: </h4>
                    <input type='text' name='uname' />
                </div>
                <div className='form-element'>
                    <h4 className='form-label'>Password: </h4>
                    <input type='password' name='passwd' />
                </div>
                <div className='form-element'>
                    <input type='submit' value='Sign in' />
                </div>
            </form>
        );
    }
}