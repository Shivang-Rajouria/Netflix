import "./app.scss"
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
// import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import {Navigate} from "react-router";
const user=true ;
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path = "/">
          {user ? <Home />:<Redirect to="/register"/>}
        </Route>
        <Route  path = "/register">
          {!user ? <Register />:<Redirect to="/"/>}
        </Route>
        <Route  path = "/login">
          {!user ? <Login />:<Redirect to="/"/>}
        </Route>
        {user && (
          <>

        <Route path="/movies">
          <Home type="movies"/>
        </Route>
        <Route path="/series">
          <Home type="series"/>
        </Route>
        <Route path="/watch">
          <Watch/>
        </Route>
          </>
        )
        }
      </Switch>
    </Router>
        ) ;
        };
    // <Home/>



export default App;