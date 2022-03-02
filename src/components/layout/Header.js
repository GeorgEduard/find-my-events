import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {userLogout} from "../../actions/authActions";

class Header extends Component {

    state = {
        branding: 'FindMyEvents'
    }

    handleLogout = () => {
        this.props.userLogout();
    }

    render() {
        const {branding} = this.state;
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <a href="/" className="navbar-brand">{branding}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">Home</Link>
                            </li>
                            {this.props.user === null ? <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li> : null}
                            {this.props.user === null ? <li className="nav-item">
                                <Link to="/login/" className="nav-link">Login</Link>
                            </li> : null}
                            {this.props.user !== null ?
                                <Link to="/events/add" className="nav-link">Add Event</Link> : null}
                            {this.props.user !== null ? <li>
                                <a href="#!" className="nav-link" onClick={this.handleLogout}>
                                    Logout
                                </a>
                            </li> : null}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}


Header.propTypes = {
    user: PropTypes.object,
    userLogout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps, {userLogout})(Header);