import React from 'react';
import Person from './Person.js';
import PersonForm from './PersonForm.js'

module.exports = React.createClass({
    render: function () {
        var personNodes = this.props.data.map(function (person) {
            return (
                <Person key={person._id} id={person.id} firstname={person.firstname} lastname={person.lastname}>
                    {person.firstname}{person.lastname}{person.startdate} 
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