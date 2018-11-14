import React from 'react';
import ReactDOM from 'react-dom';
import '../css/base.css';
import CommentBox from './CommentBox.js'


ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);










