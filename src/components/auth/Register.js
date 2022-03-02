import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import {userRegister} from "../../actions/authActions";


class Register extends Component {

    state = {
        email: '',
        password: ''
    }

    componentWillMount() {

    }

    onSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;

        const newUser = {
            id: uuid(),
            email,
            password
        }

        this.props.userRegister(newUser);

        this.setState({
            email: '',
            password: ''
        })

        this.props.history.push('/');

    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    render() {

        const {email, password} = this.state;
        return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-primary">
                                    <i className="fas fa-lock me-3"></i>
                                    Register
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        required
                                        value={email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="d-grid text-center">
                                    <input type="submit" value="Register" className="btn btn-primary mt-3"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


Register.propTypes = {
    userRegister: PropTypes.func.isRequired
}

export default connect(null, {userRegister})(Register);
