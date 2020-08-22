import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

/**
 * React component for sign in form
 * 
 * @param   {object} client - Client object
 * @param   {func} setUser - Callback to change user
 * @param   {object} msgComposer - Ref to message composer
 */
export default class SignInForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            state: 'init'
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    static propTypes = {
        client: PropTypes.object.isRequired, // Client object
        setUser: PropTypes.func.isRequired, // Callback to change user
        msgComposer: PropTypes.object.isRequired // Ref to message composer
    }

    onSubmit(event) {
        // Get credentials from event
        let formData = new FormData(document.forms['sign-in']);
        let user = formData.get('uname');
        let passwd = formData.get('passwd');
        let submit = document.getElementById('sign-in-submit');
        submit.value = '...';
        submit.disabled = true;
        this.props.client.loginWithPassword(user, passwd, (err, data) => {
            if (err) {
                // Handle error
                console.log('ERROR: ', err);
                submit.value = 'Sign in';
                submit.disabled = false;
                this.setState({
                    state: 'err'
                });
            } else {
                console.log('SUCCESS: ', data);
                this.props.setUser(user, data.access_token, () => {
                    submit.value = 'Sign in';
                    submit.disabled = false;
                    this.setState({
                        state: 'success'
                    });
                    if (this.props.msgComposer.current) {
                        this.props.msgComposer.current.sendMessage();
                    }
                });
            }
        });


        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        if (this.state.state == 'success') return (
            <div className='form'>
                <h2>Signed in successfully!</h2>
            </div>
        );
        return (
            <form className='form' onSubmit={this.onSubmit} id='sign-in'>
                { (this.state.state == 'err') && 
                <i className='error-msg'>Invalid username or password.</i> }
                <div className='form-element'>
                    <h4 className='form-label'>Username: </h4>
                    <input type='text' name='uname' />
                </div>
                <div className='form-element'>
                    <h4 className='form-label'>Password: </h4>
                    <input type='password' name='passwd' />
                </div>
                <div className='form-element'>
                    <input type='submit' id='sign-in-submit' value='Sign in' />
                </div>
            </form>
        );
    }
}