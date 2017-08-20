import React, {Component} from 'react';
import {connect} from 'react-redux';
import SimpleDialog from "../components/utils/SimpleDialog";
import ArticleModal from "../components/utils/ArticleModal";
import {RaisedButton} from "material-ui";
import actions from "../redux/actions/addArticle";


const style = {
  container: {},
  articleContainer: {
    border: '1px solid orange',
    opacity: '0.2',
    height: '100vh',
    width: '70%',
    margin: ' 0 auto'
  },
  postBtn: {
    position: 'fixed',
    right: '50px'
  }
};

class Main extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      showArticleModal: false,
      dialog: false,
      dialogText: ''
    };
  }

  componentDidMount() {
    const context = this;
    socket.on('updateArticle', (msg) => {
      console.log('received');
      const payload = msg[msg.length - 1];
      context.props.addArticleAction({
        _id: payload._id,
        title: payload.title,
        content: payload.content,
        author: payload.posterAccount,
        date: payload.PostDate,
      });
    });
  }

  postArticle = () => {
    this.setState({
      showArticleModal: true
    });
  };

  render() {
    return (
      <div style={style.container}>
        {this.state.dialog ? <SimpleDialog content={this.state.dialogText} context={this}/> : ''}
        {this.state.showArticleModal ? <ArticleModal user={this.props.user} context={this}/> : ''}
        {
          this.props.user.login
            ?
            <RaisedButton
              onClick={() => this.postArticle()}
              label="發表文章" primary={true}
              style={style.postBtn}
            />
            :
            ''
        }
        <div style={style.articleContainer}>
          {
            this.props.articles.map(i => {
              return (
                <div key={i._id}>{i.title}</div>
              )
            })
          }
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    user: state.userInfo,
    articles: state.article,
  }
}

export default connect(mapStateToProps, {
  addArticleAction: actions.addArticle,
})(Main);