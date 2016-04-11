var React = require('react');
var ReactDOM = require('react-dom');
var Blog = require('./blog');

var DB = require('./../db/mock_database');

ReactDOM.render(<Blog posts={DB.posts} />, document.getElementById('blog'));
