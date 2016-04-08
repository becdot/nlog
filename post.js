var React = require("react");

var PostMixin = require('./post_mixin');

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

  getComments() {

  },

  render() {
    return (
      <article className="post">
        {this.getHeader()}
        {this.getBody()}
        {this.getComments()}
      </article>
    );
  }
});

module.exports = Post;
