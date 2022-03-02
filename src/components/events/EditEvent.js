import React, {Component} from 'react';
import InputGroup from "../layout/InputGroup";
import TextareaGroup from "../layout/TextareaGroup";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import dayjs from 'dayjs';
import {getEvent, updateEvent} from "../../actions/eventActions";


class EditEvent extends Component {
    state = {
        id: '',
        name: '',
        date: '',
        location: '',
        shortDescription: '',
        description: '',
        errors: {},
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const {name, date, location, shortDescription, description} = nextProps.event;
        this.setState({
            name,
            date,
            location,
            shortDescription,
            description
        });
    }



    componentDidMount() {
        const {id} = this.props.match.params;

        this.props.getEvent(id);
    }

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


        const {id} = this.props.match.params;

        const updateEvent = {
            id,
            name,
            date,
            location,
            shortDescription,
            description
        };

        this.props.updateEvent(updateEvent);

        // Clear State
        this.setState({
            name: '',
            date: '',
            location: '',
            shortDescription: '',
            description: ''
        });

        this.props.history.push(`/event/${id}`);
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});

    render() {
        const {name, date, location, shortDescription, description, errors} = this.state;
        const eventDate = new Date(Date.parse(date));


        return (
            <div className="container mb-3">
                <div className="row">
                    <div className="col-12">
                        <h1>Edit Event</h1>
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
                                    value={dayjs(eventDate).format('YYYY-MM-DD')}
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

                               <div className="d-grid mt-3">
                                   <input
                                       type="submit"
                                       value="Update Event"
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

EditEvent.propTypes = {
    event: PropTypes.object.isRequired,
    getEvent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    event: state.event.event
})

export default connect(mapStateToProps, {getEvent, updateEvent})(EditEvent);
