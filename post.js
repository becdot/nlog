var React = require("react");

var PostMixin = require('./post_mixin');
var Comment = require('./comment');

var Post = React.createClass({
  mixins: [PostMixin],

  getDefaultProps() {
    return {
      author: "",
      content: "",
      title: "",
      tags: [],
      comments: [],
      datePublished: ""
    };
  },

  getHeader() {
    return (
      <header>
        <h2>{this.props.title}</h2>
        <p>
          <time>{this.formatDate()}</time>{" by "}<span>{this.props.author}</span>
          <span> -- </span>
          <span>{`${this.props.comments.length} comments`}</span>
        </p>
      </header>
    );
  },

  getBody() {
    var title = `${this.props.title.toLowerCase().split(' ').join('-')}-${this.props.datePublished}`;
    return (
      <div>
        {this.props.content.split("\n").map((para, i) => <p key={`post-${title}-paragraph-${i}`}>{para}</p>)}
      </div>
    );
  },

  getComments() {
    return this.props.comments.map((comment) => {
      var title = `comment-${comment.author}-${comment.datePublished}`;
      return <Comment key={title} author={comment.author} content={comment.content} datePublished={comment.datePublished} />;
    });
  },

  render() {
    return (
      <article className="post">
        {this.getHeader()}
        {this.getBody()}
        <h3>Comments</h3>
        {this.getComments()}
      </article>
    );
  }
});

module.exports = Post;
