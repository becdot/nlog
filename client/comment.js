var React = require("react");

var PostMixin = require('./post_mixin');

var Comment = React.createClass({
  mixins: [PostMixin],

  getDefaultProps() {
    return {
      author: "",
      content: "",
      datePublished: ""
    };
  },

  getHeader() {
    return (
      <header>
        <h4>{`${this.props.author} says`}</h4>
        <p>
          <time>{this.formatDate()}</time>
        </p>
      </header>
    );
  },

  getBody() {
    var title = `${this.props.author.toLowerCase().split(' ').join('-')}-${this.props.datePublished}`;
    return (
      <div>
        {this.props.content.split("\n").map((para, i) => <p key={`post-${title}-paragraph-${i}`}>{para}</p>)}
      </div>
    );
  },

  render() {
    return (
      <article className="comment">
        {this.getHeader()}
        {this.getBody()}
      </article>
    );
  }
});

module.exports = Comment;
