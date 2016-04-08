var React = require("react");

var Post = React.createClass({
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
          <time>{this.props.datePublished}</time>{" by "}<span>{this.props.author}</span>
        </p>
      </header>
    );
  },

  getBody() {
    var title = this.props.title.toLowerCase().split(' ').join('-');
    return (
      <div>
        {this.props.content.split("\n").map((para, i) => <p key={`post-${title}-paragraph-${i}`}>{para}</p>)}
      </div>
    );
  },

  render() {
    return (
      <article className="post">
        {this.getHeader()}
        {this.getBody()}
      </article>
    );
  }
});

module.exports = Post;
