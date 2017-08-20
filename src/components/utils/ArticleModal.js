import React, {Component} from 'react';

import axios from 'axios';
import {Dialog, FlatButton} from "material-ui";

const style = {
  contentStyle: {
    width: '90%',
    maxWidth: 'none',
  },
  textarea: {
    marginTop: '20px',
    width: '100%',
    height: '50%',
    fontSize: '20px',
  },
  title: {
    textAlign: 'center',
    height: '50px',
    width: '250px',
    fontSize: '30px'
  }
};

export default class ArticleModal extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      title: '',
      content: '',
    };
  }

  /**
   * title
   * @param e
   */
  userInput1 = e => {
    this.setState({
      title: e.target.value
    })
  };

  /**
   * content
   * @param e
   */
  userInput = e => {
    this.setState({
      title: e.target.value
    })
  };

  handleClose = () => {
    this.props.context.setState({showArticleModal: false});
  };

  handleConfirm = () => {
    const context = this.props.context;
    this.props.context.setState({
      showArticleModal: false
    });
    axios
      .post('/postArticle', {
        user: this.props.user.name,
        account: this.props.user.account,
        content: this.state.content,
        title: this.state.title
      })
      .then((response) => {
        context.setState({dialog: true});
        context.setState({dialogText: response.data});
        socket.emit('postArticle', {data: 'test'});
      })
      .catch(error => {
        console.log(error);
      })
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleConfirm}
      />,
    ];

    return (
      <div>
        <Dialog
          title="發表文章"
          actions={actions}
          modal={true}
          open={this.props.context.state.showArticleModal}
          contentStyle={style.contentStyle}
          bodyStyle={style.bodyStyle}
        >
          <div style={{height: '600px'}}>
            <input
              style={style.title}
              placeholder="請輸入標題"
              onChange={e => this.userInput1(e)}
            />
            <textarea
              placeholder="請輸入文章內容"
              onChange={e => this.userInput(e)}
              style={style.textarea}
            >
            </textarea>
          </div>
        </Dialog>
      </div>
    );
  }

}