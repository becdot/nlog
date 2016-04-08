var React = require("react");
var moment = require("moment");

var PostMixin = {
  formatDate() {
    var date = moment(this.props.datePublished);
    return date.format("dddd, MMMM Do YYYY, h:mm a");
  },

  getHeader() {
    return (
      <header>
        <h2>{this.props.title}</h2>
        <p>
          <time>{this.formatDate()}</time>{" by "}<span>{this.props.author}</span>
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
  }
};

module.exports = PostMixin;
