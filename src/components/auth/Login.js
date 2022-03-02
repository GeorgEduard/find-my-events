import React, {Component} from 'react';
import {connect} from "react-redux";
import {tryLogin} from "../../actions/authActions";
import {notifyUser} from "../../actions/notifyActions";
import Alert from "../layout/Alert";
import InputGroup from "../layout/InputGroup";
import PropTypes from 'prop-types';
class Login extends Component {

    state = {
        email: '',
        password: ''
    }


    onSubmit = e => {
        e.preventDefault();

        const x = this;

        const {email, password} = this.state;

        (async function doLogin() {
            const loggedIn = await x.props.tryLogin(email, password);

            if (loggedIn === undefined) {
                x.props.notifyUser('Invalid Login Credentials', 'error');
            }
        })();
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    render() {
        const {email, password, error} = this.state;
        const {message, messageType} = this.props.notify;
        return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                             {message ? (
                                <Alert message={message} messageType={messageType}/>
                            ) : null}
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-primary">
                                    <i className="fas fa-lock me-3"></i>
                                    Login
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <InputGroup
                                    label="Email"
                                    onChange={this.onChange}
                                    value={email}
                                    name="email"
                                    type="email"
                                    placeholder="Your Email"
                                    error={error}/>
                                <InputGroup
                                    label="Password"
                                    type="password"
                                    onChange={this.onChange}
                                    placeholder="Your Password"
                                    value={password}
                                    name="password"
                                    error={error}/>

                                <div className="text-center d-grid">
                                    <input type="submit" value="Login" className="btn btn-primary mt-3"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    notifyUser: PropTypes.func.isRequired,
    notify: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    users: state.user.user,
    notify: state.notify
})

export default connect(mapStateToProps, {tryLogin, notifyUser})(Login);