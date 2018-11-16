import React from 'react';
import PersonList from './PersonList.js';
import Person from './Person.js';


module.exports = React.createClass({
    getInitialState: function () {
        return { firstname: '', lastname: '', id:'', startdate: '' };
    },
    handleFirstNameChange: function (e) {
        this.setState({ firstname: e.target.value });
    },
    handleLastNameChange: function (e) {
        this.setState({ lastname: e.target.value });
    },
    handleStartDateChange: function (e) {
        this.setState({ startdate: e.target.value });
    },
    handleIdChange: function (e) {
        this.setState({ id: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var firstname = this.state.firstname.trim();
        var lastname = this.state.lastname.trim();
        var id = this.state.id.trim();
        var startdate = this.state.startdate.trim();
        if (!firstname || !lastname || !id || !startdate ) {
            return;
        }
        this.props.onPersonSubmit({ firstname: firstname, lastname: lastname, id: id, startdate: startdate });
        this.setState({
            firstname: '', lastname: '', id: '', startdate: '' });
    },
    render: function () {
        return (
            <form className="personForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={this.state.firstname}
                    onChange={this.handleFirstNameChange}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={this.state.lastname}
                    onChange={this.handleLastNameChange}
                />
                <input
                    type="text"
                    placeholder="ID"
                    value={this.state.id}
                    onChange={this.handleIdChange} /> 
                <input
                    type="text"
                    placeholder="yyyy-mm-dd"
                    value={this.state.startdate}
                    onChange={this.handleStartDateChange}
                />
                <input type="submit" value="Post" />
            </form>
        );
    }
});