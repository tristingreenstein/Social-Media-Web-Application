import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import Profile from "./components/pages/Profile.jsx";
import Register from "./components/pages/Register.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
function App() {
    const {user} = useContext(AuthContext)
    return (
        <Router>
            <Switch>
                <Route path="/profile/:username">
                    <Profile />
                </Route>
                <Route path="/login">{user ? <Redirect to = "/"/> : <Login />}</Route>
                <Route path="/register">{user ? <Redirect to = "/"/> : <Register />}</Route>
                <Route path="/">{user ? <Home /> : <Register/>}</Route>
            </Switch>
        </Router>
        );
}

export default App;
