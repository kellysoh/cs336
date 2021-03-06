import React from 'react';
import ReactDOM from 'react-dom';
import '../css/base.css';
import CommentBox from './CommentBox.js';


ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);


ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('content')
);




ReactDOM.render(
    <CommentBox data={data} />,
    document.getElementById('content')
);

//tutorial11.js
ReactDOM.render(
    <CommentBox url="/api/comments" />,
    document.getElementById('content')
);




ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);










