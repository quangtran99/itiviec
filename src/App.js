import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Detail from "./pages/Detail";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let user = useSelector((state) => state.user);

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };


  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Jobs} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/jobs" component={Jobs} />
        {/* <Route exact path ="/jobs" component={Jobs}/> */}
        <ProtectedRoute
          path="/jobs/:id"
          render={(props) => <Detail jobtitle="hahaha" {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;

// if you want to see detail page, you need to login