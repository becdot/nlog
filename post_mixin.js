var React = require("react");
var moment = require("moment");

var PostMixin = {
  formatDate() {
    var date = moment(this.props.datePublished);
    return date.format("dddd, MMMM Do YYYY, h:mm a");
  }
};

module.exports = PostMixin;
