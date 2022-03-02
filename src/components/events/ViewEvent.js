import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getEvent} from "../../actions/eventActions";
import {deleteEvent} from "../../actions/eventActions";
import {Link} from "react-router-dom";

class ViewEvent extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getEvent(id);
    }

    deleteHandler = () => {
        const {id} = this.props.match.params;
        this.props.deleteEvent(id);
        this.props.history.push('/');
    }

    render() {
        const {id, name, date, location, description} = this.props.event;
        const eventDate = new Date(Date.parse(date));
        return (
            <div className="container">

                <div className="row mb-4">
                    <div className="col-6"><Link to="/" style={{'textDecoration':'none'}}><i className="fas fa-arrow-left me-2"></i>Back to Events</Link></div>
                    {this.props.user !== null ? <div className="col-6 text-end">
                        <Link to={`/event/edit/${id}`} className="me-3" style={{'textDecoration':'none'}}>
                            <i className="fas fa-pencil-alt me-2"></i>
                        Edit Event
                        </Link>
                        <span onClick={this.deleteHandler} style={{'cursor':'pointer'}} className="text-danger"><i className="fas fa-times me-2"></i>Delete</span>
                        </div> : null}
                </div>
                <div className="row">
                    <div className="col-12 text-center mb-4">
                        <h1>{name}</h1>
                        <div>
                            <small>{eventDate.toLocaleDateString()}</small> | <small>{location}</small>
                        </div>
                    </div>
                    <div className="col-12">
                        <p>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

ViewEvent.propTypes = {
    event: PropTypes.object.isRequired,
    getEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    user: PropTypes.object
};

const mapStateToProps = state => ({
    event: state.event.event,
    user: state.user.user
});

export default connect(mapStateToProps, {getEvent, deleteEvent})(ViewEvent);
