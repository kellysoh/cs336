import React from 'react';
import Person from './Person.js';
import PersonForm from './PersonForm.js'

module.exports = React.createClass({
    render: function () {
        var personNodes = this.props.data.map(function (person) {
            return (
                <Person id={person.id} firstName = {person.firstName} lastName= {person.lastName} startDate={person.startDate}>
                </Person>
            );
        });
        return (
            <div className="personList">
                {personNodes}
            </div>
        );
    }
});