import React from 'react';
import ReactDOM from 'react-dom';
import '../css/base.css';
import PersonBox from './PersonBox.js'


ReactDOM.render(
    <PersonBox url="/api/people" pollInterval={2000} />,
    document.getElementById('content')
);

