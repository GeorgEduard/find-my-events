import React, {Component} from 'react';
import Event from "./Event";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getEvents} from "../../actions/eventActions";

class Events extends Component {
    componentDidMount() {
        this.props.getEvents();
    }

    render() {
        const {events} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-4">
                        <h1>Upcoming Events</h1>
                    </div>
                </div>
                <div className="row">
                    {events.map(event => (
                        <Event key={event.id} event={event}/>
                    ))}
                </div>
            </div>
        );
    }
}

Events.propTypes = {
    events: PropTypes.array.isRequired,
    getEvents: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    events: state.event.events // from root reducer
});

export default connect(mapStateToProps, {getEvents})(Events);