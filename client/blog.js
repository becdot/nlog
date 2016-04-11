var React = require("react");

var Post = require("./post");

var Blog = React.createClass({
  getDefaultProps() {
    return {
      posts: []
    };
  },

  getInitialState() {
    console.log("Blog.getInitialState");
    return {
      filter: {}
    };
  },

  filterPosts() {
    console.log("filterPosts, filter =", this.state.filter);
    var posts = this.props.posts;
    var key = this.state.filter.key;
    var value = this.state.filter.value;
    console.log(`filtering posts by ${key}`);
    switch(key) {
      case "id":
      case "author":
        posts = posts.filter((post) => post[key] === value);
        break;
      case "tags":
        posts = posts.filter((post) => post[key].indexOf(value) !== -1);
        break;
    }
    return posts;
  },

  getHeader() {
    return (
      <header>
        <h1>Nlog</h1>
      </header>
    );
  },

  getPosts() {
    var posts = this.filterPosts();
    return posts.map((post) => {
      var postTitle = `post-${post.title.toLowerCase().split(' ').join('-')}`;
      return <Post key={postTitle} filter={this.setFilter} {...post} />;
    });
  },

  setFilter(filter) {
    console.log("this =", this);
    console.log("filter =", filter);
    this.setState({
      filter: filter
    });
  },

  render() {
    console.log("Blog.render");
    return (
      <div>
        {this.getHeader()}
        {this.getPosts()}
      </div>
    );
  }
});

module.exports = Blog;
