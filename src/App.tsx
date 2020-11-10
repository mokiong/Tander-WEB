import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Index from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
