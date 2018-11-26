import React from 'react';
import $ from 'jquery';
import PersonList from './PersonList.js';
import PersonForm from './PersonForm.js';


module.exports = React.createClass({
    loadPeopleFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
                console.warn(xhr.responseText);
            }.bind(this)
        });
    },
    handlePersonSubmit: function (person) {
        var people = this.state.data;
        var newPeople = people.concat([person]);
        this.setState({ data: newPeople });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: person,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({ data: people });
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadPeopleFromServer();
        setInterval(this.loadPeopleFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="personBox">
                <h1>People</h1>
                <PersonList data={this.state.data} />
                <PersonForm onPersonSubmit={this.handlePersonSubmit} />
            </div>
        );
    }
});





