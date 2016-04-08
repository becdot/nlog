var React = require("react");

var Post = require("./post");

var Blog = React.createClass({
  getDefaultProps() {
    return {
      posts: []
    };
  },

  getHeader() {
    return (
      <header>
        <h1>Nlog</h1>
      </header>
    );
  },

  buildPost(post) {
    var postTitle = `post-${post.title.toLowerCase().split(' ').join('-')}`;
    return <Post key={postTitle} author={post.author} content={post.content} title={post.title} tags={post.tags} comments={post.comments} datePublished={post.datePublished} />;
  },

  getPosts() {
    return this.props.posts.map((post) => this.buildPost(post));
  },

  render() {
    return (
      <div>
        {this.getHeader()}
        {this.getPosts()}
      </div>
    );
  }
});

module.exports = Blog;
