import Header from "./components/layout/Header";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Events from "./components/events/Events";
import EditEvent from "./components/events/EditEvent";
import {Provider} from 'react-redux';
import store from "./store";
import ViewEvent from "./components/events/ViewEvent";
import AddEvent from "./components/events/AddEvent";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {userIsAuthenticated, userIsNotAuthenticated} from './helpers/Auth';

import './App.css';

function App() {

  return (

    <Provider store={store}>
        <Router>
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path="/" component={Events}/>
                    <Route exact path="/event/:id" component={ViewEvent}/>
                    <Route exact path="/event/edit/:id" component={userIsAuthenticated(EditEvent)}/>
                    <Route exact path="/events/add/" component={userIsAuthenticated(AddEvent)}/>
                    <Route exact path="/register/" component={userIsNotAuthenticated(Register)}/>
                    <Route exact path="/login/" component={userIsNotAuthenticated(Login)}/>
                </Switch>
            </div>
        </Router>
    </Provider>
  );
}

export default App;
