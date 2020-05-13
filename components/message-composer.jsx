import React, {PureComponent} from 'react';

export default class MessageComposer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            editor: 'Bruh moment'
        };
    }

    render() {
        return (
            <div contentEditable='true' value={this.state.editor} 
                className='msg-composer darker-bg scrollable'>
                
            </div>
        );
    }
}