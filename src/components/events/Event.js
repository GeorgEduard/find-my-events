import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class Event extends Component {
    render() {
      const  {id, name, date, location, shortDescription, description} = this.props.event;
        const eventDate = new Date(Date.parse(date));

        return (
            <div className="col-12 col-md-4 mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <h3>{name}</h3>
                        <small className="date"><span className="font-weight-bold">Date</span>: {eventDate.toLocaleDateString()}</small>
                        <div className="location mb-3"><span className="font-weight-bold">Location</span>: {location}</div>
                        <p className="card-text mb-3">{shortDescription !== '' ? shortDescription : description}</p>

                            <div className="d-grid">
                                <Link to={`event/${id}`} className="btn btn-primary">
                                    See Event
                                </Link>
                            </div>

                    </div>
                </div>
            </div>
        );
    }
}

Event.propTypes = {
    event: PropTypes.object.isRequired,
};


export default Event;