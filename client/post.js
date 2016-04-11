var React = require("react");

var PostMixin = require('./post_mixin');
var Comment = require('./comment');

var Post = React.createClass({
  mixins: [PostMixin],

  getDefaultProps() {
    return {
      id: 0,
      author: "",
      content: "",
      title: "",
      tags: [],
      comments: [],
      datePublished: ""
    };
  },

  getInitialState() {
    return {
      selected: false
    };
  },

  getHeader() {
    return (
      <header>
        <h2 onClick={this.props.filter.bind(null, {key: "id", value: this.props.id})}>{this.props.title}</h2>
        <p className="timestamp">
          <time>{this.formatDate()}</time>
          {" by "}
          <span onClick={this.props.filter.bind(null, {key: "author", value: this.props.author})}>{this.props.author}</span>
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

  getTags() {
    var postID = this.props.id;
    var tags = this.props.tags.map((tag) => {
      var title = `tag-${tag}-post-id-${postID}`;
      return <li key={title} onClick={this.props.filter.bind(null, {key: "tags", value: tag})}>{tag}</li>;
    });
    return (
      <div>
      Tagged with
        <ul tags>
          {tags}
        </ul>
      </div>
    );
  },

  render() {
    return (
      <article className="post">
        {this.getHeader()}
        {this.getBody()}
        {this.props.comments.length ? <h3>Comments</h3> : null}
        {this.getComments()}
        {this.getTags()}
      </article>
    );
  }
});

module.exports = Post;
