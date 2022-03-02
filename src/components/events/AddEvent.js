import React, { Component } from 'react';
import InputGroup from "../layout/InputGroup";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {addEvent} from "../../actions/eventActions";
import uuid from 'react-uuid';
import dayjs from "dayjs";
import TextareaGroup from "../layout/TextareaGroup";


class AddEvent extends Component {
    state = {
        name: '',
        date: '',
        location: '',
        shortDescription: '',
        description: '',
        errors: {}
    };

    onSubmit = (e) => {
        e.preventDefault();

        const {name, date, location, description, shortDescription} = this.state;

        // Check For Errors
        if (name === '') {
            this.setState({errors: {name: 'Name is required'}});
            return;
        }

        if (date === '') {
            this.setState({errors: {date: 'Date is required'}});
            return;
        }

        if (location === '') {
            this.setState({errors: {location: 'Location is required'}});
            return;
        }

        if (description === '') {
            this.setState({errors: {description: 'Description is required'}});
            return;
        }


        const newEvent = {
            id: uuid(),
            name,
            date,
            location,
            shortDescription,
            description
        };

        this.props.addEvent(newEvent)

        // Clear State
        this.setState({
            name,
            date,
            location,
            shortDescription,
            description,
            errors: {}
        });

        this.props.history.push('/');
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { name, date, location, shortDescription, description, errors } = this.state;

        return (
            <div className="container mb-3">
                <div className="row">
                    <div className="col-12">
                        <h1>Add Event</h1>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <InputGroup
                                    label="Name"
                                    name="name"
                                    placeholder="Event Name"
                                    value={name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />
                                <InputGroup
                                    label="Email"
                                    name="date"
                                    type="date"
                                    placeholder="Event Email"
                                    value={dayjs(date).format('YYYY-MM-DD')}
                                    onChange={this.onChange}
                                    error={errors.date}
                                />
                                <InputGroup
                                    label="Location"
                                    name="location"
                                    placeholder="Add Location"
                                    value={location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <InputGroup
                                    label="Short Description"
                                    name="shortDescription"
                                    placeholder="Add a short description"
                                    value={shortDescription}
                                    onChange={this.onChange}
                                    error={errors.shortDescription}
                                />
                                <TextareaGroup
                                    name="description"
                                    label="Event Description"
                                    onChange={this.onChange}
                                    placeholder={description}
                                    value={description}
                                />
                               <div className=" mt-3 d-grid">
                                   <input
                                       type="submit"
                                       value="Add Event"
                                       className="btn btn-primary"
                                   />
                               </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddEvent.propTypes = {
    addEvent: PropTypes.func.isRequired
}

export default connect(null, {addEvent})(AddEvent);
