import React from 'react';
import Remarkable from 'remarkable';

module.exports = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },

    render: function () {
        return (
            <div className="person">
                <h2 className="personName">
                    {this.props.id} 
                </h2>
                <p claaName="name">
                    Name: {this.props.firstName} {this.props.lastName} </p>
                <p className="startDate">
                    Start Date : {this.props.startDate} </p>
            </div>
        );
    }
});