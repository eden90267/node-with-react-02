import React, {Component} from 'react';
import {Dialog, FlatButton, RaisedButton} from 'material-ui';

export default class DialogExampleSimple extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      open: true
    };
  }

  handleClose = () => {
    this.props.context.setState({
      dialog: false
    });
  };

  render() {
    const actions = [
      <FlatButton
        label="確定"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          title="提示"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.props.context.state.dialogText}
        </Dialog>
      </div>
    );
  }

}